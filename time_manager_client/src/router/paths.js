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
    parameters: [],
    role: ["default"]
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
    public: false,
    show: true,
    parameters: [],
    role: ["manager", "generalManager"]
  },

  // =========================================================================
  // TEAM
  // =========================================================================

  {
    path: "/team/:name",
    name: "Team",
    view: "Team",
    icon: "mdi-monitor-dashboard",
    group: "top",
    public: false,
    show: false,
    parameters: ["name"],
    role: ["manager", "generalManager"]
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
    public: false,
    show: true,
    parameters: [],
    role: ["employee", "manager", "generalManager"]
  },

  // =========================================================================
  // CLOCKIN
  // =========================================================================

  {
    path: "/clockin",
    name: "Clock'in",
    view: "Clockin",
    icon: "mdi-clock",
    group: "top",
    public: false,
    show: true,
    parameters: [],
    role: ["employee", "manager", "generalManager"]
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
    show: true,
    parameters: [],
    role: ["default"]
  },

  // =========================================================================
  // ABOUT
  // =========================================================================

  {
    path: "/about",
    name: "About",
    view: "About",
    icon: "mdi-information",
    group: "top",
    public: true,
    show: true,
    parameters: [],
    role: ["default"]
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
    parameters: [],
    role: ["default"]
  }
];
