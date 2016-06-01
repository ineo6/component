以下是简单的例子，如有不明，请参照upms/app/router.jsx 中的消息通知模块

````jsx
import {BtnListPanelFactory} from 'component';



BtnListPanelFactory.create({
                  displayName:'消息通知',
                  btnList:[
                     {name: '消息查询', func: 'message'},
                     {name: '通知查询', func: 'notification'},
                     {name: '发送通知', func: 'sendMsg'},
                     {name: '个人消息', func: 'myMsg'}
                   ]
               }
               )

````
在router中的运用

````jsx

import {BtnListPanelFactory} from 'component';



<Route path="/message" name="message-panel" handler={ BtnListPanelFactory.create({
                  displayName:'消息通知',
                  btnList:[
                     {name: '消息查询', func: 'message'},
                     {name: '通知查询', func: 'notification'},
                     {name: '发送通知', func: 'sendMsg'},
                     {name: '个人消息', func: 'myMsg'}
                   ]
               }
               )}>
               )


````
