<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="columns is-centered">
    <div class="column is-half">
      <h1>Registro de usuários</h1>
      <hr>

      <div class="notification is-warning" v-if="error != undefined">
        <p>{{error}}</p>
      </div>

      <p>Nome</p>
      <input class="input" type="text" v-model="name" placeholder="Nome do usuário"><br><br>
      <p>E-mail</p>
      <input class="input" type="email" v-model="email" placeholder="E-mail"><br><br>
      <p>Senha</p>
      <input class="input" type="password" v-model="password" placeholder="Senha">
      <br><br>
      <button @click="register" class="button is-success">Cadastrar</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data(){
    return{
      name: '',
      email: '',
      password: '',
      error: undefined
    }
  },
  methods:{
    register(){
      
      const url = "http://localhost:3000";
      
      const user = {
        name: this.name,
        email: this.email,
        password: this.password
      }

      axios.post(url+"/user", user).then(() => {
        this.$router.push({name: 'home'})
      }).catch(err => {
        this.error = err.response.data.err
        //console.log(err.response.data.err)
      })
     
    }
  }
}
</script>

<style>

</style>