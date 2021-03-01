import { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import TodoApp from "../components/TodoApp";
import TodoModel from "../TodoModel";

export default function Home() {
  const model = useRef(new TodoModel("react-todos"));
  const [tick, setTick] = useState(0);

  useEffect(() => {
    model.current.subscribe(() => {
      setTick((prev) => prev + 1);
    });
  }, []);

  return (
    <Layout title="Tasks">
      <section className="todoapp">
        <TodoApp model={model.current} />
      </section>
    </Layout>
  );
}
