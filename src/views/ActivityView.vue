<template>
  <div>
    <b-row>
      <activity-table></activity-table>
    </b-row>
  </div>
</template>

<script>
import ActivityTable from "@/components/Activity/ActivityTable.vue";

export default {
  name: "ActivityView",
  components: {
    ActivityTable,
  },
};
</script>
