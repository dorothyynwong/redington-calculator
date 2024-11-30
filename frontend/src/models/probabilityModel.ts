export enum ProbabilityOperation {
    CombinedWith = 'Combined With',
    Either = 'Either',
}
export interface ProbabilityRequest {
    num1: number;
    num2: number;
    operation:  ProbabilityOperation;
}

export interface ProbabilityResponse {
    result: number;
}