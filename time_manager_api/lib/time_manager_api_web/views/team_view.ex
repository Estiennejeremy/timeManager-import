defmodule TimeManagerApiWeb.TeamView do
  use TimeManagerApiWeb, :view
  alias TimeManagerApiWeb.TeamView

  def render("index.json", %{teams: teams}) do
    %{data: render_many(teams, TeamView, "team.json")}
  end

  def render("show.json", %{team: team}) do
    %{data: render_one(team, TeamView, "team.json")}
  end

  def render("create.json", %{team: team}) do
    %{data: render_one(team, TeamView, "createTeam.json")}
  end

  def render("team.json", %{team: team}) do
    %{id: team.id,
      name: team.name,
      manager_id: team.manager_id,
      localisation: team.localisation,
      employee: render_many(team.users, TimeManagerApiWeb.UserView , "create.json", as: :user)}
  end

  def render("createTeam.json", %{team: team}) do
    %{id: team.id,
      name: team.name,
      localisation: team.localisation}
  end
end
