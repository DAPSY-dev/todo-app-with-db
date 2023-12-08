import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../store";
import TodoItem, { TodoItemType, TodoItemProps } from "../TodoItem";

const testItem: TodoItemType = {
    id: 1,
    text: "Test item",
    completed: false,
};

const MockTodoItem = ({ isEmpty, item, children }: TodoItemProps) => {
    return (
        <Provider store={store}>
            <TodoItem isEmpty={isEmpty} item={item}>
                {children}
            </TodoItem>
        </Provider>
    );
};

describe("TodoItem", () => {
    test("Empty item", () => {
        render(<MockTodoItem isEmpty>Empty item</MockTodoItem>);

        const itemTextElement = screen.getByText(/empty item/i);
        expect(itemTextElement).toBeInTheDocument();
    });

    test("Render item text", () => {
        render(<MockTodoItem item={testItem} />);

        const itemTextElement = screen.getByText(/test item/i);
        expect(itemTextElement).toBeInTheDocument();
    });

    test("Render item remove button", () => {
        render(<MockTodoItem item={testItem} />);

        const itemRemoveButton = screen.getByRole("button", { name: /remove/i });
        expect(itemRemoveButton).toBeInTheDocument();
    });

    test("Render item checkbox", () => {
        render(<MockTodoItem item={testItem} />);

        const itemCheckbox = screen.getByRole("checkbox");
        expect(itemCheckbox).toBeInTheDocument();
    });
});
