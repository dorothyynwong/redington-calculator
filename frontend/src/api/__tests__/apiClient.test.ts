import { describe, it, expect} from 'vitest';
import { client } from '../apiClient';

describe('Axios Client Configuration', () => {
  it('should create an axios instance with correct base URL and timeout', () => {
    const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
    const timeout = Number(import.meta.env.VITE_APP_BACKEND_TIMEOUT);

    expect(backendUrl).toBeDefined();
    expect(timeout).toBeDefined();
    expect(client.defaults.baseURL).toBe(backendUrl);
    expect(client.defaults.timeout).toBe(timeout);
  });
});