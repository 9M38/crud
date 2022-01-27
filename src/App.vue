<template>
  <div id="nav">
    <router-link to="/create">

      C<span class="hidden">reate</span>

    </router-link>
    <router-link to="/read">

      R<span class="hidden">ead</span>

    </router-link>
    <router-link to="/update">

      U<span class="hidden">pdate</span>

    </router-link>
    <router-link to="/delete">

      D<span class="hidden">elete</span>

    </router-link>
  </div>
  <router-view v-slot="{ Component }">
    <transition name="page-transition">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style lang="scss">

  @import "./assets/style.scss";

  * {
    box-sizing: border-box;
    margin: 0;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  #nav {
    display: flex;
    justify-content: center;
    height: 5rem;

    a {
      font-weight: bold;
      font-size: 2rem;
      color: #2c3e50;
      padding: 22px 3px;
      transition: 0.5s all;
      border-left: 1px solid transparent;
      border-right: 1px solid transparent;

      &.router-link-exact-active {
        color: $active-color;

      }

      &:hover {
        .hidden {
          display: inline;
        }
      }
    }

    .hidden {
      display: none;
    }

    &:hover {
      & a {
        border-left: 1px solid rgb(220, 220, 220);
        border-right: 1px solid rgb(220, 220, 220);
        min-width: 20vw;
      }
    }

    @media only screen and (max-width: 600px) {
      & {
        a {
          min-width: 20vw;

          &.router-link-exact-active {
            .hidden {
              display: inline;
            }
          }
        }
      }
    }
  }
</style>
