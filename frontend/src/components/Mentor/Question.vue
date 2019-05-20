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
                <v-text-field v-model="question.question" label="Question" color="white"></v-text-field>
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
                  color="white"
                ></v-combobox>
                <v-switch color="indigo darken-3" v-model="snippet" label="Snippet"></v-switch>
                <v-textarea v-if="snippet" color="white"></v-textarea>
                <v-layout align-center justify-end row fill-height class="pa-3">
                  <v-btn color="white" dark outline fab>
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
export default {
  name: "Question",
  data() {
    return {
      snippet: false,
      question: {
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
      },
      search: ""
    };
  },
  methods: {
    updateTags() {
      this.$nextTick(() => {
        this.question.answers.push(...this.search.split(","));
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
      }
    }
  }
};
</script>

<style>
</style>
