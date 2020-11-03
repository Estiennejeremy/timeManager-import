FROM bitwalker/alpine-elixir-phoenix:latest

WORKDIR app

COPY mix.exs .
COPY mix.lock .
RUN mkdir assets

RUN mix deps.clean --all && mix deps.get && mix compile

COPY . .

CMD mix pow.install

CMD mix phx.server
