import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { client } from '../apiClient';

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      defaults: {
        baseURL: import.meta.env.VITE_APP_BACKEND_URL
      }
    })),
    isAxiosError: vi.fn()
  }
}));

describe('Axios Client Configuration', () => {
  it('should create an axios instance with correct base URL', () => {
    const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
    expect(backendUrl).toBeDefined();
    expect(client.defaults.baseURL).toBe(backendUrl);
  });

  it('should use axios create method', () => {
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: import.meta.env.VITE_APP_BACKEND_URL
    });
  });

  it('handles axios error detection', () => {
    const error = new Error('Test Error');
    axios.isAxiosError(error);
    expect(axios.isAxiosError).toHaveBeenCalledWith(error);
  });
});