defmodule Chat.ChatroomController do
  use Chat.Web, :controller

  def join(conn, _params) do
    render conn, "join.html"
  end

end
