<template>
  <main>
    <v-container>
      <v-data-iterator
        :items="goodPractices"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
        content-tag="v-layout"
        row
        wrap
        dark
      >
        <template v-slot:item="props">
          <p class="subheading font-weight-thin">{{props.item}}</p>
        </template>
      </v-data-iterator>
    </v-container>
  </main>
</template>

<script>
export default {
  data() {
    return {
      goodPractices: [
        "Use === Instead of == ",
        "Reduce Globals",
        "Comment your code"
      ],
      rowsPerPageItems: [3, 6, 9],
      pagination: {
        rowsPerPage: 3
      }
    };
  }
};
</script>

<style>
</style>
