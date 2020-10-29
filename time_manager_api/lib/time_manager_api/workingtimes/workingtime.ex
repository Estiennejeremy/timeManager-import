defmodule TimeManagerApi.Workingtimes.Workingtime do
  use Ecto.Schema
  import Ecto.Changeset

  schema "workingtimes" do
    field :end, :naive_datetime
    field :start, :naive_datetime
    belongs_to :team, TimeManagerApi.Teams.Team
    timestamps()
  end

  @doc false
  def changeset(workingtime, attrs) do
    workingtime
    |> cast(attrs, [:start, :end, :team_id])
    |> validate_required([:start, :end])
  end
end
