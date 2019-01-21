<template>
  <center>
    <desk>
      <desk-row class="header">
        <div class="divTableCell">Song Name</div>
        <div class="divTableCell">Artist</div>
      </desk-row>
      <desk-row>
        <div class="divTableCell">&nbsp;</div>
        <div class="divTableCell">&nbsp;</div>
      </desk-row>
      <desk-row>
        <div class="divTableCell">&nbsp;</div>
        <div class="divTableCell">&nbsp;</div>
      </desk-row>
      <desk-row>
        <div class="divTableCell">&nbsp;</div>
        <div class="divTableCell">&nbsp;</div>
      </desk-row>
    </desk>
  </center>
</template>

<style lang="less">
@import "./../../variables.less";

.header {
  background-color: @background-secondary;
  display: table-header-group;
}
.divTableCell,
.divTableHead {
  border: 1px solid @background-secondary;
  display: table-cell;
  padding: 3px 10px;
}
.divTableHeading {
  background-color: #eee;
  display: table-header-group;
  font-weight: bold;
}
.divTableFoot {
  background-color: #eee;
  display: table-footer-group;
  font-weight: bold;
}
</style>

<script>
import Desk from "../../components/desk/Desk.vue"
import DeskRow from "../../components/desk/Row.vue"
export default {
  components: {
    Desk,
    DeskRow
  }
}
</script>

