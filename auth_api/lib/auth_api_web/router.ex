defmodule AuthApiWeb.Router do
  use AuthApiWeb, :router
  use Pow.Phoenix.Router


  pipeline :api do
    plug :accepts, ["json"]
    plug AuthApiWeb.ApiAuthPlug, otp_app: :auth_api
  end

  pipeline :api_protected do
    plug Pow.Plug.RequireAuthenticated, error_handler: AuthApiWeb.ApiAuthErrorHandler
  end

  pipeline :employee do
    plug AuthApiWeb.EnsureRolePlug, :employee
  end

  pipeline :manager do
    plug AuthApiWeb.EnsureRolePlug, :manager
  end

  pipeline :superManager do
    plug AuthApiWeb.EnsureRolePlug, :superManager
  end


  scope "/api", AuthApiWeb do
    pipe_through :api

    resources "/registration", RegistrationController, singleton: true, only: [:create]
    resources "/session", SessionController, singleton: true, only: [:create, :delete]
    post "/session/renew", SessionController, :renew
  end

  scope "/api", AuthApiWeb do
    pipe_through :api
    resources "/products", ProductController, only: [:show, :index]
  end

  scope "/api", AuthApiWeb do
    pipe_through [:api, :employee]
    resources "/products", ProductController, except: [:new, :edit, :show, :index]
  end

end
