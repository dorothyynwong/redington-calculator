import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import NumericInput from "../NumericInput";
import { describe, expect, it, vi } from "vitest";

describe("NumericInput Component", () => {
    const mockOnChange = vi.fn();

    const defaultProps = {
        label: "Test Label",
        value: "0.5",
        index: 0,
        error: false,
        onChange: mockOnChange,
    };

    it("renders without crashing", () => {
        render(<NumericInput {...defaultProps} />);
        expect(screen.getByLabelText(defaultProps.label)).toBeInTheDocument();
    });

    it("displays the correct value", () => {
        render(<NumericInput {...defaultProps} />);
        expect(screen.getByDisplayValue(defaultProps.value)).toBeInTheDocument();
    });

    it("calls onChange with correct parameters when input changes", () => {
        const value = "0.7";

        render(<NumericInput {...defaultProps} />);
        const input = screen.getByLabelText(defaultProps.label);
        fireEvent.change(input, { target: { value: value } });
        expect(mockOnChange).toHaveBeenCalledWith(0, value);
    });

    it("displays error message when error is true", () => {
        render(<NumericInput {...defaultProps} error={true} />);
        expect(screen.getByText("Value must be between 0 and 1")).toBeInTheDocument();
    });

    it("does not display error message when error is false", () => {
        render(<NumericInput {...defaultProps} error={false} />);
        expect(screen.queryByText("Value must be between 0 and 1")).not.toBeInTheDocument();
    });
});