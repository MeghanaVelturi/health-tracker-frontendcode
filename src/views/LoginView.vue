<template>
  <div>
    <b-row>
      <log-in-page></log-in-page>
    </b-row>
  </div>
</template>

<script>
import LogInPage from "@/components/LogInPage.vue";

export default {
  name: "LoginView",
  components: {
    LogInPage,
  },
};
</script>
