defmodule TimeManagerApi.Clocks.Clock do
  use Ecto.Schema
  import Ecto.Changeset

  schema "clocks" do
    field :end, :naive_datetime
    field :start, :naive_datetime
    belongs_to :user, TimeManagerApi.Users.User
    timestamps()
  end

  @doc false
  def changeset(clock, attrs) do
    clock
    |> cast(attrs, [:end, :start, :user_id])
    |> validate_required([:start])
  end
end
