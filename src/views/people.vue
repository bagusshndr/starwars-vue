<template>
  <div class="main">
    <Header class="header" />
    <div class="container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search characters..."
        class="search-input"
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Birth Year</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paginatedCharacters" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.birth_year }}</td>
            <td>{{ item.gender }}</td>
            <td>
              <button class="read_more_btn" @click="toggleDetails(item)">
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
    <!-- Character Details Modal -->
    <div v-if="selectedName" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h3>{{ selectedName.name }}</h3>
          </div>
          <div class="modal-body">
            <p><strong>Birth Year:</strong> {{ selectedName.birth_year }}</p>
            <p><strong>Gender:</strong> {{ selectedName.gender }}</p>
            <p><strong>Eye Color:</strong> {{ selectedName.eye_color }}</p>
            <p><strong>Hair Color:</strong> {{ selectedName.hair_color }}</p>
            <p><strong>Skin Color:</strong> {{ selectedName.skin_color }}</p>
            <p><strong>Home World:</strong> {{ selectedName.homeworld }}</p>
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
  name: "home",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      ch_data: [],
      loader: true,
      selectedName: null,
      searchQuery: "",
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  created() {
    this.onRefreshData();
  },
  computed: {
    filteredCharacters() {
      if (!this.searchQuery) return this.ch_data;
      return this.ch_data.filter((character) =>
        character.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    paginatedCharacters() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredCharacters.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredCharacters.length / this.itemsPerPage);
    },
  },
  methods: {
    onRefreshData() {
      this.loader = true;
      apiService
        .getAllPeople()
        .then((res) => {
          this.loader = false;
          this.ch_data = res.data.results;
        })
        .catch((err) => {
          this.loader = false;
          alert("An error occurred while fetching data!");
          console.log(err.message);
        });
    },
    toggleDetails(item) {
      this.selectedName = item;
    },
    closeModal() {
      this.selectedName = null;
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
