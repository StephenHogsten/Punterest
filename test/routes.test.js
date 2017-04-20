import request from 'request';

describe('server api', () => {
  it('returns a test', async() => {
    await expect(request('/api/test'))
  });
});