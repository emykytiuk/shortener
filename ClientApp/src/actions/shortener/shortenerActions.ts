import { Action } from "redux";
import { ShortUrl } from "../../models/shortener";

export type KnownAction =
  | RequestCreateShortUrlAction
  | ReceiveCreateShortUrlAction
  | RequestGetUrlBySlugAction
  | ReceiveGetUrlBySlugSuccessAction
  | ReceiveGetUrlBySlugFailureAction;

interface RequestCreateShortUrlAction extends Action {
  type: "REQUEST_CREATE_SHORT_URL";
}

interface ReceiveCreateShortUrlAction extends Action {
  type: "RECEIVE_CREATE_SHORT_URL";
  isError: boolean;
  errorMessage: string;
  shortUrl: ShortUrl;
}

interface RequestGetUrlBySlugAction extends Action {
  type: "REQUEST_GET_URL_BY_SLUG";
}

interface ReceiveGetUrlBySlugSuccessAction extends Action {
  type: "RECEIVE_GET_URL_BY_SLUG_SUCCESS";
  shortUrl: ShortUrl;
}

interface ReceiveGetUrlBySlugFailureAction extends Action {
  type: "RECEIVE_GET_URL_BY_SLUG_FAILURE";
  errorMessage: string;
}
