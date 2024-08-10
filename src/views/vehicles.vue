<template>
  <div class="main">
    <Header class="header" />
    <div class="container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search vehicles..."
        class="search-input"
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(vehicle, index) in paginatedVehicles" :key="index">
            <td>{{ vehicle.name }}</td>
            <td>{{ vehicle.model }}</td>
            <td>{{ vehicle.manufacturer }}</td>
            <td>
              <button
                class="read_more_btn"
                @click="showDetails(vehicle)"
              >
                Read More
                <i class="fas fa-arrow-right"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">
          Next
        </button>
      </div>
    </div>
    <div v-if="showModal" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h3>{{ selectedVehicle.name }}</h3>
          </div>
          <div class="modal-body">
            <p><strong>Model:</strong> {{ selectedVehicle.model }}</p>
            <p><strong>Manufacturer:</strong> {{ selectedVehicle.manufacturer }}</p>
            <p><strong>Cost in Credits:</strong> {{ selectedVehicle.cost_in_credits }}</p>
            <p><strong>length:</strong> {{ selectedVehicle.length }}</p>
            <p><strong>Max Atmosphering Speed:</strong> {{ selectedVehicle.max_atmosphering_speed }}</p>
            <p><strong>Crew:</strong> {{ selectedVehicle.crew }}</p>
          </div>
          <div class="modal-footer">
            <button class="modal-default-button" @click="closeModal()">
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer class="footer" />
  </div>
</template>

<script>
import Header from "@/components/header";
import Footer from "@/components/footer";
import apiService from "@/api/api";

export default {
  name: "Vehicles",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      vehiclesData: [],
      showModal: false,
      selectedVehicle: null,
      searchQuery: "",
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  created() {
    this.onRefreshData();
  },
  computed: {
    filteredVehicles() {
      if (!this.searchQuery) return this.vehiclesData;
      return this.vehiclesData.filter((vehicle) =>
        vehicle.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    paginatedVehicles() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredVehicles.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredVehicles.length / this.itemsPerPage);
    },
  },
  methods: {
    onRefreshData() {
      apiService
        .getAllVehicles()
        .then((res) => {
          this.vehiclesData = res.data.results;
        })
        .catch((err) => {
          console.error("Error fetching vehicles:", err);
          alert("An error occurred while fetching vehicles!");
        });
    },
    showDetails(vehicle) {
      this.selectedVehicle = vehicle;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
  },
};
</script>
