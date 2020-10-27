defmodule TimeManagerApi.UsersTeams.UserTeam do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key false
  schema "user_team" do
    belongs_to(:user,  TimeManagerApi.Users.User)
    belongs_to(:team,  TimeManagerApi.Teams.Team)
    timestamps()
  end

  @required_fields ~w(user_id teams_id)a
  def changeset(user_teams, params \\ %{}) do
    user_teams
    |> cast(params, @required_fields)
    |> validate_required(@required_fields)
    |> foreign_key_constraint(:team_id)
    |> foreign_key_constraint(:user_id)
    |> unique_constraint([:user, :teams],
         name: :user_id_teams_id_unique_index,
         message: @already_exists
       )
  end
end
