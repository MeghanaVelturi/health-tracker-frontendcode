<template>
  <div>
    <b-row>
      <b-alert v-model="showSuccessAlert" variant="success" dismissible>
        {{ alertMessage }}
      </b-alert>
    </b-row>
    <b-row>
      <activity-overview
        :totalCustomers="numberOfCustomers"
        :activeCustomers="activeCustomers"
        @totalCustomersIsActive="setFilterTotalIsActive"
        @activeCustomerIsActive="setFilterActiveIsActive"
      ></activity-overview>
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
                  <span class="h6 text-white">New Activity</span>
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
      ref="create-activity-modal"
      size="xl"
      hide-footer
      title="New Activity"
    >
      <create-activity-form
        @closeCreateModal="closeCreateModal"
        @reloadDataTable="getActivityData"
        @showSuccessAlert="showAlertCreate"
      ></create-activity-form>
    </b-modal>

    <!-- Modal for updating customers -->
    <b-modal
      ref="edit-activity-modal"
      size="xl"
      hide-footer
      title="Edit Customer"
    >
      <edit-activity-modal
        @closeEditModal="closeEditModal"
        @reloadDataTable="getActivityData"
        @showSuccessAlert="showAlertUpdate"
        :customerId="customerId"
      ></edit-activity-modal>
    </b-modal>

    <!-- Delete Customer Modal -->
    <b-modal
      ref="delete-activity-modal"
      size="md"
      hide-footer
      title="Confirm Deletion"
    >
      <delete-activity-modal
        @closeDeleteModal="closeDeleteModal"
        @reloadDataTable="getActivityData"
        @showDeleteAlert="showDeleteSuccessModal"
        :customerId="customerId"
      ></delete-activity-modal>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import ActivityOverview from "@/components/Activity/ActivityOverview.vue";
import CreateActivityForm from "@/components/Activity/CreateActivityForm.vue";
import EditActivityModal from "@/components/Activity/EditActivityModal.vue";
import DeleteActivityModal from "@/components/Activity/DeleteActivityModal.vue";

export default {
  components: {
    ActivityOverview,
    CreateActivityForm,
    EditActivityModal,
    DeleteActivityModal,
  },
  data() {
    return {
      // Note 'isActive' is left out and will not appear in the rendered table

      fields: [
        {
          key: "description",
          label: "Description",
          sortable: false,
        },
        {
          key: "duration",
          label: "Duration",
          sortable: false,
        },
        {
          key: "calories",
          label: "Calories",
          sortable: false,
        },
        {
          key: "stepcount",
          label: "Step Count",
          sortable: false,
        },
        {
          key: "started",
          label: "Started",
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
    this.getActivityData();
  },
  methods: {
    showCreateModal() {
      this.$refs["create-activity-modal"].show();
    },
    closeCreateModal() {
      this.$refs["create-activity-modal"].hide();
    },
    getActivityData() {
      let useremail = localStorage.getItem("email");
      axios
        .get(
          "https://health-tracker-production-5285.up.railway.app/api/activities/email/" +
            useremail
        )
        .then((response) => {
          this.tableHeader = "Total Customer";
          this.items = response.data;
          let stepcount = 0;
          let caloriesburnt = 0;
          response.data.map((act) => {
            stepcount = stepcount + act.stepcount;
            caloriesburnt = caloriesburnt + act.calories;
          });
          this.numberOfCustomers = stepcount;
          this.activeCustomers = caloriesburnt;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getRowData(id) {
      this.$refs["edit-activity-modal"].show();
      this.customerId = id;
    },
    closeEditModal() {
      this.$refs["edit-activity-modal"].hide();
    },
    setFilterTotalIsActive() {
      this.tableHeader = "Total Customers";
      this.getActivityData();
    },
    setFilterActiveIsActive() {
      this.tableHeader = "Active Customers";
      this.items = this.activeCustomersData;
    },
    showAlertCreate() {
      this.showSuccessAlert = true;
      this.alertMessage = "Activity was created successfully!";
    },
    showAlertUpdate() {
      this.showSuccessAlert = true;
      this.alertMessage = "Activity was updated successfully";
    },
    showDeleteModal(id) {
      this.$refs["delete-activity-modal"].show();
      this.customerId = id;
    },
    closeDeleteModal() {
      this.$refs["delete-activity-modal"].hide();
    },
    showDeleteSuccessModal() {
      this.showSuccessAlert = true;
      this.alertMessage = "Activity was deleted successfully!";
    },
  },
};
</script>

<style>
.action-item:hover {
  cursor: pointer;
}
</style>
