<template>
  <main>
    <h1 class="font-weight-thin mx-5 my-3 white--text">Dashboard</h1>
    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex xs12 sm6 md3 lg4 class="px-4 pb-4">
          <v-card color="navbarColor" class="rounded-corners white--text darken-1">
            <v-card-title>
              <h2 class="font-weight-thin">Sprint Stats</h2>
            </v-card-title>
            <v-card-text>
              <p
                v-if="this.$store.getters.lastSprint !== undefined"
                class="subheading font-weight-thin"
              >{{this.$store.getters.getSprintRemainingDays}} days remaining of sprint no. {{this.$store.getters.lastSprint.number}}</p>
              <p v-else class="subheading font-weight-thin">No sprint available</p>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6 md3 lg3 class="px-4 pb-3">
          <v-card color="cardColor" class="rounded-corners white--text">
            <v-card-title>
              <h2 class="font-weight-thin">Your next meeting</h2>
            </v-card-title>
            <v-card-text>
              <p class="subheading font-weight-thin">2 mins until daily</p>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 sm12 md6 lg5 class="px-4">
          <v-card color="navbarColor" class="rounded-corners white--text darken-1">
            <v-card-title>
              <h2 class="font-weight-thin">Good Practices</h2>
            </v-card-title>
            <v-card-text>
              <v-data-iterator
                :items="goodPractices"
                :rows-per-page-items="rowsPerPageItems"
                :pagination.sync="pagination"
                content-tag="v-layout"
                column
                wrap
                dark
                class="no-padding"
              >
                <template v-slot:item="props">
                  <p class="subheading font-weight-thin">
                    <v-icon>keyboard_arrow_right</v-icon>
                    {{props.item}}
                  </p>
                </template>
              </v-data-iterator>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </main>
</template>

<script>
export default {
  name: "StudentDashboard",
  data() {
    return {
      goodPractices: [],
      rowsPerPageItems: [3, 6, 9],
      pagination: {
        rowsPerPage: 6
      }
    };
  },
  created() {
    this.$store.getters.goodPractices.rules.forEach(g => {
      this.goodPractices.push(g);
    });
  }
};
</script>

<style>
</style>
