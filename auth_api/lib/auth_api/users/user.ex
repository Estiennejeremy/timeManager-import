defmodule AuthApi.Users.User do
  use Ecto.Schema
  use Pow.Ecto.Schema

  schema "users" do
    field :role, :string, null: false, default: "employee"

    pow_user_fields()

    timestamps()
  end

  @spec changeset_role(Ecto.Schema.t() | Ecto.Changeset.t(), map()) :: Ecto.Changeset.t()
  def changeset_role(user_or_changeset, attrs) do
    user_or_changeset
    |> Ecto.Changeset.cast(attrs, [:role])
    |> Ecto.Changeset.validate_inclusion(:role, ~w(employee manager generalManager))
  end

  alias AuthApi.{Repo, Users.User}

  @type t :: %User{}

  @spec create_employee(map()) :: {:ok, t()} | {:error, Ecto.Changeset.t()}
  def create_employee(params) do
    %User{}
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
