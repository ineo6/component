

````jsx
import {PopBox} from 'component';

refs.filterBox.hide() 关闭
onChange切换回调.

 <PopBox ref="filterBox" placement="bottomLeft" content={this.renderFilterBox()} trigger="click"
                                onChange={this.handleVisibleChange}>
    <Button size="large">过滤条件</Button>
</PopBox>
````

