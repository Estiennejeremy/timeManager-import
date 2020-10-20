defmodule TimeManagerApi.Repo.Migrations.CreateClocks do
  use Ecto.Migration

  def change do
    create table(:clocks) do
      add :time, :naive_datetime
      add :status, :boolean, default: false, null: false
      add :user_id, references(:users, on_delete: :nothing)
      timestamps()
    end

  end
end
