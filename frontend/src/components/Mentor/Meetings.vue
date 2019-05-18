<template>
  <main>
    <h1 class="font-weight-thin mx-5 my-3 white--text">Meetings</h1>
    <v-container>
      <v-layout justify-center align-center>
        <v-flex xs12 sm12 md8 lg6>
          <v-card color="navbarColor white--text" class="rounded-corners pa-4">
            <h2 class="font-weight-thin pb-1">Alarms settings</h2>
            <v-card-text>
              <v-form>
                <v-select :items="dailyMeetings" label="Daily Meetings" menu-props="offsetY" id="dailyMeeting" clearable></v-select>
                <v-layout row wrap>
                  <v-flex xs12 sm12 md12 lg12>
                    <h3 class="font-weight-thin">Sprint Planning</h3>
                  </v-flex>
                  <v-flex xs12 sm6 md6 lg6>
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
                          v-model="sprintPlanningDate"
                          label="Day of meeting"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                          color="rgba(255, 255, 255)"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        color="navbarColor"
                        v-model="sprintPlanningDate"
                        @input="modal = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12 sm6 md6 lg6>
                    <v-menu
                      ref="menu1"
                      v-model="modal2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="sprintPlanningHour"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          color="rgba(255, 255, 255)"
                          v-model="sprintPlanningHour"
                          label="Hour of meeting"
                          prepend-icon="access_time"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="modal2"
                        v-model="sprintPlanningHour"
                        full-width
                        color="navbarColor"
                        @click:minute="$refs.menu1.save(sprintPlanningHour)"
                      ></v-time-picker>
                    </v-menu>
                  </v-flex>

                  <v-flex xs12 sm12 md12 lg12>
                    <h3 class="font-weight-thin">Sprint Retrospective</h3>
                  </v-flex>
                  <v-flex xs12 sm6 md6 lg6>
                    <v-menu
                      v-model="modal3"
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
                          v-model="sprintRetrospectiveDate"
                          label="Day of meeting"
                          prepend-icon="event"
                          readonly
                          color="rgba(255, 255, 255)"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        color="navbarColor"
                        v-model="sprintRetrospectiveDate"
                        @input="modal3 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12 sm6 md6 lg6>
                    <v-menu
                      ref="menu2"
                      v-model="modal4"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="sprintRetrospectiveHour"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="sprintRetrospectiveHour"
                          label="Hour of meeting"
                          prepend-icon="access_time"
                          readonly
                          v-on="on"
                          color="rgba(255, 255, 255)"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="modal4"
                        v-model="sprintRetrospectiveHour"
                        full-width
                        color="navbarColor"
                        @click:minute="$refs.menu2.save(sprintRetrospectiveHour)"
                      ></v-time-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12 sm12 md12 lg12>
                    <h3 class="font-weight-thin">Sprint Review</h3>
                  </v-flex>
                  <v-flex xs12 sm6 md6 lg6>
                    <v-menu
                      v-model="modal5"
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
                          v-model="sprintReviewDate"
                          label="Day of meeting"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                          color="rgba(255, 255, 255)"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        color="navbarColor"
                        v-model="sprintReviewDate"
                        @input="modal5 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12 sm6 md6 lg6>
                    <v-menu
                      ref="menu3"
                      v-model="modal6"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="sprintReviewHour"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="sprintReviewHour"
                          label="Hour of meeting"
                          prepend-icon="access_time"
                          readonly
                          v-on="on"
                          color="rgba(255, 255, 255)"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="modal6"
                        v-model="sprintReviewHour"
                        full-width
                        color="navbarColor"
                        @click:minute="$refs.menu3.save(sprintReviewHour)"
                      ></v-time-picker>
                    </v-menu>
                  </v-flex>
                </v-layout>

                <v-btn flat class="white--text">submit</v-btn>
                <v-btn flat class="white--text" @click="clearInputs">clear</v-btn>
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
  data() {
    return {
      dailyMeetings: [
        "Everyday at 9:00 am",
        "Everyday at 9:30 am",
        "Everyday at 10:00 am"
      ],
      sprintPlanningDate: "",
      sprintPlanningHour: "",
      sprintRetrospectiveDate: "",
      sprintRetrospectiveHour: "",
      sprintReviewDate: "",
      sprintReviewHour: "",
      modal: false,
      modal2: false,
      modal3: false,
      modal4: false,
      modal5: false,
      modal6: false
    };
  },
  methods: {
    clearInputs() {
        let inputs = document.getElementsByTagName("input");
        for(let i = 0; i<inputs.length; i++)
        {
          inputs[i].value = '';
        }
    }
  }
};
</script>

<style>
.rounded-corners {
  border-radius: 5px;
}
</style>
