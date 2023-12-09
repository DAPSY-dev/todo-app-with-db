import React, { useId } from "react";
import { useRemoveTodoMutation, useUpdateTodoMutation } from "../../store";

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
    const [updateTodo, updateTodoResult] = useUpdateTodoMutation();
    const checkboxId = useId();

    if (isEmpty) {
        return <li className="todo-item">{children}</li>;
    }

    if (!item) {
        return null;
    }

    const handleToggleCompleted = () => {
        const newTodo = {
            ...item,
            completed: !item.completed,
        };
        updateTodo(newTodo);
    };

    return (
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
                onChange={handleToggleCompleted}
                checked={item.completed}
                disabled={updateTodoResult.isLoading}
            />
            <label htmlFor={checkboxId}>{item.text}</label>
        </li>
    );
};

export default TodoItem;
