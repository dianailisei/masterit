<template>
  <main>
    <h1 class="font-weight-thin mx-5 my-3 white--text">Exam Results</h1>
    <v-container v-if="Object.keys(results).length !== 0">
      <v-layout align-center row wrap>
        <v-flex xs12 sm12 md8 lg8 align-center offset-md2 offset-lg2 class="py-5">
          <v-card
            color="cardColor"
            class="rounded-corners white--text"
            v-for="(course, index) in $store.getters.courses"
            :key="course"
          >
            <v-card-title>
              <h2 class="font-weight-light pb-1 pl-2">{{course}}</h2>
            </v-card-title>
            <v-card-text>
              <v-list class="transparent">
                <v-list-tile v-for="member in results[index]" :key="member.name" class="pa-2">
                  <v-list-tile-action>
                    <v-avatar size="50" class="grey lighten-2">
                      <img :src="member.profilePicture" v-if="member.profilePicture">
                      <img :src="require('@/assets/profile.png')" v-else>
                    </v-avatar>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <h2 class="font-weight-thin white--text">{{member.name}} - {{member.score}}</h2>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container v-else>
      <p class="subheading font-weight-thin white--text pl-5">No results yet.</p>
    </v-container>
  </main>
</template>

<script>
export default {
  name: "Results",
  data() {
    return {
      results: {}
    };
  },
  created() {
    this.$store.getters.team.forEach(m => {
      if (m.courseId && m.submittedExam) {
        if (!this.results[m.courseId]) {
          this.results[m.courseId] = [];
        }
        this.results[m.courseId].push({
          name: m.firstName + " " + m.lastName,
          score: m.score,
          profilePicture: m.profilePicture
        });
      }
    });
  }
};
</script>

<style>
.rounded-corners {
  border-radius: 5px;
}
</style>
