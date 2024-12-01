import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import OperationSelector from "../OperationSelector";
import { describe, expect, it, vi } from "vitest";

describe("OperationSelector", () => {
    const operations = ["Add", "Subtract", "Multiply", "Divide"];
    const label = "Select Operation";
    const onSelectChange = vi.fn();

    it("renders the component with given operations and label", () => {
        render(<OperationSelector operations={operations} onSelectChange={onSelectChange} label={label} />);

        expect(screen.getByText(label)).toBeInTheDocument();

        operations.forEach(operation => {
            expect(screen.getByLabelText(operation)).toBeInTheDocument();
        });
    });

    it("calls onSelectChange with the correct value when an option is selected", () => {
        render(<OperationSelector operations={operations} onSelectChange={onSelectChange} label={label} />);

        fireEvent.click(screen.getByLabelText("Subtract"));

        expect(onSelectChange).toHaveBeenCalledWith("Subtract");
    });

    it("sets the default selected value correctly", () => {
        render(<OperationSelector operations={operations} onSelectChange={onSelectChange} label={label} />);

        expect(screen.getByLabelText(operations[0])).toBeChecked();
    });
});