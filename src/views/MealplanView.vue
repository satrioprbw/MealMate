<script>
import { mapActions, mapState } from 'pinia';
import MiniCard from '../components/MiniCard.vue'
import { useMainStore } from '../stores/main';

export default {
  components: {
    MiniCard
  },
  data() {
    return {
      dataPerDay: '',
      mealTime: ['Breakfast', 'Lunch', 'Dinner']
    }
  },
  methods: {
    ...mapActions(useMainStore, ['getMealplan']),
    testing() {
      // this.dataPerDay = Object.keys(this.mealplanData).map(key => {
      //   const temp = this.mealplanData[key]
      //   if (this.mealplanData[key].length !== 3) {
      //     const diff = 3 - this.mealplanData[key].length;
      //     console.log(diff)
      //     for (let i = 0; i < diff; i++) {
      //       temp.push({})
      //     }
      //   }
      //   return temp;
      // })
      // console.log(this.dataPerDay)
      const baru = {}
      for (let i = 0; i < 3; i++) {
        const arrBaru = []
        Object.keys(this.mealplanData).forEach(key => {
          arrBaru.push(this.mealplanData[key][i])
        })
        baru[i] = arrBaru
      }
      this.dataPerDay = baru
      console.log(this.dataPerDay)
    }
  },
  computed: {
    ...mapState(useMainStore, ['mealplanData'])
  },
  async created() {
    await this.getMealplan()
    this.testing()
  }
}
</script>

<template>
  <div class="row" style="margin: 100px">
    <div class="col-md-12">
      <h1 class="text-center mb-5">My Weekly Meal Plan</h1>
      <div class="table-wrap">
        <table style="background-color: #F1A661;" class="table table-bordered text-center overflow-auto">
          <thead>
            <tr>
              <th>Time</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
              <th>Sunday</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="recipes, i in dataPerDay">
              <td class="text-center">
                <h4>{{ mealTime[i] }}</h4>
              </td>
              <td v-for="recipe in recipes">
                <MiniCard :recipes="recipe" v-if="recipe"/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style>
td {
  height: 100px;
  width: 100px;
}
</style>