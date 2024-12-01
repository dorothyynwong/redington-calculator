export enum ProbabilityOperation {
    CombinedWith,
    Either
}

export interface ProbabilityRequest {
    num1: number;
    num2: number;
    operation:  ProbabilityOperation;
}

export interface ProbabilityResponse {
    result: number;
}