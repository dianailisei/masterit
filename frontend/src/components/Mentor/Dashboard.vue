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
              <p class="subheading font-weight-thin">3 days remaining of sprint no. 3</p>
            </v-card-text>
            <v-card-actions>
              <v-btn flat class="white--text font-weight-light">Plan next sprint</v-btn>
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
            <v-card-text>
              <v-list class="transparent">
                <v-list-tile v-for="member in team" :key="member.name" route to="#" class="pa-1">
                  <v-list-tile-action>
                    <v-avatar size="40" class="grey lighten-2">
                      <img :src="require('@/assets/logo.png')">
                    </v-avatar>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <h2 class="font-weight-thin white--text">{{member.name}}</h2>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </main>
</template>

<script>
export default {
  name: "MentorDashboard",
  data() {
    return {
      team: [
        {
          name: "Diana Ilisei",
          avatar: "assets/logo.png",
          position: "Backend Dev"
        },
        {
          name: "Diana Ilisei2",
          avatar: "assets/logo.png",
          position: "Backend Dev"
        },
        {
          name: "Diana Ilisei3",
          avatar: "assets/logo.png",
          position: "Backend Dev"
        }
      ]
    };
  },
  methods: {}
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
