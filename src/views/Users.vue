<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="columns is-centered ">
    <div class="column is-half">
      <strong>Painel Administrativo</strong>
      <hr>
      <table class="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Cargo</th>
            <th>Ações</th>
          </tr>
        </thead>  
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{user.id}}</td>
            <td>{{user.name}}</td>
            <td>{{user.email}}</td>
            <td v-if="user.role == 0">Usuário Comum</td>
            <td v-else>Admin</td>            
            <td>
              <router-link :to="{name: 'userEdit', params:{id: user.id}}">
                <button class="button is-warning">Editar</button>
              </router-link> <button @click="showDeleteModal(user.id)" class="button is-danger">Excluir</button></td>
          </tr>
        </tbody>
      </table>

      <div :class="{modal: true, 'is-active': showModal}">
        <div class="modal-background">

        </div>
        <div class="modal-content">
          <div class="card">
            <header class="card-header">
                        
            </header>
            <div class="card-content">
              <div class="content">
                <p>
                  Você realmente quer excluir esse usuário?
                </p>
              </div>
            </div>
            <footer class="card-footer">
              <a @click="hideModal" href="#" class="card-footer-item">Cancelar</a>
              <a @click="deleteUser" href="#" class="card-footer-item">Excluir</a>
            </footer>
          </div>
        </div>
        <button @click="hideModal" class="modal-close is-large" aria-label="close"></button>
      </div>

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
    axios.get(url+"/user", req).then(res => {
      this.users = res.data;
    }).catch(err => {
      console.log(err)
    })
  },
  data(){
    return{
      users: [],
      showModal: false,
      deleteUserId: -1
    }
  },
  methods:{
    hideModal: function(){
      this.showModal = false;
    },
    showDeleteModal: function(id){
      this.deleteUserId = id;
      this.showModal = true;
    },
    deleteUser: function(){
      var req = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
      const url = "http://localhost:3000";
      axios.delete(url+"/user/"+this.deleteUserId, req).then(() => {        
        this.showModal = false;
        this.users = this.users.filter(user => user.id != this.deleteUserId)
      }).catch(err => {
        console.log(err)
        this.showModal = false;
      })
    }
  }
}

</script>

<style scoped>

</style>