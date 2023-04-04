<script >
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'

export default{
 
}
</script>

<template>
  <Navbar v-if="$route.name !== 'login'" />

  <RouterView />
</template>

<style></style>
