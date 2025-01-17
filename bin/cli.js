#!/usr/bin/env node

const yargs = require('yargs');
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
const argv = yargs
    .usage('Usage: $0 <login> [-d days]')
    .option('days', {
        alias: 'd',
        describe: `Set number of days (counting for today) which are displayed in barplot (default: ${DEFAULT_DAYS})`
    })
    .argv;

const login = String(argv._);
const days = Number(argv.days) || DEFAULT_DAYS;

(async () => {
    if (!login) {
        yargs.showHelp();
        return;
    }

    try {
        const pkg = await fetchPackageMetadata();
        console.log(`  GitHub contributions statistics: ${colors.bold(colors.blue(login))}`);
        console.log(colors.gray(`  Version: ${pkg.version}\n`));

        const stats = await fetcher({ login });

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
