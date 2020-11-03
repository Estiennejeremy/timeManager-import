defmodule TimeManagerApiWeb.ClockView do
  use TimeManagerApiWeb, :view
  alias TimeManagerApiWeb.ClockView

  def render("index.json", %{clocks: clocks}) do
    %{data: render_many(clocks, ClockView, "clock.json")}
  end

  def render("show.json", %{clock: clock}) do
    %{data: render_one(clock, ClockView, "clock.json")}
  end

  def render("clock.json", %{clock: clock}) do
    IO.inspect(clock)
    %{id: clock.id,
      start: clock.start,
      end: clock.end,
      user_id: clock.user_id}
  end
end
