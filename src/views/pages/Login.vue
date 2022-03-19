<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link
            to="/"
            class="d-flex align-center"
          >
            <v-img
              :src="require('@/assets/images/logos/logo.svg')"
              max-height="30px"
              max-width="30px"
              alt="logo"
              contain
              class="me-3 "
            ></v-img>

            <h2 class="text-2xl font-weight-semibold">
              Materio
            </h2>
          </router-link>
        </v-card-title>

        <!-- title -->
        <v-card-text>
          <p class="mb-2">
            Entre com seu login ou e-mail
          </p>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-form @submit="login">
            <v-text-field
              v-model="email"
              outlined
              label="Login"
              placeholder="nome.sobrenome ou nome@email.com"
              hide-details
              class="mb-3"
            ></v-text-field>

            <v-text-field
              v-model="password"
              outlined
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Senha"
              placeholder="············"
              :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              hide-details
              @click:append="isPasswordVisible = !isPasswordVisible"
            ></v-text-field>
            <v-alert
              v-if="alert"
              id="alert"
              type="error"
            >
              {{ alert }}
            </v-alert>
            <div class="d-flex align-center justify-space-between flex-wrap">
              <!-- forgot link -->
              <a
                href="javascript:void(0)"
                class="mt-1"
              >
                Esqueceu a senha?
              </a>
            </div>

            <v-btn
              type="submit"
              block
              color="primary"
              class="mt-6"
            >
              Login
            </v-btn>
          </v-form>
        </v-card-text>

        <!-- create new account  -->
        <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
          <span class="me-2">
            Ainda não possui uma conta?
          </span>
          <router-link :to="{name:'pages-register'}">
            Crie sua conta
          </router-link>
        </v-card-text>
      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img
      class="auth-mask-bg"
      height="173"
      :src="require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark':'light'}.png`)"
    >

    <!-- tree -->
    <v-img
      class="auth-tree"
      width="247"
      height="185"
      src="@/assets/images/misc/tree.png"
    ></v-img>

    <!-- tree  -->
    <v-img
      class="auth-tree-3"
      width="377"
      height="289"
      src="@/assets/images/misc/tree-3.png"
    ></v-img>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { /* mdiFacebook, mdiTwitter, mdiGithub, mdiGoogle, */ mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import router from '@/router'

export default {
  data() {
    return {
      isPasswordVisible: false,
      email: '',
      password: '',
      alert: '',

      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
    }
  },
  methods: {
    async login(e) {
      e.preventDefault()
      const user = { login: this.email, password: this.password }

      if (!this.login || !this.password) {
        this.alert = 'Informe login e senha'
        // eslint-disable-next-line newline-before-return
        return
      }

      const userJson = JSON.stringify(user)
      await fetch('http://localhost:5000/user/login', {
        method: 'POST',
        headers: { 'content-Type': 'application/json' },
        body: userJson,
      }).then(response => response.json().then(data => ({
        data,
        status: response.status,
      })).then(res => {
        if (res.status === 422) {
          this.alert = res.data.message
          console.log(res.data)
        } else if (res.status === 200) {
          localStorage.setItem('token', JSON.stringify(res.data.token))
          router.push({ name: 'dashboard' })
        }
      }))
    },
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
#alert{
  margin-top: 10px;
}
</style>
