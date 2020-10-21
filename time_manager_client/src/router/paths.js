// Relative to /src/views

export default [
  // =========================================================================
  // HOMEPAGE
  // =========================================================================

  {
    path: "/",
    name: "Home",
    view: "Home",
    icon: "mdi-home",
    group: "top",
    public: true,
    show: true
  },

  // =========================================================================
  // ABOUT PAGE
  // =========================================================================

  {
    path: "/about",
    name: "About",
    view: "About",
    icon: "mdi-information",
    group: "top",
    public: true,
    show: true
  },

  // =========================================================================
  // LOGIN
  // =========================================================================

  {
    path: "/login",
    name: "Login",
    view: "Login",
    icon: "mdi-account-circle",
    group: "bottom",
    public: true,
    show: true
  },

  // =========================================================================
  // REGISTER
  // =========================================================================

  {
    path: "/register",
    name: "Register",
    view: "Register",
    icon: "mdi-account-plus",
    group: "bottom",
    public: true,
    show: true
  },

  // =========================================================================
  // USER PROFILE
  // =========================================================================

  {
    path: "/account",
    name: "My account",
    view: "Account",
    icon: "mdi-account",
    group: "top",
    public: false,
    show: true
  },

  // =========================================================================
  // SETTINGS OF THE APPLICATION
  // =========================================================================

  {
    path: "/settings",
    name: "Settings",
    view: "Settings",
    icon: "mdi-settings",
    group: "top",
    public: true,
    show: true
  }
];
