<template>
  <div class="read main">
    <h3>Read posts</h3>
    <form action="">
      <p>user id</p>
      <input v-model="id" type="text" placeholder="post id" disabled>
      <p>post id</p>
      <input v-model="userId" type="text" placeholder="user id" disabled>
      <p>title</p>
      <input v-model="title" type="text" placeholder="post title" disabled>
      <p>body</p>
      <textarea v-model="body" cols="60" rows="10" placeholder="post text" disabled></textarea>
      <div class="button" @click=get()
        @mouseover="(status != 'idle' && status != 'getting') ? status='idle': status=status">
        <span v-if="status == 'idle'">Read another post !</span>
        <span v-if="status == 'getting'">Loading random post...</span>
        <span v-if="status == 'ok'">Done !</span>
        <span v-if="status == 'fail'">Something wrong ! <div class="statuscode"> {{statusCode}} </div> </span>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'Read',
    data() {
      return {
        id: '',
        userId: '',
        title: '',
        body: '',
        status: "idle",
        response: '',
        init: false,
        statusCode: null,
      }
    },
    methods: {

      async get() {
        this.status = "getting"
        try {
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${Math.floor( Math.random() * 100)}`, {
              method: 'get',
            });
          this.statusCode = response.status;
          if (!response.ok) {
            this.status = "fail";
            console.log(response);
            throw new Error(`Error! status: ${response.status}`);
          } else {
            if (!this.init) {
              this.init = true;
              this.status = "idle";
            } else {
              this.status = "ok";
            }
          }
          const result = await response.json();
          this.response = JSON.stringify(result);
          this.id = result.id;
          this.userId = result.userId;
          this.title = result.title;
          this.body = result.body;
        } catch (err) {
          console.log(err);
        }
      },

    },
    mounted() {
      this.get()
    },
  }
</script>

<style lang="scss">
  @import "../assets/style.scss";

  .read {
    form {
      & input:hover,
      textarea:hover {
        cursor: not-allowed;
      }
    }
  }
</style>
