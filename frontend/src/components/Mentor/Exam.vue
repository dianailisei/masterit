<template>
  <main>
    <h1 class="font-weight-thin mx-5 my-3 white--text">Exam</h1>
    <v-container>
      <v-layout align-center row wrap>
        <v-flex xs12 sm12 md12 lg12>
          <v-layout align-center justify-space-around row fill-height>
            <v-btn
              v-for="course in courses"
              :key="course._id"
              color="navbarColor"
              fab
              large
              :dark="course.dark"
              :outline="course.outline"
              @click="toggleButton(course)"
            >{{course.name}}</v-btn>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm10 md8 lg8 align-center offset-md2 offset-lg2 class="py-5">
          <v-card color="white" class="rounded-corners" v-show="showQuestions">
            <v-card-title>
              <h2 class="font-weight-light pb-1 pl-2">Questions</h2>
            </v-card-title>
            <v-card-text>
              <template v-if="courseQuestions.length !== 0">
                <v-container v-for="question in courseQuestions" :key="question._id">
                  <h3 class="font-weight-light">{{question.question}}</h3>
                  <br>
                  <v-layout align-center justify-center column fill-height>
                    <code v-if="question.snippetContent !== ''">{{question.snippetContent}}</code>
                  </v-layout>
                  <v-layout wrap>
                    <v-flex xs10 sm10 md10 lg10>
                      <v-checkbox
                        v-for="answer in question.answers"
                        :key="answer"
                        :label="answer"
                        color="navbarColor"
                        hide-details
                      ></v-checkbox>
                    </v-flex>
                    <v-flex xs2 sm2 md2 lg2>
                      <v-layout align-end justify-end row fill-height>
                        <v-btn
                          color="cardColor"
                          outline
                          fab
                          route
                          :to="{name: 'Question', params: { id: question._id }}"
                        >
                          <v-icon>edit</v-icon>
                        </v-btn>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                  <br>
                  <v-divider></v-divider>
                </v-container>
              </template>
              <template v-else>
                <h3 class="font-weight-light pl-4">No questions added yet. 😪</h3>
              </template>
            </v-card-text>
            <v-card-actions>
              <v-layout align-center justify-end row fill-height class="pa-3">
                <v-btn color="navbarColor" outline fab route to="question">
                  <v-icon>add_circle</v-icon>
                </v-btn>
                <v-btn color="red" outline fab @click="deleteAllQuestions(selectedCourse)">
                  <v-icon>delete</v-icon>
                </v-btn>
                <v-btn color="cardColor" outline fab>
                  <v-icon>send</v-icon>
                </v-btn>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </main>
</template>

<script>
import CourseService from "@/api-services/CourseService";
import QuestionService from "@/api-services/QuestionService";
// import Router from "@/router";
export default {
  name: "Exam",
  data() {
    return {
      courses: [],
      allQuestions: [],
      showQuestions: false,
      selectedCourse: ""
    };
  },
  created() {
    CourseService.getAll(localStorage.getItem("token"))
      .then(res => {
        this.courses = res.data.map(c => {
          c.dark = false;
          c.outline = true;
          return c;
        });
        this.courses.forEach(c => {
          QuestionService.getByCourseId(c._id, localStorage.getItem("token"))
            .then(response => this.allQuestions.push(...response.data))
            .catch(err => console.log(err));
        });
      })
      .catch(err => console.log(err));
  },
  computed: {
    courseQuestions() {
      let questions = [];
      this.allQuestions.forEach(q => {
        if (q.courseId === this.selectedCourse._id) {
          questions.push(q);
        }
      });
      return questions;
    }
  },
  methods: {
    toggleButton(course) {
      this.courses.forEach(c => {
        c.dark = false;
        c.outline = true;
        this.showQuestions = false;
      });
      course.dark = !course.dark;
      course.outline = !course.outline;
      if (course.dark === true) {
        this.showQuestions = true;
        this.selectedCourse = course;
      }
    },
    deleteAllQuestions(course) {
      QuestionService.deleteByCourseId(
        course._id,
        localStorage.getItem("token")
      )
        .then(() => {
          this.$swal("Success!", "", "success");
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style>
.hidden {
  display: none;
}
.rounded-corners {
  border-radius: 5px;
}
</style>
