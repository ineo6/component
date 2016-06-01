


以下是部分演示代码， 详情请参考 \upms\app\views\Message\Notification.jsx


````jsx
import {TabModal} from 'component';



let detailTabs = [
         {
            title:'标签一',
            content:<h3>这里是标签一 </h3>
         },
         {
            title:'标签二',
            content:<h3>这里是标签二 </h3>
         }
      ];


<TabModal
    tabs= {detailTabs}
    onTabChange = { this.onTabChangeHandler }
    closeModal={ this.close }
    isOpen = { open }>
</TabModal>
````
