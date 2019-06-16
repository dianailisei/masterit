<template>
  <main>
    <h1 class="font-weight-thin mx-5 my-3 white--text">Feedback Tests</h1>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm10 md5 lg5 offset-sm1 offset-md1 offset-lg1 class="pb-3 pr-3">
          <v-card color="navbarColor" class="rounded-corners white--text darken-1 px-4 pb-4">
            <v-card-title>
              <h2 class="font-weight-thin">Edit &amp; Send Feedback Test</h2>
            </v-card-title>
            <v-card-text class="no-padding">
              <v-form>
                <v-text-field color="white" clearable v-model="firstQuestion"></v-text-field>
                <v-text-field color="white" clearable v-model="secondQuestion"></v-text-field>
                <v-text-field color="white" clearable v-model="thirdQuestion"></v-text-field>
                <v-layout justify-end row fill-height class="pt-4">
                  <v-btn color="white" dark outline fab @click="sendFeedback">
                    <v-icon>send</v-icon>
                  </v-btn>
                </v-layout>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12 sm10 md5 lg5 offset-sm1 offset-md0 offset-lg0 class="pb-3 pr-3">
          <v-card color="cardColor" class="rounded-corners white--text px-4 pb-4">
            <v-card-title>
              <h2 class="font-weight-thin">Good practices</h2>
            </v-card-title>
            <v-card-text class="no-padding">
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
              <v-dialog v-model="dialogBox" width="500">
                <template v-slot:activator="{ on }">
                  <v-btn color="white" dark outline fab @click="dialogBox= true">
                    <v-icon>add</v-icon>
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title class="headline grey lighten-2" primary-title>Add new rule</v-card-title>

                  <v-card-text>
                    <v-text-field label="New rule" v-model="newRule" color="navbarColor"></v-text-field>
                  </v-card-text>
                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" flat @click="dialogBox = false; newRule=''">Cancel</v-btn>
                    <v-btn color="navbarColor" flat @click="addNewRule()">Add</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12 sm10 md10 lg10 offset-sm1 offset-md1 offset-lg1 class="pr-3">
          <v-card color="white" class="rounded-corners px-4 pb-4">
            <v-card-title>
              <h2 class="font-weight-thin">Results</h2>
            </v-card-title>
            <v-card-text>
              <v-expansion-panel>
                <v-expansion-panel-content v-for="sprint in sprints" :key="sprint.id">
                  <template v-slot:header>
                    <div>Sprint {{sprint.number}}</div>
                  </template>
                  <v-card v-for="result in $store.getters.feedbackTests" :key="result._id">
                    <v-card-text v-if="result.sprintId == sprint.id">
                      <i v-for="question in result.questions" :key="question" class="pl-3">
                        {{question}}
                        <br>
                      </i>
                      <br>
                      <v-divider></v-divider>
                      <br>
                      <div v-for="set in result.results" :key="set[0]">
                        <p v-for="a in set" :key="a">{{a}}</p>
                        <br>
                        <v-divider></v-divider>
                        <br>
                      </div>
                    </v-card-text>
                    <v-divider></v-divider>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </main>
</template>

<script>
import FeedbackService from "@/api-services/FeedbackService";
import SprintService from "@/api-services/sprintService";
import GoodPracticeService from "@/api-services/GoodPracticeService";
export default {
  name: "Feedback",
  data() {
    return {
      firstQuestion: "What went well?",
      secondQuestion: "What didn’t go so well?",
      thirdQuestion: "How can we improve our work?",
      sprints: [],
      rowsPerPageItems: [3, 6, 9],
      pagination: {
        rowsPerPage: 6
      },
      goodPractices: [],
      dialogBox: false,
      newRule: ""
    };
  },
  created() {
    SprintService.getAllByMentor(
      this.$store.getters.user._id,
      localStorage.getItem("token")
    ).then(res => {
      if (res.data) {
        res.data.forEach(s =>
          this.sprints.push({ id: s._id, number: s.number })
        );
      }
    });
    if (
      this.$store.getters.goodPractices &&
      this.$store.getters.goodPractices.rules
    ) {
      this.$store.getters.goodPractices.rules.forEach(g => {
        this.goodPractices.push(g);
      });
    }
  },
  methods: {
    sendFeedback() {
      if (this.$store.getters.lastSprint === undefined) {
        this.$swal("Warning!", "You must start a sprint!", "warning");
      } else {
        let feedbackTest = {
          sprintId: this.$store.getters.lastSprint._id,
          mentorId: this.$store.getters.user._id,
          questions: [
            this.firstQuestion,
            this.secondQuestion,
            this.thirdQuestion
          ],
          results: []
        };
        FeedbackService.create(
          feedbackTest,
          localStorage.getItem("token")
        ).then(res => {
          console.log(res.data);
          this.$store.dispatch("SET_LAST_FEEDBACK", {
            id: this.$store.getters.user._id,
            token: localStorage.getItem("token")
          });
          this.$swal("Success!", "", "success");
        });
      }
    },
    addNewRule() {
      this.goodPractices.push(this.newRule);
      GoodPracticeService.update(
        this.$store.getters.goodPractices._id,
        { rules: this.goodPractices },
        localStorage.getItem("token")
      ).then(res => {
        console.log(res);
        this.$store.dispatch("SET_GOOD_PRACTICES", {
          id: this.$store.getters.user._id,
          token: localStorage.getItem("token")
        });
        this.newRule = "";
        this.dialogBox = false;
        this.$swal("Success!", "", "success");
      });
    }
  }
};
</script>

<style>
.rounded-corners {
  border-radius: 5px;
}
.no-padding {
  padding: 0%;
}
</style>
