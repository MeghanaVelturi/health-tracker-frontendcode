<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-container>
        <b-row class="text-white">
          <b-col>
            <b-icon-heart-fill scale="2" class="h1 logo"></b-icon-heart-fill>
            <span class="h4 title">Health Tracker</span>
            <b-button
              v-if="isLoggedIn == false"
              href="/signup"
              class="signup"
              variant="warning"
              >Signup</b-button
            >
            <b-button
              v-if="isLoggedIn == false"
              href="/login"
              class="logi"
              variant="warning"
              >Login</b-button
            >
            <b-button
              v-if="isLoggedIn == true"
              href="/activity"
              class="login"
              variant="warning"
              >Activity</b-button
            >
            <b-button
              v-if="isLoggedIn == true"
              href="/nutrition"
              class="login"
              variant="warning"
              >Nutrition</b-button
            >
            <b-button
              v-if="isLoggedIn == true"
              href="/hydration"
              class="login"
              variant="warning"
              >Hydration</b-button
            >
            <b-button
              v-if="isLoggedIn == true"
              href="/weightgoal"
              class="login"
              variant="warning"
              >WeightGoal</b-button
            >
            <b-button
              v-if="isLoggedIn == true"
              @click="logout"
              href="/login"
              class="logout"
              variant="warning"
              >Logout</b-button
            >
          </b-col>
        </b-row>
      </b-container>
    </b-navbar>
  </div>
</template>
<style scoped>
.logo {
  padding-top: 25px;
}
.title {
  margin-left: 10px;
  margin-bottom: 50px;
}
.signup {
  margin-left: 700px;
  margin-right: 20px;
}
.login {
  margin-left: 40px;
}
.logout {
  margin-left: 50px;
}
</style>
<script>
export default {
  data() {
    return {
      isLoggedIn:
        localStorage.getItem("email") != "" &&
        localStorage.getItem("email") != null
          ? true
          : false,
    };
  },
  mounted() {
    this.$root.$on("component1", () => {
      this.login();
    });
  },
  methods: {
    logout() {
      this.isLoggedIn = false;
      localStorage.setItem("email", "");
    },
    login() {
      this.isLoggedIn = true;
      this.$router.push({ path: "/activity" });
    },
  },
  name: "HeaderBar",
};
</script>
