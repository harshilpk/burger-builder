import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/"
    });
  });

  it("should store the token upon login", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: "/"
        },
        { type: actionTypes.AUTH_SUCCESS, idToken: "dsdsdsd", userId: "sdsdsd" }
      )
    ).toEqual({
      token: "dsdsdsd",
      userId: "sdsdsd",
      error: null,
      loading: false,
      authRedirectPath: "/"
    });
  });
});
