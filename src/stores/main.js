import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../router'
import Swal from 'sweetalert2'

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      recipeData: [],
      detailRecipe: [],
      bookmarkData: [],
      mealplanData: {},
      apiKey: 'db64978c-974a-49c3-b2e2-70e6bd64d1d2',
      static_url: 'http://localhost:3000',
      token : localStorage.access_token
    }
  },
  actions: {
    async loginHandler(email, password) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${this.static_url}/login`,
          data: {
            email, password
          }
        })
        localStorage.setItem('access_token', data.access_token)
        this.token = localStorage.access_token
        router.push('/')
        Swal.fire({
          title: "Success Login!",
          icon: "success"
        })
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error Login!",
          text: error.response.data.message,
          icon: "error"
        })
      }
    },

    async registerHandler(username, email, password){
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${this.static_url}/register`,
          data: {
            username, email, password
          }
        })
        router.push('/')
        Swal.fire({
          title: "Success Register!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        })
      } catch (error) {
        console.log(error);
      }
    },

    logoutHandler() {
      localStorage.removeItem('access_token')
      this.token = ''
      router.push('/')
    },

    async fetchRecipe(search) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `https://forkify-api.herokuapp.com/api/v2/recipes?search=${search ? search : 'pizza'}&key=${this.apiKey}`
        })
        this.recipeData = data
      } catch (error) {
        console.log(error);
      }
    },

    async fetchDetail(id){
      try {
        const { data } = await axios({
          method: 'GET',
          url: `https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=${this.apiKey}`
        })
        this.detailRecipe = data
      } catch (error) {
        console.log(error);
      }
    },

    async addBookmark(RecipeId, image_url, publisher, title){
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${this.static_url}/bookmark/${RecipeId}`,
          data: {
            image_url, publisher, title
          },
          headers: {
            access_token : localStorage.access_token
          }
        })
      } catch (error) {
        console.log(error);
      }
    },

    async getBookmark() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${this.static_url}/bookmark`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.bookmarkData = data
      } catch (error) {
        console.log(error);
      }
    },

    async getMealplan() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${this.static_url}/mealplan`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.mealplanData = data
      } catch (error) {
        console.log(error);
      }
    },

    async subscribeMail(email) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${this.static_url}/`,
          data: {
            email
          }
        })
        Swal.fire({
          toast: true,
          position: 'top',
          title: "Subscribed to newsletter!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        })
        console.log(data);
      } catch (error) {
        
      }
    }
  }
})
