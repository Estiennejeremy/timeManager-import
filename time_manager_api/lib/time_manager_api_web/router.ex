defmodule TimeManagerApiWeb.Router do
  use TimeManagerApiWeb, :router

  pipeline :api do
    plug CORSPlug, origin: "*"
    plug :accepts, ["json"]
  end

  scope "/api", TimeManagerApiWeb do
    pipe_through :api
    resources "/users", UserController, except: [:new, :edit]
    resources "/workingtimes", WorkingtimeController, except: [:new, :edit]
    resources "/teams", TeamController, except: [:new, :edit]
    resources "/Usersteams", UserTeamController
    #resources "/clocks", ClockController, except: [:new, :edit]
    get "/clocks/:user_id", ClockController, :show_usersID
    post "/clocks/:id", ClockController, :post_clock_with_user

    get "/workingtimes/:userID/:workingtimeID", WorkingtimeController, :getWorkingtimeByUser

    get "/Usersteams/:userID/:teamID", UserTeamController, :getUserTeam

    get "/UsersteamsByUser/:userID", UserTeamController, :getTeamsByUser

    get "/UsersteamsByTeam/:teamID", UserTeamController, :getUserByTeam

  end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through [:fetch_session, :protect_from_forgery]
      live_dashboard "/dashboard", metrics: TimeManagerApiWeb.Telemetry
    end
  end
end
