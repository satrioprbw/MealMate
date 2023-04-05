<script>
import { mapActions, mapState } from 'pinia'
import { useMainStore } from '../stores/main'

export default {
  data() {
    return {
      emailMailchimp: ''
    }
  },
  methods: {
    ...mapActions(useMainStore, ['subscribeMail']),
    handleSubscribe(){
      this.subscribeMail(this.emailMailchimp)
      this.emailMailchimp = ''
    }

  }
}
</script>

<template>
  <footer class="py-2" style="background-color: #E38B29;">
    <form @submit.prevent="handleSubscribe" class="col-3 ms-5">
      <h4>Subscribe to our newsletter!</h4>
      <div class="input-group mb-3">
        <button class="btn btn-dark" type="submit" id="button-addon1">Subscribe</button>
        <input v-model="emailMailchimp" type="email" class="form-control" placeholder="" aria-label="Example text with button addon"
          aria-describedby="button-addon1">
      </div>
    </form>
    <p class="copyright mx-5">
      &copy; Copyright by
      <a class="twitter-link" target="_blank" href="https://github.com/satrioprbw">Muhammad Satrio Prabowo</a>. Don't
      claim
      as your own.
    </p>
  </footer>
</template>