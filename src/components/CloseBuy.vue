
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
      dataPerPage: [],
      map: ''
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
    createMarker(place) {
      try {
        if (!place.geometry || !place.geometry.location) return
        const placesList = document.getElementById("places")

        const marker = new google.maps.Marker({
          map: this.map,
          position: place.geometry.location
        })

        google.maps.event.addListener(marker, "click", () => {
          infowindow.setContent(place.name || "")
          infowindow.open(this.map)
        })
      } catch (error) {
        console.log(error);
      }
    },
    initMap() {
      try {
        const city = { lat: this.latitude, lng: this.longitude }

        this.map = new google.maps.Map(
          document.getElementById("map"),
          {
            center: city,
            zoom: 17
          })

        const request = {
          query: "Grocery Store",
          fields: ['name', 'geometry']
        }

        const service = new google.maps.places.PlacesService(this.map)
        // let getNextPage
        // const moreButton = document.getElementById("more")
        // moreButton.onclick = function () {
        //   moreButton.disabled = true
        //   if (getNextPage) {
        //     getNextPage 
        //   }
        // }

        // service.nearbySearch(
        // {location: city, radius: 500, type: "store"},
        // (results, status, pagination) => {
        //   if(status !== 'OK' || !results) return

          // this.addPlaces(results, this.map)
          // moreButton.disabled = !pagination || !pagination.hasNextPage
          // if(pagination && pagination.hasNextPage) {
          //   getNextPage = () => {
          //     pagination.nextPage()
          //   }
          // }
        // }
        // )

        service.findPlaceFromQuery(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            for (let i = 0; i < results.length; i++) {
              this.createMarker(results[i])
            }

            this.map.setCenter(results[0].geometry.location)
          }
        })
      } catch (error) {
        console.log(error);
      }
    },
    addPlaces(places, map) {
      const placesList = document.getElementById("places");

      for (const place of places) {
        if (place.geometry && place.geometry.location) {
          const image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25),
          };

          new google.maps.Marker({
            map,
            icon: image,
            title: place.name,
            position: place.geometry.location,
          });

          const li = document.createElement("li");

          li.textContent = place.name;
          placesList.appendChild(li);
          li.addEventListener("click", () => {
            map.setCenter(place.geometry.location);
          });
        }
      }
    }
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
    window.initMap = this.initMap
  }
}
</script>

<template>
  <!-- <div id="map">
    </div> -->
</template>

<style>
#map {
  height: 500px;
  width: 100%;
}

/* 
 * Optional: Makes the sample page fill the window. 
 */
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>