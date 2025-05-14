const colors = require('colors');
const barplot = require('ascii-histogram');

function parseContributions(list, days) {
    const result = [];
    const croppedList = list.slice(list.length - days);

    croppedList.forEach(item => {
        result[item.date] = item.count;
    });

    return barplot(result);
}

function parseRange(range) {
    if (!range.start) {
        return '';
    }
    return `(${range.start} - ${range.end})`;
}

function parseCurrentStreak(streak) {
    return [
        '- Current streak',
        (!streak.unmeasurable)
            ? colors.cyan(`${streak.days} days ${parseRange(streak)}`)
            : '<unmeasurable>'
    ];
}

function parseLongestStreak(streak) {
    return [
        '- Longest streak',
        (!streak.unmeasurable)
            ? colors.magenta(`${streak.days} days ${parseRange(streak)}`)
            : '<unmeasurable>'
    ];
}

function parseSummary(summary) {
    return [
        [
            '- Busiest day',
            summary.busiestDay
                ? colors.red(`${summary.busiestDay.count} contributions (${summary.busiestDay.date})`)
                : 'unknown'
        ],
        [
            '- Total contributions',
            summary.total
                ? colors.yellow(`${summary.total} contributions`)
                : 'unknown'
        ]
    ];
}

module.exports = {
    parseContributions,
    parseCurrentStreak,
    parseLongestStreak,
    parseSummary
};
