<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-orange-4">
        <q-toolbar-title> Search and Stay Task </q-toolbar-title>
        <q-space />
        <q-toggle
          v-model="isActiveDarkMode"
          @update:model-value="setDarkMode(isActiveDarkMode)"
          icon="nightlight"
          unchecked-icon="light_mode"
          :color="isActiveDarkMode ? 'black' : 'yellow'"
        ></q-toggle>
        <q-btn
          icon="logout"
          flat
          @click="
            useAuthStore().logout(), clearToken(), router.push('/autentication')
          "
        >
          <q-tooltip> Logout </q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useAuthStore } from "src/stores/authstore";
import { useRouter } from "vue-router";

const $q = useQuasar();
const router = useRouter();

function clearToken() {
  localStorage.removeItem("token");
}

const isActiveDarkMode = ref(false);

function setDarkMode(val) {
  localStorage.setItem("darkMode", val);
  $q.dark.set(val);
}

onMounted(() => {
  const theme = localStorage.getItem("darkMode");
  if (theme === "true") {
    isActiveDarkMode.value = true;
  } else isActiveDarkMode.value = false;
});
</script>
