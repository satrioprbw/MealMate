<script>
// import { mapActions } from 'pinia';
// import { useMainStore } from '../stores/main';

export default {
  data() {
    return {
      searchInput: ''
    }
  },
  // methods: {
  //   ...mapActions(useMainStore, ['fetchRecipe']),
  //   handleSearch() {
  //     this.fetchRecipe(this.searchInput)
  //   }
  // }
}
</script>

<template>
  <div class="card" style="border-radius: 1rem;">
    <div class="row g-0">
      <nav class="navbar fixed-top navbar-expand-lg" style="background-color: #E8DFCA;">
        <a class="navbar-brand" href="#" style="margin-left: 20px;">
          <img src="../assets/logo-no-background.png" width="180" height="40" alt="logo-indeed">
        </a>
        <div class="input-group ">
          <div class="input-group-prepend">
            <button @click.prevent="handleSearch" class="btn btn-outline-secondary" type="button">Search</button>
          </div>
          <div class="col-xs-3">
            <input v-model="searchInput" type="text" class="form-control " placeholder="Chicken, Pasta ..." aria-label=""
              aria-describedby="basic-addon1">
          </div>
        </div>
        <div>
          <button class="btn btn-outline-secondary me-3">Bookmark</button>
        </div>
      </nav>
    </div>
  </div>
</template>