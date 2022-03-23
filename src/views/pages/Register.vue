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

        <!-- login form -->
        <v-card-text>
          <v-form @submit="createCompany">
            <v-text-field
              v-model="companyName"
              outlined
              label="Nome da empresa"
              placeholder="AutoCenter Top"
              hide-details
              class="mb-3"
            ></v-text-field>

            <v-text-field
              v-model="email"
              outlined
              label="Email"
              placeholder="john@example.com"
              hide-details
              class="mb-3"
            ></v-text-field>

            <v-text-field
              v-model="phone"
              outlined
              label="Telefone"
              placeholder="11 1234 1234"
              hide-details
              class="mb-3"
            ></v-text-field>

            <v-text-field
              v-model="name"
              outlined
              label="Seu nome"
              placeholder="Meu Nome"
              hide-details
              class="mb-3"
            ></v-text-field>

            <v-text-field
              v-model="login"
              outlined
              label="Login"
              placeholder="meu.nome"
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
            <v-alert
              v-if="ok"
              id="alert"
              type="success"
            >
              {{ ok }}
            </v-alert>
            <v-btn
              type="submit"
              block
              color="primary"
              class="mt-6"
            >
              Cadastrar
            </v-btn>
          </v-form>
        </v-card-text>

        <!-- create new account  -->
        <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
          <span class="me-2">
            Já possui uma conta?
          </span>
          <router-link :to="{ name:'pages-login' }">
            Entrar
          </router-link>
        </v-card-text>
      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img
      class="auth-mask-bg"
      height="190"
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
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import axios from 'axios'
import router from '@/router'

export default {
  data() {
    return {
      companyName: null,
      email: null,
      phone: null,
      name: null,
      login: null,
      password: null,
      company_id: null,
      isPasswordVisible: false,
      alert: null,
      ok: null,
      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
    }
  },
  methods: {
    async createCompany(e) {
      e.preventDefault()

      if (!this.companyName || !this.email || !this.phone || !this.name || !this.login || !this.password) {
        this.alert = 'Informe todos os dados da empresa'
        // eslint-disable-next-line newline-before-return
        return
      }

      const data = {
        companyName: this.companyName,
        email: this.email,
        phone: this.phone,
        name: this.name,
        login: this.login,
        password: this.password,
      }

      axios.post(`${process.env.VUE_APP_ROOT_API}/company/create`, data, {
        headers: { 'content-Type': 'application/json' },
      // eslint-disable-next-line arrow-parens
      }).then((response) => {
        this.alert = null
        this.ok = response.data.message
        setTimeout(() => {
          //router.push({ name: 'pages-login' })
          const dataLogin = {
            login: this.login,
            password: this.password,
          }
          axios.post(`${process.env.VUE_APP_ROOT_API}/session/login`, dataLogin, {
            headers: { 'content-Type': 'application/json' },
          }).then((response) => {
            localStorage.setItem('token', JSON.stringify(response.data.token))
            router.push({ name: 'dashboard' })
          })
        }, 3000)
        console.log(response.data.message)
      // eslint-disable-next-line arrow-parens
      }).catch((err) => {
        console.log(err.response.data.message)
        this.alert = err.response.data.message
      })
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
