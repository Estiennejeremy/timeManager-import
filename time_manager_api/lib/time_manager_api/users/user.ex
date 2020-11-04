defmodule TimeManagerApi.Users.User do
  use Ecto.Schema
  import Ecto.Changeset
  use Pow.Ecto.Schema

  schema "users" do
    field :username, :string

    field :role, :string, null: false, default: "employee"

    pow_user_fields()

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

  def changeset(user_or_changeset, attrs) do
    user_or_changeset
    |> pow_changeset(attrs)
    |> Ecto.Changeset.cast(attrs, [:username])
    |> Ecto.Changeset.validate_required([:username])
  end

  def changeset_update_teams(user, attrs, teams) do
    user
    |> cast(attrs, [:username, :email, :role])
    |> validate_required([:username, :email, :role])
    |> put_assoc(:teams, teams)
  end


  # POW
  @spec changeset_role(Ecto.Schema.t() | Ecto.Changeset.t(), map()) :: Ecto.Changeset.t()
  def changeset_role(user_or_changeset, attrs) do
    user_or_changeset
    |> Ecto.Changeset.cast(attrs, [:role])
    |> Ecto.Changeset.validate_inclusion(:role, ~w(employee manager generalManager))
  end


  alias TimeManagerApi.{Repo, Users.User}

  @type t :: %User{}

  @spec create_employee(map()) :: {:ok, t()} | {:error, Ecto.Changeset.t()}
  def create_employee(params) do
    %User{}
    |> Ecto.Changeset.cast(params["username"], [:username])
    |> User.changeset(params)
    |> User.changeset_role(%{role: "employee"})
    |> Repo.insert()
  end

  @spec set_employee_role(t()) :: {:ok, t()} | {:error, Ecto.Changeset.t()}
  def set_employee_role(user) do
    user
    |> User.changeset_role(%{role: "employee"})
    |> Repo.update()
  end

  @spec create_manager(map()) :: {:ok, t()} | {:error, Ecto.Changeset.t()}
  def create_manager(params) do
    %User{}
    |> User.changeset(params)
    |> User.changeset_role(%{role: "manager"})
    |> Repo.insert()
  end

  @spec set_manager_role(t()) :: {:ok, t()} | {:error, Ecto.Changeset.t()}
  def set_manager_role(user) do
    user
    |> User.changeset_role(%{role: "manager"})
    |> Repo.update()
  end

  @spec create_super_manager(map()) :: {:ok, t()} | {:error, Ecto.Changeset.t()}
  def create_super_manager(params) do
    %User{}
    |> User.changeset(params)
    |> User.changeset_role(%{role: "generalManager"})
    |> Repo.insert()
  end

  @spec set_super_manager_role(t()) :: {:ok, t()} | {:error, Ecto.Changeset.t()}
  def set_super_manager_role(user) do
    user
    |> User.changeset_role(%{role: "generalManager"})
    |> Repo.update()
  end

end
