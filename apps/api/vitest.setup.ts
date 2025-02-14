import { vi } from 'vitest';
import { MongoMemoryServer } from 'mongodb-memory-server';

// Mock MongoDB memory server
let mongod: MongoMemoryServer;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mongod.getUri();
});

afterAll(async () => {
  await mongod.stop();
});

// Mock environment variables
process.env.NODE_ENV = 'test';