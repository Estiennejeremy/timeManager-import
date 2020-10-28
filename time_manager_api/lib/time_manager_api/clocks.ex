defmodule TimeManagerApi.Clocks do
  @moduledoc """
  The Clocks context.
  """

  import Ecto.Query, warn: false
  alias TimeManagerApi.Repo

  alias TimeManagerApi.Clocks.Clock

  def create_clock_with_user(attrs \\ %{}, id) do
    %Clock{}
    |> Clock.changeset(attrs)
    |> Clock.changeset(%{user_id: id})
    |> Repo.insert()
  end

  # IO.puts NaiveDateTime.compare(~N[2016-04-16 13:30:15], NaiveDateTime.from_iso8601!("2020-11-28T16:59:59"))
  def get_clock_by_start_to_end(id, start, endtime) do
    Repo.all(from w in Clock, where: w.time >= ^start and w.time <= ^endtime and w.id == ^id)
  end

  def get_clock_by_start(id, start) do
    Repo.all(from w in Clock, where: w.time >= ^start and w.id == ^id)
  end

  def get_clock_by_end(id, endtime) do
    Repo.all(from w in Clock, where: w.time <= ^endtime and w.id == ^id)
  end

  def get_AllUserId(id) do
    Clock
    |> where(user_id: ^id)
    |> Repo.all()
  end

  @doc """
  Returns the list of clocks.

  ## Examples

      iex> list_clocks()
      [%Clock{}, ...]

  """
  def list_clocks do
    Repo.all(Clock)
  end

  @doc """
  Gets a single clock.

  Raises `Ecto.NoResultsError` if the Clock does not exist.

  ## Examples

      iex> get_clock!(123)
      %Clock{}

      iex> get_clock!(456)
      ** (Ecto.NoResultsError)

  """
  def get_clock!(id), do: Repo.get!(Clock, id)

  @doc """
  Creates a clock.

  ## Examples

      iex> create_clock(%{field: value})
      {:ok, %Clock{}}

      iex> create_clock(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_clock(attrs \\ %{}) do
    %Clock{}
    |> Clock.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a clock.

  ## Examples

      iex> update_clock(clock, %{field: new_value})
      {:ok, %Clock{}}

      iex> update_clock(clock, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_clock(%Clock{} = clock, attrs) do
    clock
    |> Clock.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a clock.

  ## Examples

      iex> delete_clock(clock)
      {:ok, %Clock{}}

      iex> delete_clock(clock)
      {:error, %Ecto.Changeset{}}

  """
  def delete_clock(%Clock{} = clock) do
    Repo.delete(clock)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking clock changes.

  ## Examples

      iex> change_clock(clock)
      %Ecto.Changeset{data: %Clock{}}

  """
  def change_clock(%Clock{} = clock, attrs \\ %{}) do
    Clock.changeset(clock, attrs)
  end
end
