/* eslint-disable no-magic-numbers */
const {
    parseContributions,
    parseCurrentStreak,
    parseLongestStreak,
    parseSummary
} = require('./parsers');

describe('parsers', () => {
    describe('parseContributions', () => {
        test('should return histogram string from contributions', () => {
            const contributions = [
                { date: '2026-01-01', count: 5 },
                { date: '2026-01-02', count: 10 },
                { date: '2026-01-03', count: 3 }
            ];
            const result = parseContributions(contributions, 3);
            expect(typeof result).toBe('string');
            expect(result.length).toBeGreaterThan(0);
        });

        test('should crop list to specified number of days', () => {
            const contributions = [
                { date: '2026-01-01', count: 5 },
                { date: '2026-01-02', count: 10 },
                { date: '2026-01-03', count: 3 },
                { date: '2026-01-04', count: 7 }
            ];
            const result = parseContributions(contributions, 2);
            expect(typeof result).toBe('string');
            // Should only show last 2 days
            expect(result.includes('2026-01-03')).toBe(true);
            expect(result.includes('2026-01-04')).toBe(true);
        });

        test('should handle empty contributions', () => {
            const result = parseContributions([], 5);
            expect(typeof result).toBe('string');
        });
    });

    describe('parseCurrentStreak', () => {
        test('should format measurable streak', () => {
            const streak = {
                days: 10,
                start: '2026-01-01',
                end: '2026-01-10',
                unmeasurable: false
            };
            const result = parseCurrentStreak(streak);
            expect(Array.isArray(result)).toBe(true);
            expect(result[0]).toBe('- Current streak');
            expect(result[1]).toContain('10 days');
            expect(result[1]).toContain('2026-01-01');
            expect(result[1]).toContain('2026-01-10');
        });

        test('should handle unmeasurable streak', () => {
            const streak = {
                unmeasurable: true
            };
            const result = parseCurrentStreak(streak);
            expect(Array.isArray(result)).toBe(true);
            expect(result[0]).toBe('- Current streak');
            expect(result[1]).toBe('<unmeasurable>');
        });

        test('should handle streak without start date', () => {
            const streak = {
                days: 0,
                unmeasurable: false
            };
            const result = parseCurrentStreak(streak);
            expect(Array.isArray(result)).toBe(true);
            expect(result[1]).toContain('0 days');
        });
    });

    describe('parseLongestStreak', () => {
        test('should format measurable streak', () => {
            const streak = {
                days: 20,
                start: '2025-12-01',
                end: '2025-12-20',
                unmeasurable: false
            };
            const result = parseLongestStreak(streak);
            expect(Array.isArray(result)).toBe(true);
            expect(result[0]).toBe('- Longest streak');
            expect(result[1]).toContain('20 days');
            expect(result[1]).toContain('2025-12-01');
            expect(result[1]).toContain('2025-12-20');
        });

        test('should handle unmeasurable streak', () => {
            const streak = {
                unmeasurable: true
            };
            const result = parseLongestStreak(streak);
            expect(Array.isArray(result)).toBe(true);
            expect(result[0]).toBe('- Longest streak');
            expect(result[1]).toBe('<unmeasurable>');
        });
    });

    describe('parseSummary', () => {
        test('should format complete summary', () => {
            const summary = {
                busiestDay: {
                    date: '2026-01-05',
                    count: 15
                },
                total: 100
            };
            const result = parseSummary(summary);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(2);
            expect(result[0][0]).toBe('- Busiest day');
            expect(result[0][1]).toContain('15 contributions');
            expect(result[0][1]).toContain('2026-01-05');
            expect(result[1][0]).toBe('- Total contributions');
            expect(result[1][1]).toContain('100 contributions');
        });

        test('should handle summary without busiest day', () => {
            const summary = {
                total: 50
            };
            const result = parseSummary(summary);
            expect(Array.isArray(result)).toBe(true);
            expect(result[0][1]).toBe('unknown');
            expect(result[1][1]).toContain('50 contributions');
        });

        test('should handle summary without total', () => {
            const summary = {
                busiestDay: {
                    date: '2026-01-05',
                    count: 15
                }
            };
            const result = parseSummary(summary);
            expect(Array.isArray(result)).toBe(true);
            expect(result[1][1]).toBe('unknown');
        });

        test('should handle empty summary', () => {
            const summary = {};
            const result = parseSummary(summary);
            expect(Array.isArray(result)).toBe(true);
            expect(result[0][1]).toBe('unknown');
            expect(result[1][1]).toBe('unknown');
        });
    });
});
