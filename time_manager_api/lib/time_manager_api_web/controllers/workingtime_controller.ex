defmodule TimeManagerApiWeb.WorkingtimeController do
  use TimeManagerApiWeb, :controller

  alias TimeManagerApi.Workingtimes
  alias TimeManagerApi.Workingtimes.Workingtime

  action_fallback TimeManagerApiWeb.FallbackController

  def index(conn, _params) do
    workingtimes = Workingtimes.list_workingtimes()
    render(conn, "index.json", workingtimes: workingtimes)
  end

  def create(conn, %{"workingtime" => workingtime_params}) do
    with {:ok, %Workingtime{} = workingtime} <- Workingtimes.create_workingtime(workingtime_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.workingtime_path(conn, :show, workingtime))
      |> render("show.json", workingtime: workingtime)
    end
  end
  
  def show(conn, %{"id" => id, "start" => start, "end" => endtime}) do
    workingtime = Workingtimes.get_workingtime_by_start_to_end(id, conn.query_params["start"], conn.query_params["end"])
    render(conn, "index.json", workingtimes: workingtime)
  end

  def show(conn, %{"id" => id, "end" => endtime}) do
    workingtime = Workingtimes.get_workingtime_by_end(id, conn.query_params["end"])
    render(conn, "index.json", workingtimes: workingtime)
  end

  def show(conn, %{"id" => id, "start" => start}) do
    workingtime = Workingtimes.get_workingtime_by_start(id, conn.query_params["start"])
    render(conn, "index.json", workingtimes: workingtime)
  end

  def show(conn, %{"id" => id, "end" => endtime}) do
    workingtime = Workingtimes.get_workingtime_by_end(id, conn.query_params["end"])
    render(conn, "index.json", workingtimes: workingtime)
  end

  def show(conn, %{"id" => id}) do
    workingtimes = Workingtimes.get_workingtime_to_user(id)
    render(conn, "index.json", workingtimes: workingtimes)
  end

  def getWorkingtimeByUser(conn, %{"userID" => userID, "workingtimeID" => workingtimeID}) do
    workingtimes = Workingtimes.get_workingtime_by_user(userID,workingtimeID)
    render(conn, "show.json", workingtime: workingtimes)
  end

  def update(conn, %{"id" => id, "workingtime" => workingtime_params}) do
    workingtime = Workingtimes.get_workingtime!(id)

    with {:ok, %Workingtime{} = workingtime} <- Workingtimes.update_workingtime(workingtime, workingtime_params) do
      render(conn, "show.json", workingtime: workingtime)
    end
  end

  def delete(conn, %{"id" => id}) do
    workingtime = Workingtimes.get_workingtime!(id)

    with {:ok, %Workingtime{}} <- Workingtimes.delete_workingtime(workingtime) do
      send_resp(conn, :no_content, "")
    end
  end
  
end
