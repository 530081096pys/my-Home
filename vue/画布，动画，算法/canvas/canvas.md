##canvas
####旧点复习
document.createElement : 指定名称创建一个元素

appendChild() 把谁插入到谁的末尾  括号里是要插入的对象

appendChild用法
target.appendChild(newChild)
newChild作为target的子节点插入最后的一子节点之后

insertBefore用法
target.insertBefore(newChild,existingChild)
newChild作为target的子节点插入到existingChild节点之前
existingChild为可选项参数，当为null时其效果与appendChild一样

###canvas
1.bgReady这个变量用来标识图片是否已经加载完成从而可以放心地使用了，因为如果在图片加载未完成情况下进行绘制是会报错的。

2.addEventListener的使用方式 

target.addEventListener(type,listener,useCapture); 

target： 文档节点、document、window 或 XMLHttpRequest。 
type： 字符串，事件名称，不含“on”，比如“click”、“mouseover”、“keydown”等。 
listener ：实现了 EventListener 接口或者是 JavaScript 中的函数。 
useCapture ：是否使用捕捉，一般用 false 。

这种当满足条件后从子元素到父元素依次触发其上事件的处理方式叫做事件冒泡

**同时捕获和冒泡**
先把useCapture为false的元素绑定事件放到一边，按照事件捕获正常的顺序执行useCapture为true的元素绑定事件，最后在按照事件冒泡顺序执行useCapture为false。

**阻止事件流**
event.stopPropagation()函数并不会阻止其下函数内容的执行。
如果你使用的是jquery的事件绑定，也可以直接在函数中使用return false来阻止事件的传播（当然event.stopPropagation同样有效），与event.stopPropagation不同的是，return false会阻止同函数下面的代码执行。这里就不举例了。