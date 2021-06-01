import { Action, Reducer } from "redux";
import { ShortenerState, ShortUrl } from "../models/shortener";
import { KnownAction } from "../actions/shortener/shortenerActions";

export const initialState: ShortenerState = {
  createSlug: {
    isSaving: false,
    isError: false,
    errorMessage: "",
    shortUrl: {} as ShortUrl,
  },
  shortUrl: {
    isLoading: false,
    isError: false,
    errorMessage: "",
    shortUrl: {} as ShortUrl,
  },
};

export const reducer: Reducer<ShortenerState> = (
  state: ShortenerState | undefined,
  incomingAction: Action
): ShortenerState => {
  if (state === undefined) {
    return initialState;
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "REQUEST_CREATE_SHORT_URL":
      return {
        ...state,
        createSlug: {
          ...state.createSlug,
          isSaving: true,
          isError: false,
          errorMessage: "",
        },
      };
    case "RECEIVE_CREATE_SHORT_URL":
      return {
        ...state,
        createSlug: {
          ...state.createSlug,
          isSaving: false,
          isError: action.isError,
          errorMessage: action.errorMessage || "",
          shortUrl: action.shortUrl,
        },
      };

    case "REQUEST_GET_URL_BY_SLUG":
      return {
        ...state,
        shortUrl: {
          ...state.shortUrl,
          shortUrl: {} as ShortUrl,
          isLoading: true,
          isError: false,
          errorMessage: "",
        },
      };
    case "RECEIVE_GET_URL_BY_SLUG_SUCCESS":
      return {
        ...state,
        shortUrl: {
          ...state.shortUrl,
          shortUrl: action.shortUrl,
          isLoading: false,
          isError: false,
          errorMessage: "",
        },
      };
    case "RECEIVE_GET_URL_BY_SLUG_FAILURE":
      return {
        ...state,
        shortUrl: {
          ...state.shortUrl,
          shortUrl: {} as ShortUrl,
          isLoading: false,
          isError: true,
          errorMessage: action.errorMessage,
        },
      };
    default:
      return state;
  }
};
