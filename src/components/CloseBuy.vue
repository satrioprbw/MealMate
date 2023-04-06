
<script>
import { mapActions, mapState } from 'pinia';
import { useMainStore } from '../stores/main';
import Card from '../components/Card.vue'

export default {
  data() {
    return {
      searchInput: '',
      currentPage: 1,
      totalPages: 0,
      dataPerPage: []
    }
  },
  components: {
    Card
  },
  methods: {
    ...mapActions(useMainStore, ['fetchRecipe', 'getLocation']),
    handleSearch() {
      this.fetchRecipe(this.searchInput)
    },
    async initMap() {
      try {
        const city = { lat: this.latitude, lng: this.longitude }

        const map = new google.maps.Map(
          document.getElementById("map"),
          {
            center: city,
            zoom: 17
          })

          const request = {
            query: "Grocery Store",
            fields: ['name', 'geometry']
          }

        const service = new google.maps.places.PlacesService(map)
        service.findPlaceFromQuery(request, (results, status) => {
          // if(status === google.maps.places.PlacesServiceStatus.OK && results) {
          //   for (let i = 0; i < results.length; i++) {
          //     createMarker(results[i])
          //   }

          //   map.setCenter(results[0].geometry.location)
          // }
         })
      } catch (error) {
        console.log(error);
      }
    },

    // async createMarker(place) {
    //   try {
    //     if(!place.geometry || !place.geometry.location) return
    //     const placesList = document.getElementById("places")

    //     const marker = new google.maps.Marker({
    //       map,
    //       position: place.geometry.location
    //     })

    //     google.maps.event.addListener(marker, "click", () => {
    //       infowindow.setContent(place.name || "")
    //       infowindow.open(map)
    //     })
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  },
  computed: {
    ...mapState(useMainStore, ['recipeData', 'token', 'latitude', 'longitude'])

  },
  created() {
    this.fetchRecipe()
  },
  async mounted() {
    await this.getLocation()
     this.initMap()
    //  this.createMarker()
    window.initMap = this.initMap()
  }
}
</script>

<template>
  <div id="map">
test
  </div>
</template>