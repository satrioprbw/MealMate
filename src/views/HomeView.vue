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
    ...mapActions(useMainStore, ['fetchRecipe']),
    handleSearch() {
      this.fetchRecipe(this.searchInput)
    }
  },
  computed: {
    ...mapState(useMainStore, ['recipeData', 'token'])

  },
  created() {
    this.fetchRecipe()
  }
}

</script>

<template>
  <div class="container h-100 pb-5 mb-5 pb-5" style=" margin-top: 100px; ;">
    <h1 class="text-center mb-5">Search Recipes</h1>
    <form @submit.prevent="handleSearch" class="justify-content-center col-3 ms-5">
      <div class="input-group mb-3">
        <button class="btn btn-outline-secondary" type="submit" id="button-addon1">Search</button>
        <input v-model="searchInput" type="text" class="form-control" placeholder="" aria-label="Example text with button addon"
          aria-describedby="button-addon1">
      </div>
    </form>
    <div class="overflow-auto mx-5 pb-5"
      style=" padding-bottom: 100px; height: 800px; background-color: #F1A661; border-radius: 10px;">
      <div class="col-lg-12 col-sm-6 col-md-8 d-flex flex-row flex-wrap justify-content-center">
        <Card v-for="recipes in recipeData.data.recipes" :recipes="recipes" />
      </div>
    </div>
  </div>
</template>

<style>
.center {
  text-align: center;
}

.pagination {
  display: inline-block;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  transition: background-color .3s;
  border: 1px solid #ddd;
  margin: 0 4px;
}

.pagination a.active {
  background-color: #4CAF50;
  color: white;
  border: 1px solid #4CAF50;
}

.pagination a:hover:not(.active) {
  background-color: #ddd;
}

.pagination button {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  transition: background-color .3s;
  border: 1px solid #ddd;
  margin: 0 4px;
}

.pagination button.active {
  background-color: #4CAF50;
  color: white;
  border: 1px solid #4CAF50;
}

.pagination button:hover:not(.active) {
  background-color: #ddd;
}
</style>