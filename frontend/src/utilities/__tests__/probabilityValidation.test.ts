import { describe, it, expect } from 'vitest';
import { isValidProbability } from '../probabilityValidation';

describe('isValidProbability', () => {
    it('should return true for valid probabilities', () => {
        expect(isValidProbability('0')).toBe(true);
        expect(isValidProbability('0.5')).toBe(true);
        expect(isValidProbability('1')).toBe(true);
    });

    it('should return false for invalid probabilities', () => {
        expect(isValidProbability('')).toBe(false);
        expect(isValidProbability('abc')).toBe(false);
        expect(isValidProbability('-0.1')).toBe(false);
        expect(isValidProbability('1.1')).toBe(false);
        expect(isValidProbability('2')).toBe(false);
    });

    it('should return false for non-numeric strings', () => {
        expect(isValidProbability('hello')).toBe(false);
        expect(isValidProbability(' ')).toBe(false);
        expect(isValidProbability('NaN')).toBe(false);
    });
});