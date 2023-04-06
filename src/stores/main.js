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
      token: localStorage.access_token,
      city: '',
      region: '',
      country: '',
      longitude: 0,
      latitude: 0,
      map: ''
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

    async registerHandler(username, email, password) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${this.static_url}/register`,
          data: {
            username, email, password
          }
        })
        Swal.fire({
          title: "Success Register!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        })
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error Register!",
          text: error.response.data.message,
          icon: "error"
        })
      }
    },

    async googleLogin(response) {
      try {
        const { data } = await axios({
          method: "POST",
          url: `${this.static_url}/google-sign-in`,
          headers: {
            googletoken: response.credential
          }
        })
        localStorage.setItem('access_token', data.access_token)
        this.token = localStorage.access_token
        this.router.push('/')
        Swal.fire({
          title: "Success Login!",
          text: '',
          icon: "success"
        });
      } catch (error) {
        Swal.fire({
          title: "Error Login!",
          text: error.response.data.message,
          icon: "error"
        });
      }
    },

    logoutHandler() {
      localStorage.removeItem('access_token')
      this.token = ''
      router.push('/')
      Swal.fire({
        toast: true,
        position: 'top',
        title: "Success Logout!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      })
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
        Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error"
        })
      }
    },

    async fetchDetail(id) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=${this.apiKey}`
        })
        this.detailRecipe = data
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error"
        })
      }
    },

    async addBookmark(RecipeId, image_url, publisher, title) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${this.static_url}/bookmark/${RecipeId}`,
          data: {
            image_url, publisher, title
          },
          headers: {
            access_token: localStorage.access_token
          }
        })
        Swal.fire({
          title: data,
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        })
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error"
        })
      }
    },

    async removeBookmark(id) {
      try {
        const { data } = await axios({
          method: 'PATCH',
          url: `${this.static_url}/bookmark/${id}`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        Swal.fire({
          toast: true,
          position: 'top',
          title: data,
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        })
        this.getBookmark()
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error"
        })
      }
    },

    async addMealplan(id, day, order) {
      console.log(id, day, order);
      try {
        const { data } = await axios({
          method: 'PATCH',
          url: `${this.static_url}/bookmark/${id}`,
          data: {
            day, order
          },
          headers: {
            access_token: localStorage.access_token
          }
        })
        Swal.fire({
          toast: 'Success add to meal plan',
          position: 'top',
          title: data,
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        })
        this.getMealplan()
        router.push('/mealplan')
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error"
        })
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
        Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error"
        })
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
        Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error"
        })
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
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error"
        })
      }
    },

    async getLocation() {
      try {
        // if(navigator.geolocation){
        //   navigator.geolocation.getCurrentPosition((position) => {
        //     this.latitude = position.coords.latitude
        //     this.longitude = position.coords.longitude
        //     console.log(position.coords.latitude);
        //     console.log(position.coords.longitude);
        //   })
          // console.log(this.latitude, this.longitude);
        // }
        const API_KEY = 'b98cf529e2894fceba58417493983c0c'
        const API_URL = 'https://ipgeolocation.abstractapi.com/v1/?api_key=b98cf529e2894fceba58417493983c0c'
        const apiResponse = await fetch(API_URL)
        const data = await apiResponse.json()
        console.log(data);
        this.city = data.city
        this.region = data.region
        this.country = data.country
        this.longitude = data.longitude
        this.latitude = data.latitude
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error"
        })
      }
    },

    // async initMap() {
    //   try {
    //     const city = { lat: this.latitude, lng: this.longitude }

    //     infoWindow = new google.maps.infoWindow()
    //     const map = new google.maps.Map(
    //       document.getElementById("map"),
    //       {
    //         center: city,
    //         zoom: 17
    //       })
    //     const service = new google.maps.places.PlacesService(map)
    //     let getNextPage
    //     const moreButton = document.getElementById("more")

    //     moreButton.onclick = function () {
    //       moreButton.disabled = true
    //       if (getNextPage) {
    //         getNextPage
    //       }
    //     }

    //     service.nearbySearch(
    //       { location: city, radius: 500, type: "store" },
    //       (results, status, pagination) => {
    //         if (status !== 'OK' || !results) return

    //         addPlaces(results, map)
    //         moreButton.disabled = !pagination || !pagination.hasNextPage
    //         if (pagination && pagination.hasNextPage) {
    //           getNextPage = () => {
    //             pagination.nextPage()
    //           }
    //         }
    //       }
    //     )
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },

    // async addPlaces(places, map) {
    //   try {
    //     const placesList = document.getElementById("places")

    //     for (const place of places) {
    //       if (place.geometry && place.geometry.location) {
    //         const image = {
    //           url: place.icon,
    //           size: new google.maps.Size(71, 71),
    //           origin: new google.maps.Point(17, 34),
    //           scaledSize: new google.maps.Size(25, 25)
    //         }

    //         new google.maps.Marker({
    //           map,
    //           icon: image,
    //           title: place.name,
    //           position: place.geometry.location
    //         })

    //         const li = document.createElement("li")

    //         li.textContent = place.name
    //         placesList.appendChild(li)
    //         li.addEventListener("click", () => {
    //           map.setCenter(place.geometry.location)
    //         })
    //       }
    //     }

    //     window.initMap = this.initMap
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  }
})
