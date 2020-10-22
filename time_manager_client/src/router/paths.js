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
    // WORKING-TIMES
    // =========================================================================

  {
    path: "/workingTimes/:userId",
    url: "/workingTimes/",
    name: "WorkingTimes",
    view: "WorkingTimes",
    icon: "mdi-briefcase-outline",
    group: "top",
    public: true,
    show: true,
    parameters: ["userId"]
  },

    // =========================================================================
    // WORKING-TIME CREATE
    // =========================================================================

  {
    path: "/workingTime/:userId",
    url: "/workingTime/",
    name: "WorkingTime",
    view: "WorkingTime",
    icon: "mdi-briefcase",
    group: "top",
    public: true,
    show: true,
    parameters: ["userId"]
  },

    // =========================================================================
    // WORKING-TIME UPDATE/DELETE
    // =========================================================================

  {
    path: "/workingTime/:userId/:workingTimeId",
    name: "WT Update",
    view: "WorkingTime",
    icon: "mdi-briefcase",
    group: "top",
    public: true,
    show: false,
    parameters: ["userId", "workingTimeId"]
  },

  // =========================================================================
  // CLOCK MANAGER
  // =========================================================================

  {
    path: "/clock/:userId",
    url: "/clock/",
    name: "Clock Manager",
    view: "ClockManager",
    icon: "mdi-clock",
    group: "top",
    public: true,
    show: true,
    parameters: ["userId"]
  },

  // =========================================================================
  // CHART MANAGER
  // =========================================================================

  {
    path: "/chartManager/:userId",
    url: "/chartManager/",
    name: "ChartManager",
    view: "ChartManager",
    icon: "mdi-chart-bar",
    group: "top",
    public: true,
    show: true,
    parameters: ["userId"]
  }
];
