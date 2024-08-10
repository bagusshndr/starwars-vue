<template>
    <div class="main">
      <Header class="header" />
      <div class="container">
        <div class="average-calculation">
          <h3>Calculate Average Killed</h3>
          <form @submit.prevent="calculateAverage">
            <div>
              <label for="ageOfDeathA">Age of Death A:</label>
              <input type="number" v-model.number="ageOfDeathA" required />
            </div>
            <div>
              <label for="yearOfDeathA">Year of Death A:</label>
              <input type="number" v-model.number="yearOfDeathA" required />
            </div>
            <div>
              <label for="ageOfDeathB">Age of Death B:</label>
              <input type="number" v-model.number="ageOfDeathB" required />
            </div>
            <div>
              <label for="yearOfDeathB">Year of Death B:</label>
              <input type="number" v-model.number="yearOfDeathB" required />
            </div>
            <button type="submit">Calculate</button>
          </form>
          <div v-if="averageKilled !== null" class="result">
            <p><strong>Average Killed:</strong> {{ averageKilled }}</p>
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
    name: "AverageCalculation",
    components: {
      Header,
      Footer,
    },
    data() {
      return {
        ageOfDeathA: 0,
        yearOfDeathA: 0,
        ageOfDeathB: 0,
        yearOfDeathB: 0,
        averageKilled: null,
      };
    },
    methods: {
      calculateAverage() {
        const data = {
          ageOfDeathA: this.ageOfDeathA,
          yearOfDeathA: this.yearOfDeathA,
          ageOfDeathB: this.ageOfDeathB,
          yearOfDeathB: this.yearOfDeathB,
        };
  
        apiService
          .calculateAverageDeath(data)
          .then((response) => {
            this.averageKilled = response.data.averageKilled;
          })
          .catch((error) => {
            console.error("Error calculating average:", error);
            alert("An error occurred while calculating the average!");
          });
      },
    },
  };
  </script>
  