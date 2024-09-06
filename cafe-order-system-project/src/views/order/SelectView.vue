<script setup>
import { useRoute, useRouter } from "vue-router";
import { useCommonStore } from "@/stores/common.js";
import backButton from "@/components/backButton.vue";

const route = useRoute();
const router = useRouter();
const common = useCommonStore();
common.changeTitle("IT DICE Cafe - Order");

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

// Move order register view
function moveNewMenuDetail(id) {
  router.push({ name: 'orders-register-update', query: { option: "new", menuID: id } });
}
function moveEditMenuDetail(id) {
  router.push({ name: 'orders-register-update',
    query: { option: "edit", menuID: id, orderID: route.query.orderID } });
}

// Move Handler
function moveHandler(id) {
  if (route.query.option === "new")
    moveNewMenuDetail(id);
  else if (route.query.option === "edit")
    moveEditMenuDetail(id);
}

</script>

<template>
  <div class="container mt-4">
    <h1 class="text-center font-weight-bold mb-3">Select Menu</h1>
    <div class="row">
      <div v-for="menu in menus" :key="menu.id" class="col-md-4 mb-4">
        <div class="card menu-card" @click="() => {moveHandler(menu.id)}">
          <div class="card-body">
            <img :src="menu.image_src" alt="Menu Image" class="menu-image card-img-top">
            <h5 class="card-title">{{ menu.name }}</h5>
            <p class="card-text text-truncate description-area">{{ menu.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <back-button/>
</template>

<style scoped>
.menu-image {
  width: 60%;
  display: block;

  margin: 0 auto 10px auto;

  border-radius: 30px;
}

.menu-card {
  cursor: pointer;
}
</style>