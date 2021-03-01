import { useEffect, useRef, useState } from "react";
import TodoApp from "../components/TodoApp";
import TodoModel from "../TodoModel";
import "todomvc-common/base.css";
import "todomvc-app-css/index.css";

export default function Home() {
  const model = useRef(new TodoModel("react-todos"));
  const [tick, setTick] = useState(0);

  useEffect(() => {
    model.current.subscribe(() => {
      setTick((prev) => prev + 1);
    });
  }, []);

  return (
    <section className="todoapp">
      <TodoApp model={model.current} />
    </section>
  );
}
