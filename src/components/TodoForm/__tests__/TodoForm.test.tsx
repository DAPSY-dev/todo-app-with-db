import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../store";
import TodoForm from "../TodoForm";

const MockTodoForm = () => {
    return (
        <Provider store={store}>
            <TodoForm />
        </Provider>
    );
};

describe("TodoForm", () => {
    test("Can type in input", () => {
        render(<MockTodoForm />);

        const inputElement = screen.getByLabelText("Add a new todo") as HTMLInputElement;

        fireEvent.change(inputElement, { target: { value: "Test" } });

        expect(inputElement.value).toBe("Test");
    });

    test("Clear input on submit", () => {
        render(<MockTodoForm />);

        const inputElement = screen.getByLabelText("Add a new todo") as HTMLInputElement;
        const submitButton = screen.getByRole("button", { name: /add/i });

        fireEvent.change(inputElement, { target: { value: "Test" } });
        fireEvent.click(submitButton);

        expect(inputElement.value).toBe("");
    });
});
