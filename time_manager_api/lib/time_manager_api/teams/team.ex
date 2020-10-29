defmodule TimeManagerApi.Teams.Team do
  use Ecto.Schema
  import Ecto.Changeset

  schema "teams" do
    field :name, :string
    field :localisation, :string
    belongs_to :manager, TimeManagerApi.Users.User
    has_many :workingTime, TimeManagerApi.Teams.Team
    many_to_many(
      :users,
      TimeManagerApi.Users.User,
      join_through: TimeManagerApi.UsersTeams.UserTeam,
      on_replace: :delete
    )
    timestamps()
  end

  @doc false
  def changeset(team, attrs) do
    team
    |> cast(attrs, [:name, :localisation])
    |> validate_required([:name])
  end
end
