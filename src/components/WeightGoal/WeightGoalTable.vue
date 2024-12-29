<template>
  <div>
    <b-row>
      <b-alert v-model="showSuccessAlert" variant="success" dismissible>
        {{ alertMessage }}
      </b-alert>
    </b-row>
    <b-row>
      <weight-goal-overview
        :totalCustomers="numberOfCustomers"
        :activeCustomers="activeCustomers"
        @totalCustomersIsActive="setFilterTotalIsActive"
        @activeCustomerIsActive="setFilterActiveIsActive"
      ></weight-goal-overview>
    </b-row>
    <b-row class="mt-3">
      <b-card>
        <b-row align-h="between">
          <b-col cols="6">
            <h3>{{ tableHeader }}</h3>
          </b-col>
          <b-col cols="2">
            <b-row>
              <b-col>
                <b-button
                  variant="primary"
                  id="show-btn"
                  @click="showCreateModal"
                >
                  <b-icon-plus class="text-white"></b-icon-plus>
                  <span class="h6 text-white">New Weight Goal</span>
                </b-button>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-table
            striped
            hover
            :items="items"
            :fields="fields"
            class="text-center"
          >
            <template #cell(contact_name)="data">
              {{
                `${data.item.contact_firstname} ${data.item.contact_lastname}`
              }}
            </template>
            <template #cell(customer_status)="data">
              <b-icon-bookmark-check-fill
                variant="success"
                v-if="data.item.customer_status === 'active'"
              ></b-icon-bookmark-check-fill>
              <b-icon-bookmark-x-fill
                variant="danger"
                v-else
              ></b-icon-bookmark-x-fill>
            </template>
            <template #cell(actions)="data">
              <b-row>
                <b-col cols="7">
                  <b-icon-pencil-square
                    class="action-item"
                    variant="primary"
                    @click="getRowData(data.item.id)"
                  ></b-icon-pencil-square>
                </b-col>
                <b-col cols="1">
                  <b-icon-trash-fill
                    class="action-item"
                    variant="danger"
                    @click="showDeleteModal(data.item.id)"
                  ></b-icon-trash-fill>
                </b-col>
              </b-row>
            </template>
          </b-table>
        </b-row>
      </b-card>
    </b-row>

    <!-- Modal for adding new customers -->
    <b-modal
      ref="create-weight-goal-modal"
      size="xl"
      hide-footer
      title="New Weight Goal"
    >
      <create-weight-goal-form
        @closeCreateModal="closeCreateModal"
        @reloadDataTable="getWeightGoalData"
        @showSuccessAlert="showAlertCreate"
      ></create-weight-goal-form>
    </b-modal>

    <!-- Modal for updating customers -->
    <b-modal
      ref="edit-weight-goal-modal"
      size="xl"
      hide-footer
      title="Edit Customer"
    >
      <edit-weight-goal-modal
        @closeEditModal="closeEditModal"
        @reloadDataTable="getWeightGoalData"
        @showSuccessAlert="showAlertUpdate"
        :customerId="customerId"
      ></edit-weight-goal-modal>
    </b-modal>

    <!-- Delete Customer Modal -->
    <b-modal
      ref="delete-weight-goal-modal"
      size="md"
      hide-footer
      title="Confirm Deletion"
    >
      <delete-weight-goal-modal
        @closeDeleteModal="closeDeleteModal"
        @reloadDataTable="getWeightGoalData"
        @showDeleteAlert="showDeleteSuccessModal"
        :customerId="customerId"
      ></delete-weight-goal-modal>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import WeightGoalOverview from "@/components/WeightGoal/WeightGoalOverview.vue";
import CreateWeightGoalForm from "@/components/WeightGoal/CreateWeightGoalForm.vue";
import EditWeightGoalModal from "@/components/WeightGoal/EditWeightGoalModal.vue";
import DeleteWeightGoalModal from "@/components/WeightGoal/DeleteWeightGoalModal.vue";

export default {
  components: {
    WeightGoalOverview,
    CreateWeightGoalForm,
    EditWeightGoalModal,
    DeleteWeightGoalModal,
  },
  data() {
    return {
      // Note 'isActive' is left out and will not appear in the rendered table

      fields: [
        {
          key: "goaltype",
          label: "Goal Type",
          sortable: false,
        },
        {
          key: "targetweight",
          label: "Target Weight",
          sortable: false,
        },
        {
          key: "started",
          label: "Started",
          sortable: false,
        },
        {
          key: "deadline",
          label: "Deadline",
          sortable: false,
        },
        "actions",
      ],
      items: [],
      numberOfCustomers: 0,
      activeCustomers: 0,
      activeCustomersData: [],
      customerId: 0,
      companySearchTerm: "",
      tableHeader: "",
      showSuccessAlert: false,
      alertMessage: "",
    };
  },
  mounted() {
    this.getWeightGoalData();
  },
  methods: {
    showCreateModal() {
      this.$refs["create-weight-goal-modal"].show();
    },
    closeCreateModal() {
      this.$refs["create-weight-goal-modal"].hide();
    },
    getWeightGoalData() {
      let useremail = localStorage.getItem("email");
      axios
        .get(
          "https://health-tracker-production-5285.up.railway.app/api/weightgoals/email/" +
            useremail
        )
        .then((response) => {
          this.tableHeader = "Total Customer";
          this.items = response.data;
          this.numberOfCustomers = response.data.length;
          this.activeCustomersData = response.data.filter(
            (item) => item.customer_status === "active"
          );
          this.activeCustomers = this.activeCustomersData.length;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getRowData(id) {
      this.$refs["edit-weight-goal-modal"].show();
      this.customerId = id;
    },
    closeEditModal() {
      this.$refs["edit-weight-goal-modal"].hide();
    },
    setFilterTotalIsActive() {
      this.tableHeader = "Total Customers";
      this.getWeightGoalData();
    },
    setFilterActiveIsActive() {
      this.tableHeader = "Active Customers";
      this.items = this.activeCustomersData;
    },
    showAlertCreate() {
      this.showSuccessAlert = true;
      this.alertMessage = "Weight Goal was created successfully!";
    },
    showAlertUpdate() {
      this.showSuccessAlert = true;
      this.alertMessage = "Weight Goal was updated successfully";
    },
    showDeleteModal(id) {
      this.$refs["delete-weight-goal-modal"].show();
      this.customerId = id;
    },
    closeDeleteModal() {
      this.$refs["delete-weight-goal-modal"].hide();
    },
    showDeleteSuccessModal() {
      this.showSuccessAlert = true;
      this.alertMessage = "Weight Goal was deleted successfully!";
    },
  },
};
</script>

<style>
.action-item:hover {
  cursor: pointer;
}
</style>
