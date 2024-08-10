<template>
  <div class="main">
    <Header class="header" />
    <div class="container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search starships..."
        class="search-input"
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(starship, index) in paginatedStarships" :key="index">
            <td>{{ starship.name }}</td>
            <td>{{ starship.model }}</td>
            <td>{{ starship.manufacturer }}</td>
            <td>{{ starship.cost_in_credits }}</td>
            <td>
              <button class="read_more_btn" @click="showDetails(starship)">
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
    <!-- Starship Details Modal -->
    <div v-if="showModal" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h3>{{ selectedStarship.name }}</h3>
          </div>
          <div class="modal-body">
            <p><strong>Model:</strong> {{ selectedStarship.model }}</p>
            <p><strong>Manufacturer:</strong> {{ selectedStarship.manufacturer }}</p>
            <p><strong>Cost:</strong> {{ selectedStarship.cost_in_credits }} credits</p>
            <!-- Add more details as needed -->
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
  name: "Starships",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      starships_data: [],
      showModal: false,
      selectedStarship: null,
      searchQuery: "",
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  created() {
    this.onRefreshData();
  },
  computed: {
    filteredStarships() {
      if (!this.searchQuery) return this.starships_data;
      return this.starships_data.filter((starship) =>
        starship.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    paginatedStarships() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredStarships.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredStarships.length / this.itemsPerPage);
    },
  },
  methods: {
    onRefreshData() {
      apiService
        .getAllStarships()
        .then((res) => {
          this.starships_data = res.data.results;
        })
        .catch((err) => {
          console.error("Error fetching starships:", err);
          alert("An error occurred while fetching starships!");
        });
    },
    showDetails(starship) {
      this.selectedStarship = starship;
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

