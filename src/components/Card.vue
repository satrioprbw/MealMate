<script>
import { mapActions, mapState } from 'pinia';
import { useMainStore } from '../stores/main';
import router from '../router';

export default {
  data() {
    return {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      mealTimes: ['Breakfast', 'Lunch', 'Dinner'],
      inputDay: '',
      inputOrder: ''
    }
  },
  props: ['recipes'],
  computed: {
    ...mapState(useMainStore, ['recipeData'])
  },
  methods: {
    ...mapActions(useMainStore, ['removeBookmark', 'addMealplan']),
    handleRemove(id) {
      this.removeBookmark(id)
    },
    handleAddMealplan(id) {
      this.addMealplan(id, this.inputDay, this.inputOrder)
    }
  }

}
</script>

<template>
  <div class="card text-white mb-3 m-3 " style="width: 15rem; background-color: #E38B29;">
    <img style="height: 180px; object-fit: cover;" :src="recipes.image_url" class="card-img-top " alt="...">
    <div class="card-body d-flex flex-column justify-content-between text-monospace">
      <div class="mb-2">
        <h4 class="card-title text-truncate">{{ recipes.title }}</h4>
        <p class="card-text">{{ recipes.publisher }}</p>
      </div>
      <div>
        <a @click.prevent="recipes.RecipeId ? $router.push(`/recipe/${recipes.RecipeId}`) : $router.push(`/recipe/${recipes.id}`)"
          class="btn btn-dark" data-bs-toggle="modal" href="#" role="button">Detail</a>

        <a data-bs-toggle="modal" href="#modalMealplan" v-if="$route.name === 'bookmark'"
          class="btn btn-warning ms-3" role="button"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"
            fill="currentColor" class="bi bi-calendar-plus" viewBox="0 0 16 16">
            <path
              d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z" />
            <path
              d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
          </svg></a>
        <a @click.prevent="handleRemove(recipes.id)" v-if="$route.name === 'bookmark'" class="btn btn-warning ms-3"
          role="button"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor"
            class="bi bi-bookmark-dash-fill" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
              d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM6 6a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H6z" />
          </svg></a>
      </div>
      <span>
      </span>
    </div>
  </div>
  <div class="modal fade" id="modalMealplan" aria-hidden="true" aria-labelledby="modalMealplan"
    tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header" style="background-color: #F1A661;">
          <h1 class="modal-title fs-5" id="exampleModalToggleLabel"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"
            fill="currentColor" class="bi bi-calendar-plus me-3" viewBox="0 0 16 16">
            <path
              d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z" />
            <path
              d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
          </svg> Add Recipe to My Meal Plan</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" style="background-color: #FDEEDC;">
          <form @submit.prevent="handleAddMealplan(recipes.id)">

            <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Choose your preferred day and mealtime for this recipe</h5>

            <div class="form-outline mb-4">
              <select v-model="inputDay"  name="Day" id="dayInput">
                <option v-for="day, i in days" :value="i">{{ day }}</option>
              </select> <br>
              <label class="form-label" for="dayInput">Day of The Week</label>
            </div>

            <div class="form-outline mb-4">
              <select v-model="inputOrder"  name="Order" id="orderInput">
                <option v-for="order, i in mealTimes" :value="i">{{ order }}</option>
              </select> <br>
              <label class="form-label" for="orderInput">Mealtime</label>
            </div>
            <button type="submit" class="btn btn-warning" data-bs-dismiss="modal" >Add to Meal
            Plan</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>