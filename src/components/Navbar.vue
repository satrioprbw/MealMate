<script>
import axios from 'axios'
import router from '../router'
import { mapActions, mapState } from 'pinia'
import { useMainStore } from '../stores/main'

export default {
  data() {
    return {
      searchInput: '',
      emailLogin: '',
      passwordLogin: '',
      usernameRegister: '',
      emailRegister: '',
      passwordRegister: '',
      subscribeConsent: true
    }
  },
  methods: {
    ...mapActions(useMainStore, ['loginHandler', 'logoutHandler', 'registerHandler', 'subscribeMail', 'googleLogin']),
    handleSubmitLogin() {
      this.loginHandler(this.emailLogin, this.passwordLogin)
      this.emailLogin = ''
      this.passwordLogin = ''

    },
    handleSubmitRegister() {
      this.registerHandler(this.usernameRegister, this.emailRegister, this.passwordRegister)
      if (this.subscribeConsent) {
        this.subscribeMail(this.emailRegister)
      }
      this.usernameRegister = ''
      this.emailRegister = ''
      this.passwordRegister = ''
    },
    callback(response){
      this.googleLogin(response)
    }
  },
  computed: {
    ...mapState(useMainStore, ['token'])
  }
}
</script>

<template>
  <div class="card" style="border-radius: 1rem;">
    <div class="row g-0">

      <nav class="navbar fixed-top navbar-expand-lg" style="background-color: #E38B29;">
        <a @click.prevent="$router.push('/')" class="navbar-brand" href="#" style="margin-left: 20px;">
          <img src="../assets/logo-no-background.png" width="180" height="30" alt="logo">
        </a>
        <div>
          <button @click.prevent="$router.push('/bookmark')"
            :class="token ? 'btn btn-warning col-12 me-3' : 'btn btn-warning disabled'"><svg
              xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-fill"
              viewBox="0 0 16 16">
              <path
                d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
            </svg> Bookmark</button>
          </div>
          <div class="mx-3">
            <button @click.prevent="$router.push('/mealplan')" :class="token ? 'btn btn-warning col-12 me-3' : 'btn btn-warning disabled'" type="button"><svg
                xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-plus"
                viewBox="0 0 16 16">
                <path
                  d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z" />
                <path
                  d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
              </svg> My Meal Plan</button>
          </div>
        <div v-if="!token" class="ms-3">
          <a class="btn btn-dark" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Login / Register</a>

        </div>
        <div v-else class="ms-3">
          <a @click.prevent="logoutHandler" class="btn btn-dark" href="#" role="button">Logout</a>
        </div>

      </nav>
    </div>
  </div>
  <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel"
    tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header" style="background-color: #F1A661;">
          <h1 class="modal-title fs-5" id="exampleModalToggleLabel">Login</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" style="background-color: #FDEEDC;">
          <form @submit.prevent="handleSubmitLogin">

            <div class="d-flex align-items-center mb-3 pb-1">
              <span class="h1 fw-bold mb-0 "><img style="width: 400px;" src="../assets/logo-no-background.png"
                  alt=""></span>
            </div>

            <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Sign in to your account</h5>

            <div class="form-outline mb-4">
              <input v-model="emailLogin" name="email" type="email" id="form2Example17"
                class="form-control form-control-lg" />
              <label class="form-label" for="form2Example17">Email address</label>
            </div>

            <div class="form-outline mb-4">
              <input v-model="passwordLogin" name="password" type="password" id="form2Example27"
                class="form-control form-control-lg" />
              <label class="form-label" for="form2Example27">Password</label>
            </div>

            <div class="pt-1 mb-1">
              <button data-bs-toggle="modal" class="btn btn-dark btn-lg btn-block" type="submit">Login</button>
              <p style="margin-top: 20px">or Sign In with</p>
            </div>

            <GoogleLogin :callback="callback" prompt />

          </form>
        </div>
        <div class="modal-footer">
          <span>Don't have an account?</span>
          <button class="btn btn-secondary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Register
            now</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2"
    tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header" style="background-color: #F1A661;">
          <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">Register</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" style="background-color: #FDEEDC;">
          <form @submit.prevent="handleSubmitRegister">

            <div class="d-flex align-items-center mb-3 pb-1">
              <a @click.prevent="$router.push('/')" href="#" class="h1 fw-bold mb-0 "><img style="width: 200px;"
                  src="../assets/logo-no-background.png" alt=""></a>
            </div>

            <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Register your account</h5>

            <div class="form-outline mb-4">
              <input v-model="usernameRegister" name="username" type="text" id="inputUsername"
                class="form-control form-control-lg" />
              <label class="form-label" for="inputUsername">Username</label>
            </div>

            <div class="form-outline mb-4">
              <input v-model="emailRegister" name="email" type="email" id="inputEmail"
                class="form-control form-control-lg" />
              <label class="form-label" for="inputEmail">Email address</label>
            </div>

            <div class="form-outline mb-4">
              <input v-model="passwordRegister" name="password" type="password" id="inputPassword"
                class="form-control form-control-lg" />
              <label class="form-label" for="inputPassword">Password</label>
            </div>

            <div class="mb-2">
              <input v-model="subscribeConsent" type="checkbox">
              <span class="ms-2">Subscribe to our newsletter</span>
            </div>

            <div class="pt-1 mb-1">
              <button class="btn btn-dark btn-lg btn-block" type="submit">Register</button>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Back to
            login</button>
        </div>
      </div>
    </div>
  </div>
</template>