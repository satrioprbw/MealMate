<script>
import { mapActions, mapState } from 'pinia';
import { useMainStore } from '../stores/main';
import router from '../router';

export default {
  data(){
    return {
      recipe : this.recipes
    }
  },
  props: ['recipes'],
  computed: {
    ...mapState(useMainStore, ['recipeData'])
  },
  methods: {
    ...mapActions(useMainStore, ['addBookmark']),
    handleAdd(){
      this.addBookmark(this.recipe.id, this.recipe.image_url, this.recipe.publisher, this.recipe.title)
      router.push('/')
    }
  }
  
}
</script>

<template>
  <div class="card text-white bg-dark mx-2 " style="width: 15rem;">
    <img style=" filter: brightness (30%); height: 100px; object-fit: cover;" :src="recipes.image_url" class="card-img card-img-top " alt="...">
    <div class="card-body card-img-overlay d-flex flex-column justify-content-between text-monospace">
      <div class="mb-1">
        <h4 class="card-title text-truncate">{{ recipes.title }}</h4>
      </div>
      <!-- <div>
        <a href="#" class="btn mt-3" style="background-color: #AEBDCA;">Detail</a>
        
      </div> -->
      <div>
      </div>
    </div>
  </div>
</template>