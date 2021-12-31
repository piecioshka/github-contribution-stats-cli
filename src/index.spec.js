const { assert } = require('chai');
const fetcher = require('.');

const isObject = (o) => typeof o === 'object' && o !== null;

suite('index', () => {
    test('to be function', () => {
        assert.equal(typeof fetcher, 'function');
    });

    test('should returns a promise', () => {
        const fakeInput = {};
        assert.ok(fetcher(fakeInput) instanceof Promise);
    });

    test('should returns real data', async () => {
        const data = await fetcher({ login: 'piecioshka'});
        assert.ok(Array.isArray(data.contributions));
        assert.ok(isObject(data.currentStreak));
        assert.ok(isObject(data.longestStreak));
        assert.ok(isObject(data.summary));
    });
});
