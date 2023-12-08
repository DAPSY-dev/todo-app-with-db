import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SERVER_URL, SERVER_TODOS_PATH } from "../../app-config";

export const todoApi = createApi({
    reducerPath: "todoApi",
    baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
    tagTypes: ["Todo"],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => SERVER_TODOS_PATH,
            providesTags: ["Todo"],
        }),
        addTodo: builder.mutation({
            query: (todo) => ({
                url: SERVER_TODOS_PATH,
                method: "POST",
                body: todo,
            }),
            invalidatesTags: ["Todo"],
        }),
        removeTodo: builder.mutation({
            query: (todo) => ({
                url: `${SERVER_TODOS_PATH}/${todo.id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Todo"],
        }),
        toggleTodoCompleted: builder.mutation({
            query: (todo) => ({
                url: `${SERVER_TODOS_PATH}/${todo.id}`,
                method: "PATCH",
                body: {
                    completed: !todo.completed,
                },
            }),
            invalidatesTags: ["Todo"],
        }),
    }),
});

export const { useGetTodosQuery, useAddTodoMutation, useRemoveTodoMutation, useToggleTodoCompletedMutation } = todoApi;
