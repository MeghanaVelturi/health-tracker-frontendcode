<template>
  <b-form class="mt-3">
    <b-row>
      <b-row>
        <h4 class="text-secondary">Weight Goal Details</h4>
      </b-row>
      <b-col cols="6">
        <b-form-group id="input-group-3" label="GoalType" label-for="input-3">
          <b-form-select
            id="input-3"
            v-model="weightgoal.goaltype"
            :options="goaltype"
            required
          ></b-form-select>
        </b-form-group>
      </b-col>
      <b-col cols="6">
        <b-form-group
          id="targetweight"
          label="Target Weight"
          label-for="targetweight"
        >
          <b-form-input
            id="targetweight"
            type="number"
            placeholder="Target Weight"
            v-model="weightgoal.targetweight"
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col cols="6">
        <b-form-group id="started" label="Start Time" label-for="started">
          <b-form-input
            id="started"
            type="datetime-local"
            placeholder="Start Time"
            v-model="weightgoal.started"
          ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col cols="6">
        <b-form-group id="deadline" label="End Time" label-for="deadline">
          <b-form-input
            id="deadline"
            type="datetime-local"
            placeholder="End Time"
            v-model="weightgoal.deadline"
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col cols="3">
        <b-button variant="primary" class="px-5" @click="addNewCustomer"
          >Add Weight Goal</b-button
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
      weightgoal: {},
      goaltype: [
        { text: "Select One", value: null },
        "WeightLoss",
        "WeightGain",
      ],
    };
  },
  methods: {
    triggerClose() {
      this.$emit("closeCreateModal");
    },
    addNewCustomer() {
      this.weightgoal.useremail = localStorage.getItem("email");
      axios
        .post(
          "https://health-tracker-production-5285.up.railway.app/api/weightgoals",
          this.weightgoal
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
