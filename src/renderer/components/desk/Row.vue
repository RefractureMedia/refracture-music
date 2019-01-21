<template>
  <div class="divTableRow">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "desk-row"
}
</script>

<style>
.divTableRow {
  display: table-row;
  height: 3rem;
}
</style>
