<template>
  <div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs active-color="orange-8">
      <q-breadcrumbs-el icon="list" label="List" to="/" />
      <q-breadcrumbs-el icon="search" label="Show" />
    </q-breadcrumbs>
  </div>
  <LoadingRequest v-if="loading" />

  <div class="q-pa-md">
    <q-card class="q-pa-md">
      <div class="row q-col-gutter-md">
        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3">
          <p class="text-bold text-center">ID</p>
          <p class="text-center">{{ data.id }}</p>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3">
          <p class="text-bold text-center">Name</p>
          <p class="text-center">{{ data.name }}</p>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3">
          <p class="text-bold text-center">Active</p>
          <div class="flex justify-center">
            <q-badge
              :label="data.active == 1 ? 'Yes' : 'No'"
              :color="data.active == 1 ? 'green' : 'red'"
            />
          </div>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3">
          <p class="text-bold text-center">Order</p>
          <p class="text-center">{{ data.order }}</p>
        </div>
      </div>
    </q-card>
  </div>
</template>
<script setup>
import { onMounted, ref, computed } from "vue";
import LoadingRequest from "src/components/spinner/LoadingRequest.vue";
import { useRouter } from "vue-router";
import ListApi from "src/services/backend/Endpoints";
import { useShowStore } from "src/stores/showstore";

const loading = ref(false);
const id = useRouter().currentRoute.value.params.id;
const data = computed(() => {
  return useShowStore().dataShow;
});

async function show() {
  try {
    loading.value = true;
    const { data } = await ListApi.show(id);
    loading.value = false;
    return data;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  show();
});
</script>
<style></style>
