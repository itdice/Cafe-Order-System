<script setup>
import { useRouter } from "vue-router";
import { useCommonStore } from "@/stores/common.js";
import registerButton from "@/components/registerButton.vue";

const router = useRouter();
const common = useCommonStore();
common.changeTitle("IT DICE Cafe - Order");

// Get order list
import { ref } from "vue";
import { ORDER_API } from "@/utils/firebase_api.js";

const orders = ref([]);

const getOrders = async () => {
  const result = await ORDER_API.orders.findAll();
  console.log(result);
  orders.value = result;
}

getOrders();

// Move menu detail view
function moveMenuDetail(id) {
  router.push({ name: 'menus-detail', params: { id: id } });
}

// Move order detail view
function moveOrderDetail(id) {
  router.push({ name: 'orders-detail', params: { id: id } });
}

// Register option
const option = ref("orders");
</script>

<template>
  <div class="container mt-4">
    <h1 class="text-center font-weight-bold">Order List</h1>
    <ul class="list-group">
      <li v-for="order in orders" :key="order.id" class="list-group-item order-area"
          @click="() => {moveOrderDetail(order.id);}">
        <div class="d-flex justify-content-between">
          <span class="text-success">
            주문 번호 : #{{ order.id }}
          </span>
        </div>
        <div class="d-flex justify-content-between">
          <span class="fw-bold fs-5">
            {{ order.menu_name }}
          </span>
          <span class="fw-bold fs-5">{{ order.quantity }}</span>
        </div>
        <div class="text-muted">{{ order.request_detail }}</div>
      </li>
    </ul>
  </div>

  <register-button :option="option"/>
</template>

<style scoped>
.order-area {
  cursor: pointer;
}
</style>