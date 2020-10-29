defmodule TimeManagerApi.Repo.Migrations.CreateWorkingtimes do
  use Ecto.Migration

  def change do
    create table(:workingtimes) do
      add :start, :naive_datetime
      add :end, :naive_datetime
      add :team_id, references(:teams, on_delete: :nothing)
      timestamps()
    end
  end
end
