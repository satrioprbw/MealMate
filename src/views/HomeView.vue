<script>
import { mapActions, mapState } from 'pinia';
import { useMainStore } from '../stores/main';
import Card from '../components/Card.vue'

export default {
  data() {
    return {
      searchInput: ''
    }
  },
  components: {
    Card
  },
  methods: {
    ...mapActions(useMainStore, ['fetchRecipe'])
  },
  computed: {
    ...mapState(useMainStore, ['recipeData'])
  },
  created() {
    this.fetchRecipe()
  }
}

</script>

<template>
  <div style="background-color: #F5EFE6; padding-top: 100px;">
    <div class="col-lg-12 col-sm-6 col-md-8 d-flex flex-row flex-wrap justify-content-center">
      <Card v-for="recipes in recipeData.data.recipes" :recipes="recipes" />
    </div>
  </div>
  <pre>{{ recipeData.data.recipes }}</pre>
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