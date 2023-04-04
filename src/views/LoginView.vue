<script>
import { mapActions } from 'pinia';
import { useMainStore } from '../stores/main';

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(useMainStore, ['loginHandler']),
    handleSubmit(){
      this.loginHandler(this.email, this.password)
    }
  }
}
</script>

<template>
  <div class="vh-100" style="background-color: #F5EFE6;">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div class="card" style="border-radius: 1rem;">
            <div class="row g-0">
              <div class="col-md-6 col-lg-5 d-none d-md-block">
                <img src="https://cdn.loveandlemons.com/wp-content/uploads/2019/02/meal-prep-ideas.jpg" alt="login form"
                  class="h-100 img-fluid object-fit-cover" style="border-radius: 1rem 0 0 1rem;" />
              </div>
              <div class="col-md-6 col-lg-7 d-flex align-items-center">
                <div class="card-body p-4 p-lg-5 text-black">

                  <form @submit.prevent="handleSubmit">

                    <div class="d-flex align-items-center mb-3 pb-1">
                      <i class="fas fa-cubes fa-2x me-3" style="color: #ff6219;"></i>
                      <span class="h1 fw-bold mb-0 "><img style="width: 400px;" src="../assets/logo-no-background.png"
                          alt=""></span>
                    </div>

                    <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Sign in to your account</h5>

                    <div class="form-outline mb-4">
                      <input name="email" type="email" id="form2Example17" class="form-control form-control-lg" />
                      <label class="form-label" for="form2Example17">Email address</label>
                    </div>

                    <div class="form-outline mb-4">
                      <input name="password" type="password" id="form2Example27" class="form-control form-control-lg" />
                      <label class="form-label" for="form2Example27">Password</label>
                    </div>

                    <div class="pt-1 mb-1">
                      <button class="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                      <p style="margin-top: 20px">or Sign In with</p>
                    </div>

                    <GoogleLogin :callback="callback" prompt />

                    <p class=" pb-lg-2">Don't have an account? <a href="#!" style="color: #393f81;">Register
                        here</a></p>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>