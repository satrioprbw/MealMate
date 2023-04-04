import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../router'

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      recipeData: [],
      detailRecipe: [],
      apiKey: 'db64978c-974a-49c3-b2e2-70e6bd64d1d2',
      static_url: 'http://localhost:3000'
    }
  },
  actions: {
    async loginHandler(email, password) {
      console.log(email, password);
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${this.static_url}/login`,
          data: {
            email, password
          }
        })
        router.push('/')
      } catch (error) {
        console.log(error);
      }
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
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  }
})
