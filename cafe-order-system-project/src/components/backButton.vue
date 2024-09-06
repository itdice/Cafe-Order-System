<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const emit = defineEmits(["goBack"]);
</script>

<template>
  <button type="button"
          class="floating-btn btn btn-success btn-lg rounded-circle position-fixed shadow"
          @click="router.go(-1)">
    <span class="back-icon material-symbols-sharp">
      arrow_back_ios
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

.back-icon {
  margin: 5px -10px 0 0;
  font-size: 25px;
  color: var(--white);
}
</style>