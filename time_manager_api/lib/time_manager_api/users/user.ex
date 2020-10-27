defmodule TimeManagerApi.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :email, :string
    field :username, :string
    has_many :clocks, TimeManagerApi.Clocks.Clock
    has_many :TeamManage, TimeManagerApi.Teams.Team
    many_to_many(
      :teams,
      TimeManagerApi.Teams.Team,
      join_through: TimeManagerApi.UsersTeams.UserTeam ,
      on_replace: :delete
    )
    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :email])
    |> validate_required([:username, :email])
    |> unique_constraint(:email)
  end

  def changeset_update_teams(user, attrs, teams) do
    user
    |> cast(attrs, [:username, :email])
    |> validate_required([:username, :email])
    |> put_assoc(:teams, teams)
  end

end
