const CORS_ANYWHERE = 'https://cors-anywhere.herokuapp.com';

async function fetchEmbed(baseURL, resourceURL) {
  const result = await fetch(
    `${CORS_ANYWHERE}/${baseURL}?format=json&url=${encodeURIComponent(resourceURL)}`,
    {
      headers: {
        'X-Requested-With': 'saga-test'
      }
    });
  if (!result.ok) {
    throw new Error(`Server returned ${result.status} (${result.statusText})`);
  }
  return await result.json();
}

export default {
  fetchEmbed
}
