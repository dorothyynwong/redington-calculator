import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';
import { ProbabilityResponse, ProbabilityOperation } from './models/probabilityModel';

vi.mock('./components/ProbabilityForm', () => ({
    default: ({
        selectedOperation,
        onOperationChange,
        onResultCalculated,
    }: {
        selectedOperation: ProbabilityOperation.CombinedWith;
        onOperationChange: (operation: ProbabilityOperation) => void;
        onResultCalculated: (result: ProbabilityResponse) => void;
    }) => {
        const mockResult: ProbabilityResponse = { result: 0.75 };
        return (
            <div aria-label="Probability Form">
                Mocked ProbabilityForm
                <button onClick={() => onResultCalculated(mockResult)}>Calculate</button>
                <button onClick={() => onOperationChange(ProbabilityOperation.Either)}>Change Operation</button>
                <div>Current Operation: {selectedOperation} </div>
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
    it('renders the Probability Calculator heading', () => {
        render(<App />);
        expect(screen.getByText('Probability Calculator')).toBeInTheDocument();
    });

    it('renders the ProbabilityForm component', () => {
        render(<App />);
        expect(screen.getByLabelText('Probability Form')).toBeInTheDocument();
    });

    it('renders the ResultDisplay component when result is calculated', async () => {
        render(<App />);
        const calculateButton = screen.getByText('Calculate');
        fireEvent.click(calculateButton);
        expect(await screen.findByLabelText('Result Display')).toBeInTheDocument();
    });

    it('updates the selectedOperation state and passes it to ProbabilityForm', async () => {
        const beforeOperation = ProbabilityOperation.CombinedWith;
        const afterOperation = ProbabilityOperation.Either;

        render(<App />);
        expect(screen.getByText(`Current Operation: ${beforeOperation}`)).toBeInTheDocument();
        const changeOperationButton = screen.getByText('Change Operation');
        fireEvent.click(changeOperationButton);
        expect(screen.getByText(`Current Operation: ${afterOperation}`)).toBeInTheDocument();
    });

    it('passes the updated operation and result to ResultDisplay', async () => {
        const expectedOperation = ProbabilityOperation.Either;

        render(<App />);
        const changeOperationButton = screen.getByText('Change Operation');
        fireEvent.click(changeOperationButton);
        const calculateButton = screen.getByText('Calculate');
        fireEvent.click(calculateButton);
        expect(await screen.findByText(`Result: 0.75, Operation: ${expectedOperation}`)).toBeInTheDocument();
    });
});
