import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      isModbileMenuOpen: false,
      isLoginPageOpen: false,
      isLoggedIn: false,
      authUser: {},
      currentMenuTitle: 'Home',
    };
  },
  mutations: {
    setIsMobileMenuOpen(state, payload) {
      state.isModbileMenuOpen = payload;
    },
    setIsLoginPageOpen(state, payload) {
      state.isLoginPageOpen = payload;
    },
    setIsLoggedIn(state, payload) {
      state.isLoggedIn = payload;
    },
    setAuthUser(state, payload) {
      state.authUser = payload;
    },
    setCurrentMenuTitle(state, payload) {
      state.currentMenuTitle = payload;
    },
  },
});

export default store;
