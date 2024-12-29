<template>
  <b-form class="mt-3">
    <b-row>
      <b-row>
        <h4 class="text-secondary">Nutrition Details</h4>
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
        <b-button variant="primary" class="px-5" @click="addNewCustomer"
          >Add Nutrition</b-button
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
  name: "CreateActivityModal",
  data() {
    return {
      nutrition: {},
    };
  },
  methods: {
    triggerClose() {
      this.$emit("closeCreateModal");
    },
    addNewCustomer() {
      this.nutrition.useremail = localStorage.getItem("email");
      axios
        .post(
          "https://health-tracker-production-5285.up.railway.app/api/nutritions",
          this.nutrition
        )
        .then((response) => {
          console.log(response.data);
          this.$emit("closeCreateModal");
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
