<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({option: String});

function moveMenuRegister() {
  router.push({ name: "menus-register" });
}
function moveOrderRegister() {
  router.push({ name: 'orders-menu-select', query: { option: 'new' } });
}
</script>

<template>
  <button type="button"
          class="floating-btn btn btn-success btn-lg rounded-circle position-fixed shadow"
          @click="() => {(option === 'menus' ? moveMenuRegister() : moveOrderRegister())}">
    <span class="plus-icon material-symbols-sharp">
      add
    </span>
  </button>
</template>

<style scoped>
.floating-btn {
  height: 61px;
  width: 61px;
  bottom: 20px;
  right: 20px;
}

.plus-icon {
  margin: 4px 0 0 -1px;
  font-size: 30px;
  color: var(--white);
}
</style>