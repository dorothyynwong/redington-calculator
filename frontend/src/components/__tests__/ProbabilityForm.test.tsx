import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, Mock, beforeEach, afterEach } from 'vitest';
import ProbabilityForm from '../ProbabilityForm';
import { getProbability } from '../../api/probabilityAPI';
import { ProbabilityOperation } from '../../models/probabilityModel';

vi.mock('../../api/probabilityAPI', () => ({
    getProbability: vi.fn()
}));

describe('ProbabilityForm', () => {
    const mockGetProbability = getProbability as Mock;

    beforeEach(() => {
        vi.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    it('renders the form with initial values', () => {
        render(<ProbabilityForm />);
        expect(screen.getByLabelText(/Probability 1/i)).toHaveValue(0);
        expect(screen.getByLabelText(/Probability 2/i)).toHaveValue(0);
        expect(screen.getByText(/Calculate/i)).toBeInTheDocument();
    });

    describe('validates input probabilities', () => {
        const testCases = [
            { num1: 1.01, num2: 0.5, description: 'Probability 1 > 1' },
            { num1: -0.01, num2: 0.5, description: 'Probability 1 < 0' },
            { num1: 0.5, num2: 1.01, description: 'Probability 2 > 1' },
            { num1: 0.5, num2: -0.01, description: 'Probability 2 < 0' },
            { num1: 1.01, num2: -0.01, description: 'Both probabilities invalid' }
        ];

        testCases.forEach(({ num1, num2, description }) => {
            it(`validates ${description}`, () => {
                render(<ProbabilityForm />);

                const input1 = screen.getByLabelText(/Probability 1/i);
                const input2 = screen.getByLabelText(/Probability 2/i);
                const button = screen.getByText(/Calculate/i);

                fireEvent.change(input1, { target: { value: num1.toString() } });
                fireEvent.change(input2, { target: { value: num2.toString() } });
                fireEvent.click(button);

                const errorMessages = screen.getAllByText(/Value must be between 0 and 1/i);
                expect(errorMessages.length).toBeGreaterThan(0);
            });
        });
    });

    describe('accepts 0 and 1 as valid inputs for both probabilities', async () => {
        const testCases = [
            { num1: 0, num2: 0, result: 0, description: 'both probabilities are 0' },
            { num1: 1, num2: 1, result: 1, description: 'both probabilities are 1' }
        ];

        testCases.forEach(({ num1, num2, result, description }) => {
            it(`accepts ${description}`, async () => {
                const mockResponse = { result: result };

                mockGetProbability.mockResolvedValueOnce(mockResponse);

                render(<ProbabilityForm />);
                const input1 = screen.getByLabelText(/Probability 1/i);
                const input2 = screen.getByLabelText(/Probability 2/i);
                const button = screen.getByText(/Calculate/i);

                fireEvent.change(input1, { target: { value: num1.toString() } });
                fireEvent.change(input2, { target: { value: num2.toString() } });
                fireEvent.click(button);

                expect(getProbability).toHaveBeenCalledWith({
                    num1: num1,
                    num2: num2,
                    operation: ProbabilityOperation.CombinedWith,
                });

                const resultDisplay = await screen.findByText(result.toString());
                expect(resultDisplay).toBeInTheDocument();
            });
        });
    });

    it('calls getProbability API on form submit with valid inputs', async () => {
        const num1 = 0.3;
        const num2 = 0.2;
        const result = 0.06;

        const mockResponse = { result: result };

        mockGetProbability.mockResolvedValueOnce(mockResponse);

        render(<ProbabilityForm />);
        const input1 = screen.getByLabelText(/Probability 1/i);
        const input2 = screen.getByLabelText(/Probability 2/i);
        const button = screen.getByText(/Calculate/i);

        fireEvent.change(input1, { target: { value: num1.toString() } });
        fireEvent.change(input2, { target: { value: num2.toString() } });
        fireEvent.click(button);

        expect(getProbability).toHaveBeenCalledWith({
            num1: num1,
            num2: num2,
            operation: ProbabilityOperation.CombinedWith,
        });

        const resultDisplay = await screen.findByText(result.toString());
        expect(resultDisplay).toBeInTheDocument();
    });

    it('does not call getProbability API if either probability is invalid', () => {
        const num1 = 1.1;
        const num2 = 0.5;

        render(<ProbabilityForm />);
        const input1 = screen.getByLabelText(/Probability 1/i);
        const input2 = screen.getByLabelText(/Probability 2/i);
        const button = screen.getByText(/Calculate/i);

        fireEvent.change(input1, { target: { value: num1.toString() } });
        fireEvent.change(input2, { target: { value: num2.toString() } });
        fireEvent.click(button);

        expect(getProbability).not.toHaveBeenCalled();
    });

    it('handles API errors gracefully', async () => {
        const num1 = 0.3;
        const num2 = 0.2;

        const mockError = new Error('API call failed');

        mockGetProbability.mockRejectedValueOnce(mockError);

        render(<ProbabilityForm />);
        const input1 = screen.getByLabelText(/Probability 1/i);
        const input2 = screen.getByLabelText(/Probability 2/i);
        const button = screen.getByText(/Calculate/i);

        fireEvent.change(input1, { target: { value: num1.toString() } });
        fireEvent.change(input2, { target: { value: num2.toString() } });
        fireEvent.click(button);

        expect(getProbability).toHaveBeenCalledWith({
            num1: num1,
            num2: num2,
            operation: ProbabilityOperation.CombinedWith,
        });

        await waitFor(() => expect(console.error).toHaveBeenCalled());
    });
});