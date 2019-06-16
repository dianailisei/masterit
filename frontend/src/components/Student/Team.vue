<template>
  <main>
    <h1 class="font-weight-thin mx-5 my-3 white--text">Team</h1>
    <v-container class="my-3" v-if="this.$store.getters.team.length !== 0">
      <v-layout row wrap>
        <v-flex wrap xs12 sm6 md5 lg3 v-for="member in this.$store.getters.team" :key="member._id">
          <v-card class="text-xs-center ma-3 rounded-corners">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="grey lighten-2">
                <img :src="require('@/assets/logo.png')" alt="avatar">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading pb-3">{{member.firstName}} {{member.lastName}}</div>
              <p v-if="member.courseId" class="grey--text">{{$store.getters.courses[member.courseId]}}</p>
              <p v-else class="grey--text">Not Updated</p>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container v-else>
      <p
        class="subheading font-weight-thin white--text pl-5"
      >You are not assigned to any team yet. 😪</p>
    </v-container>
  </main>
</template>

<script>
export default {
  name: "StudentTeam",
  data() {
    return {
    };
  }
};
</script>

<style>
</style>
