import type { SearchResponse, SearchResult, UploadUrlResult } from './types';

const SEARCH_API_INVOKE_URL = 'https://a7bcbzq751.execute-api.eu-central-1.amazonaws.com';
const UPLOAD_API_INVOKE_URL = 'https://3v58kycltg.execute-api.eu-central-1.amazonaws.com';

export async function searchInitialImages(): Promise<{
  imageResults: SearchResult[];
  imageTags: Set<string>;
}> {
  const imageResults = await fetchImages();

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

export async function searchImages(query: string): Promise<{
  imageResults: SearchResult[];
}> {
  const imageResults = await fetchImages(query);

  return {
    imageResults,
  };
}

export async function uploadImage(file: File): Promise<void> {
  const uploadUrlResult = await fetchImageUploadUrl();
  await fetch(uploadUrlResult.upload_url, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
    },
    body: file
  });
}

async function fetchImages(query?: string): Promise<SearchResult[]> {
  const url = new URL('/search', SEARCH_API_INVOKE_URL);
  if (query) {
    url.searchParams.append('q', query);
  }

  const response = await fetch(url, {
    method: 'GET',
  });

  const json = await handleResponse<SearchResponse[]>(response);
  return json.map((image: SearchResponse) => ({
    imageId: image.image_id,
    timestamp: new Date(image.timestamp),
    url: image.url,
    tags: image.tags,
  }));
}

async function fetchImageUploadUrl(): Promise<UploadUrlResult> {
  const url = `${UPLOAD_API_INVOKE_URL}/upload-url`;

  const response = await fetch(url, {
    method: 'POST',
  });

  return handleResponse<UploadUrlResult>(response);
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error (${response.status}): ${errorText}`);
  }
  return response.json();
}