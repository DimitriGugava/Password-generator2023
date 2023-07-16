import "./App.css";
import copy from "./assets/copy.svg";

import { useState } from "react";
function App() {
  const [password, setPassword] = useState("Generated Password");
  const [passwordLength, setPasswordLength] = useState(10);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [strength, setStrength] = useState("Strong");
  const [strengthRed, setStrengthRed] = useState(false);
  const [strengthYellow, setStrengthYellow] = useState(false);
  const [strengthGreen, setStrengthGreen] = useState(false);

  const calculateStrength = (length: number) => {
    if (length <= 3) {
      setStrength("Weak"); // Weak
      setStrengthRed(true);
    } else if (length > 3 && length <= 6) {
      setStrength("Medium"); // Medium
      setStrengthYellow(true);
    } else if (length > 6) {
      setStrength("Strong"); // Strong
      setStrengthGreen(true);
    }
  };
  const changeCharacter = (event: any) => {
    const newLength = parseInt(event.target.value, 10);
    setPasswordLength(newLength);
    calculateStrength(newLength);
  };

  const generatePassword = () => {
    // Check if at least one type of character is selected
    if (
      !(
        includeLowercase ||
        includeUppercase ||
        includeNumbers ||
        includeSymbols
      )
    ) {
      alert("Please select at least one type of character for your password.");
      return;
    }

    let passwordPool = "";
    if (includeLowercase) passwordPool += "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) passwordPool += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) passwordPool += "0123456789";
    if (includeSymbols) passwordPool += "!@#$%^&*()_+?><:{}[]";

    let password = "";
    for (let i = 0; i < passwordLength; i++) {
      let randomIndex = Math.floor(Math.random() * passwordPool.length);
      password += passwordPool[randomIndex];
    }

    setPassword(password);

    if (passwordLength <= 3) {
      setStrength("Weak"); // Weak
    } else if (passwordLength > 3 && passwordLength <= 6) {
      setStrength("Medium"); // Medium
    } else if (passwordLength > 6) {
      setStrength("Strong"); // Strong
    }

    console.log(password);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
  };

  return (
    <div className="App">
      <div className="main_Container">
        <div className="calculator_Box">
          <h1 className="password_Header_Text">Password Generator</h1>
          <div className="calculator_Functional_Box">
            <div className="generated_Text_Box">
              <div className="generated_Text">{password}</div>
              <img
                className="generated_Text_Copy"
                src={copy}
                onClick={copyPassword}
              />
            </div>
            <div className="second_Box">
              <div className="character_Length_Box">
                <div className="character_Length">
                  <a className="character_Length_Text">Character Length</a>
                  <div className="characterNumber">{passwordLength}</div>
                </div>
                <input
                  type="range"
                  className="slider"
                  min="1"
                  max="10"
                  onChange={changeCharacter}
                />
              </div>
              <div className="checkBox_Container">
                <div className="checkBox1">
                  <input
                    type="checkbox"
                    className="box1"
                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                  />

                  <a className="checkBox_Text">Include Numbers</a>
                </div>
                <div className="checkBox2">
                  <input
                    type="checkbox"
                    className="box2"
                    onChange={(e) => setIncludeSymbols(e.target.checked)}
                  />

                  <a className="checkBox_Text">Include Symbols</a>
                </div>
                <div className="checkBox3">
                  <input
                    type="checkbox"
                    className="box3"
                    onChange={(e) => setIncludeUppercase(e.target.checked)}
                  />

                  <a className="checkBox_Text">Include Uppercase</a>
                </div>
                <div className="checkBox4">
                  <input
                    type="checkbox"
                    className="box4"
                    onChange={(e) => setIncludeLowercase(e.target.checked)}
                  />

                  <a className="checkBox_Text">Include Lowercase</a>
                </div>
              </div>
              <div className="strength_Box">
                <div className="strength_Text">Strength</div>
                <div className="strength_Bar_Box">
                  <a className="strength_Power">{strength}</a>
                  <div className="strength_Bar"></div>
                  <div className="strength_Bar"></div>
                  <div className="strength_Bar"></div>
                  <div className="strength_Bar"></div>
                </div>
              </div>
              <button
                className="generate_Button_Box"
                onClick={generatePassword}
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
