<template>
  <main>
    <v-container>
      <v-layout align-center row wrap>
        <v-flex xs12 sm12 md12 lg12>
          <v-layout align-center justify-space-around row fill-height>
            <v-btn
              color="navbarColor"
              fab
              large
              :dark="dark1"
              :outline="outline1"
              @click="toggleButton1"
            >Register</v-btn>
            <v-btn
              color="navbarColor"
              fab
              large
              :dark="dark2"
              :outline="outline2"
              @click="toggleButton2"
            >Sign in</v-btn>
          </v-layout>
        </v-flex>

        <v-flex xs12 sm8 md6 lg6 offset-sm2 offset-md3 offset-lg3 class="pa-3">
          <v-card v-if="dark1" color="navbarColor" class="rounded-corners white--text">
            <v-card-title>
              <h1 class="font-weight-thin pb-1 pl-2">Create a new account</h1>
            </v-card-title>
            <v-card-text>
              <v-layout align-center row wrap justify-center>
                <v-flex xs12 sm12 md8 lg8>
                  <v-form class="white--text">
                    <v-select
                      color="white"
                      :items="accountType"
                      label="Account Type"
                      menu-props="offsetY"
                      v-model="accountTypeRegister"
                    ></v-select>
                    <v-text-field
                      color="white"
                      label="First Name"
                      required
                      v-model="registerUser.firstName"
                      :rules="[rules.required, rules.min]"
                    ></v-text-field>
                    <v-text-field
                      color="white"
                      label="Last Name"
                      :rules="[rules.required, rules.min]"
                      required
                      v-model="registerUser.lastName"
                    ></v-text-field>
                    <v-text-field
                      color="white"
                      label="Email"
                      :rules="[rules.required, rules.email]"
                      required
                      v-model="registerUser.email"
                    ></v-text-field>
                    <v-text-field
                      :append-icon="showPwd1 ? 'visibility' : 'visibility_off'"
                      :type="showPwd1 ? 'text' : 'password'"
                      label="Password"
                      hint="At least 8 characters"
                      counter
                      color="white"
                      @click:append="showPwd1 = !showPwd1"
                      required
                      v-model="registerUser.password"
                    ></v-text-field>
                    <v-text-field
                      :append-icon="showPwd2 ? 'visibility' : 'visibility_off'"
                      :type="showPwd2 ? 'text' : 'password'"
                      label="Re-type Password"
                      hint="At least 8 characters"
                      counter
                      color="white"
                      @click:append="showPwd2 = !showPwd2"
                      required
                      :rules="[rules.verifyPassword]"
                      v-model="registerVerifyPwd"
                      
                    ></v-text-field>
                    <v-btn flat class="white--text" @click="register">submit</v-btn>
                    <v-btn flat class="white--text" @click="clearInputs">clear</v-btn>
                  </v-form>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
          <v-card v-if="dark2" color="navbarColor" class="rounded-corners white--text">
            <v-card-title>
              <h1 class="font-weight-thin pb-1 pl-2">Log in</h1>
            </v-card-title>
            <v-card-text>
              <v-layout align-center row wrap justify-center>
                <v-flex xs12 sm12 md8 lg8>
                  <v-form class="white--text">
                    <v-select
                      color="white"
                      :items="accountType"
                      label="Account Type"
                      menu-props="offsetY"
                      clearable
                      v-model="accountTypeLogin"
                    ></v-select>
                    <v-text-field
                      color="white"
                      label="Email"
                      clearable
                      required
                      v-model="loginUser.email"
                      :rules="[rules.required, rules.email]"
                    ></v-text-field>
                    <v-text-field
                      :append-icon="showPwd3 ? 'visibility' : 'visibility_off'"
                      :type="showPwd3 ? 'text' : 'password'"
                      label="Password"
                      hint="At least 8 characters"
                      counter
                      color="white"
                      @click:append="showPwd3 = !showPwd3"
                      required
                      v-model="loginUser.password"
                      :rules="[rules.required]"
                    ></v-text-field>

                    <v-btn flat class="white--text" @click="login">log in</v-btn>
                    <v-btn flat class="white--text" @click="clearInputs">clear</v-btn>
                  </v-form>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-layout justify-center row wrap v-show="!dark1 && !dark2">
          <div
            class="font-weight-thin my-5 white--text bigtext"
           
          >WELCOME TO MASTER IT!</div>
          <v-flex md12>
            <v-layout justify-center>
              <v-icon dark>check_box</v-icon>
              <h2 class="font-weight-thin white--text">&ensp;Efficient team coordination</h2>
            </v-layout>
          </v-flex>
          <v-flex md12>
            <v-layout justify-center my-3>
              <v-icon dark>check_box</v-icon>
              <h2 class="font-weight-thin white--text">&ensp;Evaluation made easy</h2>
            </v-layout>
          </v-flex>
          <v-flex md12>
            <v-layout justify-center>
              <v-icon dark>check_box</v-icon>
              <h2 class="font-weight-thin white--text">&ensp;Teamwork at its best</h2>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
  </main>
