
请参照/upms/app/views/HouseKeeper/RoomStatusDiagram/RoomStatusDiagram.jsx 页面


````jsx

import { ColorfulBar } from 'component';
const Color = ColorfulBar.Color;



<ColorfulBar>
  <Color tooltipTitle='Hello' tooltipPlacement='top' className ='color1' num =12 />
  <Color tooltipTitle='Hello' tooltipPlacement='top' className ='color2' num =20 />
  <Color tooltipTitle='Hello' tooltipPlacement='top' className ='color3' num =30 />
  <Color tooltipTitle='Hello' tooltipPlacement='top' className ='color4' num =4 />
  <Color tooltipTitle='Hello' tooltipPlacement='top' className ='color5' num =8 />
</ColorfulBar>

````

````css

.color1{
  background-color: red;
}
.color2{
  background-color: #cccccc;
}
.color3{
  background-color: #ffee12;
}
.color4{
  background-color: green;
}
.color5{
  background-color: #000000;
}

````
