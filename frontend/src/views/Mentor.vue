<template>
  <div>
    <Navbar :links="links"/>
    <v-content class="mx-4 mb-4">
      <router-view></router-view>
    </v-content>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import Navbar from "@/components/Navbar";
import MentorService from "@/api-services/mentorService";
import Router from "@/router";
export default {
  name: "Mentor",
  components: {
    Navbar
  },
  data() {
    return {
      links: [
        { icon: "dashboard", title: "Dashboard", route: "/mentor/dashboard" },
        { icon: "people", title: "Team", route: "/mentor/team" },
        { icon: "meeting_room", title: "Meetings", route: "/mentor/meetings" },
        { icon: "build", title: "Sprint settings", route: "/mentor/sprints" },
        { icon: "done_outline", title: "Questions", route: "/mentor/question" },
        { icon: "assignment", title: "Exam", route: "/mentor/exam" },
        {
          icon: "feedback",
          title: "Feedback tests",
          route: "/mentor/feedback"
        },
        { icon: "exit_to_app", title: "Sign out", route: "/" }
      ],
      lastSprint: ""
    };
  },
  mounted() {
    MentorService.getById(localStorage.getItem("token"))
      .then(res => {
        this.$store.dispatch("SET_USER", res.data);
        // console.log(res.data.team);
        this.$store.dispatch("SET_TEAM", {
          team: res.data.team,
          token: localStorage.getItem("token")
        });
        this.$store.dispatch("SET_LAST_SPRINT", localStorage.getItem("token"));
      })
      .catch(error => {
        this.$swal(
          "Warning!",
          "Oops! An error occured. Please try again!",
          "warning"
        ).then(Router.push({ name: "Register" }));
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }
};
</script>

<style>
</style>
