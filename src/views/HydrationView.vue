<template>
  <div>
    <b-row>
      <hydration-table></hydration-table>
    </b-row>
  </div>
</template>

<script>
import HydrationTable from "@/components/Hydration/HydrationTable.vue";

export default {
  name: "HydrationView",
  components: {
    HydrationTable,
  },
};
</script>
