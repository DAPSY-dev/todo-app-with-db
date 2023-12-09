import React from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import fetchMock from "jest-fetch-mock";
import { Provider } from "react-redux";
import {
    store,
    useGetTodosQuery,
    useAddTodoMutation,
    useRemoveTodoMutation,
    useUpdateTodoMutation,
} from "../../../store";
import { TodoItemBaseType, TodoItemType } from "../../TodoItem";

type WrapperType = {
    children: React.ReactNode;
};

const Wrapper: React.FC<WrapperType> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};

beforeEach(() => {
    fetchMock.resetMocks();
});

describe("Todo - API testing", () => {
    const todoItem: TodoItemType = {
        id: 9999999,
        text: "Todo 9999999",
        completed: false,
    };
    const data: TodoItemType[] = [todoItem];

    beforeEach(() => {
        fetchMock.mockResponseOnce(JSON.stringify(data));
    });

    test("useGetTodosQuery", async () => {
        const endpointName = "getTodos";

        const { result } = renderHook(() => useGetTodosQuery(null), { wrapper: Wrapper });

        expect(result.current).toMatchObject({
            status: "pending",
            endpointName: endpointName,
            isFetching: true,
            isLoading: true,
            isSuccess: false,
            isError: false,
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(fetchMock).toBeCalledTimes(1);

        expect(result.current).toMatchObject({
            status: "fulfilled",
            endpointName: endpointName,
            data: data,
            isFetching: false,
            isLoading: false,
            isSuccess: true,
            isError: false,
        });
    });

    test("useAddTodoMutation", async () => {
        const endpointName = "addTodo";
        const testItem: TodoItemBaseType = {
            text: "Test todo",
            completed: false,
        };

        const { result } = renderHook(() => useAddTodoMutation(), { wrapper: Wrapper });

        await act(() => result.current[0](testItem));

        await waitFor(() => expect(result.current[1].isSuccess).toBe(true));

        expect(fetchMock).toBeCalledTimes(1);

        expect(result.current[1]).toMatchObject({
            status: "fulfilled",
            endpointName: endpointName,
            data: data,
            isLoading: false,
            isSuccess: true,
            isError: false,
        });
    });

    test("useRemoveTodoMutation", async () => {
        const endpointName = "removeTodo";

        const { result } = renderHook(() => useRemoveTodoMutation(), { wrapper: Wrapper });

        await act(() => result.current[0](todoItem));

        await waitFor(() => expect(result.current[1].isSuccess).toBe(true));

        expect(fetchMock).toBeCalledTimes(1);

        expect(result.current[1]).toMatchObject({
            status: "fulfilled",
            endpointName: endpointName,
            data: data,
            isLoading: false,
            isSuccess: true,
            isError: false,
        });
    });

    test("useUpdateTodoMutation", async () => {
        const endpointName = "updateTodo";

        const { result } = renderHook(() => useUpdateTodoMutation(), { wrapper: Wrapper });

        await act(() => result.current[0](todoItem));

        await waitFor(() => expect(result.current[1].isSuccess).toBe(true));

        expect(fetchMock).toBeCalledTimes(1);

        expect(result.current[1]).toMatchObject({
            status: "fulfilled",
            endpointName: endpointName,
            data: data,
            isLoading: false,
            isSuccess: true,
            isError: false,
        });
    });
});
