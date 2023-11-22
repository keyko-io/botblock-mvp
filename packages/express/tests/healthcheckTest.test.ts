import request from 'supertest';
import app from '../src/app';

describe('GET /health', () => {
    it('Service Should be healthy', async () => {
        const response = await request(app).get('/health');
        expect(response.status).toBe(200);
    });
});
