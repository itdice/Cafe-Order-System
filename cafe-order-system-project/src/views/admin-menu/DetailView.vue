<script setup>
import { useRoute, useRouter } from "vue-router";
import { useCommonStore } from "@/stores/common.js";
import backButton from "@/components/backButton.vue";

const route = useRoute();
const router = useRouter();
const common = useCommonStore();
common.changeTitle("IT DICE Cafe - Menu");

// Get menu detail
import { ref } from 'vue';
import { ORDER_API } from "@/utils/firebase_api.js";

const menuData = ref({});

const getMenu = async (id) => {
  const result = await ORDER_API.menus.findOne(id);
  console.log(result);
  menuData.value = result;
}

getMenu(route.params.id);

// Edit menu
const editMenu = async () => {
  await router.push({ name: "menus-update", params: { id: route.params.id } });
};

// Delete menu
const deleteMenu = async () => {
  const menu = await ORDER_API.menus.findOne(route.params.id);
  await ORDER_API.menus.delete(menu);
  alert("Deleted successfully.");
  await router.push({ name: 'menus' });
};

// confirm delete
const confirmDelete = ref(false);
</script>

<template>
  <div class="detail-card container mt-5">
    <div class="card">
      <img :src="menuData.image_src" class="card-img-top" alt="Menu Image">
      <div class="card-body">
        <h5 class="card-title">{{ menuData.name }}</h5>
        <p class="card-text">{{ menuData.description }}</p>
        <button @click="editMenu" class="btn btn-warning">Edit Menu</button>
        <button v-if="!confirmDelete" class="btn btn-success ms-2" @click="confirmDelete = true">Delete Menu</button>
        <button v-else class="btn btn-danger ms-2" @click="deleteMenu">Are You Sure?</button>
      </div>
    </div>
  </div>

  <back-button/>
</template>

<style scoped>
.detail-card {
  margin-bottom: 10px;
}

</style>