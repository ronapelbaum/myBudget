/**
 * Created by apelbaur on 6/10/2014.
 */
function Pivot(records, rowsGroupBy, rowsFilter, columnsGroupBy, columnsFilter, valuesGroupBy) {
    this.table = {};
    this.rows = [];
    this.columns = [];

    for (var i = 0; i < records.length; i++) {
        var record = records[i];

        var row = record[rowsGroupBy] ? (rowsFilter ? rowsFilter(record[rowsGroupBy]) : record[rowsGroupBy]) : rowsGroupBy;
        var column = record[columnsGroupBy] ? (columnsFilter ? columnsFilter(record[columnsGroupBy]) : record[columnsGroupBy]) : columnsGroupBy;
        var value = record[valuesGroupBy];

        if (!this.table[row]) {
            if (this.rows.indexOf(row) < 0)this.rows.push(row);
            this.table[row] = {};
        }
        if (!this.table[row][column]) {
            if (this.columns.indexOf(column) < 0)this.columns.push(column);
            this.table[row][column] = 0;
        }
        this.table[row][column] += value;
    }
}