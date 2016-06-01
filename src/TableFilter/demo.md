

````jsx
import {TableFilter} from 'component';
const FilterItem = TableFilter.FilterItem;

FilterItem

通过设置 `float` 为 `left` `right` 来布局。

<TableFilter>
    <FilterItem
        float="left">
        <Popover placement="bottomLeft" overlay={this.renderFilterBox()} title="标题" trigger="click">
            <Button size="large">过滤条件</Button>
        </Popover>
    </FilterItem>
    <FilterItem
        float="left">
        <input type="text"/>
    </FilterItem>
    <FilterItem
        float="left">
        <Button size="large">查 询</Button>
    </FilterItem>
</TableFilter>
````

