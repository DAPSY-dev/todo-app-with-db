import React from "react";
import TodoItem, { TodoItemType } from "../TodoItem";
import { useGetTodosQuery } from "../../store";

const TodoList: React.FC = () => {
    const { data, error, isLoading, isFetching } = useGetTodosQuery(null);

    if (isLoading || isFetching) {
        return (
            <ul className="todo-list">
                <TodoItem isEmpty>Loading...</TodoItem>
            </ul>
        );
    }

    if (error) {
        return (
            <ul className="todo-list">
                <TodoItem isEmpty>Oops! Something went wrong...</TodoItem>
            </ul>
        );
    }

    return (
        <ul className="todo-list">
            {data.length === 0 ? (
                <TodoItem isEmpty>Add todos...</TodoItem>
            ) : (
                data.map((item: TodoItemType) => <TodoItem key={item.id} item={item} />)
            )}
        </ul>
    );
};

export default TodoList;
