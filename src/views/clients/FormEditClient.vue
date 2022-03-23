<template>
  <v-form class="multi-col-validation">
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="nome"
          label="Nome"
          outlined
          dense
          placeholder="Nome"
          hide-details
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="apelido"
          label="Apelido"
          outlined
          dense
          placeholder="Apelido"
          hide-details
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="email"
          label="Email"
          outlined
          dense
          placeholder="Email"
          hide-details
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="phone"
          label="Telefone"
          outlined
          dense
          placeholder="Telefone"
          hide-details
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="endereco"
          label="Endereço"
          outlined
          dense
          placeholder="Endereço"
          hide-details
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="bairro"
          label="Bairro"
          outlined
          dense
          placeholder="Bairro"
          hide-details
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="cidade"
          label="Cidade"
          outlined
          dense
          placeholder="Cidade"
          hide-details
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="uf"
          label="Estado"
          outlined
          dense
          placeholder="Estado"
          hide-details
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="cep"
          label="CEP"
          outlined
          dense
          placeholder="CEP"
          hide-details
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="complemento"
          label="Complemento"
          outlined
          dense
          placeholder="Complemento"
          hide-details
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-checkbox
          v-model="ativo"
          label="Ativo"
          class="mt-0"
          hide-details
        ></v-checkbox>
      </v-col>
      <v-alert
        v-if="ok"
        id="alert"
        type="success"
      >
        {{ ok }}
      </v-alert>
      <v-alert
        v-if="alert"
        id="alert"
        type="error"
      >
        {{ alert }}
      </v-alert>
      <v-col cols="12">
        <v-btn
          color="primary"
          @click="editClient(id)"
        >
          Salvar
        </v-btn>
        <v-btn
          color="error"
          outlined
          class="mx-2"
        >
          Excluir
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import axios from 'axios'
import router from '@/router'

export default {
  name: 'FormEditClient',
  data() {
    return {
      id: null,
      nome: null,
      apelido: null,
      email: null,
      phone: null,
      cpf_cnpj: null,
      endereco: null,
      bairro: null,
      cidade: null,
      uf: null,
      cep: null,
      complemento: null,
      ativo: null,
      url_data: null,
      client: [],
      alert: '',
      ok: '',
    }
  },
  mounted() {
    this.url_data = this.$route.params.id
    this.getClient()
    console.log(this.client)
  },
  methods: {
    async getClient() {
      console.log('clients > clientview')

      // console.log(this.url_data)
      const authString = `Bearer ${localStorage.getItem('token')}`

      axios
        .get(`${process.env.VUE_APP_ROOT_API}/client/view`, {
          headers: {
            authorization: authString,
            Client_id: this.url_data,
          },
          'Content-Type': 'multipart/form-data',
        })
        // eslint-disable-next-line arrow-parens
        .then((response) => {
          this.nome = response.data.cliente.nome
          this.apelido = response.data.cliente.apelido
          this.email = response.data.cliente.email
          this.phone = response.data.cliente.phone
          this.cpf_cnpj = response.data.cliente.cpf_cnpj
          this.endereco = response.data.cliente.endereco
          this.bairro = response.data.cliente.bairro
          this.cidade = response.data.cliente.cidade
          this.uf = response.data.cliente.uf
          this.cep = response.data.cliente.cep
          this.complemento = response.data.cliente.complemento
          this.ativo = response.data.cliente.ativo
          this.url_data = response.data.cliente.url_data
          this.client = response.data.cliente
          // eslint-disable-next-line no-underscore-dangle
          this.id = response.data.cliente._id
        })
        // eslint-disable-next-line arrow-parens
        .catch(err => {
          if (err.response.status === 401) {
            console.log(err.response.status)
            localStorage.clear()
            router.push({ name: 'pages-login' })
          }
        })
    },
    async editClient(req) {
      console.log('editar cliente')
      const data = {
        nome: this.nome,
        apelido: this.apelido,
        email: this.email,
        phone: this.phone,
        cpf_cnpj: this.cpf_cnpj,
        endereco: this.endereco,
        numero: this.numero,
        bairro: this.bairro,
        cidade: this.cidade,
        uf: this.uf,
        cep: this.cep,
        complemento: this.complemento,
        ativo: this.ativo,
        url_data: this.url_data,
        id: req,
      }
      const authString = `Bearer ${localStorage.getItem('token')}`

      axios.post(`${process.env.VUE_APP_ROOT_API}/client/edit`, data, {
        headers: {
          'Content-Type': 'application/json',
          authorization: authString,
        },
      // eslint-disable-next-line arrow-parens
      }).then((response) => {
        if (response.status === 201) {
          this.alert = response.data.message
          setTimeout(() => { this.alert = '' }, 4000)
        } else if (response.status === 200) {
          this.ok = response.data.message
          setTimeout(() => { this.ok = '' }, 4000)
        }
        console.log(response.data.message)
      // eslint-disable-next-line arrow-parens
      }).catch((error) => {
        console.log(error)
        this.alert = error
        setTimeout(() => { this.alert = '' }, 4000)
      })
    },
    async deleteClient(req) {
      console.log('excluir cliente')
      console.log(req)
    },
  },
}
</script>
<style scoped>
#alert{
  margin-top: 10px;
  width: 100%;
}
</style>
