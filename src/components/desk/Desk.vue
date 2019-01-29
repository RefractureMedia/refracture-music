<template>
  <div class="divTable">
    <div class="divTableBody">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "desk"
}
</script>

<style lang="less">
.divTable {
  display: table;
  width: 100%;
}
.divTableBody {
  display: table-row-group;
}
</style>
