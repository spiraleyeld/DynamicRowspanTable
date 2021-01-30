# Introduce
It's a jQuery tool for html table easy to combine the hierarchy, likes a pivot table. 

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
* Any data should be order by those rowspan columns first from the database.
* Same rowspan column value should be put together if under the same father node.
