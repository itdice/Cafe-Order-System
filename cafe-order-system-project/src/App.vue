<script setup>
import { RouterView, RouterLink } from "vue-router";
import { useCommonStore } from "@/stores/common.js";

const common = useCommonStore();
</script>

<template>
  <div id="app">
    <header class="app-header">
      <h2>{{ common.title }}</h2>
    </header>

    <main class="app-main">
      <RouterView />
    </main>

    <footer class="app-footer">
      <div class="footer=text">Copyright 2024. IT DICE All rights reserved.</div>
      <RouterLink :to="{ name: 'menus-home' }">Admin Page</RouterLink> |
      <RouterLink :to="{ name: 'home' }">Main Page</RouterLink>
    </footer>
  </div>
</template>

<style scoped>
.app-header, .app-footer {
  background-color: var(--main-primary-color);

  color: #FFFFFF;

  text-align: center;
}
.app-header {
  border-top: 5px solid var(--main-primary-color);
  border-bottom: 5px solid var(--main-secondary-color);
}
.app-footer {
  border-top: 5px solid var(--main-secondary-color);
  border-bottom: 5px solid var(--main-primary-color);
}

.app-main {
  flex: 1;
}

a {
  color: var(--hyper-color);
  text-decoration: none;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
