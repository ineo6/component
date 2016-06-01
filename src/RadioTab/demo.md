以下是简单的示例，如有不明，可以参考/upms/app/views/Message/SendMsg/SendMsg.jsx


```` jsx
import { RadioTab }  from 'component';
const TabPane = RadioTab.TabPane;


const receiverType =['全部租客','管理中心','全体员工','部门员工'];

<RadioTab onTabClick = { this.onTabClick }>
 <TabPane tab={receiverType[0]} key="tab0">选项卡一内容</TabPane>
 <TabPane tab={receiverType[1]} key="tab1">选项卡二内容</TabPane>
 <TabPane tab={receiverType[2]} key="tab2">选项卡三内容</TabPane>
 <TabPane tab={receiverType[3]} key="tab3">选项卡4内容</TabPane>
</RadioTab>
````
