<template>
  <b-form class="mt-3">
    <b-row>
      <b-row>
        <b-alert v-model="showSuccessAlert" variant="success" dismissible>
          {{ alertMessage }}
        </b-alert>
      </b-row>
      <b-row>
        <h4 class="text-secondary">Login Details</h4>
      </b-row>
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
        <b-button variant="primary" class="px-5" @click="login"
          >Submit</b-button
        >
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
import axios from "axios";

export default {
  name: "LogInPage",
  data() {
    return {
      user: {},
    };
  },
  methods: {
    triggerClose() {
      this.$emit("closeCreateModal");
    },
    showAlert() {
      this.showSuccessAlert = true;
      this.alertMessage = "Login successfull";
    },
    login() {
      this.user.name = "test";
      axios
        .post(
          "https://health-tracker-production-5285.up.railway.app/api/users/login",
          this.user
        )
        .then((response) => {
          localStorage.setItem("email", response.data.email);
          console.log(response.data);
          this.showAlert();
          this.$root.$emit("component1");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
