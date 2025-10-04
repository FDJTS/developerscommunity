import { generateToken, verifyToken } from '../utils/jwt';

describe('JWT Utils', () => {
  const testUserId = 'test-user-id';
  
  beforeAll(() => {
    process.env.JWT_SECRET = 'test-secret';
  });

  test('should generate a valid token', () => {
    const token = generateToken(testUserId);
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
  });

  test('should verify a valid token', () => {
    const token = generateToken(testUserId);
    const decoded = verifyToken(token);
    expect(decoded).toBeDefined();
    expect(decoded.userId).toBe(testUserId);
  });

  test('should throw error for invalid token', () => {
    expect(() => {
      verifyToken('invalid-token');
    }).toThrow();
  });
});

describe('Slug Utils', () => {
  const { generateSlug } = require('../utils/slug');

  test('should generate slug from text', () => {
    expect(generateSlug('Hello World')).toBe('hello-world');
    expect(generateSlug('TypeScript Tutorial 2024')).toBe('typescript-tutorial-2024');
    expect(generateSlug('React & Node.js')).toBe('react-node-js');
  });

  test('should handle special characters', () => {
    expect(generateSlug('Test @ 123 # Demo')).toBe('test-123-demo');
    expect(generateSlug('---test---')).toBe('test');
  });

  test('should handle empty string', () => {
    expect(generateSlug('')).toBe('');
  });
});
