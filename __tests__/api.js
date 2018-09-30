import fetchMock from 'jest-fetch-mock';

import api from '../src/api';


describe('fetchEmbed', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    global.fetch = fetchMock;
  });

  it('returns JSON decoded response on success', async () => {
    fetchMock.mockResponse(JSON.stringify({
      html: '<some>html</some>'
    }));

    const result = await api.fetchEmbed('https://base/url', 'https://resource/url');

    expect(result).toEqual({
      html: '<some>html</some>'
    });

    expect(fetchMock).toHaveBeenCalledWith(
      'https://cors-anywhere.herokuapp.com/https://base/url?format=json' +
      '&url=https%3A%2F%2Fresource%2Furl',
      {
        headers: {
          'X-Requested-With': 'saga-test'
        }
      });
  });

  it('throws error on error status', async () => {
    fetchMock.mockResponse('error', {status: 400});

    await expect(api.fetchEmbed('https://base/url', 'https://resource/url'))
      .rejects.toThrow('Server returned 400 (Bad Request)');
  });
});
