
let Chat = {
  init(socket) {
    let username = document.getElementById("username").innerHTML;
    let msgInput = document.getElementById("message");
    let msgContainer = document.getElementById("conversations");
    socket.connect();
    let roomChannel = socket.channel("rooms:lobby");

    msgInput.addEventListener("keypress", e => {
      let message = msgInput.value;
      if(e.keyCode == 13 && !!message){
        roomChannel.push("new_msg", {username: username, body: message})
                   .receive("error", e => console.log(e));
        msgInput.value = "";
      }
    })

    roomChannel.on("new_msg", ({username, body}) => {
      var node = document.createElement("div");
      node.innerHTML = "<b>[" + username + "]</b> " + body
      msgContainer.appendChild(node);
      msgContainer.scrollTop = msgContainer.scrollHeight;
    });

    roomChannel.on("user_joined", ({username}) => {
      var node = document.createElement("div");
      node.innerHTML = "<b>[SERVER]</b> " + username + " has joined the room"
      msgContainer.appendChild(node);
      msgContainer.scrollTop = msgContainer.scrollHeight;
    })

    roomChannel.join()
               .receive("ok", resp => {
                 console.log("joined the video channel", resp);
                 roomChannel.push("user_joined", {username: username});
               })
               .receive("error", reason => console.log("join failed", reason) );
  }
}

export default Chat
