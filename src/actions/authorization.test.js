import mockAxios from "axios";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { BASE_URL } from "../actions";
import { registerUser, login } from "./authorization";
import rootReducer from "../reducers";

const mockStore = configureStore([thunk]);

afterEach(() => {
  jest.resetAllMocks();
});

describe("registerUser", () => {
  test("it should successfully register a user", async () => {
    const store = mockStore(rootReducer);

    const input = {
      username: "mrcarrot",
      password: "password",
      phoneNumber: "9999999999",
      useTwilio: true
    };

    const expectedPayload = {
      data: {
        id: 9,
        username: "mrcarrot",
        password: "password",
        phoneNumber: "9999999999",
        avatar_id: null,
        useTwilio: true,
        timezone: "America/Minneapolis",
        plants: []
      }
    };

    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve(expectedPayload)
    );

    await store.dispatch(registerUser(input));

    const actions = store.getActions();
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith(
      `${BASE_URL}/auth/register`,
      input
    );
    expect(actions[0]).toEqual({ type: "REGISTER_START" });
    expect(actions[1]).toEqual({ type: "REGISTER_SUCCESS" });
  });

  test("it should throw an error when a user does not pass a password, or username", async () => {
    // Right now with the server implementation we HAVE to pass in a password or
    // we'll get a 500 error.
    const input = {
      password: "super_secret"
    };

    const expectedOutput = {
      username: undefined,
      password: input.password,
      phoneNumber: undefined,
      timezone: undefined,
      useTwilio: true
    };

    const store = mockStore(rootReducer);

    mockAxios.post.mockImplementationOnce(() =>
      Promise.reject({
        data: {
          message: "Please provide a username and a password",
          status: 400,
          statusText: "Bad Request"
        }
      })
    );

    try {
      await store.dispatch(registerUser(input));
    } catch (e) {
      expect(e.message).toEqual("Please provide a username and a password");
    }

    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith(
      `${BASE_URL}/auth/register`,
      expectedOutput
    );

    const actions = store.getActions();

    expect(actions[0]).toEqual({ type: "REGISTER_START" });
    expect(actions[1]).toEqual({
      type: "REGISTER_FAILURE",
      payload: { message: "Please provide a username and a password" }
    });
  });

  test("it should throw an error when user tries to register a taken username", async () => {
    const input = {
      username: "some_unique_username",
      password: "apassword"
    };

    const store = mockStore(rootReducer);

    const expectedOutput = {
      username: input.username,
      password: input.password,
      phoneNumber: undefined,
      timezone: undefined,
      useTwilio: true
    };

    mockAxios.post.mockImplementationOnce(() =>
      Promise.reject({
        response: {
          status: 500,
          statusText: "Internal Server Error",
          data: {
            errno: 19,
            code: "SQLITE_CONSTRAINT"
          }
        }
      })
    );

    try {
      await store.dispatch(registerUser(input));
    } catch (e) {
      expect(e.message).toEqual("Username is already taken");
    }

    const [loading, error] = store.getActions();

    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith(
      `${BASE_URL}/auth/register`,
      expectedOutput
    );
    expect(loading).toEqual({ type: "REGISTER_START" });
    expect(error).toEqual({
      type: "REGISTER_FAILURE",
      payload: { message: "Username is already taken" }
    });
  });
});

describe("login", () => {
  test("it should kick off with a loading state", async () => {
    const store = mockStore(rootReducer);

    const input = {
      username: "matthagner",
      password: "supersecretpassword"
    };

    const token = "atoken";
    const user = {
      id: 1,
      username: "matthagner",
      password: "scrambledpassword",
      phoneNumber: "1234567890",
      avatar_id: null,
      useTwilio: true,
      timezone: "America/Minneapolis"
    };

    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          user,
          token
        }
      })
    );

    await store.dispatch(login(input.username, input.password));

    const [loading] = store.getActions();

    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith(
      `${BASE_URL}/auth/login`,
      input
    );

    expect(loading).toEqual({ type: "LOGIN_START" });
  });

  test("it should successfully log in a user", async () => {
    const store = mockStore(rootReducer);

    const input = {
      username: "matthagner",
      password: "supersecretpassword"
    };

    const token = "atoken";
    const user = {
      id: 1,
      username: "matthagner",
      password: "scrambledpassword",
      phoneNumber: "1234567890",
      avatar_id: null,
      useTwilio: true,
      timezone: "America/Minneapolis"
    };

    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          token,
          user
        }
      })
    );

    await store.dispatch(login(input.username, input.password));

    const actions = store.getActions();
    const [, success] = actions;

    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith(
      `${BASE_URL}/auth/login`,
      input
    );
    expect(actions.length).toEqual(2);
    expect(success).toEqual({
      type: "LOGIN_SUCCESS",
      payload: {
        token,
        user
      }
    });
  });

  describe("it should provide a meaningful error message", () => {
    test("it should throw a 400 when a username and/or password are not provided", async () => {
      const store = mockStore(rootReducer);

      mockAxios.post.mockImplementationOnce(() =>
        Promise.reject({
          response: {
            status: 400
          }
        })
      );

      try {
        await store.dispatch(login());
      } catch (e) {
        expect(e.message).toMatch("Please provide a username and a password");
      }

      const actions = store.getActions();
      expect(actions.length).toEqual(2);

      expect(mockAxios.post).toHaveBeenCalledTimes(1);
      expect(mockAxios.post).toHaveBeenCalledWith(`${BASE_URL}/auth/login`, {
        username: undefined,
        password: undefined
      });

      expect(actions[1]).toEqual({
        type: "LOGIN_FAILURE",
        payload: {
          message: "Please provide a username and a password",
          status: 400
        }
      });
    });

    test("it should throw a 401 when the credentials are invalid", async () => {
      const store = mockStore(rootReducer);

      const input = {
        username: "matthagner",
        password: "abadpassword"
      };

      mockAxios.post.mockImplementationOnce(() =>
        Promise.reject({
          response: {
            status: 401
          }
        })
      );

      try {
        await store.dispatch(login(input.username, input.password));
      } catch (e) {
        expect(e.message).toEqual("Invalid credentials");
      }

      expect(mockAxios.post).toHaveBeenCalledTimes(1);
      expect(mockAxios.post).toHaveBeenCalledWith(
        `${BASE_URL}/auth/login`,
        input
      );

      const actions = store.getActions();
      const [, failure] = actions;

      expect(actions.length).toEqual(2);
      expect(failure).toEqual({
        type: "LOGIN_FAILURE",
        payload: {
          message: "Invalid credentials",
          status: 401
        }
      });
    });

    test("it should report an internal server error", async () => {
      const store = mockStore(rootReducer);

      const input = {
        username: "matthagner",
        password: "apassword"
      };

      mockAxios.post.mockImplementationOnce(() =>
        Promise.reject({
          response: {
            status: 500
          }
        })
      );

      try {
        await store.dispatch(login(input.username, input.password));
      } catch (e) {
        expect(e.message).toEqual("Something went wrong. Try again");
      }

      expect(mockAxios.post).toHaveBeenCalledWith(
        `${BASE_URL}/auth/login`,
        input
      );

      const [, failure] = store.getActions();

      expect(failure).toEqual({
        type: "LOGIN_FAILURE",
        payload: {
          message: "Something went wrong. Try again",
          status: 500
        }
      });
    });
  });
});
