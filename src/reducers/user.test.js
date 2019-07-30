import userReducer from "./user";

describe("user reducer", () => {
  test("it should return initial state", () => {
    expect(userReducer(undefined, { type: "initial" })).toEqual({
      plants: [],
      isLoading: false,
      errorMessage: null
    });
  });

  test("it should handle dispatch FETCHING_USERS_PLANTS_START", () => {
    expect(
      userReducer(undefined, { type: "FETCHING_USERS_PLANTS_START" })
    ).toEqual({
      plants: [],
      isLoading: true,
      errorMessage: null
    });
  });
});
