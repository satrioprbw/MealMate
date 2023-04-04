<script>
import { mapState } from 'pinia';
import { useMainStore } from '../stores/main';

export default {
  computed: {
    ...mapState(useMainStore, ['recipeData'])
  },
  props: ['recipes']
}
</script>

<template>
  <div class="card text-white mb-3 m-3 " style="width: 20rem; background-color: #7895B2;">
    <img style="height: 280px; object-fit: cover;" :src="recipes.image_url" class="card-img-top " alt="...">
    <div class="card-body d-flex flex-column justify-content-between text-monospace">
      <div class="mb-2">
        <h4 class="card-title text-truncate">{{ recipes.title }}</h4>
        <p class="card-text">{{ recipes.publisher }}</p>
      </div>
      <div>
        <a href="#" class="btn mt-3" style="background-color: #AEBDCA;">Detail</a>
        <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16">
  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
</svg></a>
      </div>
      <div>
      </div>
    </div>
  </div>
</template>