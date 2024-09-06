<script setup>
import { useRoute, useRouter } from "vue-router";
import { useCommonStore } from "@/stores/common.js";
import backButton from "@/components/BackButton.vue";

const route = useRoute();
const router = useRouter();
const common = useCommonStore();
common.changeTitle("IT DICE Cafe - Order");

// Get menu detail
import { ref } from 'vue';
import { ORDER_API } from "@/utils/firebase_api.js";

const menuData = ref({});

const getMenu = async (id) => {
  const result = await ORDER_API.menus.findOne(id);
  console.log(result);
  menuData.value = result;
}

getMenu(route.query.menuID);

// Prepare new order
const quantity = ref(1);
const requestDetail = ref("");

// Create new order
const createOrder = async () => {
  const result = await ORDER_API.orders.create(route.query.menuID, quantity.value, requestDetail.value);
  console.log(result);
  
  await router.push({ name: 'orders' });
}

// Get order detail
const orderData = ref({});

const getOrder = async (id) => {
  const orderResult = await ORDER_API.orders.findOne(id);
  console.log(orderResult);
  orderData.value = orderResult;
}

// Show order detail
const showOrderData = async () => {
  await getOrder(route.query.orderID);
  quantity.value = orderData.value.quantity;
  requestDetail.value = orderData.value.request_detail;
}

if (route.query.option === "edit") {
  showOrderData();
}

// Edit order
const editOrder = async () => {
  const result = await ORDER_API.orders.update(route.query.orderID, route.query.menuID,
      quantity.value, requestDetail.value);
  console.log(result);

  await router.push({ name: 'orders-detail', params: { id: route.query.orderID } });
}

// order handler
const orderHandler = async () => {
  if (route.query.option === "new")
    await createOrder();
  else if (route.query.option === "edit")
    await editOrder();
}

// Move change Menu
function moveNewChangeMenu() {
  router.push({ name: 'orders-menu-select', query: { option: "new" } });
}

function moveEditChangeMenu() {
  router.push({ name: 'orders-menu-select', query: { option: "edit", orderID: route.query.orderID } });
}

// create menu change / edit menu change handler
function moveMenuHandler() {
  if (route.query.option === "new")
    moveNewChangeMenu();
  else if (route.query.option === "edit")
    moveEditChangeMenu();
}

</script>

<template>
  <div class="container mt-3">
    <h1 class="text-center font-weight-bold mb-3">
      {{(route.query.option === "new" ? "Create New Order" : "Edit Order")}}
    </h1>
    <form @submit.prevent="orderHandler">
      <div class="card mb-4">
        <div class="card-body">
          <div class="row">
            <!-- 메뉴 섹션 -->
            <div class="col-12 d-flex mb-3">
              <img :src="menuData.image_src" alt="menu image" class="img-fluid me-3 menu-img">
              <div>
                <h5 class="fw-bold">{{ menuData.name }}</h5>
                <p class="multi-line-text-truncate">{{ menuData.description }}</p>
              </div>
            </div>
            <hr class="bg-secondary">
            <!-- 주문 수량 섹션 -->
            <div class="mb-3 col-12 d-flex justify-content-between align-items-center">
              <h6 class="fw-bold mb-0 quantity-text">주문 수량</h6>

              <div class="input-group quantity-area">
                <button class="btn btn-outline-secondary" type="button" @click="quantity > 1 && quantity--">-</button>
                <input type="text" class="form-control text-center fs-4" v-model="quantity" readonly>
                <button class="btn btn-outline-secondary" type="button" @click="quantity++">+</button>
              </div>
            </div>
            <hr class="bg-secondary">
            <!-- 요청 사항 섹션 -->
            <div class="col-12">
              <h6 class="fw-bold">요청 사항</h6>

              <textarea class="form-control border-1" v-model="requestDetail"
                        placeholder="요청사항을 입력하세요..."></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- 메뉴 다시 선택 / 메뉴 생성 버튼 섹션 -->
      <div class="mt-4 d-flex justify-content-center">
        <button class="btn btn-lg btn-secondary me-2" @click="() => { moveMenuHandler(); }">
          Change Menu
        </button>
        <button class="btn btn-lg btn-success ms-2" @click="">
          {{(route.query.option === "new" ? "Create New Order" : "Edit Order")}}
        </button>
      </div>
    </form>
  </div>

  <back-button/>
</template>

<style scoped>
.menu-img {
  width: 150px;
}
.multi-line-text-truncate {
  overflow: hidden;
  max-width: 400px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin: 20px auto;
}
.quantity-text {
  min-width: 100px;
}
.quantity-area {
  max-width: 200px;
}
</style>