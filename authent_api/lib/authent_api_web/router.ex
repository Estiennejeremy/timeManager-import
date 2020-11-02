defmodule AuthentApiWeb.Router do
  use AuthentApiWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug AuthentApiWeb.ApiAuthPlug, otp_app: :authent_api
  end

  pipeline :api_protected do
    plug Pow.Plug.RequireAuthenticated, error_handler: AuthentApiWeb.ApiAuthErrorHandler
    plug AuthentApi.Policies, :current_user
  end

  scope "/api", AuthentApiWeb do
    pipe_through :api

    resources "/registration", RegistrationController, singleton: true, only: [:create]
    resources "/session", SessionController, singleton: true, only: [:create, :delete]
    post "/session/renew", SessionController, :renew
  end

  scope "/api", AuthentApiWeb do
    pipe_through :api
    resources "/products", ProductController, only: [:show, :index]
  end

  scope "/api", AuthentApiWeb do
    pipe_through [:api, :api_protected]
    resources "/products", ProductController, except: [:new, :edit, :show, :index]
  end


end
