export interface ShortenerState {
  createSlug: {
    shortUrl: ShortUrl;
    isSaving: boolean;
    isError: boolean;
    errorMessage: string;
  };
  shortUrl: {
    shortUrl: ShortUrl;
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
  };
}

export interface ShortUrl {
  slug: string;
  url: string;
}

export interface CreateShortUrlError {
  url: string;
}
