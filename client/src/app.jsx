import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_TODOS = gql`
  query GetTodos {
    getTodos {
      title
      completed
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(GET_TODOS);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <div>
      {data.getTodos.map((todo, index) => (
        <div key={index}>
          <h2>{todo.title}</h2>
          <p>{todo.completed ? "Completed" : "Not Completed"}</p>
        </div>
      ))}
    </div>
  );
};

export { App as App };

