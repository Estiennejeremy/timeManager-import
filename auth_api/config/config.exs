# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :auth_api,
  ecto_repos: [AuthApi.Repo]

# Configures the endpoint
config :auth_api, AuthApiWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "RQokOzli5kjCYZRjL8zvwgskZVCyVQNVJNTWRTa0IU/BTN9Z0D9x18xhrHIzsfOW",
  render_errors: [view: AuthApiWeb.ErrorView, accepts: ~w(json), layout: false],
  pubsub_server: AuthApi.PubSub,
  live_view: [signing_salt: "0enpxCSX"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]


config :auth_api, :pow,
  user: AuthApi.Users.User,
  repo: AuthApi.Repo

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
