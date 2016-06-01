
以下是简单的示例，如有不明，请参照/upms/app/views/HouseKeeper/SingleRoomStatus/SingleRoomStatus.jsx 页面


这是简单的布局，有单行含有一个或者两个 cell 的两种布局，附带把头部也考虑了


如下是一个单行的cell（无label的）

````jsx
title:{
  content:'客房详情',
  klassName:'singleRoomStatus-title'
},
rows:[{
  label: '',
  data: roomNo
  }]
````

如下是一个单行的cell
````jsx
title:{
  content:'客房详情',
  klassName:'singleRoomStatus-title'
},
rows:[{
  label: '房间号',
  data: roomNo
  }]
````

如下是两个单行的cell
````jsx
title:{
  content:'客房详情',
  klassName:'singleRoomStatus-title'
},
rows:[{
  label: '房间号',
  data: roomNo,
  label2: '内部编号',
  data2: roomCode
  }]
````





下面这个比较综合的

````jsx
import { DisplayPanel } from 'component';

const { DisabledCheckbox , API } = DisplayPanel;

export default React.createClass({

  mixins: [
    API
  ],
  ...

  getRoomDetailOptions(args) {
     const {
        roomNo,
        roomCode,
        communityAddress,
        communityName,
        floor,
        floorTotal,
        square,
        towards,
        room,
        hall,
        toilet,
        roomFacilities,
        roomTags,
        isLongRent,
        isShortRent,
        isJoinRent,
        isAllRent,
        productVo,
     } = args;

        return {
           title:{
             content:'客房详情',
             klassName:'singleRoomStatus-title'
          },
           rows:[{
              label: '房间号',
              data: roomNo,
              label2: '内部编号',
              data2: roomCode
           },{
              label: '地址',
              data: communityAddress,
              label2: '小区',
              data2: communityName
           },{
              label: '楼层',
              data: `${floor || ''}/${floorTotal || ''}`,
              label2: '户型',
              data2: `${ CHINANUM[room] || '/' }室${ CHINANUM[hall] || '/' }厅${ CHINANUM[toilet] || '/' }卫`
           },{
              label: '面积',
              data: `${ square || '' }平方米`,
              label2: '朝向',
              data2: TOWARDS[towards] || ''
           },{
              label: '配套设施',
              data: this.getPropFromArrayItem('name', roomFacilities),
              label2: '所属产品',
              data2: productVo && productVo.productName,
           },{
              label: '房屋特色',
              data: this.getPropFromArrayItem('tagName', roomTags)
           },{
              label: '出租方式',
              data: this.getRentMode({isLongRent,isShortRent})
           },{
              label: '出租类型',
              data: this.getRentType({ isJoinRent,isAllRent })
           },
        ]
     }
   },

   render (){

     <DisplayPanel { ...this.getRoomDetailOptions(detailInfo) } />
   }

 })

````
