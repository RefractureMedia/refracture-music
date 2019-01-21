<template>
  <center>
    <div class="divTable">
      <div class="divTableBody">
        <div class="divTableRow">
          <div class="divTableCell">Song Name</div>
          <div class="divTableCell">Artist</div>
        </div>
        <div class="divTableRow">
          <div class="divTableCell">&nbsp;</div>
          <div class="divTableCell">&nbsp;</div>
        </div>
        <div class="divTableRow">
          <div class="divTableCell">&nbsp;</div>
          <div class="divTableCell">&nbsp;</div>
        </div>
        <div class="divTableRow">
          <div class="divTableCell">&nbsp;</div>
          <div class="divTableCell">&nbsp;</div>
        </div>
      </div>
    </div>
    <!-- DivTable.com -->
  </center>
</template>

<style lang="less" scoped>
@import "./../../variables.less";
.divTable {
  display: table;
  width: 100%;
}
.divTableRow {
  display: table-row;
  height: 3rem;
}
.divTableHeading {
  background-color: @background-primary;
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
.divTableBody {
  display: table-row-group;
}
</style>

<script>
export default {}
</script>

