export const Utils = {
  uuid: function () {
    /*jshint bitwise:false */
    var i, random;
    var uuid = "";

    for (i = 0; i < 32; i++) {
      random = (Math.random() * 16) | 0;
      if (i === 8 || i === 12 || i === 16 || i === 20) {
        uuid += "-";
      }
      uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
    }

    return uuid;
  },

  pluralize: function (count, word) {
    return count === 1 ? word : word + "s";
  },

  store: function (namespace, data) {
    if (typeof localStorage === "undefined") {
      return;
    }
    if (data) {
      return localStorage.setItem(namespace, JSON.stringify(data));
    }

    var store = localStorage.getItem(namespace);
    return (store && JSON.parse(store)) || [];
  },

  extend: function () {
    var newObj = {};
    for (var i = 0; i < arguments.length; i++) {
      var obj = arguments[i];
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] = obj[key];
        }
      }
    }
    return newObj;
  },
};

// Generic "model" object. You can use whatever
// framework you want. For this application it
// may not even be worth separating this logic
// out, but we do this to demonstrate one way to
// separate out parts of your application.
const TodoModel = function (key) {
  this.key = key;
  this.todos = Utils.store(key) || [];
  this.onChanges = [];
};

TodoModel.prototype.subscribe = function (onChange) {
  this.onChanges.push(onChange);
};

TodoModel.prototype.inform = function () {
  Utils.store(this.key, this.todos);
  this.onChanges.forEach(function (cb) {
    cb();
  });
};

TodoModel.prototype.addTodo = function (title) {
  this.todos = this.todos.concat({
    id: Utils.uuid(),
    title: title,
    completed: false,
  });

  this.inform();
};

TodoModel.prototype.toggleAll = function (checked) {
  // Note: it's usually better to use immutable data structures since they're
  // easier to reason about and React works very well with them. That's why
  // we use map() and filter() everywhere instead of mutating the array or
  // todo items themselves.
  this.todos = this.todos.map(function (todo) {
    return Utils.extend({}, todo, { completed: checked });
  });

  this.inform();
};

TodoModel.prototype.toggle = function (todoToToggle) {
  this.todos = this.todos.map(function (todo) {
    return todo !== todoToToggle ? todo : Utils.extend({}, todo, { completed: !todo.completed });
  });

  this.inform();
};

TodoModel.prototype.destroy = function (todo) {
  this.todos = this.todos.filter(function (candidate) {
    return candidate !== todo;
  });

  this.inform();
};

TodoModel.prototype.save = function (todoToSave, text) {
  this.todos = this.todos.map(function (todo) {
    return todo !== todoToSave ? todo : Utils.extend({}, todo, { title: text });
  });

  this.inform();
};

TodoModel.prototype.clearCompleted = function () {
  this.todos = this.todos.filter(function (todo) {
    return !todo.completed;
  });

  this.inform();
};

export default TodoModel;
