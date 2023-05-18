<template>
  <div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs active-color="orange-8">
      <q-breadcrumbs-el icon="list" label="List" to="/" />
      <q-breadcrumbs-el
        icon="create"
        :label="option.option ? 'Create' : 'Edit'"
      />
    </q-breadcrumbs>
  </div>
  <div class="row flex justify-center q-mb-xs">
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
      <q-img
        src="images/melbourne.jpg"
        style="height: 300px; border-radius: 0.5%"
        class="shadow-7"
      />
    </div>
  </div>
  <div class="row flex justify-center">
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
      <q-card class="q-pa-md">
        <q-form
          @submit="
            {
              option.option ? create() : edit();
            }
          "
        >
          <p class="text-bold text-h5 text-center">
            {{ option.option ? "Create" : "Edit" }}
          </p>
          <div>
            <span class="text-bold">Name</span>
            <q-input
              v-model="form.house_rules.name"
              dense
              outlined
              hide-bottom-space=""
              :rules="[(v) => !!v || 'Type something!']"
            />
          </div>
          <div class="q-mt-md">
            <span class="text-bold">Active</span>
            <q-radio
              v-model="form.house_rules.active"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              default-checked
              color="green"
              :val="1"
              label="Yes"
            />
            <q-radio
              v-model="form.house_rules.active"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              color="red"
              :val="0"
              label="No"
            />
          </div>
          <q-btn class="full-width text-white bg-red-7" type="submit"
            >Save</q-btn
          >
        </q-form>
      </q-card>
    </div>
  </div>
  <div class="q-pa-md"></div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import ListApi from "src/services/backend/Endpoints";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useCreateOrEditStore } from "src/stores/createeditstore";

const $q = useQuasar();
const router = useRouter();
const option = useCreateOrEditStore();
const id = useRouter().currentRoute.value.params.id;

const form = ref({
  house_rules: {
    name: "",
    active: 1,
  },
});

async function create() {
  try {
    const data = await ListApi.create(form.value);
    $q.notify({
      color: "positive",
      message: `Form successfully sent! - <strong> ID: ${data.data.id} </strong>`,
      html: true,
      position: "top",
      progress: true,
    });
    router.push("/");
  } catch {
    $q.notify({
      color: "negative",
      message: "Something's wrong!",
      position: "top",
      progress: true,
    });
  }
}

async function edit() {
  try {
    const data = await ListApi.update(id, form.value);
    $q.notify({
      color: "positive",
      message: `Form successfully edited! - <strong> ID: ${data.data.id} </strong>`,
      html: true,
      position: "top",
      progress: true,
    });
    router.push("/");
  } catch {
    $q.notify({
      color: "negative",
      message: "Something's wrong!",
      position: "top",
      progress: true,
    });
  }
}

async function show() {
  try {
    const { data } = await ListApi.show(id);
    form.value.house_rules = { ...data };
    return data;
  } catch {
    $q.notify({
      color: "negative",
      message: "Something's wrong!",
      position: "top",
      progress: true,
    });
    router.push("/");
  }
}

onMounted(() => {
  if (!option.option) {
    show();
  }
  return;
});
</script>

<style></style>
