<template>
  <main>
    <h1 class="font-weight-thin mx-5 my-3 white--text">Sprint Settings</h1>
    <v-container>
      <v-layout justify-center wrap>
        <v-flex xs12 sm12 md5 lg4>
          <v-card color="navbarColor white--text" class="rounded-corners pa-4">
            <h2 class="font-weight-thin pb-1">Plan new sprint</h2>
            <v-card-text>
              <v-form>
                <v-layout row wrap>
                  <!-- <v-flex xs4 sm4 md3 lg3 offset-xs2 offset-sm2 offset-md3 offset-lg3>
                    <br>
                    <h3 class="font-weight-thin pb-1">Sprint no.</h3>
                  </v-flex>-->
                  <v-flex xs12 sm12 md12 lg12>
                    <v-text-field color="rgba(255, 255, 255)" label="Sprint no." clearable></v-text-field>
                  </v-flex>
                  <!-- <v-flex xs5 sm5 md4 lg4 offset-xs2 offset-sm2 offset-md3 offset-lg3>
                    <br>
                    <h3 class="font-weight-thin pb-1">No. of points</h3>
                  </v-flex>-->
                  <v-flex xs12 sm12 md12 lg12>
                    <v-text-field color="rgba(255, 255, 255)" label="No. of points" clearable></v-text-field>
                  </v-flex>
                  <!-- <v-flex xs5 sm5 md4 lg4 offset-xs2 offset-sm2 offset-md3 offset-lg3>
                    <br>
                    <h3 class="font-weight-thin pb-1">No. of days</h3>
                  </v-flex>-->
                  <v-flex xs12 sm12 md12 lg12>
                    <v-text-field color="rgba(255, 255, 255)" label="No. of days" clearable></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md1 lg1 offset-md7 offset-lg7>
                    <v-btn flat class="white--text">Create</v-btn>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12 sm12 md5 lg4 offset-md1 offset-lg2>
          <v-card color="cardColor white--text" class="rounded-corners pa-4">
            <h2 class="font-weight-thin pb-1">This sprint</h2>
            <v-card-text>
              <p class="subheading font-weight-thin">3 days remaining of sprint no. 3</p>
              <p class="subheading font-weight-thin">Points given: 13</p>
              <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on }">
                  <v-btn color="red lighten-2" dark v-on="on">End sprint</v-btn>
                </template>

                <v-card>
                  <v-card-title class="headline grey lighten-2" primary-title>Privacy Policy</v-card-title>

                  <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" flat @click="dialog = false">I accept</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </main>
</template>

<script>
export default {
  name: "SprintSettings",
  data() {
    return {
      dialog: ''
    }
  }
};
</script>

<style>
.rounded-corners {
  border-radius: 5px;
}
</style>
