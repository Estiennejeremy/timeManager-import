// Relative to /src/views

export default [
  // =========================================================================
  // HOME
  // =========================================================================

  {
    path: "/",
    name: "Home",
    view: "Home",
    icon: "mdi-home",
    group: "top",
    public: true,
    show: true,
    parameters: []
  },

  // =========================================================================
  // DASHBOARD
  // =========================================================================

  {
    path: "/dashboard",
    name: "Dashboard",
    view: "Dashboard",
    icon: "mdi-monitor-dashboard",
    group: "top",
    public: true,
    show: true,
    parameters: []
  },

  // =========================================================================
  // PROFILE
  // =========================================================================

  {
    path: "/profile",
    name: "Profile",
    view: "Profile",
    icon: "mdi-account-circle",
    group: "top",
    public: true,
    show: true,
    parameters: []
  },

  // =========================================================================
  // SETTINGS
  // =========================================================================

  {
    path: "/settings",
    name: "Settings",
    view: "Settings",
    icon: "mdi-settings",
    group: "top",
    public: true,
    show: true,
    parameters: []
  }
];
