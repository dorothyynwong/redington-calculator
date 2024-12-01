import { describe, it, expect, vi, Mock, beforeEach } from 'vitest';
import { getProbability } from '../probabilityAPI';
import { client } from '../apiClient';
import { ProbabilityOperation, ProbabilityRequest, ProbabilityResponse } from '../../models/probabilityModel';

vi.mock('../apiClient', () => ({
    client: {
        post: vi.fn()
    }
}));

describe('getProbability', () => {
    let mockData: ProbabilityRequest;
    const mockPost = client.post as Mock<typeof client.post>;

    beforeEach(() => {
        mockData = { num1: 0.5, num2: 0.5, operation: ProbabilityOperation.CombinedWith };
    });

    it('should return data when API call is successful', async () => {
        const mockResponse: ProbabilityResponse = { result: 0.25 };

        mockPost.mockResolvedValue({ data: mockResponse });

        const result = await getProbability(mockData);

        expect(result).toEqual(mockResponse);
        expect(client.post).toHaveBeenCalledWith('probabilities', mockData);
    });

    it('should throw an error when API call fails', async () => {
        const mockError = new Error('API call failed');

        mockPost.mockRejectedValue(mockError);

        await expect(getProbability(mockData)).rejects.toThrow('API call failed');
        expect(client.post).toHaveBeenCalledWith('probabilities', mockData);
    });
});