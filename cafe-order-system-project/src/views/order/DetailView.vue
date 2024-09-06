<script setup>
import { useRoute, useRouter } from "vue-router";
import { useCommonStore } from "@/stores/common.js";
import backButton from "@/components/backButton.vue";

const route = useRoute();
const router = useRouter();
const common = useCommonStore();
common.changeTitle("IT DICE Cafe - Order");

// Get order detail
import { ref } from "vue";
import { ORDER_API } from "@/utils/firebase_api.js";

const orderData = ref({});

const getOrder = async (id) => {
  const orderResult = await ORDER_API.orders.findOne(id);
  console.log(orderResult);
  orderData.value = orderResult;
}

getOrder(route.params.id);

// Edit order
const editOrder = async (menuID, orderID) => {
  await router.push({ name: 'orders-register-update',
    query: { option: "edit",  menuID: menuID, orderID: orderID } });
};

// Delete order
const deleteOrder = async () => {
  await ORDER_API.orders.delete(route.params.id);
  await router.push({ name: 'orders' });
};

// confirm delete
const confirmDelete = ref(false);
</script>

<template>
  <div class="text-center text-success my-4">
    <h1>주문번호: #{{ route.params.id }}</h1>
  </div>
  <div class="container mt-3">
    <div class="card mb-4">
      <div class="card-body">
        <div class="row">
          <!-- 메뉴 섹션 -->
          <div class="col-12 d-flex mb-3">
            <img :src="orderData.menu_image_src" alt="menu image" class="img-fluid me-3 menu-img">
            <div>
              <h5 class="fw-bold">{{ orderData.menu_name }}</h5>
              <p class="multi-line-text-truncate">{{ orderData.menu_description }}</p>
            </div>
          </div>
          <hr class="bg-secondary">
          <!-- 주문 수량 섹션 -->
          <div class="mb-3 col-12 d-flex justify-content-between align-items-center">
            <h6 class="fw-bold mb-0">주문 수량</h6>
            <p class="display-4 mb-0">{{ orderData.quantity }}</p>
          </div>
          <hr class="bg-secondary">
          <!-- 요청 사항 섹션 -->
          <div class="col-12">
            <h6 class="fw-bold">요청 사항</h6>
            <p>{{ orderData.request_detail }}</p>
          </div>

          <!-- 주문 수정 버튼 섹션 -->
          <div class="mt-4 d-flex">
            <button class="btn btn-warning"
                    @click="() => {editOrder(orderData.menu_id.id, orderData.id)}">
              Edit Order
            </button>
            <button v-if="!confirmDelete" class="btn btn-success ms-2" @click="confirmDelete = true">Complete Order</button>
            <button v-else class="btn btn-danger ms-2" @click="deleteOrder">Are You Sure?</button>
          </div>
        </div>
      </div>
    </div>
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

</style>