defmodule MyApp.Repo.Migrations.AddTableUserteams do
  use Ecto.Migration

  def change do
    create table(:user_team) do
      add(:team_id, references(:teams, on_delete: :delete_all), primary_key: true)
      add(:user_id, references(:users, on_delete: :delete_all), primary_key: true)
      timestamps()
    end

    create(index(:user_team, [:team_id]))
    create(index(:user_team, [:user_id]))

    create(
      unique_index(:user_team, [:user_id, :team_id], name: :user_id_teams_id_unique_index)
    )
  end
end