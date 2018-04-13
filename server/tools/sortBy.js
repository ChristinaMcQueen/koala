module.exports = field => (prev, curr) => prev[field] - curr[field];
// [].sort(sortBy('data')).reverse();
