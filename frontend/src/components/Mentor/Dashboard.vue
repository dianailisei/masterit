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
            <v-card-actions>
              <v-btn flat class="white--text font-weight-light" route to="sprints">Plan next sprint</v-btn>
            </v-card-actions>
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
              <h2 class="font-weight-thin">Team</h2>
            </v-card-title>
            <v-card-text v-if="this.$store.getters.team.length !== 0">
              <!-- <v-layout align-center justify-center row fill-height v-show="loadingTeam">
                  <v-progress-circular :size="50" color="white" indeterminate></v-progress-circular>
              </v-layout> -->
              <v-list class="transparent">
                <v-list-tile
                  v-for="member in this.$store.getters.team"
                  :key="member.name"
                  route
                  to="#"
                  class="pa-1"
                >
                  <v-list-tile-action>
                    <v-avatar size="50" class="grey lighten-2">
                      <img :src="member.profilePicture" v-if="member.profilePicture">
                      <img :src="require('@/assets/profile.png')" v-else>
                    </v-avatar>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <h2
                      class="font-weight-thin white--text"
                    >{{member.firstName}} {{member.lastName}}</h2>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card-text>
            <v-card-text v-else>
              <p class="subheading font-weight-thin">No members yet. 😪</p>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </main>
</template>

<script>
/* eslint-disable no-undef */
/* eslint-disable vue/no-side-effects-in-computed-properties */
// import MentorService from "@/api-services/mentorService";
export default {
  name: "MentorDashboard",
  data() {
    return {
      loadingTeam: true
    };
  }
};
</script>

<style>
.rounded-corners {
  border-radius: 5px;
}
.transparent-card {
  opacity: 0.6;
}
.test {
  position: relative;
  z-index: 2;
}
</style>
