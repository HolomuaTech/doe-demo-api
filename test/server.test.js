const { describe, it, before, after } = require('node:test');
const assert = require('node:assert');
const request = require('supertest');
const { app, server } = require('../server.js');

describe('Server End-to-End Test', () => {
  let agent;

  before(async () => {
    const port = server.address().port;
    console.log(`Test server running on port ${port}`);
    agent = request.agent(app);
  });

  it('should respond with correct message on GET /message', async () => {
    const response = await agent
      .get('/message')
      .expect('Content-Type', /json/)
      .expect(200);

    assert.deepStrictEqual(response.body, { message: 'Welcome User' });
  });

  it('should respond with correct message on POST /submit', async () => {
    const response = await agent
      .post('/submit')
      .send({ name: 'John Doe' })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);

    assert.deepStrictEqual(response.body, { message: 'Hi, John Doe! Nice to meet you!' });
  });

  after(async () => {
    await new Promise((resolve) => server.close(resolve));
    console.log('Test server closed');
  });
});
