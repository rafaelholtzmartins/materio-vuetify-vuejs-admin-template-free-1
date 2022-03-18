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

      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
    }
  },
  methods: {
    async createCompany(e) {
      e.preventDefault()

      const dataCompany = {
        companyName: this.companyName,
        email: this.email,
        phone: this.phone,
      }

      const user = {
        login: this.login,
        email: this.email,
        phone: this.phone,
      }

      const userJson = JSON.stringify(user)
      let userExist = null
      await fetch('http://localhost:5000/user/getuseremailoginphone', {
        method: 'POST',
        headers: { 'content-Type': 'application/json' },
        body: userJson,
      }).then(response => response.json().then(data => ({
        data,
        status: response.status,
      })).then(res => {
        console.log(res.status, res.data.user)
        userExist = res.data.user
      }))
      console.log(userExist)
      if (userExist !== null) {
        console.log('existe um usuário cadastrado')
        // eslint-disable-next-line newline-before-return
        return
      }

      if (!this.companyName || !this.email || !this.phone) {
        console.log('preencha todos os dados')
      } else {
        const dataJson = JSON.stringify(dataCompany)
        // eslint-disable-next-line no-unused-vars
        const req = await fetch('http://localhost:5000/company/create', {
          method: 'POST',
          headers: { 'content-Type': 'application/json' },
          body: dataJson,
        }).then(response => response.json().then(data => ({
          data,
          status: response.status,
        })).then(res => {
          if (res.status === 422) {
            console.log(res.data.message)
          } else {
            // console.log(res.status, res.data.body._id)
            // eslint-disable-next-line no-underscore-dangle
            const companyId = res.data.body._id
            this.createUser(companyId)
            router.push({ name: 'pages-login' })
          }
        }))
      }
    },
    async createUser(companyId) {
      console.log('create user')

      const user = {
        name: this.name,
        email: this.email,
        login: this.login,
        phone: this.phone,
        whatsapp: this.whatsapp,
        companyId,
        password: this.password,
        master: true,
      }

      const userJson = JSON.stringify(user)

      await fetch('http://localhost:5000/user/create', {
        method: 'POST',
        headers: { 'content-Type': 'application/json' },
        body: userJson,
      }).then(response => response.json().then(data => ({
        data,
        status: response.status,
      })).then(res => {
        console.log(res.status, res.data.body)
      }))
    },
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
