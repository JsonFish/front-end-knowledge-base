# CSS面试题

## 1. 实现0.5px线

#### meta viewport  仅用于**移动端。**

**html**文件中**head**标签中的 **控制视口**的**meta标签** 中 **conten**t中加入**initial-scale=0.5**

#### **transform: scale(0.5)**

将绘制出来的线的高度进行**半倍缩放**

```css
#line{
  border-bottom:1px solid black;
  transform:scaleY(0.5);
}
```

#### canvas

```html
<body>
  <canvas width="800" height="800" style="border: 1px dashed purple;"></canvas>
  <script>
    //获取dom节点
    const canvas=document.querySelector('canvas')
    //获取上下文
    const ctx=canvas.getContext('2d')
    ctx.moveTo(600,600)   //起点
    ctx.lineTo(800,600)   //终点
    ctx.lineWidth='0.5'   //设置线段的宽度
    ctx.stroke()         //绘制线段
  </script>
</body>

```

## 2. CSS常见的布局有哪些

#### 流式布局

默认布局，布局规则默认为块级盒子从上到下，垂直排列；内联盒子从左到右，水平排列等

#### position定位布局

定位

#### float浮动布局

浮动，脱离文档流，成为浮动流

#### flex弹性布局

弹性布局

#### grid网格布局

使用 **display: grid** 属性，将容器内的子元素排列成具有行和列的二维栅格。

#### 层叠布局

使用z-index属性控制元素在垂直堆叠顺序上显示。

## 3. 盒子模型

**思路：介绍两种 -> 所有 ->  content margin ... -> 二者区别（宽高）-> 两种之间相互转换**

#### 概念

html中所有标签元素都可以视为一个盒模型，

- **w3c标准的标准盒模型      盒子的宽高只是content内容区域的宽度，不包含 padding 和 border**
- **IE(8一下)标准的怪异盒模型   盒子的宽度包含content border padding**

最主要的区别就是这个盒子的宽高width height的包含范围，一个盒子模型包含 padding margin border content

#### 盒模型的转换

- box-sizing:content-box; 盒模型设置为w3c标准盒子模型
- box-sizing:border-box; 盒模型设置为怪异（IE）盒子模型

## 4. dispaly 布局 inline

dispaly: inline 元素变成行内元素 padding 设置都有效， margin 只有左右生效

## 5. BFC

#### 概念

它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。
Block Formatting  Context  块格式化上下文  是Web页面可视化渲染CSS的一部分, **是布局过程中生成块级盒子的区域。也是浮动元素与其他元素的交互限定区域。**
简单理解就是具备BFC特性的元素, 就像被一个容器所包裹, 容器内的元素在布局上不会影响外面的元素。
同时也不受外面的元素影响。自适应两栏布局中container类属性无需设置width为100%

#### 触发BFC

- body 根元素
- 浮动元素：float 除 none 以外的值
- 绝对定位元素：position (absolute、fixed)
- display 为 inline-block、table-cells、flex
- overflow 除了 visible 以外的值 (hidden、auto、scroll)

## 6. display:none visibility:hidden opacity:0 区别

#### display: none

- DOM 结构：浏览器不会渲染 display 属性为 none 的元素，不占据空间；
- 事件监听：无法进行 DOM 事件监听；
- 性能：动态改变此属性时会引起重排，性能较差；
- 继承：不会被子元素继承，毕竟子类也不会被渲染；
- transition：transition 不支持 display。

#### visibility: hidden

- 元素被隐藏 元素会被渲染 占据这空间结构
- 无法进行事件监听
- 动态改变此属性会引起重绘，性能较高
- 会被子元素继承

#### opacity:0

- DOM 结构：透明度为 100%，元素隐藏，占据空间；
- 事件监听：可以进行 DOM 事件监听；
- 性 能：提升为合成层，不会触发重绘，性能较高；
- 继 承：会被子元素继承,且，子元素并不能通过 opacity: 1 来取消隐藏；
- transition：opacity 可以延时显示和隐藏

## 7. 浮动 清除浮动

#### **浮动**

是CSS的一个属性，用于控制元素在水平方向上的布局和定位。它使元素能够向左或向右浮动，并允许其他内容环绕它。通常用于创建文字环绕图像、多列布局和导航菜单等。

#### 清除浮动

- 额外标签法 / 隔墙法 添加一个块级标签 不能是行内标签  给他一个样式 clear:both
- 触发BFC  父级添加overflow:hidden;  同时添加width或者height  
- after伪元素法  display:block clear:both content:""

## 8. 水平垂直居中一个盒子

#### position + **transform**

子绝父相，偏移自身的一半

```javascript
  position: absolute;
  top: 50%;
  left: 50%;
  // 偏移自身地一半
  transform: translate(-50%, -50%);
```

#### **flex弹性布局**

```javascript
   /* 父元素 */
      .container {
        width: 600px;
        height: 600px;
        border: 1px solid red;
        background-color: antiquewhite;
        display: flex;
        /* 主轴居中 */
        justify-content: center;
        /* 交叉轴居中 */
        align-items: center;
      }

```

#### position + margin auto

子绝父相
正常情况下不使用定位，margin:auto等同于margin:0 auto；也就是水平居中，无法达到垂直居中，既使垂直方向有剩余空间
使用了绝对定位之后， margin: auto 就可以实现垂直方向的居中；我猜想是因为绝对定位触发了BFC盒子规则，导致父元素和子元素之间相互隔离；(仅个人观点)

```javascript
  /* 子元素 */
      .item {
        width: 100px;
        height: 100px;
        background-color: yellowgreen;
        /* 子元素开启绝对定位 */
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;/*相当于宽度和高度自动计算为居中*/
      }
```

## 9. flex: 1

flex:1 ==> flex:1 1 auto
flex实际上是flex-grow、flex-shrink和flex-basis三个属性的缩写。

- flex-grow属性指定了flex容器中剩余空间的多少应该被分配给项目。
- flex-shrink属性指定了flex元素的收缩规则。flex元素仅在默认宽度之和大于容器的时候才会发生收缩。默认属性值为1，所以在空间不够的时候，子项目将会自动缩小。
- flex-basis属性指定了flex元素在主轴方向上的初始大小。如果不使用box-sizing改变盒模型的话，那么这个属性就决定了flex元素的内容的尺寸。如果设置了flex-basis值，那么元素占用的空间为flex-basis值；如果没有设置或者设置为auto，那么元素占据的空间为元素的width/height值。

## 10. position 定位

**1，static 默认值**
没有定位，遵循正常的文档流对象
**2，sticky 粘性定位**
依赖于用户的滚动，然后在position: relative 与 position:fixed 之间进行切换。
它的行为就像 **position:relative;** 而当页面滚动超出目标区域时，它的表现就像 **position:fixed;**，它会固定在目标位置。在跨越特定阈值前为相对定位，之后为固定定位。四个阈值 top right left bottom

### 11. 哪些属性可以继承

#### 可以继承的

字体

- font-family：字体系列
- font-size：字体大小
- font-weight：字体粗细
- color：文本颜色
- text-align：文本对齐方式

文本

- text-align：文本对齐方式
- line-height：行高度
- word-spacing：单词之间的间距
- letter-spacing：中文或者字母之间的间距
- text-transform：控制文本大小写（就是uppercase、lowercase、capitalize这三个）
- color：文本颜色

#### 不能继承

- 盒子模型的属性：width,height,marigin, border,padding;
- 背景属性：float, clear, position , top ,tight.botton
- 定位 浮动
