import { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import TodoApp from "../components/TodoApp";
import TodoModel from "../components/TodoModel";
import useParagonGlobal from "../hooks/useParagonGlobal";

export default function Home({ user, paragonUserToken }) {
  const paragon = useParagonGlobal(paragonUserToken);

  const model = useRef(new TodoModel("react-todos"));
  const [tick, setTick] = useState(0);
  useEffect(() => {
    model.current.subscribe(() => {
      setTick((prev) => prev + 1);
    });
  }, []);
  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    <Layout title="Tasks">
      <section className="todoapp">
        {!isSSR && (
          <TodoApp
            model={model.current}
            onNewTodo={(newTodo) => {
              // When a new todo gets added, send the Task Created App Event
              // to Paragon.
              paragon.event("Task Created", {
                creator: user?.name,
                summary: newTodo,
                priority: "Medium",
                status: "Not Started",
              });
            }}
          />
        )}
      </section>
    </Layout>
  );
}
