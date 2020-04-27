import { h, render } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import "@tago/custom-widget";
import "@tago/custom-widget/dist/custom-widget.css"
import "./Widget.css";

function Widget() {
  const [widgetTitle, setWidgetTitle] = useState("");
  const [variable, setVariable] = useState({});
  // input text
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    // start comunication with TagoIO
    window.TagoIO.ready();
    // receives the widget data when it starts
    window.TagoIO.onStart((widget) => {
      setWidgetTitle(widget.label);
      // get the name of the first variable
      setVariable({ variable: widget.display.variables[0].variable });
    });

    window.TagoIO.onRealtime((data) => {
      // get the last variable from realtime
      if (data && data.length) {
        setVariable({
          variable: data[0].result[0].variable,
          value: data[0].result[0].value,
        })
      }
    });
  }, []);

  // clears the return message when sending data
  const clearResponse = () => {
    setTimeout(() => {
      setResponse("");
    }, 3000);
  }

  const sendData = () => {
    // data to send, can be an array or an object
    const payload = { 
      ...variable,
      value: text 
    };
    window.TagoIO.sendData(payload, 
      // callback that runs when sendData returns
      (response) => {
        if (response.status) {
          setResponse("Data sent successfully");
        } else {
          setResponse(response.message);
        }
        clearResponse();
    })
  }

  return (
    <div className="container">
      <div>
        <h1>{widgetTitle}</h1>
        <h2>Variable: {variable.variable}</h2>
        <h2>Value: {variable.value}</h2>
      </div>
      <div>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
        <button onClick={sendData}>Send data</button>
        {response && (
          <div className="alert">{response}</div>
        )}
      </div>
    </div>
  );
}

render(<Widget />, document.body);
