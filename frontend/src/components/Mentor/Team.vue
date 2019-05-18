<template>
  <main>
    <h1 class="font-weight-thin mx-5 my-3 white--text">Team</h1>
    <v-container class="my-3">
      <v-layout row wrap>
        <v-flex wrap xs12 sm6 md5 lg3 v-for="member in team" :key="member.name">
          <v-card class="text-xs-center ma-3 rounded-corners">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="grey lighten-2">
                <img :src="require('@/assets/logo.png')" alt="avatar">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading pb-3">{{member.name}}</div>

              <v-text-field
                solo
                flat
                :value="member.position"
                placeholder="Role"
                label="Role"
                class="grey--text"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn flat color="grey">
                <v-icon small left>delete</v-icon>
                <span>Remove</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <h1 class="font-weight-thin mx-5 my-3 white--text">Choose members</h1>
    <v-container>
      <v-layout row wrap>
        <v-flex wrap xs12 sm6 md5 lg3 v-for="member in team" :key="member.name">
          <v-card class="text-xs-center ma-3 rounded-corners">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="grey lighten-2">
                <img :src="require('@/assets/logo.png')" alt="avatar">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading pb-3">{{member.name}}</div>

              <v-text-field
                solo
                flat
                :value="member.position"
                placeholder="Role"
                label="Role"
                class="grey--text"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn flat color="grey">
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
export default {
  data() {
    return {
      team: [
        {
          name: "Diana Ilisei",
          avatar: "assets/logo.png",
          position: "Backend Dev - Java"
        },
        {
          name: "Diana Ilisei2",
          avatar: "assets/logo.png",
          position: "Backend Dev - .NET"
        },
        {
          name: "Diana Ilisei3",
          avatar: "assets/logo.png",
          position: "Backend Dev"
        },
        {
          name: "Diana Ilisei4",
          avatar: "assets/logo.png",
          position: "Backend Dev - Java"
        },
        {
          name: "Diana Ilisei25",
          avatar: "assets/logo.png",
          position: "Backend Dev - .NET"
        },
        {
          name: "Diana Ilisei36",
          avatar: "assets/logo.png",
          position: "Backend Dev"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style>
.rounded-corners {
  border-radius: 5px;
}
</style>
