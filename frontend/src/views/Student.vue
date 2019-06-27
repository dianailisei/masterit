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
        { icon: "assignment", title: "Evaluation", route: "/student/evaluation" },
        {
          icon: "feedback",
          title: "Feedback tests",
          route: "/student/feedback"
        }
      ],
      settingsRoute: "/student/settings",
      courses: {}
    };
  },
  created() {
    this.$store.dispatch("SET_USER", {
      user: utils.decodeToken(localStorage.getItem("token")).user,
      token: localStorage.getItem("token")
    });
  },
  methods:{
    registerSW(id) {
      if ("serviceWorker" in navigator) {
        send().catch(err => console.log(err));
      }

      async function send() {
        const publicVAPIDKey =
          "BAX6kWxVcUeibkPhHX2Z-YEudZEqGJTqAKSchjh1uhAEhR7Xp_cZ07Op0mq6Y34Jy3nqCahSam2vfwh0ievyEo4";
        const register = await navigator.serviceWorker.register(
          "../worker.js",
          {
            scope: "/"
          }
        );
        const subscription = await register.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicVAPIDKey)
        });
        console.log(subscription);

        // eslint-disable-next-line no-constant-condition
        await fetch("http://localhost:4041/subscribe", {
          method: "POST",
          body: JSON.stringify({ subscription, mentorId: id }),
          headers: {
            "content-type": "application/json"
          }
        });
      }

      function urlBase64ToUint8Array(base64String) {
        const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding)
          .replace(/-/g, "+")
          .replace(/_/g, "/");

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
          outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
      }

      // async function requestNotificationPermission() {
      //   const permission = await window.Notification.requestPermission();
      //   if (permission !== "granted") {
      //     throw new Error("Permission not granted for Notification");
      //   } else return permission;
      // }
    }
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
        this.$store.dispatch("SET_LAST_FEEDBACK", {
          id: res.data.mentorId,
          token: localStorage.getItem("token")
        });
        this.$store.dispatch("SET_GOOD_PRACTICES", {
          id: res.data.mentorId,
          token: localStorage.getItem("token")
        });
        this.$store.dispatch("SET_COURSES", {
          token:localStorage.getItem("token")}
        );
         this.$store.dispatch("SET_MEETINGS", {
        id: res.data.mentorId,
        token: localStorage.getItem("token")
      });
        this.registerSW(res.data.mentorId);
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
