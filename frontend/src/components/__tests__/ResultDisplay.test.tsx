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

        const { container } = render(<ResultDisplay result={result} operation={operation} />);
        expect(container).toBeInTheDocument();
    });
});