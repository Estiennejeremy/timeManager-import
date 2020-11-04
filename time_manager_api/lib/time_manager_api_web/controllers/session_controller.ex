defmodule TimeManagerApiWeb.SessionController do
  use TimeManagerApiWeb, :controller


  alias TimeManagerApiWeb.ApiAuthPlug

  @spec create(Conn.t(), map()) :: Conn.t()
  def create(conn, %{"user" => user_params}) do
    user = Enum.at(TimeManagerApi.Users.list_users_by_email(user_params["email"]), 0)
    IO.inspect("____________________________________________________________________________________________________________")
    IO.inspect(user)
    conn
    |> Pow.Plug.authenticate_user(user_params)
    |> case do
      {:ok, conn} ->
        json(conn, %{data: %{id: user.id, token: conn.private[:api_auth_token], renew_token: conn.private[:api_renew_token]}})

      {:error, conn} ->
        conn
        |> put_status(401)
        |> json(%{error: %{status: 401, message: "Invalid email or password"}})
    end
  end

  @spec renew(Conn.t(), map()) :: Conn.t()
  def renew(conn, _params) do
    config = Pow.Plug.fetch_config(conn)

    conn
    |> ApiAuthPlug.renew(config)
    |> case do
      {conn, nil} ->
        conn
        |> put_status(401)
        |> json(%{error: %{status: 401, message: "Invalid token"}})

      {conn, _user} ->
        json(conn, %{data: %{token: conn.private[:api_auth_token], renew_token: conn.private[:api_renew_token]}})
    end
  end

  @spec delete(Conn.t(), map()) :: Conn.t()
  def delete(conn, _params) do
    {:ok, conn} = Pow.Plug.clear_authenticated_user(conn)

    json(conn, %{data: %{}})
  end
end
