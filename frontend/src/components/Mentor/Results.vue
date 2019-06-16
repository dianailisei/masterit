<template>
  <main>
    <h1 class="font-weight-thin mx-5 my-3 white--text">Exam Results</h1>
    <v-container>
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
              <p
                v-for="result in results[index]"
                :key="result.name"
              >{{result.name}} - {{result.score}}</p>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
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
      if (m.courseId) {
        if (!this.results[m.courseId]) {
          this.results[m.courseId] = [];
        }
        this.results[m.courseId].push({
          name: m.firstName + " " + m.lastName,
          score: m.score
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
