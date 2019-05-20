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
                  <v-btn color="white" dark outline fab>
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
              <v-btn color="white" dark outline fab>
                <v-icon>add</v-icon>
              </v-btn>
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
                <v-expansion-panel-content v-for="i in numberOfSprints" :key="i">
                  <template v-slot:header>
                    <div>Sprint {{i}}</div>
                  </template>
                  <v-card v-for="result in results" :key="result.name">
                    <v-card-title v-if="result.sprint == i">
                      <h3 class="font-weight-light">{{result.name}}</h3>
                    </v-card-title>
                    <v-card-text v-if="result.sprint == i">
                      <p
                        v-for="question in result.response"
                        :key="question"
                        class="pl-3"
                      >{{question}}</p>
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
export default {
  name: "Feedback",
  data() {
    return {
      firstQuestion: "What went well?",
      secondQuestion: "What didn’t go so well?",
      thirdQuestion: "How can we improve our work?",
      goodPractices: [
        "Use === Instead of == ",
        "Reduce Globals",
        "Comment your code",
        "Use === Instead of == ",
        "Reduce Globals",
        "Comment your code",
        "Use === Instead of == ",
        "Reduce Globals",
        "Comment your code"
      ],
      rowsPerPageItems: [3, 6, 9],
      pagination: {
        rowsPerPage: 6
      },
      numberOfSprints: 3,
      results: [
        {
          name: "Anonymous",
          sprint: "2",
          response: [
            "What went well? - blah blah blah",
            "What didn’t go so well? - blah blah blah",
            "How can we improve our work? - blah blah blah"
          ]
        },
        {
          name: "Tom",
          sprint: "2",
          response: [
            "What went well? - blah blah blah",
            "What didn’t go so well? - blah blah blah",
            "How can we improve our work? - blah blah blah"
          ]
        },
        {
          name: "Alice",
          sprint: "1",
          response: [
            "What went well? - blah blah blah",
            "What didn’t go so well? - blah blah blah",
            "How can we improve our work? - - blah blah blah"
          ]
        }
      ]
    };
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
