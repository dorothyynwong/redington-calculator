export enum ProbabilityOperation {
    CombinedWith = 0,
    Either = 1,
}

export interface ProbabilityRequest {
    num1: number;
    num2: number;
    operation:  ProbabilityOperation;
}

export interface ProbabilityResponse {
    result: number;
}