defmodule Chat.ChatroomController do
  use Chat.Web, :controller

  def join(conn, _params) do
    render conn, "join.html"
  end

  def chatroom(conn, %{"user" => %{"name" => username}}) do
    case String.strip username do
      "" ->
        conn
        |> put_flash(:error, "You must provide username")
        |> redirect(to: "/")
      _ -> render conn, "chatroom.html", username: username
    end
  end

end
