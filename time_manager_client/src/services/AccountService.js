import Api from "@/services/Api";
import WorkingTimesService from "@/services/WorkingTimesService";
import ClockService from "@/services/ClockService";

export default {
    createUser(user) {
        return Api().post("/registration", { user: user });
    },

    updateUser(user, id) {
        return Api().put(`/users/${id}`, { user: user });
    },

    getUser(id) {
        return Api().get(`/users/${id}`);
    },

    getUsers() {
        return Api().get("/users");
    },

    deleteUser(id) {
        return Api().delete(`/users/${id}`);
    },
    getUserInfos(userId) {
        return Promise.all([
            WorkingTimesService.getWorkingTimesUser(userId),
            ClockService.getClockUser(userId)
        ]).then(res => {
            //////////// DAILY /////////////
            let dailyWorkingtimes = this.getDailyWorkingtimes(
                res[0].data.workingtimes
            );

            let dailyClocks = this.getDailyClocks(res[1].data.data);

            let isInWorkingtime = this.getIsInWorkingtime(dailyWorkingtimes);

            let currentWorkingTime = this.getCurrentWorkingtime(dailyWorkingtimes);

            //////////// WEEKLY /////////////
            let weeklyWorkingtimes = this.getWeeklyWorkingtimes(
                res[0].data.workingtimes
            );

            let weeklyClocks = this.getWeeklyClocks(res[1].data.data);
            this.weeklyClocks = weeklyClocks;

            let sortyWorkingtimeByWeekDay = this.sortWorkingtimesByWeekDays(
                weeklyWorkingtimes
            );

            let sortClockByWeekDay = this.sortClocksByWeekDays(weeklyClocks);

            //////////// MONTHLY /////////////
            let monthlyWorkingtimes = this.getMonthlyWorkingtimes(
                res[0].data.workingtimes
            );

            let monthlyClocks = this.getMonthlyClocks(res[1].data.data);

            let sortyWorkingtimeByMonthDay = this.sortWorkingtimesByMonthDays(
                monthlyWorkingtimes
            );

            let sortClockByMonthDay = this.sortClocksByMonthDays(monthlyClocks);

            return Promise.resolve({
                dailyWorkingtimes,
                dailyClocks,
                isInWorkingtime,
                currentWorkingTime,
                weeklyWorkingtimes,
                weeklyClocks,
                sortyWorkingtimeByWeekDay,
                sortClockByWeekDay,
                monthlyWorkingtimes,
                monthlyClocks,
                sortyWorkingtimeByMonthDay,
                sortClockByMonthDay
            });
        });
    },
    getMonthlyWorkingtimes(workingTimes) {
        return workingTimes.filter(workingTime => {
            let current = new Date();
            let start = new Date(workingTime.start);
            return (
                start.getMonth() == current.getMonth() &&
                start.getFullYear() == current.getFullYear()
            );
        });
    },
    getMonthlyClocks(clocks) {
        return clocks.filter(clock => {
            let current = new Date();
            let time = new Date(clock.start);
            return (
                time.getMonth() == current.getMonth() &&
                time.getFullYear() == current.getFullYear()
            );
        });
    },
    sortWorkingtimesByMonthDays(monthlyWorkingtimes) {
        let monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        return monthlyWorkingtimes.reduce(
            (sort, workingtime) => {
                switch (monthNames[new Date(workingtime.start).getMonth()]) {
                    case "January":
                        sort[0].push(workingtime);
                        break;
                    case "February":
                        sort[1].push(workingtime);
                        break;
                    case "March":
                        sort[2].push(workingtime);
                        break;
                    case "April":
                        sort[3].push(workingtime);
                        break;
                    case "May":
                        sort[4].push(workingtime);
                        break;
                    case "June":
                        sort[5].push(workingtime);
                        break;
                    case "July":
                        sort[6].push(workingtime);
                        break;
                    case "August":
                        sort[7].push(workingtime);
                        break;
                    case "September":
                        sort[8].push(workingtime);
                        break;
                    case "October":
                        sort[9].push(workingtime);
                        break;
                    case "November":
                        sort[10].push(workingtime);
                        break;
                    case "December":
                        sort[11].push(workingtime);
                        break;
                }
                return sort;
            }, [
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                []
            ]
        );
    },
    sortClocksByMonthDays(monthClocks) {
        let monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        return monthClocks.reduce(
            (sort, clock) => {
                switch (monthNames[new Date(clock.start).getMonth()]) {
                    case "January":
                        sort[0].push(clock);
                        break;
                    case "February":
                        sort[1].push(clock);
                        break;
                    case "March":
                        sort[2].push(clock);
                        break;
                    case "April":
                        sort[3].push(clock);
                        break;
                    case "May":
                        sort[4].push(clock);
                        break;
                    case "June":
                        sort[5].push(clock);
                        break;
                    case "July":
                        sort[6].push(clock);
                        break;
                    case "August":
                        sort[7].push(clock);
                        break;
                    case "September":
                        sort[8].push(clock);
                        break;
                    case "October":
                        sort[9].push(clock);
                        break;
                    case "November":
                        sort[10].push(clock);
                        break;
                    case "December":
                        sort[11].push(clock);
                        break;
                }
                return sort;
            }, [
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                []
            ]
        );
    },
    getWeekNumber(d) {
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
        return weekNo;
    },
    getDailyWorkingtimes(workingtimes) {
        return workingtimes.filter(workingTime => {
            let current = new Date();
            let start = new Date(workingTime.start);
            let end = new Date(workingTime.end);
            return (
                start.toLocaleDateString() == current.toLocaleDateString() &&
                end.toLocaleDateString() == current.toLocaleDateString()
            );
        });
    },
    getDailyClocks(clocks) {
        return clocks.filter(clock => {
            let current = new Date();
            let time = new Date(clock.start);
            return time.toLocaleDateString() == current.toLocaleDateString();
        });
    },
    getIsInWorkingtime(dailyWorkingtimes) {
        return dailyWorkingtimes.some(
            workingtime =>
            new Date() > new Date(workingtime.start) &&
            new Date() < new Date(workingtime.end)
        );
    },
    getCurrentWorkingtime(dailyWorkingtimes) {
        return dailyWorkingtimes.find(
            workingtime =>
            new Date() > new Date(workingtime.start) &&
            new Date() < new Date(workingtime.end)
        );
    },
    getWeeklyWorkingtimes(workingTimes) {
        return workingTimes.filter(workingTime => {
            let current = new Date();
            let start = new Date(workingTime.start);
            let end = new Date(workingTime.end);
            return (
                this.getWeekNumber(start) == this.getWeekNumber(current) &&
                this.getWeekNumber(end) == this.getWeekNumber(current)
            );
        });
    },
    getWeeklyClocks(clocks) {
        return clocks.filter(clock => {
            let current = new Date();
            let time = new Date(clock.start);
            return this.getWeekNumber(time) == this.getWeekNumber(current);
        });
    },
    sortWorkingtimesByWeekDays(weeklyWorkingtimes) {
        return weeklyWorkingtimes.reduce(
            (sort, workingtime) => {
                switch (
                    new Date(workingtime.start).toLocaleString("default", {
                        weekday: "long"
                    })
                ) {
                    case "Monday":
                        sort[0].push(workingtime);
                        break;
                    case "Tuesday":
                        sort[1].push(workingtime);
                        break;
                    case "Wednesday":
                        sort[2].push(workingtime);
                        break;
                    case "Thursday":
                        sort[3].push(workingtime);
                        break;
                    case "Friday":
                        sort[4].push(workingtime);
                        break;
                    case "Saturday":
                        sort[5].push(workingtime);
                        break;
                    case "Sunday":
                        sort[6].push(workingtime);
                        break;
                }
                return sort;
            }, [
                [],
                [],
                [],
                [],
                [],
                [],
                []
            ]
        );
    },
    sortClocksByWeekDays(weeklyClocks) {
        return weeklyClocks.reduce(
            (sort, clock) => {
                switch (
                    new Date(clock.start).toLocaleString("default", {
                        weekday: "long"
                    })
                ) {
                    case "Monday":
                        sort[0].push(clock);
                        break;
                    case "Tuesday":
                        sort[1].push(clock);
                        break;
                    case "Wednesday":
                        sort[2].push(clock);
                        break;
                    case "Thursday":
                        sort[3].push(clock);
                        break;
                    case "Friday":
                        sort[4].push(clock);
                        break;
                    case "Saturday":
                        sort[5].push(clock);
                        break;
                    case "Sunday":
                        sort[6].push(clock);
                        break;
                }
                return sort;
            }, [
                [],
                [],
                [],
                [],
                [],
                [],
                []
            ]
        );
    }
};