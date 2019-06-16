<template>
  <main>
    <h1 class="font-weight-thin mx-5 my-3 white--text">Team</h1>
    <v-container class="my-3" v-if="this.$store.getters.team.length !== 0">
      <v-layout row wrap>
        <v-flex wrap xs12 sm6 md5 lg3 v-for="member in this.$store.getters.team" :key="member._id">
          <v-card class="text-xs-center ma-3 rounded-corners">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="grey lighten-2">
                <img :src="require('@/assets/logo.png')" alt="avatar">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading pb-3">{{member.firstName}} {{member.lastName}}</div>
              <p v-if="member.courseId" class="grey--text">{{$store.getters.courses[member.courseId]}}</p>
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
        <div></div>
      </v-layout>
    </v-container>
    <v-container v-else>
      <p class="subheading font-weight-thin white--text pl-5">No added members yet. 😪</p>
    </v-container>

    <h1 class="font-weight-thin mx-5 my-3 white--text">Choose members</h1>
    <v-container v-if="unassignedStudents.length !== 0">
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
              <p v-if="member.courseId" class="grey--text">{{$store.getters.courses[member.courseId]}}</p>
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
    <v-container v-else>
      <p class="subheading font-weight-thin white--text pl-5">No added students yet. 😪</p>
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
      if (this.students.length !== 0) {
        this.students.forEach(s => {
          if (
            !this.isPartOfTeam(s) &&
            (s.mentorId == "" || !s.mentorId || s.mentorId === null)
          ) {
            result.push(s);
          }
        });
      }
      return result;
    }
  },
  methods: {
    addNewMember(studentId) {
      let team = this.$store.getters.user.team;
      team.push(studentId);
      MentorService.update(
        this.$store.getters.user._id,
        { team },
        localStorage.getItem("token")
      ).then(res => {
        this.$store.dispatch("SET_USER", {
          user: utils.decodeToken(localStorage.getItem("token")).user,
          token: localStorage.getItem("token")
        });
        this.$store.dispatch("SET_TEAM", {
          team: res.data.team,
          token: localStorage.getItem("token")
        });
        StudentService.update(
          studentId,
          { mentorId: this.$store.getters.user._id },
          localStorage.getItem("token")
        ).then(res => {
          // console.log(res);
          this.$swal("Success!", "Your team has a new member!", "success");
        });
      });
    },
    removeMember(studentId) {
      let team = this.$store.getters.user.team;
      team.forEach((m, index) => {
        if (m === studentId) {
          team.splice(index, 1);
        }
      });
      MentorService.update(
        this.$store.getters.user._id,
        { team },
        localStorage.getItem("token")
      ).then(res => {
        // console.log(res.data.team);

        this.$store.dispatch("SET_USER", {
          user: utils.decodeToken(localStorage.getItem("token")).user,
          token: localStorage.getItem("token")
        });
        this.$store.dispatch("SET_TEAM", {
          team: res.data.team,
          token: localStorage.getItem("token")
        });
        StudentService.update(
          studentId,
          { mentorId: null },
          localStorage.getItem("token")
        ).then(() => {
          StudentService.getAll(localStorage.getItem("token")).then(
            res => (this.students = res.data)
          );
          this.$swal("Success!", "Member removed", "success");
        });
      });
    },
    isPartOfTeam(student) {
      let team = this.$store.getters.team;
      let ok = false;
      if (team.length !== 0) {
        team.forEach(m => {
          if (m._id === student._id) ok = true;
        });
      }
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
