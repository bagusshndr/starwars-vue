<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <Logo class="navbar-brand" />
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/characters">Characters</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/films">Films</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/species">Species</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/starships">Starships</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/vehicles">Vehicles</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/villagers">Villagers .Net API</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import Logo from "@/components/logo";

export default {
  components: {
    Logo,
  },
};
</script>

<style scoped>
.navbar {
  padding: 0.5rem 1rem;
}

.navbar-brand, .nav-link {
  padding: 0.3rem 0.5rem;
  font-size: 0.9rem;
}

.nav-link {
  margin-right: 0.5rem;
}

@media (max-width: 991px) {
  .navbar-nav {
    margin-top: 0.5rem;
  }
}
</style>
