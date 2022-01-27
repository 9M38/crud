<template>
  <div class="create main">
    <h3>Create new post</h3>
    <form action="">
      <input v-model="title" type="text" placeholder="post title">
      <textarea v-model="body" cols="60" rows="10" placeholder="post text"></textarea>
      <div class="button" @click=create()
        @mouseover="(status != 'idle' && status != 'sending') ? status='idle': status=status">
        <span v-if="status == 'idle'">Create post !</span>
        <span v-if="status == 'sending'">Creating...</span>
        <span v-if="status == 'ok'">Done!</span>
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
    name: 'Create',
    data() {
      return {
        userId: 0,
        title: '',
        body: '',
        status: "idle",
        response: '',
        statusCode: null,
      }
    },
    methods: {


      async create() {
        this.status = "sending"
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
              title: this.title,
              body: this.body,
              userId: this.userId,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
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
          this.id = result.id;
          this.userId = result.userId;
          this.title = result.title;
          this.body = result.body;
        } catch (err) {
          console.log(err);
        }
      },
    }
  }
</script>

<style lang="scss">
  @import "../assets/style.scss";
</style>
