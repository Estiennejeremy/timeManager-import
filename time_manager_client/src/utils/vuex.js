export const set = property => (state, payload) => (state[property] = payload);

export const execute = property => (state, payload) => {
  state[property] = payload;
  if (state[property] !== null) {
    state["isUserLoggedIn"] = true;
  } else {
    state["isUserLoggedIn"] = false;
  }
};

export const toggle = property => state => (state[property] = !state[property]);
