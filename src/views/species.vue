<template>
  <div class="main">
    <Header class="header" />
    <div class="container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search species..."
        class="search-input"
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Classification</th>
            <th>Language</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(species, index) in paginatedSpecies" :key="index">
            <td>{{ species.name }}</td>
            <td>{{ species.classification }}</td>
            <td>{{ species.language }}</td>
            <td>
              <button class="read_more_btn" @click="showDetails(species)">
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
    <!-- Species Details Modal -->
    <div v-if="showModal" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h3>{{ selectedSpecies.name }}</h3>
          </div>
          <div class="modal-body">
            <p><strong>Classification:</strong> {{ selectedSpecies.classification }}</p>
            <p><strong>Language:</strong> {{ selectedSpecies.language }}</p>
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
  name: "Species",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      speciesData: [],
      showModal: false,
      selectedSpecies: null,
      searchQuery: "",
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  created() {
    this.onRefreshData();
  },
  computed: {
    filteredSpecies() {
      if (!this.searchQuery) return this.speciesData;
      return this.speciesData.filter((species) =>
        species.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    paginatedSpecies() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredSpecies.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredSpecies.length / this.itemsPerPage);
    },
  },
  methods: {
    onRefreshData() {
      apiService
        .getAllSpecies()
        .then((res) => {
          this.speciesData = res.data.results;
        })
        .catch((err) => {
          console.error("Error fetching species:", err);
          alert("An error occurred while fetching species!");
        });
    },
    showDetails(species) {
      this.selectedSpecies = species;
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

