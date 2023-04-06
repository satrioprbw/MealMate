<script>
import { mapActions, mapState } from 'pinia';
import { useMainStore } from '../stores/main';

export default {
  data() {
    return {
      servings : 1
    }
  },
  methods: {
    ...mapActions(useMainStore, ['fetchDetail', 'addBookmark', '']),
    handleAdd() {
      this.addBookmark(this.detailRecipe.data.recipe.id, this.detailRecipe.data.recipe.image_url, this.detailRecipe.data.recipe.publisher, this.detailRecipe.data.recipe.title)
    }
  },
  computed: {
    ...mapState(useMainStore, ['detailRecipe'])
  },
  async created() {
    await this.fetchDetail(this.$route.params.id)
  }
}
</script>

<template>
  <div class="" style="background-color: #F5EFE6;">
    <div class="container py-5 ">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <h2 class="card-title text-truncate my-5 text-center">{{ detailRecipe.data.recipe.title }}</h2>
          <div class="card" style="border-radius: 1rem;">
            <div class="row g-0">
              <div style="background-color: #E38B29; border-radius: 1rem;" class="col-md-8 col-lg-6">
                <img :src="detailRecipe.data.recipe.image_url" alt="recipe" class="object-fit-cover"
                  style="border-radius: 1rem; width: 29rem; height:20rem; object-fit: cover;" />
                <div class="text-center my-3">
                  <h4>How to cook it?</h4>
                  <p>This recipe was carefully designed and tested by <b>{{ detailRecipe.data.recipe.publisher }}</b>.
                    Please
                    check out directions at their website.</p>
                  <a class="btn btn-warning" :href="detailRecipe.data.recipe.source_url" role="button">Directions</a>
                  <span>
                    <a @click.prevent="handleAdd" class="btn btn-warning ms-3" role="button"><svg
                        xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor"
                        class="bi bi-bookmark-plus" viewBox="0 0 16 16">
                        <path
                          d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                        <path
                          d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z" />
                      </svg></a>
                  </span>
                </div>
              </div>
              <div class="col-6">
                <div class="card-body text-black">
                  <div class="fs-4 ">

                    <h4 class="mt-3"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#E38B29"
                        class="me-3 bi bi-alarm" viewBox="0 0 16 16">
                        <path
                          d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z" />
                        <path
                          d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z" />
                      </svg>Cooking Time: {{ detailRecipe.data.recipe.cooking_time }} minutes</h4>
                    <h4 class="mt-3"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#E38B29"
                        class="me-3 bi bi-person" viewBox="0 0 16 16">
                        <path
                          d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                      </svg>Servings: {{ detailRecipe.data.recipe.servings + servings - 1 }} servings</h4>
                    <h4 class="mt-3"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"
                        fill="#E38B29" class="me-3 bi bi-bag" viewBox="0 0 16 16">
                        <path
                          d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                      </svg>Ingredients : </h4>
                    <div v-for="ingredient in detailRecipe.data.recipe.ingredients" class="ms-5 row-5">
                      <p class="fs-5"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
                          class="bi bi-check" viewBox="0 0 16 16">
                          <path
                            d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                        </svg> {{ ingredient.quantity * servings }} {{ ingredient.unit }} {{ ingredient.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div></template>