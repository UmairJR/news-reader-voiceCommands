import React, { useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

function App() {
  const [val, setVal] = useState("")
  const newKey = '8dcece0e934a4e89bcfe6e5f9293af61';
  const alanKey = '3eece02658e35607411664568a6bc3ae2e956eca572e1d8b807a3e2338fdd0dc/stage';
  useEffect(() => {
    
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles }) => {
        if (command === 'newHeadlines')
        {
          console.log("hello");
          console.log(articles);
        }
      },
    })
  },[]);

  return (
    <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
      Hello World {val}
    </div>
  );
}

export default App;
