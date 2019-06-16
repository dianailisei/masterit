<template>
  <v-container>
    <Navbar/>
    <v-layout align-center row wrap>
      <v-flex xs12 sm12 md12 lg12 class="rounded-corners pa-5">
        <v-data-table :headers="headers" :items="filterMentors">
          <template v-slot:items="props">
            <td>{{props.item.email}}</td>
            <td>{{props.item.firstName}}</td>
            <td>{{props.item.lastName}}</td>
            <td>
              <v-btn
                :disabled="isApproved(props.item)"
                color="navbarColor"
                flat
                class="white--text"
                @click="approveAccess(props.item)"
              >{{props.item.approvedBtnText}}</v-btn>
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-side-effects-in-computed-properties */

import Navbar from "@/components/Navbar";
import MentorService from "@/api-services/mentorService";
import Router from "@/router";
export default {
  name: "Admin",
  components: { Navbar },
  data() {
    return {
      mentors: [],
      password: "",
      verifyPwd: "",
      rules: {
        required: value => !!value || "Required",
        min: v => v.length >= 3 || "Min 5 characters",
        verifyPassword: value =>
          value === this.registerUser.password || "Passwords don't match"
      },
      headers: [
        { text: "Email", value: "email" },
        { text: "First Name", value: "firstName" },
        { text: "Last Name", value: "lastName" },
        { text: "Access", value: "Acces" }
      ]
    };
  },
  created() {
    this.getMentors();
  },
  computed: {
    filterMentors: function() {
      this.mentors.forEach(m => (m.approvedBtnText = ""));
      return this.mentors.filter(mentor => mentor.email !== "admin");
    }
  },
  methods: {
    getMentors: function() {
      MentorService.getAll(localStorage.getItem("token"))
        .then(res => (this.mentors = res.data))
        .catch(error => {
          this.$swal(
            "Warning!",
            "Oops! An error occured. Please try again!",
            "warning"
          ).then(Router.push({ name: "Register" }));
          // if (error.response) {
          //   console.log(error.response.data);
          //   console.log(error.response.status);
          //   console.log(error.response.headers);
          // }
        });
    },
    isApproved: function(item) {
      if (Boolean(item.approved) === true) {
        item.approvedBtnText = "Allowed";
      } else {
        item.approvedBtnText = "Allow";
      }
      return Boolean(item.approved);
    },
    approveAccess(user) {
      MentorService.update(user._id, 
        {approved: true },
        localStorage.getItem("token")
      )
        .then(res =>
        
          this.$swal("Succes!", "Mentor account activated!", "success").then(
            this.getMentors
          )
        )
        .catch(error => {
          this.$swal(
            "Warning!",
            "Oops! An error occured. Please try again!",
            "warning"
          ).then();
        });
    }
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
