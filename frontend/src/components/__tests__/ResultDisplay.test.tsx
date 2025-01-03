import { render, screen } from '@testing-library/react';
import ResultDisplay from '../ResultDisplay';
import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';

describe('ResultDisplay Component', () => {
    it('should display the correct operation and result', () => {
        const result = "0.5";
        const operation = "Either";

        render(<ResultDisplay result={result} operation={operation} />);

        expect(screen.getByText(`Result for ${operation}`)).toBeInTheDocument();
        expect(screen.getByText(result)).toBeInTheDocument();
    });

    it('should render properly if result is 0', () => {
        const result = "0";
        const operation = "CombinedWith";

        render(<ResultDisplay result={result} operation={operation} />);

        expect(screen.getByText(`Result for ${operation}`)).toBeInTheDocument();
        expect(screen.getByText(result)).toBeInTheDocument();
    });

    it('should not be rendered if result is blank', () => {
        const result = "";
        const operation = "CombinedWith";

        render(<ResultDisplay result={result} operation={operation} />);

        expect(screen.queryByText(`Result for`)).not.toBeInTheDocument();
    });

    it('should not be rendered if operation is blank', () => {
        const result = "0";
        const operation = "";

        render(<ResultDisplay result={result} operation={operation} />);

        expect(screen.queryByText(`Result for`)).not.toBeInTheDocument();
    });
});