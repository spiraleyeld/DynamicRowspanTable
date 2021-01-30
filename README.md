# Guide


### Assign Rowspan Columns
```javascript

$('table').rowspanner({
  columns: [0,1,2]
});

```


### Before Table
![image](https://github.com/spiraleyeld/DynamicRowspanTable/blob/main/pic/BeforeGrouping.png)

### Result Table
![image](https://github.com/spiraleyeld/DynamicRowspanTable/blob/main/pic/GroupingTable.png)

### Change Rowspan Column Sort
```javascript

$('table').rowspanner({
  columns: [0,2,1]
});

```
![image](https://github.com/spiraleyeld/DynamicRowspanTable/blob/main/pic/ChangeRowspanSort.png)

### Notice
* Same Rowspan column value should be aggregated together if under the same father node.
