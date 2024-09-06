<script setup>
import { useRoute, useRouter } from "vue-router";
import { useCommonStore } from "@/stores/common.js";
import backButton from "@/components/backButton.vue";

const route = useRoute();
const router = useRouter();
const common = useCommonStore();
common.changeTitle("IT DICE Cafe - Menu");

// Prepare new menu
import { ref } from 'vue';
import { ORDER_API } from "@/utils/firebase_api.js";

const menuName = ref("");
const menuDescription = ref("");
const menuImageFile = ref(null);

function fileSetting(file) {
  menuImageFile.value = file.target.files[0];
}

// create new menu
const createMenu = async () => {
  const result = await ORDER_API.menus.create(menuName.value, menuDescription.value, menuImageFile.value);
  console.log(result);

  await router.push({ name: 'menus' });
}

// Get menu detail
const menuData = ref({});

const getMenu = async (id) => {
  const result = await ORDER_API.menus.findOne(id);
  console.log(result);
  menuData.value = result;
}

// Show menu detail
const showMenuData = async () => {
  await getMenu(route.params.id);
  menuName.value = menuData.value.name;
  menuDescription.value = menuData.value.description;
}

if (route.params.id) {
  showMenuData();
}

// edit menu
const editMenu = async () => {
  const result = ORDER_API.menus.update(route.params.id, menuName.value, menuDescription.value);
  console.log(result);

  if (menuImageFile.value) {
    console.log("Edit Image!!!");
    console.log(menuImageFile.value);
    await ORDER_API.menus.updateImage(menuData.value, menuImageFile.value);
  }

  await router.push({ name: 'menus-detail', params: { id: route.params.id } });
}

// menu create, edit handler
const menuHandler = async () => {
  if (route.params.id)
    await editMenu();
  else
    await createMenu();
}
</script>

<template>
  <div class="container mt-4">
    <h1 class="text-center font-weight-bold">{{ (route.params.id ? "Edit Menu" : "Add New Menu") }}</h1>
    <form @submit.prevent="menuHandler">
      <div class="form-group mb-3">
        <label for="menuName">Menu Name</label>
        <input
            type="text"
            id="menuName"
            v-model="menuName"
            class="form-control"
            placeholder="Enter menu name"
        />
      </div>
      <div class="form-group mb-3">
        <label for="menuDescription">Menu Description</label>
        <textarea
            id="menuDescription"
            v-model="menuDescription"
            class="form-control"
            rows="3"
            placeholder="Enter menu description"
        ></textarea>
      </div>
      <div class="form-group mb-3">
        <label for="menuImageFile">Menu Image File</label>
        <input
            type="file"
            id="menuImageFile"
            @change="fileSetting"
            class="form-control"
        />
      </div>
      <button type="submit" class="btn btn-success">{{ (route.params.id ? "Edit Menu" : "Create Menu") }}</button>
    </form>
  </div>

  <back-button/>
</template>

<style scoped>

</style>