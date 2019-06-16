<template>
  <div>
    <Navbar :links="links" :settingsRoute="settingsRoute"/>
    <v-content class="mx-4 mb-4">
      <router-view></router-view>
    </v-content>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
/* eslint-disable no-undef */
import StudentService from "@/api-services/studentService";
export default {
  name: "Student",
  components: {
    Navbar
  },
  data() {
    return {
      links: [
        { icon: "dashboard", title: "Dashboard", route: "/student/dashboard" },
        { icon: "people", title: "Team", route: "/student/team" },
        { icon: "assignment", title: "Exam", route: "/student/exam" },
        {
          icon: "feedback",
          title: "Feedback tests",
          route: "/student/feedback"
        }
      ],
      settingsRoute: "/student/settings"
    };
  },
  created() {
    this.$store.dispatch("SET_USER", {
      user: utils.decodeToken(localStorage.getItem("token")).user,
      token: localStorage.getItem("token")
    });
  },
  mounted() {
    StudentService.getById(
      utils.decodeToken(localStorage.getItem("token")).user.id,
      localStorage.getItem("token")
    ).then(res => {
      if (res.data.mentorId && res.data.mentorId !== null) {
        this.$store.dispatch("SET_LAST_SPRINT", {
          user: {
            id: res.data.mentorId
          },
          token: localStorage.getItem("token")
        });
        this.$store.dispatch("SET_GOOD_PRACTICES", {
          id: res.data.mentorId,
          token: localStorage.getItem("token")
        });
        this.$store.dispatch("SET_LAST_FEEDBACK", {
          id: res.data.mentorId,
          token: localStorage.getItem("token")
        });
        StudentService.getByMentor(
          res.data.mentorId,
          localStorage.getItem("token")
        ).then(response => this.$store.commit("SET_TEAM", response.data));
      }
    });
  }
};
</script>

<style>
.rounded-corners {
  border-radius: 5px;
}
.transparent-card {
  opacity: 0.6;
}
</style>
