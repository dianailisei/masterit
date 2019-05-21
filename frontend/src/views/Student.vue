<template>
  <div>
    <Navbar :links="links"/>
    <v-content class="mx-4 mb-4">
      <router-view></router-view>
    </v-content>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

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
        },
        { icon: "exit_to_app", title: "Sign out", route: "/" }
      ]
    };
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
