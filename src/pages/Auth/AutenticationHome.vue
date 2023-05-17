<template>
  <div class="row main_page">
    <div class="gt-sm col-8 flex items-center">
      <q-img src="images/wallpaper.jpg" style="min-height: 100%" />
    </div>
    <div
      class="col-xs-12 col-sm-12 col-md-4 col-lg-4 flex items-center justify-center q-pa-md"
      :class="$q.screen.lt.md ? 'card_div' : ''"
    >
      <q-card class="full-width q-pa-md" style="height: 400px">
        <div class="flex justify-center">
          <q-avatar>
            <img src="icons/logo.png" alt="" />
          </q-avatar>
        </div>
        <div class="flex-col q-gutter-md q-mt-md">
          <p class="text-h5 text-center">Entre com suas credenciais</p>
          <div>
            <label>Login</label>
            <q-input outlined dense></q-input>
          </div>
          <div>
            <label>Senha</label>
            <q-input outlined dense></q-input>
          </div>
          <div>
            <q-btn @click="login" style="width: 100%" color="primary">
              Login
            </q-btn>
          </div>

          <q-separator />
        </div>
      </q-card>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from 'src/stores/authstore'
import { onMounted } from "vue";

const auth = useAuthStore()
const router = useRouter()

function login () {
localStorage.setItem('token', '40fe071962846075452a4f6123ae71697463cad20f51e237e2035b41af0513d8')
 auth.loggin(true)
 router.push('/')
}

onMounted(() => {
  auth.$reset
})

</script>
<style>
.main_page {
  height: 100vh;
}

.card_div {
  background: url("src/assets/background-card.jpg");
  background-size: cover;
}

</style>
