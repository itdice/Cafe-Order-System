<script setup>
import { useCommonStore } from "@/stores/common.js";

const common = useCommonStore();
common.changeTitle("IT DICE Cafe - Menu");
</script>

<template>
  <main class="main-container">
    <div class="order-button-wrapper">
      <RouterLink :to="{ name: 'menus-register' }">
        <button type="button" class="order-button btn btn-outline-dark">
          New Menu
        </button>
      </RouterLink>
    </div>

    <div class="order-button-wrapper">
      <RouterLink :to="{ name: 'menus' }">
        <button type="button" class="order-button btn btn-outline-dark">
          Show Menus
        </button>
      </RouterLink>
    </div>

    <div class="icon-wrapper">
      <span class="main-icon material-symbols-sharp">
        admin_panel_settings
      </span>
    </div>
  </main>
</template>

<style scoped>
.main-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.order-button-wrapper, .icon-wrapper {
  text-align: center;
  margin-top: 30px;
}

.main-icon {
  font-size: 80px;
  color: var(--main-secondary-color);
}

.order-button {
  min-width: 180px;
}
</style>