import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { ApplicationState } from "../models/applicationState";
import { actionCreators } from "../actions/shortener/shortenerActionCreators";
import {
  CreateShortUrlError,
  ShortenerState,
  ShortUrl,
} from "../models/shortener";
import {
  makeStyles,
  Grid,
  Button,
  TextField,
  Card,
  FormControl,
} from "@material-ui/core";

const styles = {
  card: {
    margin: "15px",
  },
  marginTop: {
    marginTop: "15px",
  },
  marginBottom: {
    marginBottom: "15px",
  },
  justifyCenter: {
    display: "flex",
    justifyContent: "center",
  },
  formControl: {
    width: "50%",
  },
  button: {
    backgroundColor: "#E27D60",
    color: "white",
    "&:hover": {
      backgroundColor: "#E8A87C",
    },
  },
  required: {
    color: "#E27D60",
  },
};
const useStyles = makeStyles(styles);

const urlRegex = new RegExp(
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
);

type CreateShortUrlPageProps = ShortenerState &
  typeof actionCreators &
  RouteComponentProps<{ slug: string }>;

export const CreateShortUrlPage = (props: CreateShortUrlPageProps) => {
  const [errors, setErrors] = useState({} as CreateShortUrlError);
  const [givenUrl, setGivenUrl] = useState("");
  const [givenSlug, setGivenSlug] = useState("");

  const classes = useStyles();
  const dispatch = useDispatch();
  const { isSaving, isError, shortUrl, errorMessage } = useSelector(
    (state: ApplicationState) => state.shortener.createSlug
  );

  const validateForm = () => {
    const tempErrors = {} as CreateShortUrlError;
    if (!givenUrl) {
      tempErrors.url = "Please enter a URL";
    }
    if (givenUrl && !urlRegex.test(givenUrl)) {
      tempErrors.url = "Please enter a valid URL format";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setErrors({} as CreateShortUrlError);
      dispatch(
        actionCreators.createShortUrl({
          url: givenUrl,
          slug: givenSlug,
        } as ShortUrl)
      );
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      autoComplete="off"
    >
      <Card className={classes.card}>
        <Grid
          container
          justify="center"
          spacing={2}
          className={classes.marginTop}
        >
          <Grid item xs={12} className={classes.justifyCenter}>
            <div className={classes.formControl}>
              Welcome to the URL Shortener. To begin, please enter a URL you'd
              like shortened as well as an optional slug if you want to
              customize your shortened url
            </div>
          </Grid>
          <Grid item xs={12} className={classes.justifyCenter}>
            <FormControl className={classes.formControl}>
              <TextField
                error={!!errors.url}
                id="full-url"
                label={
                  <span>
                    Full URL <span className={classes.required}>*</span>
                  </span>
                }
                variant="outlined"
                helperText={!!errors.url ? errors.url : ""}
                onChange={(e) => setGivenUrl(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} className={classes.justifyCenter}>
            <FormControl className={classes.formControl}>
              <TextField
                id="slug"
                label="Slug"
                variant="outlined"
                onChange={(e) => setGivenSlug(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} className={classes.justifyCenter}>
            <Button
              className={`${classes.button} ${classes.marginBottom}`}
              type="submit"
              disabled={isSaving}
            >
              Shorten URL
            </Button>
          </Grid>
          {shortUrl && shortUrl.slug && (
            <Grid
              item
              xs={12}
              className={`${classes.justifyCenter} ${classes.marginBottom}`}
            >
              <div className={classes.formControl}>
                URL was successfully shortened try it out:{" "}
                <a
                  href={`/${shortUrl.slug}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {window.location.origin}/{shortUrl.slug}
                </a>{" "}
                (Link will open in a new tab)
              </div>
            </Grid>
          )}
          {isError && (
            <Grid
              item
              xs={12}
              className={`${classes.justifyCenter} ${classes.marginBottom}`}
            >
              <div className={classes.formControl}>
                There was an unfortunate error: {errorMessage}
              </div>
            </Grid>
          )}
        </Grid>
      </Card>
    </form>
  );
};
