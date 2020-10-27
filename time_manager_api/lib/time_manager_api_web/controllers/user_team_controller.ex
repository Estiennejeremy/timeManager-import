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
    with {:ok, %UserTeam{} = user_team} <- UsersTeams.create_user_team(user_team_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.user_team_path(conn, :show, user_team))
      |> render("show.json", user_team: user_team)
    end
  end

  def show(conn, %{"id" => id}) do
    user_team = UsersTeams.get_user_team!(id)
    render(conn, "show.json", user_team: user_team)
  end

  def update(conn, %{"id" => id, "user_team" => user_team_params}) do
    user_team = UsersTeams.get_user_team!(id)

    with {:ok, %UserTeam{} = user_team} <- UsersTeams.update_user_team(user_team, user_team_params) do
      render(conn, "show.json", user_team: user_team)
    end
  end

  def delete(conn, %{"id" => id}) do
    user_team = UsersTeams.get_user_team!(id)

    with {:ok, %UserTeam{}} <- UsersTeams.delete_user_team(user_team) do
      send_resp(conn, :no_content, "")
    end
  end
end
