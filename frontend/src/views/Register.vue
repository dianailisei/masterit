<template>
  <main>
    <v-container>
      <v-layout align-center  row wrap>
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
                      clearable
                    ></v-select>
                    <v-text-field color="white" label="First Name" clearable required></v-text-field>
                    <v-text-field color="white" label="Last Name" clearable required></v-text-field>
                    <v-text-field color="white" label="Email" clearable required></v-text-field>
                    <v-text-field
                      :append-icon="showPwd1 ? 'visibility' : 'visibility_off'"
                      :type="showPwd1 ? 'text' : 'password'"
                      label="Password"
                      hint="At least 8 characters"
                      counter
                      color="white"
                      @click:append="showPwd1 = !showPwd1"
                      required
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
                    ></v-text-field>
                    <v-btn flat class="white--text">submit</v-btn>
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
                    <v-text-field color="white" label="Email" clearable required></v-text-field>
                    <v-text-field
                      :append-icon="showPwd3 ? 'visibility' : 'visibility_off'"
                      :type="showPwd3 ? 'text' : 'password'"
                      label="Password"
                      hint="At least 8 characters"
                      counter
                      color="white"
                      @click:append="showPwd3 = !showPwd3"
                      required
                    ></v-text-field>

                    <v-btn flat class="white--text">log in</v-btn>
                    <v-btn flat class="white--text" @click="clearInputs">clear</v-btn>
                  </v-form>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </main>
</template>

<script>
import MentorService from '@/api-services/mentorService'
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
      accountType: ["Mentor", "Student"],
      mentor: {}
    };
  },
  methods: {
    toggleButton1() {
      this.dark1 = !this.dark1;
      this.outline1 = !this.outline1;
      //   let questionsContainer = document.getElementById("java-questions");
      if (this.dark1 == true) {
        //     questionsContainer.classList.remove("hidden");
        if (this.dark2 == true) this.toggleButton2();
        //   } else {
        //     questionsContainer.classList.add("hidden");
      }
    },
    toggleButton2() {
      this.dark2 = !this.dark2;
      this.outline2 = !this.outline2;
      //   let questionsContainer = document.getElementById("net-questions");
      MentorService.getById("5cee2cc87ec86210841fc39e").then(res =>
        this.mentor = res.data
      )
      if (this.dark2 == true) {
        //     questionsContainer.classList.remove("hidden");
        if (this.dark1 == true) this.toggleButton1();

        //   } else {
        //     questionsContainer.classList.add("hidden");
      }
    },
    clearInputs() {
      let inputs = document.getElementsByTagName("input");
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
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
