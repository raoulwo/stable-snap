import type { SearchResponse, SearchResult } from './types';

const SEARCH_API_INVOKE_URL = 'https://a7bcbzq751.execute-api.eu-central-1.amazonaws.com';
// const UPLOAD_API_INVOKE_URL = 'https://3v58kycltg.execute-api.eu-central-1.amazonaws.com';

export async function searchInitialImages(): Promise<{
  imageResults: SearchResult[];
  imageTags: Set<string>;
}> {
  const url = `${SEARCH_API_INVOKE_URL}/search`;

  const response = await fetch(url, {
    method: 'GET',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error (${response.status}): ${errorText}`);
  }
  const imageResults: SearchResult[] = (await response.json())
    .map((image: SearchResponse) => ({
      imageId: image.image_id,
      timestamp: new Date(image.timestamp),
      url: image.url,
      tags: image.tags,
    }));

  const imageTags = imageResults
    .map(imageResult => imageResult.tags)
    .reduce((accumulatedTags, currentTags) => {
      currentTags.forEach(tag => accumulatedTags.add(tag));
      return accumulatedTags;
    }, new Set<string>());

  return {
    imageResults,
    imageTags,
  };
}