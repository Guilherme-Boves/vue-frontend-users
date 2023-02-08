<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="columns is-centered">
    <div class="column is-half">
      <h1>Login</h1>
      <hr>

      <div class="notification is-warning" v-if="error != undefined">
        <p>{{error}}</p>
      </div>

      <p>E-mail</p>
      <input class="input" type="email" v-model="email" placeholder="E-mail"><br><br>
      <p>Senha</p>
      <input class="input" type="password" v-model="password" placeholder="Senha">
      <br><br>
      <button @click="login" class="button is-success">Entrar</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data(){
    return{      
      email: '',
      password: '',
      error: undefined
    }
  },
  methods:{
    login(){
      
      const url = "http://localhost:3000";
      
      const user = {        
        email: this.email,
        password: this.password
      }

      axios.post(url+"/login", user).then(() => {
        this.$router.push({name: 'home'})
      }).catch(err => {
        this.error = err.response.data.err
      })
     
    }
  }
}
</script>

<style>

</style>