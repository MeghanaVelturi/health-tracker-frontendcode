<template>
  <div>
    <b-row>
      <sign-up></sign-up>
    </b-row>
  </div>
</template>

<script>
import SignUp from "@/components/SignUp.vue";

export default {
  name: "HomeView",
  components: {
    SignUp
  },
};
</script>
