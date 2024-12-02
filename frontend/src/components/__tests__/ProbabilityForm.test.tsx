import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, Mock, beforeEach, afterEach } from 'vitest';
import ProbabilityForm from '../ProbabilityForm';
import { getProbability } from '../../api/probabilityAPI';
import { ProbabilityOperation } from '../../models/probabilityModel';

vi.mock('../../api/probabilityAPI', () => ({
    getProbability: vi.fn()
}));

vi.mock('../utilities/probabilityValidation', () => ({
    isValidProbability: (value: string) => mockIsValidProbability(value),
}));

const mockIsValidProbability = vi.fn((value: string) => !isNaN(parseFloat(value)) && parseFloat(value) >= 0 && parseFloat(value) <= 1);

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
        mockIsValidProbability.mockReturnValue(true);

        const button = screen.getByText(/Calculate/i);
        fireEvent.click(button);

        expect(getProbability).toHaveBeenCalled();
    });

    it('does not call getProbability API if either probability is invalid', () => {
        mockIsValidProbability.mockReturnValue(false);

        const input1 = screen.getByLabelText(/Probability 1/i);
        const input2 = screen.getByLabelText(/Probability 2/i);
    
        fireEvent.change(input1, { target: { value: "invalid" } });
        fireEvent.change(input2, { target: { value: "invalid" } });

        const button = screen.getByText(/Calculate/i);
        fireEvent.click(button);

        expect(getProbability).not.toHaveBeenCalled();
    });

    it('displays loading indicator when form is submitted', async () => {
        mockIsValidProbability.mockReturnValue(true);

        const button = screen.getByText(/Calculate/i);
        fireEvent.click(button);
    
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
        await waitFor(() => expect(screen.queryByRole('progressbar')).not.toBeInTheDocument());
    });
    
    it('disables the submit button while loading', async () => {
        mockIsValidProbability.mockReturnValue(true);

        const button = screen.getByText(/Calculate/i);
        fireEvent.click(button);
    
        expect(button).toBeDisabled();

        await waitFor(() => expect(button).not.toBeDisabled());
    });

    it('displays an error message when the API call fails', async () => {
        const mockError = new Error('API call failed');
        const expectedMessage = /An error occurred while calculating the probability./i;

        mockIsValidProbability.mockReturnValue(true);
        mockGetProbability.mockRejectedValueOnce(mockError);

        const button = screen.getByText(/Calculate/i);
        fireEvent.click(button);

        await waitFor(() => expect(screen.getByText(expectedMessage)).toBeInTheDocument());
    });
});
