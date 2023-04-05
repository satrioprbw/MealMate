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
    }
  },
  methods: {
    ...mapActions(useMainStore, ['getBookmark'])
  },
  computed: {
    ...mapState(useMainStore, ['bookmarkData'])
  },
  created() {
    this.getBookmark()
  }
}
</script>

<template>
  <div class="row" style="margin: 100px">
    <div class="col-md-12">
      <h1 class="text-center mb-5">My Weekly Meal Plan</h1>
      <div class="table-wrap">
        <table class="table table-bordered text-center">
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
            <tr v-for="recipes in bookmarkData">
              <td>
              </td>
              <td><i class="fa fa-close"></i>
                <MiniCard :recipes="recipes" />
              </td>
              <td class="text-center">
              </td>
              <td><i class="fa fa-close"></i></td>
              <td class="text-center">
              </td>
              <td><i class="fa fa-close"></i></td>
              <td class="text-center">
              </td>
              <td><i class="fa fa-close"></i></td>
            </tr>
            <tr>
              <td></td>
              <td><i class="fa fa-close"></i></td>
              <td class="text-center">
              </td>
              <td><i class="fa fa-close"></i></td>
              <td class="text-center">
              </td>
              <td><i class="fa fa-close"></i></td>
              <td class="text-center">
              </td>
              <td><i class="fa fa-close"></i></td>
            </tr>
            <tr>
              <td></td>
              <td class="text-center">
                
              </td>
              <td><i class="fa fa-close"></i></td>
              <td class="text-center">
                
              </td>
              <td><i class="fa fa-close"></i></td>
              <td class="text-center">
                
              </td>
              <td><i class="fa fa-close"></i></td>
              <td class="text-center">
                
              </td>
            </tr>
            <tr>
              <td></td>
              <td><i class="fa fa-close"></i></td>
              <td class="text-center">
                
              </td>
              <td><i class="fa fa-close"></i></td>
              <td class="text-center">
                
              </td>
              <td><i class="fa fa-close"></i></td>
              <td class="text-center">
                
              </td>
              <td><i class="fa fa-close"></i></td>
            </tr>
          </tbody>
        <tfoot>
          <tr>
            <th><a href="#"><i class="fa fa-long-arrow-left"></i> September</a></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th><a href="#">November <i class="fa fa-long-arrow-right"></i></a></th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</div></template>

<style>
td {
  height: 100px;
  width: 100px;
}
</style>