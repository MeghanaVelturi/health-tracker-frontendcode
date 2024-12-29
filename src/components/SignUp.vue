<template>
  <b-form class="mt-3">
    <b-row>
      <b-row>
        <b-alert v-model="showSuccessAlert" variant="success" dismissible>
          {{ alertMessage }}
        </b-alert>
      </b-row>
      <b-row>
        <h4 class="text-secondary">Signup Details</h4>
      </b-row>
      <b-col cols="6">
        <b-form-group id="name" label="Name" label-for="name">
          <b-form-input
            id="name"
            type="text"
            placeholder="Name"
            v-model="user.name"
          ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col cols="6">
        <b-form-group id="email" label="EMail" label-for="email">
          <b-form-input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            v-model="user.email"
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col cols="6">
        <b-form-group id="password" label="Password" label-for="password">
          <b-form-input
            id="password"
            type="password"
            placeholder="Password"
            v-model="user.password"
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col cols="3">
        <b-button variant="primary" class="px-5" @click="addNewCustomer"
          >Submit</b-button
        >
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
import axios from "axios";

export default {
  name: "SignUp",
  data() {
    return {
      user: {},
      showSuccessAlert: false,
      alertMessage: "",
    };
  },
  mounted() {
    localStorage.setItem("email", "");
  },
  methods: {
    triggerClose() {
      this.$emit("closeCreateModal");
    },
    showAlert() {
      this.showSuccessAlert = true;
      this.alertMessage = "SignUp successfull";
      this.$router.push({ path: "/login" });
    },
    addNewCustomer() {
      axios
        .post(
          "https://health-tracker-production-5285.up.railway.app/api/users",
          this.user
        )
        .then((response) => {
          console.log(response.data);
          console.log(response.status);
          this.showAlert();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
