import Api from "@/services/Api";

export default {
    createTeam(team) {
        return Api().post("/teams", { team: team });
    },

    updateTeam(id, team) {
        return Api().put(`/teams/${id}`, { team: team });
    },

    deleteTeam(id) {
        return Api().delete(`/teams/${id}`);
    },

    getTeam(team_id) {
        return Api().get(`/teams/${team_id}`);
    },

    getTeams() {
        return Api().get(`/teams`);
    },

    addEmployee(team_id, user_id) {
        return Api().post(`/Usersteams`, { user_team: { team_id, user_id } });
    },

};