import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';
import { ProbabilityResponse, ProbabilityOperation } from './models/probabilityModel';

vi.mock('./components/ProbabilityForm', () => ({
    default: ({
        selectedOperation,
        onResultCalculated,
    }: {
        selectedOperation: ProbabilityOperation;
        onResultCalculated: (result: ProbabilityResponse) => void;
    }) => {
        const mockResult: ProbabilityResponse = { result: 0.75 };

        return (
            <div aria-label="Probability Form">
                <button onClick={() => onResultCalculated(mockResult)}>Calculate</button>
                Mocked ProbabilityForm with selectedOperation: {selectedOperation}
            </div>
        );
    },
}));

vi.mock('./components/ResultDisplay', () => ({
    default: ({ result, operation }: { result: string; operation: ProbabilityOperation }) => (
        <div aria-label="Result Display">
            Result: {result}, Operation: {operation}
        </div>
    ),
}));

describe('App Component', () => {
    beforeEach(() => {
        render(<App />);
    });

    it('renders the Probability Calculator heading', () => {
        expect(screen.getByText('Probability Calculator')).toBeInTheDocument();
    });

    it('renders the ProbabilityForm component', () => {
        expect(screen.getByLabelText('Probability Form')).toBeInTheDocument();
    });

    it('renders the ResultDisplay component with correct result and operation when result is calculated', async () => {
        const calculateButton = screen.getByText('Calculate');
        fireEvent.click(calculateButton);
        expect(screen.getByText('Result: 0.75, Operation: CombinedWith')).toBeInTheDocument();
    });
});
