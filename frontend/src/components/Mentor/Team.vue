<template>
  <main>
    <h1 class="font-weight-thin mx-5 my-3 white--text">Team</h1>
    <v-container class="my-3">
      <v-layout row wrap>
        <!-- <div v-if="$store.getters.team !== undefined"> -->
        <v-flex wrap xs12 sm6 md5 lg3 v-for="member in this.$store.getters.team" :key="member.lastName">
          <v-card class="text-xs-center ma-3 rounded-corners">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="grey lighten-2">
                <img :src="require('@/assets/logo.png')" alt="avatar">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading pb-3">{{member.firstName}} {{member.lastName}}</div>
              <p v-if="member.position" class="grey--text">{{member.position}}</p>
              <p v-else class="grey--text">Not Updated</p>
            </v-card-text>
            <v-card-actions>
              <v-btn flat color="grey" @click="removeMember(member._id)">
                <v-icon small left>delete</v-icon>
                <span>Remove</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <!-- </div>
        <div v-else>No added members yet.</div>-->
      </v-layout>
    </v-container>

    <h1 class="font-weight-thin mx-5 my-3 white--text">Choose members</h1>
    <v-container>
      <v-layout row wrap>
        <v-flex wrap xs12 sm6 md5 lg3 v-for="member in unassignedStudents" :key="member._id">
          <v-card class="text-xs-center ma-3 rounded-corners">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="grey lighten-2">
                <img :src="require('@/assets/logo.png')" alt="avatar">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading pb-3">{{member.firstName}} {{member.lastName}}</div>
              <p v-if="member.position" class="grey--text">{{member.position}}</p>
              <p v-else class="grey--text">Not Updated</p>
            </v-card-text>
            <v-card-actions>
              <v-btn flat color="grey" @click="addNewMember(member._id)">
                <v-icon small left>add</v-icon>
                <span>Add</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </main>
</template>

<script>
/* eslint-disable no-undef */
import MentorService from "@/api-services/mentorService";
import StudentService from "@/api-services/studentService";
// import Router from "@/router";
export default {
  name: "Team",
  data() {
    return {
      students: []
    };
  },
  created() {
    StudentService.getAll(localStorage.getItem("token")).then(
      res => (this.students = res.data)
    );
  },
  computed: {
    unassignedStudents() {
      let result = Array();
      this.students.forEach(s => {
        if (!this.isPartOfTeam(s)) {
          result.push(s);
        }
      });
      return result;
    }
  },
  methods: {
    addNewMember(studentId) {
      let team = this.$store.getters.user.team;
      team.push(studentId);
      MentorService.update(
        { id: this.$store.getters.user._id, team },
        localStorage.getItem("token")
      ).then(res => {
        this.$store.dispatch("SET_USER", res.data);
        this.$store.dispatch("SET_TEAM", {
          team: res.data.team,
          token: localStorage.getItem("token")
        });
        this.$swal(
              "Success!",
              "Your team has a new member!",
              "success"
            )
      });
    },
    removeMember(studentId){
      let team = this.$store.getters.user.team;
      team.forEach((m, index) => {
        if (m === studentId){
          team.splice(index, 1)
        }
      })
      MentorService.update(
        { id: this.$store.getters.user._id, team },
        localStorage.getItem("token")
      ).then(res => {
        this.$store.dispatch("SET_USER", res.data);
        this.$store.dispatch("SET_TEAM", {
          team: res.data.team,
          token: localStorage.getItem("token")
        });
         this.$swal(
              "Success!",
              "Member removed",
              "success"
            )
      });
    },
    isPartOfTeam(student) {
      let team = this.$store.getters.team;
      let ok = false;
      team.forEach(m => {
        if (m._id === student._id) ok = true;
      });
      return ok;
    }
  }
};
</script>

<style>
.rounded-corners {
  border-radius: 5px;
}
</style>
