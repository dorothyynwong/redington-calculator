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
        render(<ProbabilityForm 
            selectedOperation={ProbabilityOperation.CombinedWith} 
            onOperationChange={vi.fn()} 
            onResultCalculated={vi.fn()} 
        />);
    });

    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    it('renders the form with initial values', () => {
        expect(screen.getByLabelText(/Probability 1/i)).toHaveValue(0);
        expect(screen.getByLabelText(/Probability 2/i)).toHaveValue(0);
        expect(screen.getByText(/Calculate/i)).toBeInTheDocument();
    });

    it('calls getProbability API on form submit with valid inputs', async () => {
        const num1 = 0.3;
        const num2 = 0.2;
        const result = 0.06;

        const mockResponse = { result: result };

        mockGetProbability.mockResolvedValueOnce(mockResponse);

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
    });

    it('does not call getProbability API if either probability is invalid', () => {
        const num1 = 1.1;
        const num2 = 0.5;

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

    it('displays loading indicator when form is submitted', async () => {
        const num1 = 0.3;
        const num2 = 0.2;
        const result = 0.06;
    
        const mockResponse = { result: result };
    
        mockGetProbability.mockResolvedValueOnce(mockResponse);
    
        const input1 = screen.getByLabelText(/Probability 1/i);
        const input2 = screen.getByLabelText(/Probability 2/i);
        const button = screen.getByText(/Calculate/i);
    
        fireEvent.change(input1, { target: { value: num1.toString() } });
        fireEvent.change(input2, { target: { value: num2.toString() } });
        fireEvent.click(button);
    
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    
        await waitFor(() => expect(screen.queryByRole('progressbar')).not.toBeInTheDocument());
    });
    
    it('disables the submit button while loading', async () => {
        const num1 = 0.3;
        const num2 = 0.2;
        const result = 0.06;
    
        const mockResponse = { result: result };
    
        mockGetProbability.mockResolvedValueOnce(mockResponse);
    
        const input1 = screen.getByLabelText(/Probability 1/i);
        const input2 = screen.getByLabelText(/Probability 2/i);
        const button = screen.getByText(/Calculate/i);
    
        fireEvent.change(input1, { target: { value: num1.toString() } });
        fireEvent.change(input2, { target: { value: num2.toString() } });
        fireEvent.click(button);
    
        expect(button).toBeDisabled();
    
        await waitFor(() => expect(button).not.toBeDisabled());
    });

    it('displays an error message when the API call fails', async () => {
        const num1 = 0.3;
        const num2 = 0.2;
        const mockError = new Error('API call failed');
        const expectedMessage = /An error occurred while calculating the probability./i;

        mockGetProbability.mockRejectedValueOnce(mockError);

        const input1 = screen.getByLabelText(/Probability 1/i);
        const input2 = screen.getByLabelText(/Probability 2/i);
        const button = screen.getByText(/Calculate/i);

        fireEvent.change(input1, { target: { value: num1.toString() } });
        fireEvent.change(input2, { target: { value: num2.toString() } });
        fireEvent.click(button);

        await waitFor(() => expect(screen.getByText(expectedMessage)).toBeInTheDocument());
    });
});
