<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="columns is-centered">
    <div class="column is-half">
      <h1>Edição de usuário</h1>
      <hr>

      <div class="notification is-warning" v-if="error != undefined">
        <p>{{error}}</p>
      </div>

      <p>Nome</p>
      <input class="input" type="text" v-model="name" placeholder="Nome do usuário"><br><br>
      <p>E-mail</p>
      <input class="input" type="email" v-model="email" placeholder="E-mail"><br>    
      <br><br>
      <button @click="update" class="button is-success">Editar</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  created(){

    var req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    }

    const url = "http://localhost:3000";
    axios.get(url+"/user/"+this.$route.params.id, req).then(res => {
      this.id = res.data.id;
      this.name = res.data.name;
      this.email = res.data.email;
    }).catch(() => {
      //console.log(err.response.data.err)
      this.$router.push({name: "users"})
    })
  },
  data(){
    return{
      id: -1,
      name: '',
      email: '',
      error: undefined
    }
  },
  methods:{
    update(){

      var req = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
      
      const url = "http://localhost:3000";
      
      const user = {
        id: this.id,
        name: this.name,
        email: this.email
      }

      axios.put(url+"/user", user, req).then(() => {
        this.$router.push({name: 'users'})
      }).catch(err => {
        this.error = err.response.data.err
        console.log(err.response.data.err)
      })
     
    }
  }
}
</script>

<style>

</style>