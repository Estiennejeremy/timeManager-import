defmodule TimeManagerApi.UsersTeams.UserTeam do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Phoenix.Param, key: :user, key: :team}

  schema "user_team" do
    belongs_to(:user,  TimeManagerApi.Users.User)
    belongs_to(:team,  TimeManagerApi.Teams.Team)
    timestamps()
  end

  @required_fields ~w(user_id teams_id)a
  def changeset(user_team, user, team) do
    user_team
    |> change
    |> put_assoc(:user, user)
    |> put_assoc(:team, team)
    |> validate_required([:user, :team])
  end
end
