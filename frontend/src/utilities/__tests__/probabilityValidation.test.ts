import { describe, it, expect } from 'vitest';
import { isValidProbability } from '../probabilityValidation';

describe('isValidProbability', () => {
    it('should return true for valid probabilities', () => {
        expect(isValidProbability('0')).toBe(true);
        expect(isValidProbability('0.5')).toBe(true);
        expect(isValidProbability('1')).toBe(true);
    });

    it('should return false for probabilities < 0 or > 1', () => {
        expect(isValidProbability('-0.001')).toBe(false);
        expect(isValidProbability('1.001')).toBe(false);
        expect(isValidProbability('2')).toBe(false);
    });

    it('should return false for non-numeric strings', () => {
        expect(isValidProbability('hello')).toBe(false);
        expect(isValidProbability(' ')).toBe(false);
        expect(isValidProbability('NaN')).toBe(false);
    });
});