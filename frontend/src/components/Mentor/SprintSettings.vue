<template>
  <main>
    <h1 class="font-weight-thin mx-5 my-3 white--text">Sprint Settings</h1>
    <v-container>
      <v-layout justify-center wrap>
        <v-flex xs12 sm12 md5 lg4 class="pb-3">
          <v-card color="navbarColor white--text" class="rounded-corners pa-4">
            <h2 class="font-weight-thin pb-1">Plan new sprint</h2>
            <v-card-text>
              <v-form>
                <v-layout row wrap>
                  <v-flex xs12 sm12 md12 lg12>
                    <v-text-field
                      color="rgba(255, 255, 255)"
                      label="Sprint no."
                      prepend-icon="label"
                      v-model="sprint.number"
                      clearable
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12 lg12>
                    <v-text-field
                      color="rgba(255, 255, 255)"
                      label="No. of points"
                      prepend-icon="check_box"
                      v-model="sprint.pointsGiven"
                      clearable
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12 lg12>
                    <v-menu
                      v-model="modal"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="sprint.startDate"
                          label="First day of sprint"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                          color="rgba(255, 255, 255)"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        color="navbarColor"
                        v-model="sprint.startDate"
                        @input="modal = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12 sm12 md12 lg12>
                    <v-menu
                      v-model="modal1"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="sprint.endDate"
                          label="Last day of sprint"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                          color="rgba(255, 255, 255)"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        color="navbarColor"
                        v-model="sprint.endDate"
                        @input="modal1 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12 sm12 md1 lg1 offset-md7 offset-lg7>
                    <v-btn flat class="white--text" @click="createSprint">Create</v-btn>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12 sm12 md5 lg4 offset-md1 offset-lg2>
          <v-card color="cardColor white--text" class="rounded-corners pa-4">
            <h2 class="font-weight-thin pb-1">This sprint</h2>
            <v-card-text v-if="$store.getters.lastSprint !== undefined">
              <p
                class="subheading font-weight-thin"
              >{{this.$store.getters.getSprintRemainingDays}} days remaining of sprint no. {{$store.getters.lastSprint.number}}</p>
              <p
                class="subheading font-weight-thin"
              >Points given: {{this.$store.getters.lastSprint.pointsGiven}}</p>
              <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on }">
                  <v-btn color="red lighten-2" dark v-on="on">End sprint</v-btn>
                </template>

                <v-card class="rounded-corners pa-4">
                  <v-card-title class="headline lighten-2">End Sprint</v-card-title>

                  <v-card-text>
                    <v-form>
                      <v-switch
                        v-model="endSprint.endedEarlier"
                        :label="`This sprint is ending earlier: ${endedEarlier}.`"
                      ></v-switch>
                      <v-slider
                        v-model="endSprint.workDone"
                        label="Percent of work done"
                        thumb-label="always"
                        color="navbarColor"
                      ></v-slider>
                      <v-text-field
                        color="navbarColor"
                        label="Points done"
                        prepend-icon="check_box"
                        v-model="endSprint.pointsDone"
                        clearable
                      ></v-text-field>
                    </v-form>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="navbarColor" flat @click="endCurrentSprint">End Sprint</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-text>
            <v-card-text v-else>
              <p class="subheading font-weight-thin">No sprint available</p>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </main>
</template>

<script>
import SprintService from "@/api-services/sprintService";
import Router from "@/router";
export default {
  name: "SprintSettings",
  data() {
    return {
      dialog: "",
      modal: false,
      modal1: false,
      endSprint: {
        endedEarlier: false,
        workDone: 0,
        pointsDone: 0
      },
      sprint: {
        number: "",
        pointsGiven: "",
        startDate: "",
        endDate: "",
        ended:false
      }
    };
  },
  computed: {
    endedEarlier() {
      if (this.endSprint.endedEarlier === true) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.endSprint.workDone = 100;
        return "yes";
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.endSprint.workDone = 0;
        return "no";
      }
    }
  },
  methods: {
    createSprint() {
      if (this.$store.getters.getSprintRemainingDays === 0) {
        SprintService.create(this.sprint, localStorage.getItem("token"))
          .then(() => {
            this.$store.dispatch(
              "SET_LAST_SPRINT",
              localStorage.getItem("token")
            );
            this.$swal("Hooray!", "A new sprint has started!", "success").then(
              Router.push({ name: "MentorDashboard" })
            );
          })
          // eslint-disable-next-line no-unused-vars
          .catch(error => {
            this.$swal(
              "Warning!",
              "Oops! An error occured. Please try again!",
              "warning"
            ).then(Router.push({ name: "SprintSettings" }));
          });
      } else {
        this.$swal(
          "Warning!",
          "The current sprint must be completed before a new one starts.",
          "warning"
        );
      }
    },
    endCurrentSprint() {
      this.dialog = false;
      this.endSprint.endDate = new Date();
      this.endSprint.ended = true;
      SprintService.update(
        this.$store.getters.lastSprint._id,
        this.endSprint,
        localStorage.getItem("token")
      )
        .then(() => {
          this.$store.dispatch(
            "SET_LAST_SPRINT",
            localStorage.getItem("token")
          );
          this.$swal("Congrats!", "Your team finished a sprint!", "success");
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style>
.rounded-corners {
  border-radius: 5px;
}
</style>
