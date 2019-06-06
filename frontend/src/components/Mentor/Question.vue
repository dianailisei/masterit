<template>
  <main>
    <h1 class="font-weight-thin mx-5 my-3 white--text">Add/Edit Question</h1>
    <v-container>
      <v-layout justify-center align-center>
        <v-flex xs12 sm12 md8 lg6>
          <v-card color="navbarColor white--text" class="rounded-corners pa-4">
            <h2 class="font-weight-thin pb-1"></h2>
            <v-card-text>
              <v-form>
                <v-select
                  :items="courses"
                  label="Course"
                  color="white"
                  menu-props="offsetY"
                  v-model="question.courseId"
                  item-text="name"
                  item-value="_id"
                  required
                ></v-select>
                <v-text-field v-model="question.question" label="Question" color="white" required></v-text-field>
                <v-combobox
                  multiple
                  v-model="question.answers"
                  label="Answers"
                  append-icon
                  chips
                  deletable-chips
                  :search-input.sync="search"
                  @keyup.tab="updateTags"
                  color="white"
                  required
                ></v-combobox>
                <v-combobox
                  multiple
                  v-model="question.correctAnswers"
                  label="Correct Answers"
                  append-icon
                  chips
                  deletable-chips
                  :search-input.sync="search"
                  @keyup.tab="updateTags"
                  required
                  color="white"
                ></v-combobox>
                <v-switch color="indigo darken-3" v-model="snippet" label="Snippet"></v-switch>
                <v-textarea v-if="snippet" color="white" v-model="question.snippetContent"></v-textarea>
                <v-layout align-center justify-end row fill-height class="pa-3">
                  <v-btn color="white" outline fab @click="deleteQuestion" :disabled="!isInDb">
                    <v-icon>delete</v-icon>
                  </v-btn>
                  <v-btn color="white" outline fab @click="addQuestion">
                    <v-icon>save</v-icon>
                  </v-btn>
                </v-layout>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </main>
</template>

<script>
import CourseService from "@/api-services/CourseService";
import QuestionService from "@/api-services/QuestionService";
import Router from "@/router";
export default {
  name: "Question",
  data() {
    return {
      snippet: false,
      question: {
        question: "",
        answers: [],
        snippet: true,
        snippetContent: ``,
        correctAnswers: [],
        courseId: ""
      },
      courses: ["JAVA", ".NET", "Testing", "DevOps"],
      search: ""
    };
  },
  computed: {
    isInDb() {
      if (this.$route.params.id) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    updateTags() {
      this.$nextTick(() => {
        if (this.search != "" || this.search !== null) {
          this.question.answers.push(...this.search.split(","));
        }
        this.$nextTick(() => {
          this.search = "";
        });
      });
    },
    toggleSnippet() {
      this.snippet = !this.snippet;
      let snippetContainer = document.getElementById("snippetContainer");
      if (this.snippet) {
        snippetContainer.classList.remove("hidden");
      } else {
        snippetContainer.classList.add("hidden");
        this.question.snippetContent = "";
      }
    },
    addQuestion() {
      if (this.isInDb) {
        QuestionService.update(
          this.$route.params.id,
          this.question,
          localStorage.getItem("token")
        )
          .then(() => {
            this.clearQuestion();
            this.$swal("Success!", "", "success").then(
              Router.push({ name: "Exam" })
            );
          })
          .catch(err => console.log(err));
      } else {
        QuestionService.create(this.question, localStorage.getItem("token"))
          .then(() => {
            this.clearQuestion();
            this.$swal("Success!", "", "success");
          })
          .catch(err => console.log(err));
      }
    },
    deleteQuestion() {
      QuestionService.delete(this.question._id, localStorage.getItem("token"))
        .then(() => {
          this.$swal("Success!", "", "success").then(
            Router.push({ name: "Exam" })
          );
        })
        .catch(err => console.log(err));
    },
    clearQuestion() {
      this.question = {
        question: "",
        answers: [],
        snippet: true,
        snippetContent: ``,
        correctAnswers: [],
        courseId: ""
      };
    }
  },
  created() {
    if (this.$route.params.id) {
      QuestionService.getById(
        this.$route.params.id,
        localStorage.getItem("token")
      )
        .then(res => {
          // console.log(res.data);
          this.question = res.data;
        })
        .catch(err => console.log(err));
    }
    this.courses = [];
    CourseService.getAll(localStorage.getItem("token"))
      .then(res => {
        this.courses = res.data;
      })
      .catch(err => console.log(err));
  }
};
</script>

<style>
</style>
