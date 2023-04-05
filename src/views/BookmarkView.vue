<script>
import { mapActions, mapState } from 'pinia';
import Card from '../components/Card.vue'
import axios from 'axios';
import { useMainStore } from '../stores/main';

export default {
  components: {
    Card
  },
  data() {
    return {
      allData: ''
    }
  },
  methods: {
    ...mapActions(useMainStore, ['getBookmark']),
    
  },
  computed: {
    ...mapState(useMainStore, ['bookmarkData'])
  },
  async created() {
    await this.getBookmark()
    this.testing()
  }
}
</script>

<template>
  <div class="container h-100 pb-5 mb-5 pb-5" style=" margin-top: 100px; ;">
    <h1 class="text-center mb-5">My Recipe Bookmark</h1>
    <div class="overflow-auto mx-5 pb-5"
    style=" padding-bottom: 100px; height: 800px; background-color: #F1A661; border-radius: 10px;">
    <button @click.prevent="$router.push('/mealplan')" class="btn btn-dark text-center ms-5 my-3" type="button">My Meal Plan</button>
      <div class="col-lg-12 col-sm-6 col-md-8 d-flex flex-row flex-wrap justify-content-center">

        <Card v-for="recipes in bookmarkData" :recipes="recipes" />

      </div>
    </div>
  </div>
</template>

<style></style>
