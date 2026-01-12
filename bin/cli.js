#!/usr/bin/env node

const minimist = require('minimist');
const colors = require('colors');
const Turtler = require('turtler');

const fetcher = require('../src/index');
const fetchPackageMetadata = require('../src/pkg');
const {
    parseContributions,
    parseCurrentStreak,
    parseLongestStreak,
    parseSummary
} = require('../src/parsers');

const DEFAULT_DAYS = 20;
const argv = minimist(process.argv.slice(2), {
    alias: {
        d: 'days'
    }
});

const login = String(argv._[0] || '');
const days = Number(argv.days) || DEFAULT_DAYS;

function showHelp() {
    console.log('Usage: github-contribution-stats <login> [-d days]');
    console.log('');
    console.log('Options:');
    console.log(`  -d, --days    Set number of days (counting for today) which are displayed in barplot (default: ${DEFAULT_DAYS})`);
}

async function getStats() {
    try {
        return await fetcher({ login });
    } catch (err) {
        console.debug(err);
        return {
            contributions: [],
            currentStreak: {
                unmeasurable: true
            },
            longestStreak: {
                unmeasurable: true
            },
            summary: {}
        };
    }
}

(async () => {
    if (!login) {
        showHelp();
        return;
    }

    try {
        const pkg = await fetchPackageMetadata();
        console.log(`GitHub contributions statistics: ${colors.bold(colors.blue(login))}`);
        console.log(colors.gray(`Version: ${pkg.version}\n`));

        const stats = await getStats();

        const contr = parseContributions(stats.contributions, days);
        console.log(contr);

        const items = [
            parseCurrentStreak(stats.currentStreak),
            parseLongestStreak(stats.longestStreak),
            ...parseSummary(stats.summary)
        ];

        const options = { hasHeader: false };
        const table = new Turtler(items, options);
        console.log(table.ascii());
    } catch (err) {
        console.error(err.message);
    }
})();
