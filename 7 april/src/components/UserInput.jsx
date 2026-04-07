import { useState } from "react";

const App = () => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const letterCount = text.length;

  return (
    <div>
      <h1>Letter Counter App</h1>

      <input
        type="text"
        value={text}
        onChange={handleChange}
      />

      <p>Letter Count: {letterCount}</p>
    </div>
  );
};

export default App;