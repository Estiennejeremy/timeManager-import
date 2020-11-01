# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :authent_api,
  ecto_repos: [AuthentApi.Repo]

# Configures the endpoint
config :authent_api, AuthentApiWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "hFWM1gUJVh3FtrRG+7xfIr7HypW1yzS1EG0YVND9uMG3Qj1Wbv4o0Ytfvv8zbQ9r",
  render_errors: [view: AuthentApiWeb.ErrorView, accepts: ~w(json), layout: false],
  pubsub_server: AuthentApi.PubSub,
  live_view: [signing_salt: "Sr0WXhpj"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# COnfig Pow
config :authent_api, :pow,
  user: AuthentApi.Users.User,
  repo: AuthentApi.Repo

# Config policy wonk
config :policy_wonk, PolicyWonk,
  policies: AuthentApi.Policies
# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
