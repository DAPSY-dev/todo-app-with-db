import React from "react";
import TodoForm from "../TodoForm";
import TodoList from "../TodoList";

const Todo: React.FC = () => {
    return (
        <div className="todo">
            <TodoForm />
            <TodoList />
        </div>
    );
};

export default Todo;
