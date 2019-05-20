<template>
  <main>
    <h1 class="font-weight-thin mx-5 my-3 white--text">Exam</h1>
    <v-container>
      <v-layout align-center row wrap>
        <v-flex xs12 sm12 md12 lg12>
          <v-layout align-center justify-space-around row fill-height>
            <v-btn
              color="navbarColor"
              fab
              large
              :dark="dark1"
              :outline="outline1"
              @click="toggleButton1"
            >Java</v-btn>
            <v-btn
              color="navbarColor"
              fab
              large
              :dark="dark2"
              :outline="outline2"
              @click="toggleButton2"
            >.NET</v-btn>

            <v-btn
              color="navbarColor"
              fab
              large
              :dark="dark3"
              :outline="outline3"
              @click="toggleButton3"
            >Testing</v-btn>
            <v-btn
              color="navbarColor"
              fab
              large
              :dark="dark4"
              :outline="outline4"
              @click="toggleButton4"
            >Dev Ops</v-btn>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm10 md8 lg8 align-center offset-md2 offset-lg2 class="py-5">
          <v-card color="white" class="rounded-corners hidden" id="java-questions">
            <v-card-title>
              <h2 class="font-weight-light pb-1 pl-2">Java Questions</h2>
            </v-card-title>
            <v-card-text>
              <template v-if="javaQuestions.length !== 0">
                <v-container v-for="question in javaQuestions" :key="question.question">
                  <h3 class="font-weight-light">{{question.question}}</h3>
                  <br>
                  <v-layout align-center justify-center column fill-height>
                    <code v-if="question.snippet">{{question.snippetContent}}</code>
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
                        <v-btn color="cardColor" outline fab @click="editedQuestion = question">
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
                <v-btn color="orange" outline fab>
                  <v-icon>add_circle</v-icon>
                </v-btn>
                <v-btn color="red" outline fab>
                  <v-icon>delete</v-icon>
                </v-btn>
                <v-btn color="navbarColor" outline fab>
                  <v-icon>save</v-icon>
                </v-btn>
                <v-btn color="cardColor" outline fab>
                  <v-icon>send</v-icon>
                </v-btn>
              </v-layout>
            </v-card-actions>
          </v-card>
          <v-card color="white" class="rounded-corners hidden" id="net-questions">
            <v-card-title>
              <h2 class="font-weight-light pb-1 pl-2">.NET Questions</h2>
            </v-card-title>
            <v-card-text>
              <template v-if="netQuestions.length !== 0">
                <v-container v-for="question in netQuestions" :key="question.question">
                  <h3 class="font-weight-light">{{question.question}}</h3>
                  <br>
                  <v-layout align-center justify-center column fill-height>
                    <code v-if="question.snippet">{{question.snippetContent}}</code>
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
                        <v-btn color="cardColor" outline fab>
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
                <v-btn color="orange" outline fab>
                  <v-icon>add_circle</v-icon>
                </v-btn>
                <v-btn color="red" outline fab>
                  <v-icon>delete</v-icon>
                </v-btn>
                <v-btn color="navbarColor" outline fab>
                  <v-icon>save</v-icon>
                </v-btn>
                <v-btn color="cardColor" outline fab>
                  <v-icon>send</v-icon>
                </v-btn>
              </v-layout>
            </v-card-actions>
          </v-card>
          <v-card color="white" class="rounded-corners hidden" id="testing-questions">
            <v-card-title>
              <h2 class="font-weight-light pb-1 pl-2">Testing Questions</h2>
            </v-card-title>
            <v-card-text>
              <template v-if="testingQuestions.length !== 0">
                <v-container v-for="question in testingQuestions" :key="question.question">
                  <h3 class="font-weight-light">{{question.question}}</h3>
                  <br>
                  <v-layout align-center justify-center column fill-height>
                    <code v-if="question.snippet">{{question.snippetContent}}</code>
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
                        <v-btn color="cardColor" outline fab>
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
                <v-btn color="orange" outline fab>
                  <v-icon>add_circle</v-icon>
                </v-btn>
                <v-btn color="red" outline fab>
                  <v-icon>delete</v-icon>
                </v-btn>
                <v-btn color="navbarColor" outline fab>
                  <v-icon>save</v-icon>
                </v-btn>
                <v-btn color="cardColor" outline fab>
                  <v-icon>send</v-icon>
                </v-btn>
              </v-layout>
            </v-card-actions>
          </v-card>
          <v-card color="white" class="rounded-corners hidden" id="dev-questions">
            <v-card-title>
              <h2 class="font-weight-light pb-1 pl-2">Dev Ops Questions</h2>
            </v-card-title>
            <v-card-text>
              <template v-if="devQuestions.length !== 0">
                <v-container v-for="question in devQuestions" :key="question.question">
                  <h3 class="font-weight-light">{{question.question}}</h3>
                  <br>
                  <v-layout align-center justify-center column fill-height>
                    <code v-if="question.snippet">{{question.snippetContent}}</code>
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
                        <v-btn color="cardColor" outline fab>
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
                <v-btn color="orange" outline fab>
                  <v-icon>add_circle</v-icon>
                </v-btn>
                <v-btn color="red" outline fab>
                  <v-icon>delete</v-icon>
                </v-btn>
                <v-btn color="navbarColor" outline fab>
                  <v-icon>save</v-icon>
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
export default {
  name: "Exam",
  data() {
    return {
      dark1: false,
      outline1: true,
      dark2: false,
      outline2: true,
      dark3: false,
      outline3: true,
      dark4: false,
      outline4: true,
      javaQuestions: [
        {
          question:
            "1. The default value of a static integer variable of a class in Java is:",
          answers: ["0", "1", "Garbage value", "Null", "-1"],
          snippet: false,
          snippetContent: "",
          correctAnswers: ["0"]
        },
        {
          question:
            "2. What will be printed as the output of the following program?",
          answers: ["I = 0", "I = 1", "I = 2", "I = 3", "Compile-time Error"],
          snippet: true,
          snippetContent: `
public class testincr
{
  public static void main(String args[])
  {
    int i = 0;
    i = i++ + i;
    System.out.println(“I = ” +i);
  }
}`,
          correctAnswers: ["I=1"]
        }
      ],
      netQuestions: [],
      testingQuestions: [],
      devQuestions: []
    };
  },
  methods: {
    toggleButton1() {
      this.dark1 = !this.dark1;
      this.outline1 = !this.outline1;
      let questionsContainer = document.getElementById("java-questions");
      if (this.dark1 == true) {
        questionsContainer.classList.remove("hidden");
        if (this.dark2 == true) this.toggleButton2();
        if (this.dark3 == true) this.toggleButton3();
        if (this.dark4 == true) this.toggleButton4();
      } else {
        questionsContainer.classList.add("hidden");
      }
    },
    toggleButton2() {
      this.dark2 = !this.dark2;
      this.outline2 = !this.outline2;
      let questionsContainer = document.getElementById("net-questions");
      if (this.dark2 == true) {
        questionsContainer.classList.remove("hidden");
        if (this.dark1 == true) this.toggleButton1();
        if (this.dark3 == true) this.toggleButton3();
        if (this.dark4 == true) this.toggleButton4();
      } else {
        questionsContainer.classList.add("hidden");
      }
    },
    toggleButton3() {
      this.dark3 = !this.dark3;
      this.outline3 = !this.outline3;
      let questionsContainer = document.getElementById("testing-questions");
      if (this.dark3 == true) {
        questionsContainer.classList.remove("hidden");
        if (this.dark1 == true) this.toggleButton1();
        if (this.dark2 == true) this.toggleButton2();
        if (this.dark4 == true) this.toggleButton4();
      } else {
        questionsContainer.classList.add("hidden");
      }
    },
    toggleButton4() {
      this.dark4 = !this.dark4;
      this.outline4 = !this.outline4;
      let questionsContainer = document.getElementById("dev-questions");
      if (this.dark4 == true) {
        questionsContainer.classList.remove("hidden");
        if (this.dark1 == true) this.toggleButton1();
        if (this.dark3 == true) this.toggleButton3();
        if (this.dark2 == true) this.toggleButton2();
      } else {
        questionsContainer.classList.add("hidden");
      }
    }
    
  }
};
</script>

<style>
.hidden {
  display: none;
}
</style>
