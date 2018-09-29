async function fetchEmbed(baseURL, resourceURL) {
  const result = await fetch(`${baseURL}?format=json&url=${encodeURIComponent(resourceURL)}`);
  if (!result.ok) {
    throw new Error(`Server returned ${result.status} (${result.statusText})`);
  }
  return await result.json();
}

export default {
  fetchEmbed
}
