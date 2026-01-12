const fetchPackageMetadata = require('./pkg');
const fs = require('fs');
const path = require('path');

describe('pkg', () => {
    test('should be a function', () => {
        expect(typeof fetchPackageMetadata).toBe('function');
    });

    test('should return package.json data', async () => {
        const pkg = await fetchPackageMetadata();
        expect(pkg).toBeDefined();
        expect(pkg.name).toBe('github-contribution-stats-cli');
        expect(typeof pkg.version).toBe('string');
        expect(pkg.description).toBeDefined();
    });

    test('should return object with required fields', async () => {
        const pkg = await fetchPackageMetadata();
        expect(pkg).toHaveProperty('name');
        expect(pkg).toHaveProperty('version');
        expect(pkg).toHaveProperty('description');
        expect(pkg).toHaveProperty('scripts');
    });

    test('should parse JSON correctly', async () => {
        const pkg = await fetchPackageMetadata();
        expect(typeof pkg).toBe('object');
        expect(Array.isArray(pkg)).toBe(false);
    });
});
