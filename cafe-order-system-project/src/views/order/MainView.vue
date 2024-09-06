<script setup>
import { useCommonStore } from "@/stores/common.js";

const common = useCommonStore();
common.changeTitle("IT DICE Cafe - Order");
</script>

<template>
  <main class="main-container">
    <div class="order-button-wrapper">
      <RouterLink :to="{ name: 'orders-menu-select', query: { option: 'new' } }">
        <button type="button" class="order-button btn btn-outline-dark">
          Order
        </button>
      </RouterLink>
    </div>

    <div class="order-button-wrapper">
      <RouterLink :to="{ name: 'orders' }">
        <button type="button" class="order-button btn btn-outline-dark">
          Show Order Lists
        </button>
      </RouterLink>
    </div>

    <div class="icon-wrapper">
      <span class="main-icon material-symbols-sharp">
        local_cafe
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