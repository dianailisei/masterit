<template>
  <main>
    <h1 class="font-weight-thin mx-5 my-3 white--text">Meetings</h1>
    <v-container>
      <v-layout justify-center align-center>
        <v-flex xs12 sm12 md8 lg6>
          <v-card color="navbarColor white--text" class="rounded-corners pl-4 pt-4 pr-4">
            <h2 class="font-weight-thin pb-1">Alarms settings</h2>
            <v-card-text>
              <v-form>
                <v-select
                  color="white"
                  :items="dailyMeetings"
                  item-text="text"
                  label="Daily Meetings"
                  menu-props="offsetY"
                  id="dailyMeeting"
                  clearable
                  v-model="dailyMeeting"
                ></v-select>
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
                        format="24hr"
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
                        format="24hr"
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
                        format="24hr"
                      ></v-time-picker>
                    </v-menu>
                  </v-flex>
                </v-layout>

                <v-btn flat class="white--text" @click="submitAlarms">submit</v-btn>
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
import MeetingService from "@/api-services/MeetingService";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      dailyMeetings: [
        { text: "Everyday at 9:00 am", value: "09:00" },
        { text: "Everyday at 9:15 am", value: "09:15" },
        { text: "Everyday at 9:30 am", value: "09:30" },
        { text: "Everyday at 10:00 am", value: "10:00" }
      ],
      dailyMeeting: "",
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
  mounted() {
    if (this.$store.getters.meetings.length !== 0) {
      this.$store.getters.meetings.forEach(m => {
        if (m.day === "everyday") {
          switch (m.hour) {
            case "09:00":
              this.dailyMeeting = this.dailyMeetings[0].value;
              break;
            case "09:15":
              this.dailyMeeting = this.dailyMeetings[1].value;
              break;
            case "09:30":
              this.dailyMeeting = this.dailyMeetings[2].value;
              break;
            case "10:00":
              this.dailyMeeting = this.dailyMeetings[3].value;
              break;
            default:
              break;
          }
        } else {
          switch (m.name) {
            case "Sprint Planning":
              this.sprintPlanningDate = m.day;
              this.sprintPlanningHour = m.hour;
              break;
            case "Sprint Retrospective":
              this.sprintRetrospectiveDate = m.day;
              this.sprintRetrospectiveHour = m.hour;
              break;
            case "Sprint Review":
              this.sprintReviewDate = m.day;
              this.sprintReviewHour = m.hour;
              break;
            default:
              break;
          }
        }
      });
    }
  },
  methods: {
    clearInputs() {
      let inputs = document.getElementsByTagName("input");
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
      }
    },
    checkSavedAlarm(name) {
      let meeting = {};
      if (this.$store.getters.meetings.length !== 0) {
        this.$store.getters.meetings.forEach(m => {
          console.log(m.name);
          if (m.name === name) {
            meeting = m;
          }
        });
      }
      return meeting;
    },
    submitAlarms() {
      let mentorId = this.$store.getters.user._id;
      if (this.dailyMeeting !== "") {
        let alarm = this.checkSavedAlarm("Daily Meeting");
        console.log(alarm, Object.entries(alarm).length);
        if (Object.entries(alarm).length !== 0 && alarm !== undefined) {
          if (alarm.hour !== this.dailyMeeting) {
            console.log("aici");
            MeetingService.update(
              alarm._id,
              { hour: this.dailyMeeting },
              localStorage.getItem("token")
            );
          }
        } else {
          MeetingService.create(
            {
              name: "Daily Meeting",
              day: "everyday",
              hour: this.dailyMeeting,
              mentorId: mentorId
            },
            localStorage.getItem("token")
          );
        }
      }
      if (this.sprintPlanningDate !== "" && this.sprintPlanningHour !== "") {
        let alarm = this.checkSavedAlarm("Sprint Planning");
        if (Object.entries(alarm).length !== 0 && alarm !== undefined) {
          if (
            alarm.day !== this.sprintPlanningDate ||
            alarm.hour !== this.sprintPlanningHour
          ) {
            MeetingService.update(
              alarm._id,
              { day: this.sprintPlanningDate, hour: this.sprintPlanningHour },
              localStorage.getItem("token")
            );
          }
        } else {
          MeetingService.create(
            {
              name: "Sprint Planning",
              day: this.sprintPlanningDate,
              hour: this.sprintPlanningHour,
              mentorId: mentorId
            },
            localStorage.getItem("token")
          );
        }
      }
      if (
        this.sprintRetrospectiveDate !== "" &&
        this.sprintRetrospectiveHour !== ""
      ) {
        let alarm = this.checkSavedAlarm("Sprint Retrospective");
        if (Object.entries(alarm).length !== 0 && alarm !== undefined) {
          if (
            alarm.day !== this.sprintRetrospectiveDate ||
            alarm.hour !== this.sprintRetrospectiveHour
          ) {
            MeetingService.update(
              alarm._id,
              {
                day: this.sprintRetrospectiveDate,
                hour: this.sprintRetrospectiveHour
              },
              localStorage.getItem("token")
            );
          }
        } else {
          MeetingService.create(
            {
              name: "Sprint Retrospective",
              day: this.sprintRetrospectiveDate,
              hour: this.sprintRetrospectiveHour,
              mentorId: mentorId
            },
            localStorage.getItem("token")
          );
        }
      }
      if (this.sprintReviewDate !== "" && this.sprintReviewHour !== "") {
        let alarm = this.checkSavedAlarm("Sprint Review");
        if (Object.entries(alarm).length !== 0 && alarm !== undefined) {
          if (
            alarm.day !== this.sprintReviewDate ||
            alarm.hour !== this.sprintReviewHour
          ) {
            MeetingService.update(
              alarm._id,
              { day: this.sprintReviewDate, hour: this.sprintReviewHour },
              localStorage.getItem("token")
            );
          }
        } else {
          MeetingService.create(
            {
              name: "Sprint Review",
              day: this.sprintReviewDate,
              hour: this.sprintReviewHour,
              mentorId: mentorId
            },
            localStorage.getItem("token")
          );
        }
      }
      setTimeout(() => {
        this.$store
          .dispatch("SET_MEETINGS", {
            id: this.$store.getters.user._id,
            token: localStorage.getItem("token")
          })
          .then(() => this.$swal("Success!", "", "success"));
      }, 2000);
    }
  }
};
</script>

<style>
.rounded-corners {
  border-radius: 5px;
}
</style>
