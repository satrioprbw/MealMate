<script >
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import CloseBuy from './components/CloseBuy.vue'


export default {
  components: {
    Navbar, Footer, CloseBuy
  }
}
</script>

<template>
  
  <Navbar />
  <RouterView />
  <CloseBuy />
  <Footer />
</template>

<style></style>
