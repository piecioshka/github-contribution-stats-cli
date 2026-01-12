const fetcher = require('.');

jest.mock('github-contribution-stats', () => ({
    fetchStats: jest.fn()
}));

const { fetchStats } = require('github-contribution-stats');

function isObject(o) {
    return typeof o === 'object' && o !== null;
}

describe('index', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('to be function', () => {
        expect(typeof fetcher).toBe('function');
    });

    test('should returns a promise', () => {
        fetchStats.mockResolvedValue({
            contributions: [],
            currentStreak: {},
            longestStreak: {},
            summary: {}
        });
        const fakeInput = {};
        expect(fetcher(fakeInput)).toBeInstanceOf(Promise);
    });

    test('should returns mocked data', async () => {
        const mockData = {
            contributions: [{ date: '2026-01-01', count: 5 }],
            currentStreak: { days: 10, start: '2026-01-01', end: '2026-01-10' },
            longestStreak: { days: 20, start: '2025-12-01', end: '2025-12-20' },
            summary: { total: 100, busiestDay: { date: '2026-01-05', count: 15 } }
        };

        fetchStats.mockResolvedValue(mockData);

        const data = await fetcher({ login: 'piecioshka' });
        expect(Array.isArray(data.contributions)).toBe(true);
        expect(isObject(data.currentStreak)).toBe(true);
        expect(isObject(data.longestStreak)).toBe(true);
        expect(isObject(data.summary)).toBe(true);
        expect(fetchStats).toHaveBeenCalledWith('piecioshka');
    });
});
