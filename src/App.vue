<template>
  <div id="app">
    <div v-if="!joined">
      <form @submit.prevent="join">
        <label>what's your name?</label>
        <input v-model="name" />
        <button type="submit">Send</button>
      </form>
    </div>
    <div v-for="message in messages" v-else>
      [{{ message.name }}]: {{ message.text }}
    </div>
    <div v-if="typingDisplay">
      {{ typingDisplay }}
    </div>
    <hr />
    <div>
      <form @submit.prevent="sendMessage">
        <label>Message: </label>
        <input v-model="messageText" @input="emitTyping" />
        <button type="submit">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:8080");
let timeout;

export default {
  name: "app",
  components: {},
  data() {
    return {
      name: "",
      messages: [],
      messageText: "",
      joined: false,
      typingDisplay: "",
      timeout,
    };
  },
  mounted() {
    socket.emit("findAllMessage", {}, (res) => {
      console.log(res);
      this.messages = res;
    });

    socket.on("message", (message) => {
      this.messages.push(message);
    });

    socket.on("typing", ({ name, isTyping }) => {
      if (this.isTyping) {
        this.typingDisplay = `${name} is typing...`;
      } else {
        this.typingDisplay = "";
      }
    });
  },
  methods: {
    sendMessage() {
      socket.emit("createMessage", { text: this.messageText }, () => {
        this.messageText = "";
      });
    },
    join() {
      socket.emit("join", { name: "limsm" }, () => {
        this.joined = true;
      });
    },
    emitTyping() {
      socket.emit("typing", { isTyping: true });
      this.timeout = setTimeout(() => {
        socket.emit("typing", { isTyping: false }, 2000);
      });
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
