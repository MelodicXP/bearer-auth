'use strict';

const { app } = require('../../../../src/server.js');
const { sequelizeDatabase, userModel } = require('../../../../src/auth/models/index.js');
const supertest = require('supertest');
const request = supertest(app);

let testWriter;

// Pre-load database with fake users
beforeAll(async () => {
  await sequelizeDatabase.sync({force: true});
  // Create test user with writer role
  testWriter = await userModel.create({
    username: 'writer',
    password: 'pass123',
    role: 'writer',
  });
});

afterAll(async () => {
  await sequelizeDatabase.close();
});

describe('ACL Integration', () => {
  it('allows read access', async () => {
    // set('Authorization', `Bearer ${testWriter.token}`) is used to send a header
    let response = await request.get('/read').set('Authorization', `Bearer ${testWriter.token}`);

    console.log('--------------------------------- from read', testWriter);

    expect(response.status).toEqual(200);
    expect(response.text).toEqual('You have read permission');
  });

  it('allows create access', async () => {
    // set('Authorization', `Bearer ${testWriter.token}`) is used to set and send header
    let response = await request.post('/create').set('Authorization', `Bearer ${testWriter.token}`);

    expect(response.status).toEqual(200);
    expect(response.text).toEqual('You have create permission');
  });

  it('does NOT allow update access', async () => {
    // set('Authorization', `Bearer ${testWriter.token}`) is used to set and send header
    let response = await request.put('/update').set('Authorization', `Bearer ${testWriter.token}`);

    expect(response.status).toEqual(500);
    expect(response.body.error).toEqual('Access Denied');
  });

  it('does NOT allow delete access', async () => {
    // set('Authorization', `Bearer ${testWriter.token}`) is used to set and send header
    let response = await request.delete('/delete').set('Authorization', `Bearer ${testWriter.token}`);

    expect(response.status).toEqual(500);
    expect(response.body.error).toEqual('Access Denied');
  });
});