</template>

<script>
/* eslint-disable no-undef */
import MentorService from "@/api-services/mentorService";
import StudentService from "@/api-services/studentService";
import Router from "@/router";

export default {
  name: "Register",
  data() {
    return {
      dark1: false,
      outline1: true,
      dark2: false,
      outline2: true,
      showPwd1: false,
      showPwd2: false,
      showPwd3: false,
      accountType: ["Mentor", "Intern"],
      accountTypeLogin: "",
      accountTypeRegister: "",
      loginUser: { email: "", password: "" },
      registerUser: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        team: [],
        approved: false
      },
      registerVerifyPwd: "",
      rules: {
        required: value => !!value || "Required",
        min: v => v.length >= 3 || "Min 3 characters",
        email: v => /.+@.+/.test(v) || "Invalid Email address",
        verifyPassword: value =>
          value === this.registerUser.password || "Passwords don't match"
      }
    };
  },
  methods: {
    toggleButton1() {
      this.dark1 = !this.dark1;
      this.outline1 = !this.outline1;
      if (this.dark1 == true) {
        if (this.dark2 == true) this.toggleButton2();
      }
    },
    toggleButton2() {
      this.dark2 = !this.dark2;
      this.outline2 = !this.outline2;

      if (this.dark2 == true) {
        if (this.dark1 == true) this.toggleButton1();
      }
    },
    clearInputs() {
      let inputs = document.getElementsByTagName("input");
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
      }
    },
    login() {
      if (this.accountTypeLogin === "Mentor") {
        MentorService.login(this.loginUser)
          .then(res => {
            window.localStorage.setItem("token", res.data);
            this.$store.dispatch("SET_USER", {
              user: utils.decodeToken(res.data).user,
              token: localStorage.getItem("token")
            });
            if (this.loginUser.email === "admin") {
              Router.push({ name: "Admin" });
            } else {
              this.registerSW(utils.decodeToken(res.data).user.id);
              Router.push({ name: "MentorDashboard" });
            }
          })
          .catch(err => {
            console.log(err);
            this.$swal(
              "Warning!",
              "Oops! An error occured. Please try again!",
              "warning"
            ).then(Router.push({ name: "Register" }));
          });
      } else {
        StudentService.login(this.loginUser)
          .then(res => {
            window.localStorage.setItem("token", res.data);
            // console.log(utils.decodeToken(res.data))
            this.$store.dispatch("SET_USER", {
              user: utils.decodeToken(res.data).user,
              token: localStorage.getItem("token")
            });
            Router.push({ name: "StudentDashboard" });
          })
          .catch(() => {
            this.$swal(
              "Warning!",
              "Oops! An error occured. Please try again!",
              "warning"
            ).then(Router.push({ name: "Register" }));
          });
      }
    },
    register() {
      if (this.registerUser.password !== this.registerVerifyPwd) {
        this.$swal("Warning!", "Passwords don't match!", "warning");
      } else {
        if (this.accountTypeRegister === "Mentor") {
          this.registerUser.role = "mentor";
          MentorService.create(this.registerUser)
            .then(() => {
              this.$swal(
                "Warning!",
                "Your account must be approved by an administrator first.",
                "warning"
              );
            })
            .catch(() => {
              this.$swal(
                "Warning!",
                "Oops! An error occured. Please try again!",
                "warning"
              ).then(Router.push({ name: "Register" }));
            });
        } else {
          this.registerUser.role = "student";
          this.registerUser.submittedExam = false;
          StudentService.create(this.registerUser)
            .then(res => {
              window.localStorage.setItem("token", res.data);
              this.$store.dispatch("SET_USER", {
                user: utils.decodeToken(res.data).user,
                token: localStorage.getItem("token")
              });
              Router.push({ name: "StudentDashboard" });
            })
            .catch(() => {
              this.$swal(
                "Warning!",
                "Oops! An error occured. Please try again!",
                "warning"
              ).then(Router.push({ name: "Register" }));
            });
        }
      }
    },
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
  }
};
</script>

<style>
.rounded-corners {
  border-radius: 5px;
}
.bigtext {
  font-size: 80px;
}
</style>
