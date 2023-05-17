<template>
  <q-page class="q-pa-md">
    <div class="full-width">
      <q-img src="images/searchandstay.png" />
    </div>
    <div class="q-my-md" >
      <q-btn style="backgroundColor: #FB3B11" :class="$q.screen.gt.xs ? 'text-white' : 'text-white full-width'">
        <q-icon name="add" />
        Cadastro
      </q-btn>
    </div>
    <q-table
      :rows="rows"
      :columns="columns"
      row-key="name"
      :pagination="pagination"
      :loading="loading"
      flat
      bordered
    >
      <template #body-cell-show="props">
        <q-td :props="props" auto-width>
          <q-btn flat :style="$q.dark.isActive ? 'color: #0C8CE9':'color : #1976D2'" :to="{name: 'show', params: { id: props.row.id }}" dense>
            <q-icon size="sm" name="open_in_new">

            <q-tooltip>
              Show
            </q-tooltip>
            </q-icon>
          </q-btn>
        </q-td>
      </template>
      <template #body-cell-active="props">
        <q-td key="active" :props="props" >
          <q-badge
            :label="props.row.active == 1 ? 'Yes' : 'No'"
            :color="props.row.active == 1 ? 'green' : 'red'"
          />
        </q-td>
      </template>
      <template #body-cell-acoes="props">
        <q-td :props="props" >
          <q-btn flat :style="$q.dark.isActive ? 'color: #0C8CE9':'color : #1976D2'" dense>
            <q-icon size="sm" name="edit">

              <q-tooltip>
              Edit
            </q-tooltip>
            </q-icon>
          </q-btn>
          <q-btn flat color="red-8" dense>
            <q-icon size="sm" name="delete">

              <q-tooltip>
              Delete
            </q-tooltip>
            </q-icon>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ListApi from "src/services/backend/Endpoints";

const loading = ref(false);
const pagination = {
  rowsPerPage: 10,
};

async function onIndex() {
  try {
    loading.value = true;
    const data = await ListApi.get();
    rows.value = data.data.data.entities;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  onIndex();
});

const rows = ref([]);
const columns = [
  {
    name: "show",
    align: "left",
    field: "show",
  },
  {
    name: "id",
    label: "ID",
    align: "left",
    field: "id",
  },
  {
    name: "name",
    label: "Name",
    align: "left",
    field: "name",
  },
  {
    name: "active",
    label: "Active",
    align: "left",
    field: "active",
  },
  {
    name: "order",
    label: "Order",
    align: "left",
    field: "order",
  },
  {
    name: "acoes",
    label: "Actions",
    align: "right",
    field: "acoes",
  },
];
</script>
