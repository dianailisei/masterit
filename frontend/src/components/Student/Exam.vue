<template>
  <main>
    <h1 class="font-weight-thin mx-5 my-3 white--text">Exam</h1>
    <v-container v-if="questions.length > 0">
      <v-layout align-center justify-space-around row fill-height>
        <v-flex xs12 sm12 md8 lg8>
          <v-card color="white" v-if="!submitted">
            <v-card-title>
              <h2 class="font-weight-light pb-1 pl-2">Answer to the following questions:</h2>
            </v-card-title>
            <v-card-text>
              <v-container v-for="(question, index) in questions" :key="question._id">
                <h3 class="font-weight-light">{{question.question}}</h3>
                <br>
                <v-layout align-center justify-center column fill-height>
                  <code v-if="question.snippetContent !== ''">{{question.snippetContent}}</code>
                </v-layout>
                <v-layout wrap>
                  <v-flex xs10 sm10 md10 lg10>
                    <v-checkbox
                      v-for="(answer, index1) in question.answers"
                      :key="answer.text"
                      :label="answer.text"
                      :value="question.answers[index1]"
                      color="navbarColor"
                      hide-details
                      v-model="answers[index]"
                    ></v-checkbox>
                  </v-flex>
                </v-layout>
                <br>
                <v-divider></v-divider>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-layout align-center justify-end row fill-height class="pa-3">
                <v-btn color="navbarColor" outline fab @click="submitAnswers">
                  <v-icon>send</v-icon>
                </v-btn>
              </v-layout>
            </v-card-actions>
          </v-card>
          <v-card color="white" v-else>
            <v-card-title>
              <h2 class="font-weight-light pb-1 pl-2">Results</h2>
            </v-card-title>
            <v-card-text>
              <v-container v-for="question in questions" :key="question._id">
                <h3 class="font-weight-light">{{question.question}}</h3>
                <br>
                <v-layout align-center justify-center column fill-height>
                  <code v-if="question.snippetContent !== ''">{{question.snippetContent}}</code>
                </v-layout>
                <v-layout wrap>
                  <v-flex xs10 sm10 md10 lg10>
                    <v-checkbox
                      v-for="answer in question.answers"
                      :key="answer.text"
                      :label="answer.text"
                      v-model="answer.value"
                      color="navbarColor"
                      hide-details
                    ></v-checkbox>
                  </v-flex>
                </v-layout>
                <br>
                <v-divider></v-divider>
              </v-container>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container v-else-if="$store.getters.user.submittedExam">
      <p class="subheading font-weight-thin white--text">You already submitted an exam.</p>
    </v-container>
    <v-container v-else>
      <p class="subheading font-weight-thin white--text">Your exam is not available yet. 😪</p>
    </v-container>
  </main>
</template>

<script>
import QuestionService from "@/api-services/QuestionService";
import StudentService from "@/api-services/studentService";
export default {
  name: "StudentExam",
  data() {
    return {
      questions: [],
      correctAnswers: [],
      answers: [],
      numberOfCorrectAnswers: 0
    };
  },
  created() {
    if (
      this.$store.getters.user.submittedExam === false &&
      this.$store.getters.user.courseId
    ) {
      QuestionService.getByCourseId(
        this.$store.getters.user.courseId,
        localStorage.getItem("token")
      ).then(res => {
        if (res.data) {
          res.data.forEach(q => {
            if(q.visible === true){
              this.questions.push(q)
            }
          })
          // this.questions = res.data;
          this.questions.forEach((q, index) => {
            q.answers.forEach((a, index1) => {
              q.answers[index1] = {
                value: this.isCorrect(a, q.correctAnswers),
                text: a
              };
            });
            this.answers[index] = [];
            this.correctAnswers[index] = q.correctAnswers;
          });
        }
      });
    }
  },
  computed: {
    submitted() {
      return this.$store.getters.user.submittedExam;
    }
  },
  methods: {
    submitAnswers() {
      this.answers.forEach(answer => {
        let ok = true;
        answer.forEach(option => {
          if (option.value === false) ok = false;
        });
        if (ok === true) {
          this.numberOfCorrectAnswers += 1;
        }
      });
      let score = this.numberOfCorrectAnswers + "/" + this.questions.length;
      StudentService.update(
        this.$store.getters.user._id,
        { submittedExam: true, score: score },
        localStorage.getItem("token")
      ).then(res => {
        this.$store.dispatch("SET_USER", {
          user: { id: res.data._id },
          token: localStorage.getItem("token")
        });
        this.$swal(
          "Congrats!",
          `Your score: ${this.numberOfCorrectAnswers}/${this.questions.length}`,
          "success"
        );
      });
    },
    isCorrect(answer, arr) {
      if (arr.indexOf(answer) !== -1) return true;
      return false;
    }
  }
};
</script>

<style>
</style>
