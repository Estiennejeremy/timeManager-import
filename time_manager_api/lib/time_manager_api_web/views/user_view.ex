defmodule TimeManagerApiWeb.UserView do
  use TimeManagerApiWeb, :view
  alias TimeManagerApiWeb.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("create.json", %{user: user}) do
    %{data: render_one(user, UserView, "createUser.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      teams: render_many(user.teams, TimeManagerApiWeb.TeamView , "createTeam.json", as: :team)}
  end


  def render("createUser.json", %{user: user}) do
    %{id: user.id,
      username: user.username,
      role: user.role,
      email: user.email}
  end

end
