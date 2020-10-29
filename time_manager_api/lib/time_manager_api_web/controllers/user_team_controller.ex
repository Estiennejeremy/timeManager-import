defmodule TimeManagerApiWeb.UserTeamController do
  use TimeManagerApiWeb, :controller

  alias TimeManagerApi.UsersTeams
  alias TimeManagerApi.UsersTeams.UserTeam

  action_fallback TimeManagerApiWeb.FallbackController

  def index(conn, _params) do
    user_team = UsersTeams.list_user_team()
    render(conn, "index.json", user_team: user_team)
  end

  def create(conn, %{"user_team" => user_team_params}) do
    user = TimeManagerApi.Users.get_user!(user_team_params["user_id"])
    team = TimeManagerApi.Teams.get_team!(user_team_params["team_id"])

    with {:ok, %UserTeam{} = user_team} <- UsersTeams.create_user_team(user, team) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.user_team_path(conn, :show, user_team))
      |> render("create.json", user_team: user_team)
    end
  end

  def getUserByTeam(conn, %{"teamID" => id_team}) do
    user_team = UsersTeams.getUserByTeam!(id_team)
    render(conn, "index.json", user_team: user_team)
  end

  def getTeamsByUser(conn, %{"userID" => id_user}) do
    user_team = UsersTeams.getTeamsByUser!(id_user)
    render(conn, "index.json", user_team: user_team)
  end

  def getUserTeam(conn, %{"userID" => id_user, "teamID" => id_team}) do
    user_team = UsersTeams.get_user_team!(id_team, id_user)
    render(conn, "show.json", user_team: user_team)
  end



  def delete(conn, %{"id" => id}) do
    user_team = UsersTeams.get_user_team!(id)

    with {:ok, %UserTeam{}} <- UsersTeams.delete_user_team(user_team) do
      send_resp(conn, :no_content, "")
    end
  end
end
