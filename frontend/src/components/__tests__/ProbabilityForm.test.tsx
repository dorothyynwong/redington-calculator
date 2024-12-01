import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
        vi.restoreAllMocks(); 
    });

    it('renders the form with initial values', () => {
        render(<ProbabilityForm />);
        expect(screen.getByLabelText(/Probability 1/i)).toHaveValue(0);
        expect(screen.getByLabelText(/Probability 2/i)).toHaveValue(0);
        expect(screen.getByText(/Calculate/i)).toBeInTheDocument();
    });

    it('validates Probability 1 with value > 1', () => {
        const num1 = 1.1;
        const num2 = 0.5;

        render(<ProbabilityForm />);
        const input1 = screen.getByLabelText(/Probability 1/i);
        const input2 = screen.getByLabelText(/Probability 2/i);

        fireEvent.change(input1, { target: { value: num1.toString() } });
        fireEvent.change(input2, { target: { value: num2.toString() } });

        expect(screen.getByText(/Value must be between 0 and 1/i)).toBeInTheDocument();
    });

    it('validates Probability 1 with value < 0', () => {
        const num1 = -0.1;
        const num2 = 0.5;

        render(<ProbabilityForm />);
        const input1 = screen.getByLabelText(/Probability 1/i);
        const input2 = screen.getByLabelText(/Probability 2/i);

        fireEvent.change(input1, { target: { value: num1.toString() } });
        fireEvent.change(input2, { target: { value: num2.toString() } });

        expect(screen.getByText(/Value must be between 0 and 1/i)).toBeInTheDocument();
    });

    it('validates Probability 2 with value > 1', () => {
        const num1 = 0.5;
        const num2 = 1.1;

        render(<ProbabilityForm />);
        const input1 = screen.getByLabelText(/Probability 1/i);
        const input2 = screen.getByLabelText(/Probability 2/i);

        fireEvent.change(input1, { target: { value: num1.toString() } });
        fireEvent.change(input2, { target: { value: num2.toString() } });

        expect(screen.getByText(/Value must be between 0 and 1/i)).toBeInTheDocument();
    });

    it('validates Probability 2 with value < 0', () => {
        const num1 = 0.5;
        const num2 = -0.1;

        render(<ProbabilityForm />);
        const input1 = screen.getByLabelText(/Probability 1/i);
        const input2 = screen.getByLabelText(/Probability 2/i);

        fireEvent.change(input1, { target: { value: num1.toString() } });
        fireEvent.change(input2, { target: { value: num2.toString() } });

        expect(screen.getByText(/Value must be between 0 and 1/i)).toBeInTheDocument();
    });

    it('calls getProbability API on form submit with valid inputs', async () => {
        const num1 = 0.3;
        const num2 = 0.2;
        const result = 0.06;

        const mockResponse = { result: result}; 

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