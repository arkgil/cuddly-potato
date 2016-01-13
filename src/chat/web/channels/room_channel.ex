defmodule Chat.RoomChannel do
  use Chat.Web, :channel
  require Logger

  def join("rooms:" <> room_name, _params, socket) do
    {:ok, assign(socket, :room_name, room_name)}
  end


  def handle_in("user_joined", params, socket) do
    broadcast! socket, "user_joined", %{username: params["username"]}
    {:reply, :ok, socket}
  end

  def handle_in("new_msg", params, socket) do
    broadcast! socket, "new_msg", %{
      username: params["username"],
      body: params["body"]
    }
    {:reply, :ok, socket}
  end

  def terminate(reason, _socket) do
    Logger.info "leave #{inspect reason}"
  end
end
