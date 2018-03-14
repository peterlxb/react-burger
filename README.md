## 使用 React v16 + React-router-v4 + Redux 创建的汉堡应用
address https://fierce-brook-94316.herokuapp.com/

### 整个应用结构
src/components负责呈现UI,src/containers负责处理数据。
对应 store目录也根据应用的逻辑分割reducer.
在初始打开首页时显示的内容
![](assets/images/burger-homepage.png)

在添加配料(ingredients)时显示的内容
![](assets/images/burget-add-ings.png)

containers/BurgerBuilder组件负责处理添加或者减少配料的逻辑，对应的UI放在component目录下
containers/Checkout组件包含Checkout.js和ContactData 在这两个组件内处理配料添加后生成订单order需要的联系信息。
