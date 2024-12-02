import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import OperationSelector from "../OperationSelector";
import { describe, expect, it, vi, beforeEach } from "vitest";

describe("OperationSelector", () => {
    const operations = ["CombinedWith", "Either"];
    const label = "Select Operation";
    const onSelectChange = vi.fn();

    beforeEach(() => {
        render(<OperationSelector operations={operations} onSelectChange={onSelectChange} label={label} />);
    });

    it("renders the component with given operations and label", () => {
        expect(screen.getByText(label)).toBeInTheDocument();

        operations.forEach(operation => {
            expect(screen.getByLabelText(operation)).toBeInTheDocument();
        });
    });

    it("calls onSelectChange with the correct value when an option is selected", () => {
        const selectedOperation = operations[1];

        fireEvent.click(screen.getByLabelText(selectedOperation));

        expect(onSelectChange).toHaveBeenCalledWith(selectedOperation);
    });

    it("sets the default selected value correctly", () => {
        const selectedOperation = operations[0];

        expect(screen.getByLabelText(selectedOperation)).toBeChecked();
    });
});
