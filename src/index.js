const { fetchStats } = require('github-contribution-stats');

module.exports = ({ login }) => fetchStats(login);
