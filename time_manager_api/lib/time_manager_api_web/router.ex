defmodule TimeManagerApiWeb.Router do
  use TimeManagerApiWeb, :router
  use Pow.Phoenix.Router

  pipeline :api do
    plug CORSPlug, origin: "*"
    plug :accepts, ["json"]
    plug TimeManagerApiWeb.ApiAuthPlug, otp_app: :time_manager_api
  end

  pipeline :api_protected do
    plug Pow.Plug.RequireAuthenticated, error_handler: TimeManagerApiWeb.ApiAuthErrorHandler
  end

  pipeline :employee do
    plug TimeManagerApiWeb.EnsureRolePlug, :employee
  end

  pipeline :manager do
    plug TimeManagerApiWeb.EnsureRolePlug, :manager
  end

  pipeline :superManager do
    plug TimeManagerApiWeb.EnsureRolePlug, :superManager
  end

  scope "/api", TimeManagerApiWeb do
    pipe_through :api
    resources "/users", UserController, except: [:new, :edit]
    resources "/workingtimes", WorkingtimeController, except: [:new, :edit]
    resources "/teams", TeamController, except: [:new, :edit]
    resources "/Usersteams", UserTeamController, except: [:new, :edit]
    #resources "/clocks", ClockController, except: [:new, :edit]
    get "/clocks/:user_id", ClockController, :show_usersID
    post "/clocks/:id", ClockController, :post_clock_with_user
    get "/clocksMax/:userID", ClockController, :show_max_by_user
    put "/clocks/:id", ClockController, :update_clock

    get "/workingtimes/:teamID/:workingtimeID", WorkingtimeController, :getWorkingtimeByTeam
    get "/workingtimesByTeam/:teamID", WorkingtimeController, :getAllWorkingtimeByteam
    get "/workingtimesByUser/:userID", WorkingtimeController, :getAllWorkingtimeByUser

    get "/Usersteams/:userID/:teamID", UserTeamController, :getUserTeam
    delete "/Usersteams/:userID/:teamID", UserTeamController, :deleteUserTeam
    get "/UsersteamsByUser/:userID", UserTeamController, :getTeamsByUser
    get "/UsersteamsByTeam/:teamID", UserTeamController, :getUserByTeam

    resources "/registration", RegistrationController, singleton: true, only: [:create]
    resources "/session", SessionController, singleton: true, only: [:create, :delete]
    post "/session/renew", SessionController, :renew

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
