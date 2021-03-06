defmodule TimeManagerApiWeb.ClockController do
  use TimeManagerApiWeb, :controller

  alias TimeManagerApi.Clocks
  alias TimeManagerApi.Clocks.Clock

  action_fallback TimeManagerApiWeb.FallbackController

  def index(conn, _params) do
    clocks = Clocks.list_clocks()
    render(conn, "index.json", clocks: clocks)
  end

  def create(conn, %{"clock" => clock_params}) do
    with {:ok, %Clock{} = clock} <- Clocks.create_clock(clock_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.clock_path(conn, :show, clock))
      |> render("show.json", clock: clock)
    end
  end

  def post_clock_with_user(conn, %{"id" => id, "clock" => clock_params} ) do
    with {:ok, %Clock{} = clock} <- Clocks.create_clock_with_user(clock_params, id) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.clock_path(conn, :show, clock))
      |> render("show.json", clock: clock)
    end
  end

  def show_usersID(conn, %{"user_id" => id, "start" => start, "end" => endtime}) do
    clock = Clocks.get_clock_by_start_to_end(id, conn.query_params["start"], conn.query_params["end"])
    render(conn, "index.json", clocks: clock)
  end

  def show_usersID(conn, %{"user_id" => id, "end" => endtime}) do
    clock = Clocks.get_clock_by_end(id, conn.query_params["end"])
    render(conn, "index.json", clocks: clock)
  end

  def show_usersID(conn, %{"user_id" => id, "start" => start}) do
    clock = Clocks.get_clock_by_start(id, conn.query_params["start"])
    render(conn, "index.json", clocks: clock)
  end

  def show_usersID(conn, %{"user_id" => user_id}) do
    clocks = Clocks.get_AllUserId(user_id)
    render(conn, "index.json", clocks: clocks)
  end

  def show_max_by_user(conn, %{"userID" => userID}) do
    clock = Clocks.get_max_clock_by_user(userID)
    render(conn, "index.json", clocks: clock)
  end

  def show(conn, %{"id" => id}) do
    clock = Clocks.get_clock!(id)
    render(conn, "show.json", clock: clock)
  end

  def update_clock(conn, %{"id" => id, "clock" => clock_params}) do
    clock = Clocks.get_clock!(id)

    with {:ok, %Clock{} = clock} <- Clocks.update_clock(clock, clock_params) do
      render(conn, "show.json", clock: clock)
    end
  end

  def delete(conn, %{"id" => id}) do
    clock = Clocks.get_clock!(id)

    with {:ok, %Clock{}} <- Clocks.delete_clock(clock) do
      send_resp(conn, :no_content, "")
    end
  end
end
