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
              
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </main>
</template>

<script>
export default {

}
</script>

<style>

</style>
