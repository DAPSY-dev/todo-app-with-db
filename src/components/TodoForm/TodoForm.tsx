import React, { useState, useId } from "react";
import { useAddTodoMutation } from "../../store";
import { TodoItemBaseType } from "../TodoItem";

const TodoForm: React.FC = () => {
    const [text, setText] = useState("");
    const [addTodo, result] = useAddTodoMutation();
    const newTodoId = useId();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTodo: TodoItemBaseType = {
            text: text,
            completed: false,
        };
        addTodo(newTodo);
        setText("");
    };

    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <div className="form-group-cta">
                <div className="form-group-cta__control">
                    <label htmlFor={newTodoId} className="form-label">
                        Add a new todo
                    </label>
                    <input
                        type="text"
                        id={newTodoId}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="button" disabled={result.isLoading}>
                    Add
                </button>
            </div>
        </form>
    );
};

export default TodoForm;
