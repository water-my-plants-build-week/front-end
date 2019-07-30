import authorizationReducer, { login, registration } from "./authorization";

describe("registration", () => {
  test("it should return the initialState", () => {
    expect(registration(undefined, { type: "initial" })).toEqual({
      isLoading: false,
      errorMessage: null
    });
  });

  test("it should handle REGISTER_START", () => {
    expect(registration(undefined, { type: "REGISTER_START" })).toEqual({
      isLoading: true,
      errorMessage: null
    });
  });

  test("it should handle REGISTER_SUCCESS", () => {
    expect(registration(undefined, { type: "REGISTER_SUCCESS" })).toEqual({
      isLoading: false,
      errorMessage: null
    });
  });
  test("it should handle REGISTER_FAILURE", () => {
    expect(
      registration(undefined, {
        type: "REGISTER_FAILURE",
        payload: { message: "Some error has occurred" }
      })
    ).toEqual({
      isLoading: false,
      errorMessage: "Some error has occurred"
    });
  });
});

describe("login", () => {
  const initialState = {
    isLoading: false,
    errorMessage: null
  };

  test("it should return the initialState", () => {
    expect(login(undefined, { type: "initial" })).toEqual(initialState);
  });

  test("it should handle LOGIN_START", () => {
    expect(login(undefined, { type: "LOGIN_START" })).toEqual({
      isLoading: true,
      errorMessage: null
    });
  });

  test("it should handle LOGIN_SUCCESS", () => {
    expect(
      login(undefined, {
        type: "LOGIN_SUCCESS",
        payload: {
          token: "sometoken",
          user: {
            id: 8,
            username: "matthagner",
            password: "asupersecretpassword",
            timezone: "Minneapolis",
            phoneNumber: "1234567890"
          }
        }
      })
    ).toEqual({
      isLoading: false,
      errorMessage: null
    });
  });

  test("it should handle LOGIN_FAILURE", () => {
    expect(
      login(undefined, {
        type: "LOGIN_FAILURE",
        payload: { message: "Some login error occurred" }
      })
    ).toEqual({
      isLoading: false,
      errorMessage: "Some login error occurred"
    });
  });
});

describe("authorizationReducer", () => {
  test("it should return initialState", () => {
    expect(authorizationReducer(undefined, { type: "initialState" })).toEqual({
      registration: {
        isLoading: false,
        errorMessage: null
      },
      login: {
        isLoading: false,
        errorMessage: null
      }
    });
  });
  test("it should handle REGISTER_START", () => {
    expect(authorizationReducer(undefined, { type: "REGISTER_START" })).toEqual(
      {
        registration: {
          isLoading: true,
          errorMessage: null
        },
        login: {
          isLoading: false,
          errorMessage: null
        }
      }
    );
  });

  test("it should handle REGISTER_SUCCESS", () => {
    expect(
      authorizationReducer(undefined, { type: "REGISTER_SUCCESS" })
    ).toEqual({
      registration: {
        isLoading: false,
        errorMessage: null
      },
      login: {
        isLoading: false,
        errorMessage: null
      }
    });
  });

  test("it should handle REGISTER_FAILURE", () => {
    expect(
      authorizationReducer(undefined, {
        type: "REGISTER_FAILURE",
        payload: { message: "Some error has occurred" }
      })
    ).toEqual({
      registration: {
        isLoading: false,
        errorMessage: "Some error has occurred"
      },
      login: {
        isLoading: false,
        errorMessage: null
      }
    });
  });

  test("it should handle LOGIN_START", () => {
    expect(authorizationReducer(undefined, { type: "LOGIN_START" })).toEqual({
      login: {
        isLoading: true,
        errorMessage: null
      },
      registration: {
        isLoading: false,
        errorMessage: null
      }
    });
  });

  test("it should handle LOGIN_SUCCESS", () => {
    expect(
      authorizationReducer(undefined, {
        type: "LOGIN_SUCCESS",
        payload: {
          token: "sometoken",
          user: {
            id: 8,
            username: "matthagner",
            password: "asupersecretpassword",
            timezone: "Minneapolis",
            phoneNumber: "1234567890"
          }
        }
      })
    ).toEqual({
      login: {
        isLoading: false,
        errorMessage: null
      },
      registration: {
        isLoading: false,
        errorMessage: null
      }
    });
  });

  test("it should handle LOGIN_FAILURE", () => {
    expect(
      authorizationReducer(undefined, {
        type: "LOGIN_FAILURE",
        payload: { message: "Some login error occurred" }
      })
    ).toEqual({
      login: {
        isLoading: false,
        errorMessage: "Some login error occurred"
      },
      registration: {
        isLoading: false,
        errorMessage: null
      }
    });
  });
});
