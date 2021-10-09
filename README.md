# DontMakeThisAtHomeJs

Test for make simple library with web components

## Load component

Load many component with :

```
DontMakeThisAtHome.components(MyComponent1, MyComponent2);
```

## Make component

```
class MyComponent extends DontMakeThisAtHome.Component()
{
  static component = {
    name: "my-component",
    template: true,
    style: true,
  };
}
```

name : name of new html element
template : if you want load template html from same folder of class
style : if you want load style css file from same folder of class

### attributes

Set observed attributes :

```
static get observedAttributes() {
  return ["my-attribute"];
}`
```

```
Each attributes have method for dispach this change :
onMyAttributeChange(nextValue, oldValue) {

}
```

### Folder structure

```
📂-- my.component
|  📜 my.component.js
|  📜 my.component.html
|  📜 my.component.css
```
