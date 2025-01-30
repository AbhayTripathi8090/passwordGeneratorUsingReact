import { useState, useCallback, useEffect,useRef } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
//ref hook
const passwordInputRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+-=[]{}|;:'\",.<>?/~`";

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

const copyPasswordToClipboard = useCallback(()=>{
  passwordInputRef.current?.select()
  passwordInputRef.current?.setSelectionRange(0,10)
  window.navigator.clipboard.writeText(password)

},[password])

useEffect(()=>{
  passwordGenerator();
},[length,numberAllowed,charAllowed,setPassword])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-6 my-8 text-orange-500 bg-gray-500">
        <h2 className="text-center text-lg font-semibold mb-4">
          Password Generator
        </h2>
        <div className="bg-white flex items-center shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-3 text-gray-700"
            placeholder="Generated Password"
            readOnly
            ref={passwordInputRef}
          />
          <button
          onClick={copyPasswordToClipboard}
           className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-r">
            Copy
          </button>
        </div>
        <div>
          <div>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed(!numberAllowed);
              }}
            />
            <label>Numbers</label>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed(!charAllowed);
              }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
