defmodule AuthentApiWeb.ProductView do
  use AuthentApiWeb, :view
  alias AuthentApiWeb.ProductView

  def render("index.json", %{products: products}) do
    %{data: render_many(products, ProductView, "product.json")}
  end

  def render("show.json", %{product: product}) do
    %{data: render_one(product, ProductView, "product.json")}
  end

  def render("product.json", %{product: product}) do
    %{id: product.id,
      name: product.name,
      quantity: product.quantity}
  end
end
