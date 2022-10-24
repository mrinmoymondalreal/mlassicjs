
# MlassicJS

Classic way of creating modern web applications with blazingly fats reactivity.

Lite weight solution for creating heavy production level web apps.

making web app with heavy web frameworks (like Reactjs) is not ideal. Especially when profermance is Important.


## Installation

```node
  npm i mlassicjs
```


## Usage

### In the browser

```jsx
  import { render } from "mlasssicjs";
  function App() {
    return <div>Hello World</div>;
  }
  root.render(<App />, document.body);
```

### using Hooks
most important thing in a "reactive" web app.

```jsx
  import { render, useState, useEffect } from "mlassicjs";

  const [ count, setCount ] = useState(0);

  useEffect(()=>{
    document.body.style.backgroundColor = ["#eee", "#262", "#635", "#ccc"][Math.abs(Math.random()*4)];
  }, count);

  function App(){
    return (
      <div>
        { count }
        <button type="button" onclick={()=>setCount(e=>e+1)}>Increase Count</button>
      </div>
    );
  };

  render(<App/>, document.body);
```

using Hooks with Callers 

```jsx
  import { render, useState, useEffect } from "mlassicjs";

  const [ count, setCount ] = useState(0);

  useEffect(()=>{
    document.body.style.backgroundColor = ["#eee", "#262", "#635", "#ccc"][Math.abs(Math.random()*4)];
  }, count);

  // remember " count " is a function here which return value with called.

  function App(){
    return (
      <div>
        Here counter multiplied with 3: { count.setCaller(e=>e*3) }
        Here counter in normal form: { count }
        <button type="button" onclick={()=>setCount(e=>e+1)}>Increase Count</button>
      </div>
    );
  };

  render(<App/>, document.body);
```




## Documentation

Please refer to documentation for further information
Also you can use mlassic-cli for ease.

[Documentation](https://mrinmoymondal.ml)

