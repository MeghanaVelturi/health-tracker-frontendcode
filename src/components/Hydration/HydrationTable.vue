<template>
  <div>
    <b-row>
      <b-alert v-model="showSuccessAlert" variant="success" dismissible>
        {{ alertMessage }}
      </b-alert>
    </b-row>
    <b-row>
      <hydration-overview
        :totalCustomers="numberOfCustomers"
        :activeCustomers="activeCustomers"
        @totalCustomersIsActive="setFilterTotalIsActive"
        @activeCustomerIsActive="setFilterActiveIsActive"
      ></hydration-overview>
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
                  <span class="h6 text-white">New Hydration</span>
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
      ref="create-hydration-modal"
      size="xl"
      hide-footer
      title="New Hydration"
    >
      <create-hydration-form
        @closeCreateModal="closeCreateModal"
        @reloadDataTable="getHydrationData"
        @showSuccessAlert="showAlertCreate"
      ></create-hydration-form>
    </b-modal>

    <!-- Modal for updating customers -->
    <b-modal
      ref="edit-hydration-modal"
      size="xl"
      hide-footer
      title="Edit Customer"
    >
      <edit-hydration-modal
        @closeEditModal="closeEditModal"
        @reloadDataTable="getHydrationData"
        @showSuccessAlert="showAlertUpdate"
        :customerId="customerId"
      ></edit-hydration-modal>
    </b-modal>

    <!-- Delete Customer Modal -->
    <b-modal
      ref="delete-hydration-modal"
      size="md"
      hide-footer
      title="Confirm Deletion"
    >
      <delete-hydration-modal
        @closeDeleteModal="closeDeleteModal"
        @reloadDataTable="getHydrationData"
        @showDeleteAlert="showDeleteSuccessModal"
        :customerId="customerId"
      ></delete-hydration-modal>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import HydrationOverview from "@/components/Hydration/HydrationOverview.vue";
import CreateHydrationForm from "@/components/Hydration/CreateHydrationForm.vue";
import EditHydrationModal from "@/components/Hydration/EditHydrationModal.vue";
import DeleteHydrationModal from "@/components/Hydration/DeleteHydrationModal.vue";

export default {
  components: {
    HydrationOverview,
    CreateHydrationForm,
    EditHydrationModal,
    DeleteHydrationModal,
  },
  data() {
    return {
      // Note 'isActive' is left out and will not appear in the rendered table

      fields: [
        {
          key: "mltaken",
          label: "ML Taken",
          sortable: false,
        },
        {
          key: "liquidname",
          label: "Liquid Name",
          sortable: false,
        },
        {
          key: "datetime",
          label: "Datetime",
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
    this.getHydrationData();
  },
  methods: {
    showCreateModal() {
      this.$refs["create-hydration-modal"].show();
    },
    closeCreateModal() {
      this.$refs["create-hydration-modal"].hide();
    },
    getHydrationData() {
      let useremail = localStorage.getItem("email");
      axios
        .get(
          "https://health-tracker-production-5285.up.railway.app/api/hydrations/email/" +
            useremail
        )
        .then((response) => {
          this.tableHeader = "Total Customer";
          this.items = response.data;
          let mltaken = 0;
          response.data.map((hyd) => {
            mltaken = mltaken + hyd.mltaken;
          });
          this.numberOfCustomers = mltaken;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getRowData(id) {
      this.$refs["edit-hydration-modal"].show();
      this.customerId = id;
    },
    closeEditModal() {
      this.$refs["edit-hydration-modal"].hide();
    },
    setFilterTotalIsActive() {
      this.tableHeader = "Total Customers";
      this.getHydrationData();
    },
    setFilterActiveIsActive() {
      this.tableHeader = "Active Customers";
      this.items = this.activeCustomersData;
    },
    showAlertCreate() {
      this.showSuccessAlert = true;
      this.alertMessage = "Hydration was created successfully!";
    },
    showAlertUpdate() {
      this.showSuccessAlert = true;
      this.alertMessage = "Hydration was updated successfully";
    },
    showDeleteModal(id) {
      this.$refs["delete-hydration-modal"].show();
      this.customerId = id;
    },
    closeDeleteModal() {
      this.$refs["delete-hydration-modal"].hide();
    },
    showDeleteSuccessModal() {
      this.showSuccessAlert = true;
      this.alertMessage = "Hydration was deleted successfully!";
    },
  },
};
</script>

<style>
.action-item:hover {
  cursor: pointer;
}
</style>
