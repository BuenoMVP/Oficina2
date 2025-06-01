import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Increase timeout for tests
jest.setTimeout(30000);

// Silence console logs during tests unless there's an error
global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: console.error,
}; 