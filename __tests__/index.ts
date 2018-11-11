import request from 'supertest';

import app from '../src/app';

describe('API Endpoint', () => {
  test('Provides a default /api/ endpoint', () => {
    return request(app)
      .get('/api/')
      .expect(200);
  });
});
