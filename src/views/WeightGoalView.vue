<template>
  <div>
    <b-row>
      <weight-goal-table></weight-goal-table>
    </b-row>
  </div>
</template>

<script>
import WeightGoalTable from "@/components/WeightGoal/WeightGoalTable.vue";

export default {
  name: "WeightGoalView",
  components: {
    WeightGoalTable,
  },
};
</script>
