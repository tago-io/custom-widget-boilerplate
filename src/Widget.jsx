import { h, render } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import "@tago/custom-widget";
import "@tago/custom-widget/dist/custom-widget.css"

function Widget() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    window.TagoIO.onStart(null, (widget) => {
      console.log(widget)
    });
  }, []);

  return (
    <div>
      <h1>My Widget! Counter {count}</h1>
      <button onClick={() => setCount(count + 1)}>Click here</button>
    </div>
  );
}

render(<Widget />, document.body);
