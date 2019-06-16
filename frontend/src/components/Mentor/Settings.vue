<template>
  <v-container>
    <v-layout align-center row wrap>
      <v-flex xs12 sm12 md8 lg8 offset-md2 offset-lg2>
        <v-card color="navbarColor" class="rounded-corners white--text">
          <v-card-title>
            <h1 class="font-weight-thin pb-1 pl-2">Edit profile info</h1>
          </v-card-title>
          <v-card-text>
            <v-layout align-center row wrap justify-center>
              <v-flex xs12 sm12 md8 lg8>
                <v-avatar v-if="pictureURL" size="130">
                  <img :src="pictureURL" height="150">
                </v-avatar>
                <v-form class="white--text">
                  <v-text-field
                    label="Select Profile Picture"
                    @click="selectImg"
                    v-model="pictureName"
                    prepend-icon="attach_file"
                    color="white"
                  ></v-text-field>
                  <input
                    type="file"
                    style="display: none"
                    ref="image"
                    accept="image/*"
                    @change="onImgSelected"
                  >
                  <v-text-field
                    color="white"
                    label="First Name"
                    required
                    v-model="firstName"
                    :rules="[rules.required, rules.min]"
                  ></v-text-field>
                  <v-text-field
                    color="white"
                    label="Last Name"
                    :rules="[rules.required, rules.min]"
                    required
                    v-model="lastName"
                  ></v-text-field>
                  <v-text-field
                    :append-icon="showPwd1 ? 'visibility' : 'visibility_off'"
                    :type="showPwd1 ? 'text' : 'password'"
                    label="New Password"
                    hint="At least 8 characters"
                    counter
                    color="white"
                    @click:append="showPwd1 = !showPwd1"
                    v-model="password"
                  ></v-text-field>
                  <v-text-field
                    :append-icon="showPwd2 ? 'visibility' : 'visibility_off'"
                    :type="showPwd2 ? 'text' : 'password'"
                    label="Re-type Password"
                    hint="At least 8 characters"
                    counter
                    color="white"
                    @click:append="showPwd2 = !showPwd2"
                    :rules="[rules.verifyPassword]"
                    v-model="updateInfoVerifyPwd"
                  ></v-text-field>
                  <v-btn flat class="white--text" @click="update">update</v-btn>
                  <v-btn flat class="white--text" @click="clearInputs">clear</v-btn>
                </v-form>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import MentorService from "@/api-services/mentorService";
import Router from "@/router";
export default {
  name: "MentorSettings",
  data() {
    return {
      updateInfoVerifyPwd: "",
      showPwd1: false,
      showPwd2: false,
      firstName: this.$store.getters.user.firstName || "",
      lastName: this.$store.getters.user.lastName || "",
      password: "",
      rules: {
        required: value => !!value || "Required",
        min: v => v.length >= 3 || "Min 3 characters",
        verifyPassword: value =>
          value === this.password || "Passwords don't match"
      },
      pictureName: "",
      pictureURL: "",
      pictureFile: null
    };
  },
  methods: {
    update() {
      let updatedMentor = new FormData();
      if (this.pictureFile !== null) {
        updatedMentor.append(
          "profilePicture",
          this.pictureFile,
          this.pictureName
        );
      }
      updatedMentor.append('firstName', this.firstName);
      updatedMentor.append('lastName', this.lastName);
      
      if (this.password !== "" && this.updateInfoVerifyPwd !== "") {
        updatedMentor.append('password', this.password);
      }
      MentorService.update(
        this.$store.getters.user._id,
        updatedMentor,
        localStorage.getItem("token")
      ).then(res => {
        this.$store.dispatch("SET_USER", {
          user: { id: res.data._id, role: res.data.role },
          token: localStorage.getItem("token")
        });
        this.$swal("Success!", "", "success").then(
          Router.push({ name: "MentorDashboard" })
        );
      });
    },
    clearInputs() {
      let inputs = document.getElementsByTagName("input");
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
      }
    },
    selectImg() {
      this.$refs.image.click();
    },
    onImgSelected(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.pictureName = files[0].name;
        if (this.pictureName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.pictureURL = fr.result;
          this.pictureFile = files[0]; // this is an picture file that can be sent to server...
        });
      } else {
        this.pictureName = "";
        this.pictureFile = null;
        this.pictureURL = "";
      }
    }
  }
};
</script>


<style>
</style>
