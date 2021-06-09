import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../models/applicationState";
import { actionCreators } from "../actions/shortener/shortenerActionCreators";
import { ShortenerState } from "../models/shortener";
import { LinearProgress, makeStyles } from "@material-ui/core";

const styles = {
  container: {
    position: "fixed",
    top: "50%",
    left: "50%",
    maxWidth: "50%",
    transform: "translate(-50%, -50%)",
  },
};
const useStyles = makeStyles(styles as any);

type RedirectToPageProps = ShortenerState &
  typeof actionCreators &
  RouteComponentProps<{ slug: string }>;

export const RedirectToPage = (props: RedirectToPageProps) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { shortUrl, errorMessage } = useSelector(
    (state: ApplicationState) => state.shortener.shortUrl
  );

  useEffect(() => {
    dispatch(actionCreators.getUrlFromSlug(props.match.params.slug));
  }, []);

  useEffect(() => {
    if (shortUrl.url) {
      const redirectUrl =
        shortUrl.url.startsWith("http://") ||
        shortUrl.url.startsWith("https://")
          ? shortUrl.url
          : `http://${shortUrl.url}`;
      window.location.replace(redirectUrl);
    }
  }, [shortUrl]);

  const redirectToSlug = () => {
    dispatch(actionCreators.getUrlFromSlug(props.match.params.slug));
  };

  return (
    <div className={classes.container}>
      {errorMessage === "" ? (
        <>
          <img src="loading.png" />
          <LinearProgress color="secondary" />
        </>
      ) : (
        <div>{errorMessage}</div>
      )}
    </div>
  );
};
