import { AxiosResponse } from 'axios';
import { ProbabilityRequest, ProbabilityResponse } from '../models/probabilityModel';
import { client } from './apiClient';

export async function getProbability(data: ProbabilityRequest): Promise<ProbabilityResponse> {
    console.log(data.operation)
    try {
        const response: AxiosResponse<ProbabilityResponse> = await client.post('probabilities', data);
        return response.data; 
    } catch (error) {
        console.error(error);
        throw error;
    }
}
