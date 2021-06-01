import { AppThunkAction } from "../../store";
import { KnownAction } from "./shortenerActions";
import * as apiService from "../../apiService";
import { ShortUrl } from "../../models/shortener";

export const actionCreators = {
  createShortUrl:
    (postData: ShortUrl): AppThunkAction<KnownAction> =>
    (dispatch, getState) => {
      dispatch({ type: "REQUEST_CREATE_SHORT_URL" });
      apiService.postRequest(`/urlshortener`, postData).then((data) => {
        if (data.shortUrl) {
          dispatch({
            type: "RECEIVE_CREATE_SHORT_URL",
            isError: false,
            errorMessage: "",
            shortUrl: data.shortUrl,
          });
        } else {
          dispatch({
            type: "RECEIVE_CREATE_SHORT_URL",
            isError: true,
            errorMessage: data.message,
            shortUrl: {} as ShortUrl,
          });
        }
      });
    },
  getUrlFromSlug:
    (slug: string): AppThunkAction<KnownAction> =>
    (dispatch, getState) => {
      dispatch({ type: "REQUEST_GET_URL_BY_SLUG" });

      apiService.getRequest(`/urlshortener/${slug}`).then((data) => {
        if (data.shortUrl) {
          dispatch({
            type: "RECEIVE_GET_URL_BY_SLUG_SUCCESS",
            shortUrl: data.shortUrl,
          });
        } else {
          dispatch({
            type: "RECEIVE_GET_URL_BY_SLUG_FAILURE",
            errorMessage: data.message,
          });
        }
      });
    },
};
