import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Users from '../views/Users.vue'
import axios from 'axios'

function adminAuth(to, from, next){
  if(localStorage.getItem("token") != undefined){

    var req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    }

    const url = "http://localhost:3000";
    axios.post(url+"/validate",{}, req).then(() => {
      next();
    }).catch(err => {
      console.log(err.response.data)
      next("/login");
    })
  } else {
    next("/login");
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/admin/users',
    name: 'users',
    component: Users,
    beforeEnter: adminAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
