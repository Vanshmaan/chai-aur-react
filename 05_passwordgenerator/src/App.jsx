
// use Callback and use Effect hook and useRef hook

import { useState, useCallback,useEffect,useRef} from "react";

function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*(){}[]";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordtoClipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,101)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {passwordGenerator()},[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-800 via-gray-900 to-black">
        <div className="w-full max-w-md mx-auto shadow-2xl rounded-2xl px-6 py-8 my-8 text-orange-400 bg-gray-800 border border-gray-700">
          <h1 className="text-2xl font-bold text-center mb-6 text-orange-400 tracking-wide">
            🔐 Password Generator
          </h1>

          {/* Password Display */}
          <div className="flex shadow-inner rounded-lg overflow-hidden mb-6 border border-gray-700 bg-gray-900 focus-within:ring-2 focus-within:ring-orange-500">
            <input
              type="text"
              value={password}
              placeholder="Your password will appear here"
              readOnly
              ref={passwordRef}
              className="w-full px-4 py-2 text-lg text-gray-300 bg-transparent outline-none placeholder-gray-500"
            />
            <button 
            onClick={copyPasswordtoClipboard}
            className="outline-none bg-orange-500 hover:bg-orange-600 active:bg-orange-700 transition-all duration-200 text-white px-4 py-2 shrink-0 font-semibold">
              Copy
            </button>
          </div>

          {/* Range Input */}
          <div className="flex flex-col gap-y-4 text-sm text-gray-300">
            <div className="flex items-center justify-between">
              <label htmlFor="lengthRange" className="font-medium">
                Length: <span className="text-orange-400 font-semibold">{length}</span>
              </label>
              <input
                id="lengthRange"
                type="range"
                min={6}
                max={50}
                value={length}
                className="cursor-pointer accent-orange-500 w-2/3"
                onChange={(e) => setlength(e.target.value)}
              />
            </div>

            {/* Checkboxes */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={numberAllowed}
                  id="numberInput"
                  onChange={() => setnumberAllowed((prev) => !prev)}
                  className="accent-orange-500 w-4 h-4"
                />
                <span className="font-medium">Include Numbers</span>
              </label>

              <label className="flex items-center gap-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={charAllowed}
                  id="characterInput"
                  onChange={() => setcharAllowed((prev) => !prev)}
                  className="accent-orange-500 w-4 h-4"
                />
                <span className="font-medium">Include Symbols</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
