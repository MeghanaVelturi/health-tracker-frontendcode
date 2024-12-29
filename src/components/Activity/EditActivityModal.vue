<template>
  <b-form class="mt-3">
    <b-row>
      <b-row>
        <h4 class="text-secondary">Activity Details</h4>
      </b-row>
      <b-col cols="6">
        <b-form-group
          id="description"
          label="Description"
          label-for="description"
        >
          <b-form-input
            id="description"
            type="text"
            placeholder="Description"
            v-model="activity.description"
          ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col cols="6">
        <b-form-group id="duration" label="Duration" label-for="duration">
          <b-form-input
            id="duration"
            type="number"
            placeholder="Duration"
            v-model="activity.duration"
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col cols="6">
        <b-form-group id="calories" label="Calories Burnt" label-for="calories">
          <b-form-input
            id="calories"
            type="number"
            placeholder="Calories"
            v-model="activity.calories"
          ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col cols="6">
        <b-form-group id="stepcount" label="Step Count" label-for="stepcount">
          <b-form-input
            id="stepcount"
            type="number"
            placeholder="StepCount"
            v-model="activity.stepcount"
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
            placeholder="Started"
            v-model="activity.started"
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col cols="3">
        <b-button variant="primary" class="px-5" @click="updateCustomer"
          >Update Activity</b-button
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
      activity: {},
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
          `https://health-tracker-production-5285.up.railway.app/api/activities/${this.customerId}`
        )
        .then((response) => {
          this.activity = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateCustomer() {
      this.activity.useremail = localStorage.getItem("email");
      axios
        .patch(
          `https://health-tracker-production-5285.up.railway.app/api/activities/${this.customerId}`,
          this.activity
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
