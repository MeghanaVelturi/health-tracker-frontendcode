<template>
  <b-form class="mt-3">
    <b-row>
      <b-row>
        <h4 class="text-secondary">Edit Hydration</h4>
      </b-row>
      <b-col cols="6">
        <b-form-group
          id="liquidname"
          label="Liquid Name"
          label-for="liquidname"
        >
          <b-form-input
            id="liquidname"
            type="text"
            placeholder="Liquid Name"
            v-model="hydration.liquidname"
          ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col cols="6">
        <b-form-group id="mltaken" label="MLTaken" label-for="mltaken">
          <b-form-input
            id="mltaken"
            type="number"
            placeholder="MLTaken"
            v-model="hydration.mltaken"
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
            v-model="hydration.datetime"
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col cols="3">
        <b-button variant="primary" class="px-5" @click="updateHydration"
          >Update Hydration</b-button
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
      hydration: {},
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
          `https://health-tracker-production-5285.up.railway.app/api/hydrations/${this.customerId}`
        )
        .then((response) => {
          this.hydration = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateHydration() {
      this.hydration.useremail = localStorage.getItem("email");
      axios
        .patch(
          `https://health-tracker-production-5285.up.railway.app/api/hydrations/${this.customerId}`,
          this.hydration
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
