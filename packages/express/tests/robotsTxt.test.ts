
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { fetchRobotsTxt } from '../src/controllers/robotsTxtController';


describe('GET /fetch-robots-txt', () => {
    let mockAxios: any;

    beforeEach(() => {
        mockAxios = new MockAdapter(axios);
    });

    afterEach(() => {
        mockAxios.reset();
    });


    it('Service Should be able to fetch a robots.txt', async () => {

        const req = { query: { url: 'https://example.com' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        mockAxios.onGet('https://example.com/robots.txt').reply(200, 'Mocked robots.txt content');


        await fetchRobotsTxt(req, res);

        expect(res.send).toHaveBeenCalledWith('"Mocked robots.txt content"');
        expect(res.status).not.toHaveBeenCalledWith(400);
        expect(res.status).not.toHaveBeenCalledWith(500);

    });

    it('should handle missing url parameter', async () => {
        const req = { query: {} };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        await fetchRobotsTxt(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.status).not.toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Missing url parameter');
    });

    it('should handle error fetching robots.txt', async () => {
        const req = { query: { url: 'https://example.com' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        mockAxios.onGet('https://example.com/robots.txt').reply(500, 'Internal Server Error');

        await fetchRobotsTxt(req, res);

        expect(res.status).not.toHaveBeenCalledWith(400);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Error fetching robots.txt');
    });


});
