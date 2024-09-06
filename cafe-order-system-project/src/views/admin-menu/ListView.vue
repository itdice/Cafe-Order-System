<script setup>
import { useRouter } from "vue-router";
import { useCommonStore } from "@/stores/common.js";
import registerButton from "@/components/registerButton.vue";

const router = useRouter();
const common = useCommonStore();
common.changeTitle("IT DICE Cafe - Menu");

// Get menu list
import { ref } from 'vue';
import { ORDER_API } from "@/utils/firebase_api.js";

const menus = ref([]);

const getMenus = async () => {
  const result = await ORDER_API.menus.findAll();
  console.log(result);
  menus.value = result;
}

getMenus();

// Move menu detail view
function moveMenuDetail(id) {
  router.push({ name: 'menus-detail', params: { id: id } });
}

// Register option
const option = ref("menus");
</script>

<template>
  <div class="container mt-4">
    <h1 class="text-center font-weight-bold">Cafe Menu</h1>
    <div class="row">
      <div v-for="menu in menus" :key="menu.id" class="col-md-4 mb-4">
        <div class="card menu-card" @click="() => {moveMenuDetail(menu.id);}">
          <div class="card-body">
            <img :src="menu.image_src" alt="Menu Image" class="menu-image card-img-top">
            <h5 class="card-title">{{ menu.name }}</h5>
            <p class="card-text text-truncate description-area">{{ menu.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <register-button :option="option"/>
</template>

<style scoped>
.menu-image {
  width: 60%;
  display: block;

  margin: 0 auto 10px auto;

  border-radius: 30px
}

.menu-card {
  cursor: pointer;
}
</style>