// Relative to /src/views

export default [
  // =========================================================================
  // HOME
  // =========================================================================

  {
    path: "/",
    name: "Home",
    view: "WorkingTimes",
    icon: "mdi-home",
    group: "top",
    public: true,
    show: true
  },

  // =========================================================================
  // WORKING-TIMES
  // =========================================================================

  {
    path: "/workingTimes/:userId",
    name: "WorkingTimes",
    view: "WorkingTimes",
    icon: "mdi-home",
    group: "top",
    public: true,
    show: true
  },

  // =========================================================================
  // WORKING-TIME CREATE
  // =========================================================================

  {
    path: "/workingTime/:userId",
    name: "WT Creation",
    view: "WorkingTime",
    icon: "mdi-information",
    group: "top",
    public: true,
    show: true
  },

  // =========================================================================
  // WORKING-TIME UPDATE/DELETE
  // =========================================================================

  {
    path: "/workingTime/:userId/:workingTimeId",
    name: "WT Update",
    view: "WorkingTime",
    icon: "mdi-information",
    group: "top",
    public: true,
    show: true
  },

  // =========================================================================
  // CHART MANAGER
  // =========================================================================

  {
    path: "/chartManager/:userId",
    name: "ChartManager",
    view: "ChartManager",
    icon: "mdi-information",
    group: "top",
    public: true,
    show: true
  },

  {
    path: "/chartManager/",
    name: "ChartManager",
    view: "ChartManager",
    icon: "mdi-information",
    group: "top",
    public: true,
    show: true
  }
];
