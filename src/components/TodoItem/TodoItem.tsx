import React, { useId } from "react";
import { useRemoveTodoMutation, useToggleTodoCompletedMutation } from "../../store";

export type TodoItemBaseType = {
    text: string;
    completed: boolean;
};

export type TodoItemType = TodoItemBaseType & {
    id: number;
};

export type TodoItemProps = {
    isEmpty?: boolean;
    item?: TodoItemType;
    children?: React.ReactNode;
};

const TodoItem: React.FC<TodoItemProps> = ({ isEmpty, item, children }) => {
    const [removeTodo, removeTodoResult] = useRemoveTodoMutation();
    const [toggleTodoCompleted, toggleTodoCompletedResult] = useToggleTodoCompletedMutation();
    const checkboxId = useId();

    if (isEmpty) {
        return <li className="todo-item">{children}</li>;
    }

    return !item ? null : (
        <li className="todo-item">
            <button
                type="button"
                onClick={() => removeTodo(item)}
                disabled={removeTodoResult.isLoading}
                className="button todo-item__remove"
            >
                Remove
            </button>
            <input
                type="checkbox"
                id={checkboxId}
                onChange={() => toggleTodoCompleted(item)}
                checked={item.completed}
                disabled={toggleTodoCompletedResult.isLoading}
            />
            <label htmlFor={checkboxId}>{item.text}</label>
        </li>
    );
};

export default TodoItem;
