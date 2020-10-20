# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :time_manager_api,
  ecto_repos: [TimeManagerApi.Repo]

# Configures the endpoint
config :time_manager_api, TimeManagerApiWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "4KMHKqdNY774ABZeVgCWaqzbsM+Dss8YUb1n3Mg/4c4dZNk8uJP9Iw9W40kHRquf",
  render_errors: [view: TimeManagerApiWeb.ErrorView, accepts: ~w(json), layout: false],
  pubsub_server: TimeManagerApi.PubSub,
  live_view: [signing_salt: "o/QRZy4h"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
