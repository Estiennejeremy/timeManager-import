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
        icon: "mdi-home",
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
        name: "WT Creation",
        view: "WorkingTimeCreate",
        icon: "mdi-information",
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
        view: "WorkingTimeUpdate",
        icon: "mdi-information",
        group: "top",
        public: true,
        show: true,
        parameters: ["userId", "workingTimeId"]
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
        show: true,
        parameters: ["userId"]
    },

    {
        path: "/chartManager/",
        name: "ChartManager",
        view: "ChartManager",
        icon: "mdi-information",
        group: "top",
        public: true,
        show: true,
        parameters: []
    }
];