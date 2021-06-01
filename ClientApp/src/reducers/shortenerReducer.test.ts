import { ShortUrl } from "../models/shortener";
import { reducer as shortenerReducer, initialState } from "./shortenerReducer";
describe("Shortener Reducer tests", () => {
  describe("Create short URL", () => {
    it("should set REQUEST_CREATE_SHORT_URL state", (done) => {
      const action = { type: "REQUEST_CREATE_SHORT_URL" };

      const newState = shortenerReducer(initialState, action);

      expect(newState.createSlug.isSaving).toBeTruthy();
      expect(newState.createSlug.isError).toBeFalsy();
      expect(newState.createSlug.errorMessage).toBe("");
      expect(JSON.stringify(newState.createSlug.shortUrl)).toBe("{}");

      done();
    });

    it("should set RECEIVE_CREATE_SHORT_URL state - error", (done) => {
      const errorMessage = "Error";
      const action = {
        type: "RECEIVE_CREATE_SHORT_URL",
        isError: true,
        errorMessage,
        shortUrl: {} as ShortUrl,
      };

      const newState = shortenerReducer(initialState, action);

      expect(newState.createSlug.isSaving).toBeFalsy();
      expect(newState.createSlug.isError).toBeTruthy();
      expect(newState.createSlug.errorMessage).toBe(errorMessage);
      expect(JSON.stringify(newState.createSlug.shortUrl)).toBe("{}");

      done();
    });

    it("should set RECEIVE_CREATE_SHORT_URL state", (done) => {
      const slug = "Slug";
      const url = "http://www.test.com";
      const action = {
        type: "RECEIVE_CREATE_SHORT_URL",
        isError: false,
        shortUrl: {
          slug,
          url,
        },
      };

      const newState = shortenerReducer(initialState, action);

      expect(newState.createSlug.isSaving).toBeFalsy();
      expect(newState.createSlug.isError).toBeFalsy();
      expect(newState.createSlug.errorMessage).toBe("");
      expect(newState.createSlug.shortUrl.slug).toBe(slug);
      expect(newState.createSlug.shortUrl.url).toBe(url);

      done();
    });
  });

  describe("Get short URL by slug", () => {
    it("should set REQUEST_GET_URL_BY_SLUG state", (done) => {
      const action = { type: "REQUEST_GET_URL_BY_SLUG" };

      const newState = shortenerReducer(initialState, action);

      expect(newState.shortUrl.isLoading).toBeTruthy();
      expect(newState.shortUrl.isError).toBeFalsy();
      expect(newState.shortUrl.errorMessage).toBe("");
      expect(JSON.stringify(newState.shortUrl.shortUrl)).toBe("{}");

      done();
    });

    it("should set RECEIVE_GET_URL_BY_SLUG_FAILURE state", (done) => {
      const errorMessage = "Error";
      const action = {
        type: "RECEIVE_GET_URL_BY_SLUG_FAILURE",
        errorMessage,
      };

      const newState = shortenerReducer(initialState, action);

      expect(newState.shortUrl.isLoading).toBeFalsy();
      expect(newState.shortUrl.isError).toBeTruthy();
      expect(newState.shortUrl.errorMessage).toBe(errorMessage);
      expect(JSON.stringify(newState.shortUrl.shortUrl)).toBe("{}");

      done();
    });

    it("should set RECEIVE_GET_URL_BY_SLUG_SUCCESS state", (done) => {
      const slug = "Slug";
      const url = "http://www.test.com";
      const action = {
        type: "RECEIVE_GET_URL_BY_SLUG_SUCCESS",
        isError: false,
        shortUrl: {
          slug,
          url,
        },
      };

      const newState = shortenerReducer(initialState, action);

      expect(newState.shortUrl.isLoading).toBeFalsy();
      expect(newState.shortUrl.isError).toBeFalsy();
      expect(newState.shortUrl.errorMessage).toBe("");
      expect(newState.shortUrl.shortUrl.slug).toBe(slug);
      expect(newState.shortUrl.shortUrl.url).toBe(url);

      done();
    });
  });
});
