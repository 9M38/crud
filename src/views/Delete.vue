<template>
  <div class="delete main">
    <h3>Delete post</h3>
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
        @mouseover="(status != 'idle' && status != 'sending') ? status='idle': status=status">
        <span v-if="getStatus == 'idle'">Get another post !</span>
        <span v-if="getStatus == 'getting'">Loading random post...</span>
        <span v-if="getStatus == 'fail'">Something wrong ! <div class="statuscode"> {{statusCode}} </div> </span>
      </div>
      <div class="button" @click=del()
        @mouseover="(status != 'idle' && status != 'sending') ? status='idle': status=status">
        <span v-if="status == 'idle'">Delete it !</span>
        <span v-if="status == 'sending'">Deleting...</span>
        <span v-if="status == 'ok'">Done !</span>
        <span v-if="status == 'fail'">Something wrong ! <div class="statuscode"> {{statusCode}} </div> </span>
      </div>
    </form>
    <div class="response" v-if="response">
      response from API: {{response}}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Update',
    data() {
      return {
        id: '',
        title: '',
        userId: '',
        body: '',
        getStatus: "idle",
        status: "idle",
        response: '',
        statusCode: null,
      }
    },
    methods: {
      async del() {
        this.status = "sending"
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${this.id}`, {
            method: 'DELETE'
          });
          this.statusCode = response.status;
          if (!response.ok) {
            this.status = "fail";
            console.log(response);
            throw new Error(`Error! status: ${response.status}`);
          } else {
            this.status = "ok";
          }

          const result = await response.json();
          this.response = JSON.stringify(result);
        } catch (err) {
          console.log(err);
        }
      },
      async get() {
        this.getStatus = "getting"
        try {
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${Math.floor( Math.random() * 100)}`, {
              method: 'get'
            }
          );
          this.statusCode = response.status;
          if (!response.ok) {
            this.getStatus = "fail";
            console.log(response);
            throw new Error(`Error! status: ${response.status}`);
          } else {
            this.getStatus = "idle";
          }
          const result = await response.json();
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
</style>
