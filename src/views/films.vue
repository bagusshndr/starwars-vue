<template>
  <div class="main">
    <Header class="header" />
    <div class="content">
      <div class="container">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search films..."
          class="search-input"
        />
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Director</th>
              <th>Release Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(film, index) in paginatedFilms" :key="index">
              <td>{{ film.title }}</td>
              <td>{{ film.director }}</td>
              <td>{{ film.release_date }}</td>
              <td>
                <button class="read_more_btn" @click="showDetails(film)">
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
      <div class="films_loader" v-if="films_loader">Loading films...</div>
      <div v-if="films.length === 0 && !films_loader">
        No films to be displayed!
      </div>
    </div>
    <Footer class="footer" />

    <div v-if="showModal" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h3>{{ selectedFilm.title }}</h3>
          </div>
          <div class="modal-body">
            <p><strong>Director:</strong> {{ selectedFilm.director }}</p>
            <p><strong>Release Date:</strong> {{ selectedFilm.release_date }}</p>
          </div>
          <div class="modal-footer">
            <button class="modal-default-button" @click="closeModal()">
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
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
      films: [],
      films_loader: true,
      showModal: false,
      selectedFilm: null,
      searchQuery: "",
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  created() {
    this.onRefreshData();
  },
  computed: {
    filteredFilms() {
      if (!this.searchQuery) return this.films;
      return this.films.filter((film) =>
        film.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    paginatedFilms() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredFilms.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredFilms.length / this.itemsPerPage);
    },
  },
  methods: {
    onRefreshData() {
      this.films_loader = true;
      apiService
        .getAllFilms()
        .then((res) => {
          this.films_loader = false;
          this.films = res.data.results;
        })
        .catch((err) => {
          this.films_loader = false;
          console.error("An error occurred while fetching films:", err.message);
          alert("An error occurred while fetching films!");
        });
    },
    showDetails(film) {
      this.selectedFilm = film;
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

