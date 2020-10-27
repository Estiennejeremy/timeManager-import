defmodule TimeManagerApiWeb.TeamView do
  use TimeManagerApiWeb, :view
  alias TimeManagerApiWeb.TeamView

  def render("index.json", %{teams: teams}) do
    %{data: render_many(teams, TeamView, "team.json")}
  end

  def render("show.json", %{team: team}) do
    %{data: render_one(team, TeamView, "team.json")}
  end

  def render("team.json", %{team: team}) do
    %{id: team.id,
      name: team.name,
      manager_id: team.manager_id,
      employee: render_many(team.users, TimeManagerApiWeb.UserView , "show.json", as: :user)}
  end
end
