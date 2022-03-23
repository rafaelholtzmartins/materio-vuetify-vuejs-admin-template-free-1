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
          @click="newClient(id)"
        >
          Adicionar
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  name: 'FormNewClient',
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
  methods: {
    async newClient() {
      console.log('newClient')
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
