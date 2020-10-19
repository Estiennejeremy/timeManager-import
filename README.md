# TimeManager

# Init:

```
docker-compose build
```

```
docker-compose run server mix ecto.create
```

```
docker-compose up
```

# Generate models:

```
docker container exec server_server_1 mix phx.gen.context Accounts User users username:string email:string
```

```
docker container exec server_server_1 mix ecto.migrate
```

# Generate REST endpoints:

```
docker container exec -it bash
```

```
mix phx.gen.json Accounts User users username:string email:string --no-context --no-schema
```

# Adding the routes:
```
scope "/api", ServerWeb do
  pipe_through :api
  resources "/users", UserController, except: [:new, :edit]
end
```

# Add seeds and populate (in priv/repo/seeds.exs)

```
alias server.Repo
alias server.Accounts.User
Repo.insert! %User{username: "oui", email: "oui@oui.fr"}
Repo.insert! %User{username: "non", email: "non@non.fr"}
```

```
docker container exec server_server_1 mix run priv/repo/seeds.exs
```
