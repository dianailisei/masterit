<template>
  <nav>
    <v-toolbar app flat color="#1e1e2f">
      <v-toolbar-side-icon class="grey--text" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Master</span>
        <span class="font-weight-bold">IT</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <i class="material-icons md-light">notifications</i>
      </v-btn>
      <v-btn icon route to="/mentor/settings">
        <i class="material-icons md-light">settings</i>
      </v-btn>
      <v-btn icon route to="/">
        <i class="material-icons md-light">exit_to_app</i>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" hide-overlay stateless app>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="@/assets/logo.png">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>Diana Ilisei</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon @click.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile v-for="item in links" :key="item.title" route :to="item.route">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    links: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      drawer: true,
      mini: true,
      right: null
    };
  }
};
</script>

<style>
.md-light {
  color: rgba(255, 255, 255, 1);
}

</style>
