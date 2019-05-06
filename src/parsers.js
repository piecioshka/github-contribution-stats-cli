const colors = require('colors');
const barplot = require('ascii-histogram');

function parseContributions(list, days) {
    const result = [];
    const croppedList = list.slice(list.length - days);

    croppedList.forEach((item) => {
        result[item.date] = item.count;
    });

    const options = {};

    return barplot(result, options);
}

function parseRange(range) {
    if (!range.start) {
        return '';
    }
    return `(${range.start} - ${range.end})`;
}

function parseCurrentStreak(streak) {
    return [
        '  * Current streak',
        (!streak.unmeasurable)
            ? colors.cyan(`${streak.days} days ${parseRange(streak)}`)
            : ''
    ];
}

function parseLongestStreak(streak) {
    return [
        '  * Longest streak',
        (!streak.unmeasurable)
            ? colors.magenta(`${streak.days} days ${parseRange(streak)}`)
            : ''
    ];
}

function parseSummary(summary) {
    return [
        [
            '  * Busiest day',
            summary.busiestDay
                ? colors.red(`${summary.busiestDay.count} contributions (${summary.busiestDay.date})`)
                : '-'
        ],
        [
            '  * Total contributions',
            colors.green(`${summary.total} contributions`)
        ]
    ];
}

module.exports = {
    parseContributions,
    parseCurrentStreak,
    parseLongestStreak,
    parseSummary
};
