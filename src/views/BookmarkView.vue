<script>
import Card from '../components/Card.vue'
import axios from 'axios';

export default {
  components: {
    Card
  },
  data() {
    return {
      bookmarkData: []
    }
  },
  methods: {
    async getBookmark() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: 'http://localhost:3000/bookmark',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.bookmarkData = data
      } catch (error) {
        console.log(error);
      }
    }
  },
  created(){
    this.getBookmark()
  }
}
</script>

<template>
  <div style="background-color: #F5EFE6; padding-top: 100px;">
    <div class="col-lg-12 col-sm-6 col-md-8 d-flex flex-row flex-wrap justify-content-center">

      <Card v-for="recipes in bookmarkData" :recipes="recipes" />

    </div>
  </div>
</template>

<style></style>
