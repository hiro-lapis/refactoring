const { TestScheduler } = require('jest');
const staement = require('./statement');

test('caluclate perfonance credits', () => {
    expect(statement()).toBe(10);
});
