<template>
  <main>
    <h1 class="font-weight-thin mx-5 my-3 white--text">Feedback Tests</h1>
    <v-container v-if="$store.getters.lastSprint">
      <v-layout row wrap align-center justify-center>
        <v-card color="navbarColor" class="rounded-corners">
          <v-card-title>
            <h2 class="font-weight-light pb-1 pl-2 white--text">Answer to the following questions:</h2>
          </v-card-title>
          <v-card-text>
            <v-container
              v-for="(question, index) in $store.getters.lastFeedbackTest.questions"
              :key="question"
            >
              <h3 class="font-weight-light pb-1 pl-2 white--text">{{question}}</h3>
              <v-text-field
                label="Type your answer"
                v-model="answers[index]"
                color="white"
                required
              ></v-text-field>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-layout align-center justify-end row fill-height class="pa-3">
              <v-btn color="white" outline fab @click="submitAnswers">
                <v-icon>send</v-icon>
              </v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-layout>
    </v-container>
    <v-container v-else><p class="headline font-weight-thin white--text pa-5">No feedback test available. 😪</p></v-container>
  </main>
</template>

<script>
import FeedbackService from "@/api-services/FeedbackService";
export default {
  name: "StudentFeedback",
  data() {
    return {
      answers: []
    };
  },
  methods: {
    submitAnswers() {
      FeedbackService.getById(
        this.$store.getters.lastFeedbackTest._id,
        localStorage.getItem("token")
      ).then(res => {
        res.data.results.push(this.answers);
        FeedbackService.update(
          res.data._id,
          { results: res.data.results },
          localStorage.getItem("token")
        ).then(response => {
          console.log(response);
          this.$store.dispatch("SET_LAST_FEEDBACK", {
            id: this.$store.getters.user.mentorId,
            token: localStorage.getItem("token")
          });
          this.$swal("Success!", "", "success");
        });
      });
    }
  }
};
</script>

<style>
.rounded-corners {
  border-radius: 5px;
}
</style>
