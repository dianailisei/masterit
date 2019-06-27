<template>
  <div>
    <Navbar :links="links" :settingsRoute="settingsRoute"/>
    <v-content class="mx-4 mb-4">
      <router-view></router-view>
    </v-content>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import Navbar from "@/components/Navbar";
import MentorService from "@/api-services/mentorService";
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
        {
          icon: "assignment",
          title: "Evaluation",
          route: "/mentor/evaluation"
        },
        {
          icon: "feedback",
          title: "Feedback tests",
          route: "/mentor/feedback"
        },
        { icon: "assessment", title: "Results", route: "/mentor/results" }
      ],
      settingsRoute: "/mentor/settings",
      lastSprint: ""
    };
  },
  created() {
    this.$store.dispatch("SET_USER", {
      user: utils.decodeToken(localStorage.getItem("token")).user,
      token: localStorage.getItem("token")
    });
  },
  mounted() {
    MentorService.getById(
      utils.decodeToken(localStorage.getItem("token")).user.id,
      localStorage.getItem("token")
    ).then(res => {
      let id = res.data._id;
      this.$store.dispatch("SET_TEAM", {
        team: res.data.team,
        token: localStorage.getItem("token")
      });
      this.$store.dispatch("SET_LAST_SPRINT", {
        user: { id: id },
        token: localStorage.getItem("token")
      });
      this.$store.dispatch("SET_QUESTIONS", localStorage.getItem("token"));
      this.$store.dispatch("SET_LAST_FEEDBACK", {
        id: id,
        token: localStorage.getItem("token")
      });
      this.$store.dispatch("SET_FEEDBACK_TESTS", {
        id: id,
        token: localStorage.getItem("token")
      });
      this.$store.dispatch("SET_GOOD_PRACTICES", {
        id: id,
        token: localStorage.getItem("token")
      });
      this.$store.dispatch("SET_COURSES", {
        token: localStorage.getItem("token")
      });
      this.$store.dispatch("SET_MEETINGS", {
        id: id,
        token: localStorage.getItem("token")
      });
    });
  }
};
</script>

<style>
</style>
