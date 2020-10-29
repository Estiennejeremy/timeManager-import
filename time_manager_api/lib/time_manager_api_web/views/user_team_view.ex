defmodule TimeManagerApiWeb.UserTeamView do
  use TimeManagerApiWeb, :view
  alias TimeManagerApiWeb.UserTeamView

  def render("index.json", %{user_team: user_team}) do
    %{userTeam: render_many(user_team, UserTeamView, "user_team.json")}
  end

  def render("show.json", %{user_team: user_team}) do
    %{userTeam: render_one(user_team, UserTeamView, "user_team.json")}
  end

  def render("user_team.json", %{user_team: user_team}) do
    %{user_id: user_team.user_id,
      team_id: user_team.team_id}
  end
end
