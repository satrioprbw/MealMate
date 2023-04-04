<script>

export default {
  data() {
    return {
      searchInput: '',
      token : localStorage.access_token
    }
  }
}
</script>

<template>
  <div class="card" style="border-radius: 1rem;">
    <div class="row g-0">
      <nav class="navbar fixed-top navbar-expand-lg" style="background-color: #E8DFCA;">
        <a @click.prevent="$router.push('/')" class="navbar-brand" href="#" style="margin-left: 20px;">
          <img src="../assets/logo-no-background.png" width="180" height="40" alt="logo">
        </a>
        <div class="mx-3">
          <button @click.prevent="$router.push('/bookmark')" class="btn btn-outline-secondary col-12 me-3">Bookmark</button>
        </div>
        <div v-if="!token">
          <button @click.prevent="$router.push('/login')" class="btn btn-outline-secondary col-12 me-3">Login</button>
        </div>
      </nav>
    </div>
  </div>
</template>