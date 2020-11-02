defmodule AuthentApi.Policies do
  use PolicyWonk.Enforce
  @behaviour PolicyWonk.Policy

  @err_handler    AuthentApi.ErrorHandlers

  alias AuthentApi.{Repo, Users.User}

  @type t :: %User{}

  def policy( assigns, :current_user ) do
  #def policy( assigns, :permission, "admin" ) do
    case assigns[:current_user] do
      _user = %User{} -> :ok
      _ ->    :current_user
    end
  end

  def policy_error(conn, error_data) when is_bitstring(error_data), do:
    @err_handler.unauthorized(conn, error_data )
  def policy_error(conn, error_data), do: policy_error(conn, "Unauthorized" )

end
