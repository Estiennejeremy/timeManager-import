defmodule TimeManagerApi.Repo.Migrations.CreateTeams do
  use Ecto.Migration

  def change do
    create table(:teams) do
      add :name, :string
      add :localisation, :string
      add :manager_id, references(:users, on_delete: :nothing)
      timestamps()
    end
  end
end
