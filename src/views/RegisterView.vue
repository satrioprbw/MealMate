<script>
import { mapActions } from 'pinia';
import { useMainStore } from '../stores/main';

export default {
  data() {
    return {
      email: '',
      password: '',
      username: ''

    }
  },
  methods: {
    ...mapActions(useMainStore, ['loginHandler']),
    handleSubmit() {
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

              <div class="col-md-6 col-lg-7 d-flex align-items-center">
                <div class="card-body p-4 p-lg-5 text-black">

                  <form @submit.prevent="handleSubmit">

                    <div class="d-flex align-items-center mb-3 pb-1">
                      <a @click.prevent="$router.push('/')" href="#" class="h1 fw-bold mb-0 "><img style="width: 200px;"
                          src="../assets/logo-no-background.png" alt=""></a>
                    </div>

                    <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Register your account</h5>

                    <div class="form-outline mb-4">
                      <input v-model="username" name="username" type="text" id="inputUsername"
                        class="form-control form-control-lg" />
                      <label class="form-label" for="inputUsername">Username</label>
                    </div>

                    <div class="form-outline mb-4">
                      <input v-model="email" name="email" type="email" id="inputEmail"
                        class="form-control form-control-lg" />
                      <label class="form-label" for="inputEmail">Email address</label>
                    </div>

                    <div class="form-outline mb-4">
                      <input v-model="password" name="password" type="password" id="inputPassword"
                        class="form-control form-control-lg" />
                      <label class="form-label" for="inputPassword">Password</label>
                    </div>

                    <div class="pt-1 mb-1">
                      <button class="btn btn-dark btn-lg btn-block" type="submit">Register</button>
                    </div>

                    <p class="mt-4 pb-lg-2">Already have an account? <a @click.prevent="$router.push('/login')" href="#!"
                        style="color: #393f81;">Login

                        here</a></p>
                  </form>

                </div>
              </div>
              <div class="col-md-6 col-lg-5 d-none d-md-block">
                <img src="https://feelgoodfoodie.net/wp-content/uploads/2021/09/Tuna-Salad-Meal-Prep-09.jpg"
                  alt="login form" class="h-100 img-fluid object-fit-cover" style="border-radius: 0 1rem 1rem 0;" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>