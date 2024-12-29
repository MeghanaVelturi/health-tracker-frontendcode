<template>
  <b-form class="mt-3">
    <b-row>
      <b-row>
        <h4 class="text-secondary">Edit Nutrition</h4>
      </b-row>
      <b-col cols="6">
        <b-form-group id="foodname" label="Food Name" label-for="foodname">
          <b-form-input
            id="foodname"
            type="text"
            placeholder="Food Name"
            v-model="nutrition.foodname"
          ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col cols="6">
        <b-form-group
          id="noofcaloriestaken"
          label="No of Calories Taken"
          label-for="noofcaloriestaken"
        >
          <b-form-input
            id="noofcaloriestaken"
            type="number"
            placeholder="No of Calories Taken"
            v-model="nutrition.noofcaloriestaken"
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col cols="6">
        <b-form-group id="datetime" label="Datetime" label-for="datetime">
          <b-form-input
            id="datetime"
            type="datetime-local"
            placeholder="Datetime"
            v-model="nutrition.datetime"
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col cols="3">
        <b-button variant="primary" class="px-5" @click="updateNutrition"
          >Update Nutrition</b-button
        >
      </b-col>
      <b-col>
        <b-button variant="warning" @click="triggerClose">Close</b-button>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateCustomerModal",
  props: {
    customerId: Number,
  },
  data() {
    return {
      nutrition: {},
    };
  },
  mounted() {
    this.getCusomterByID();
  },
  methods: {
    triggerClose() {
      this.$emit("closeEditModal");
    },
    getCusomterByID() {
      axios
        .get(
          `https://health-tracker-production-5285.up.railway.app/api/nutritions/${this.customerId}`
        )
        .then((response) => {
          this.nutrition = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateNutrition() {
      this.nutrition.useremail = localStorage.getItem("email");
      axios
        .patch(
          `https://health-tracker-production-5285.up.railway.app/api/nutritions/${this.customerId}`,
          this.nutrition
        )
        .then((response) => {
          console.log(response.data);
          this.$emit("closeEditModal");
          this.$emit("reloadDataTable");
          this.$emit("showSuccessAlert");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
