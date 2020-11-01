defmodule AuthentApi.Repo do
  use Ecto.Repo,
    otp_app: :authent_api,
    adapter: Ecto.Adapters.Postgres
end
