export enum ProbabilityOperation {
    CombinedWith =  "CombinedWith",
    Either = "Either",
}

export interface ProbabilityRequest {
    num1: number;
    num2: number;
    operation:  ProbabilityOperation;
}

export interface ProbabilityResponse {
    calculatedValue: number;
}