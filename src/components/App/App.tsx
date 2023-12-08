import React from "react";
import Todo from "../Todo";

const App: React.FC = () => {
    return (
        <div className="wrapper">
            <h1 className="heading">Todo App</h1>
            <Todo />
        </div>
    );
};

export default App;
