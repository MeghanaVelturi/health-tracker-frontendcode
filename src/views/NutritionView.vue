<template>
  <div>
    <b-row>
      <nutrition-table></nutrition-table>
    </b-row>
  </div>
</template>

<script>
import NutritionTable from "@/components/Nutrition/NutritionTable.vue";

export default {
  name: "NutritionView",
  components: {
    NutritionTable,
  },
};
</script>
