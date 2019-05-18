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
        { icon: "feedback", title: "Feedback tests", route: "/mentor/feedback" },
        { icon: "exit_to_app", title: "Sign out", route: "/" }
      ]
    };
  }
};
</script>

<style>
</style>
