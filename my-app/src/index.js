import React, {useState, useEffect} from 'react';
import ReactDOM, { unstable_batchedUpdates } from 'react-dom';
import './index.css';


// Global Variables

let activeMemory = 0; // Used for arithmetic
const secretMessage =  "Ahh... I see that you are familar with the great secrets of the calculator :)".slice();
let i = 0;

// Array of css values for each button
let cssButton = [{'buttonValue': 'Button-0', 'clickValue': '0', 'textFont': 'Zero', 'textValue': '0'},
                 {'buttonValue': 'Button-Period', 'clickValue': '.', 'textFont': 'Period', 'textValue': '.'},
                 {'buttonValue': 'Button-Equal', 'clickValue': '=', 'textFont': 'Equal', 'textValue': '='},
                 {'buttonValue': 'Button-1', 'clickValue': '1', 'textFont': 'One', 'textValue': '1'},
                 {'buttonValue': 'Button-2', 'clickValue': '2', 'textFont': 'Two', 'textValue': '2'},
                 {'buttonValue': 'Button-3', 'clickValue': '3', 'textFont': 'Three', 'textValue': '3'},
                 {'buttonValue': 'Button-4', 'clickValue': '4', 'textFont': 'Four', 'textValue': '4'},
                 {'buttonValue': 'Button-5', 'clickValue': '5', 'textFont': 'Five', 'textValue': '5'},
                 {'buttonValue': 'Button-6', 'clickValue': '6', 'textFont': 'Six', 'textValue': '6'},
                 {'buttonValue': 'Button-7', 'clickValue': '7', 'textFont': 'Seven', 'textValue': '7'},
                 {'buttonValue': 'Button-8', 'clickValue': '8', 'textFont': 'Eight', 'textValue': '8'},
                 {'buttonValue': 'Button-9', 'clickValue': '9', 'textFont': 'Nine', 'textValue': '9'},
                 {'buttonValue': 'Button-Plus', 'clickValue': '+', 'textFont': 'Plus', 'textValue': '+'},
                 {'buttonValue': 'Button-Minus', 'clickValue': '-', 'textFont': 'Minus', 'textValue': '-'},
                 {'buttonValue': 'Button-Times', 'clickValue': '*', 'textFont': 'Times', 'textValue': 'x'},
                 {'buttonValue': 'Button-Divid', 'clickValue': '/', 'textFont': 'Divid', 'textValue': '/'},
                 {'buttonValue': 'Button-SquareRoot', 'clickValue': 'n**', 'textFont': 'SquareRoot', 'textValue': 'n**'},
                 {'buttonValue': 'Button-MC', 'clickValue': 'MC', 'textFont': 'MC', 'textValue': 'MC'},
                 {'buttonValue': 'Button-MR', 'clickValue': 'MR', 'textFont': 'MR', 'textValue': 'MR'},
                 {'buttonValue': 'Button-M-Plus', 'clickValue': 'M-Plus', 'textFont': 'M-Plus', 'textValue': 'M+'},
                 {'buttonValue': 'Button-M-Minus', 'clickValue': 'M-Minus', 'textFont': 'M-Minus', 'textValue': 'M-'},
                 {'buttonValue': 'Button-Percent', 'clickValue': '%', 'textFont': 'Percent', 'textValue': '%'},
                 {'buttonValue': 'Button-Plus-Minus', 'clickValue': '+/-', 'textFont': 'Plus-Minus', 'textValue': '+/-'},
                 {'buttonValue': 'Button-Clear', 'clickValue': 'Clear', 'textFont': 'Clear', 'textValue': 'C'},
                 {'buttonValue': 'Button-AC', 'clickValue': 'AC', 'textFont': 'AC', 'textValue': 'AC'},
                 {'buttonValue': 'Button-OFF', 'clickValue': 'OFF', 'textFont': 'OFF', 'textValue': 'OFF'}]


// Displays each button on calculator
function Button (props) {
  // Reffrencing css array values
  return (
    <div className={props.cssButton['buttonValue']} onClick={() => props.onClick(props.cssButton['clickValue'])}>
      <div className={props.cssButton['textFont']}>
         {props.cssButton['textValue']}
      </div>
    </div>
  );
}


// Houses all keypad buttons 
function Keypad (props) {

  let cssArr = []

  // Iterating through buttons array
  for (let i = 0; i < cssButton.length; i++) {
    let boxId = i + "_";

    // Creating new button componet for each value
    cssArr.push(<Button 
      key={boxId}
      boxId={boxId}
      cssButton={cssButton[i]}
      onClick={props.onClick}
      />)
  }

  return (
    <div className='Keypad noselect'>
      {cssArr}
    </div>
  );
}



// Displays calculator output
function Display (props) {

  const [displaySecret, setDisplaySecret] = useState(false);
  const [secretFinal, setSecretFinal] = useState('');
  const [formatedDisplay, setFormatedDisplay] = useState('');

  // Secret Message Effect
  useEffect(() => {
    if (props.displayValue === '58008') {
      setDisplaySecret(true);
      const clear = setInterval(() => {
        if (i === secretMessage.length) {
          setDisplaySecret(false);
          clearInterval(clear);
        } else {
          setSecretFinal(secretMessage.slice(Math.max(0, i-13), i+1));
          i += 1
        }
      }, [props.displayValue]);
    }
  // return clearinterval at some point
  }, [props.displayValue]);

  // String Effect
  useEffect(() => {

    let string = props.displayValue;

    // Handleing display minipulation of number based on max display size
    if (props.displayValue.length > 9 || props.displayValue.includes('e')) {
      
      string = Number(string).toExponential(4);
      
      // Removes trailing zeros in exponetial state
      while (string[string.indexOf('e') - 1] === '0') {
        string = string.slice(0, string.indexOf('e') - 1) + string.slice(string.indexOf('e'));
      }
      if (string[string.indexOf('e') - 1] === '.') {
        string = string.slice(0, string.indexOf('e') - 1) + string.slice(string.indexOf('e'));
      }
      
      // Error for decimal and int states, if number too big/small
      if (props.decimalState['decimalOn']) {
        
        if (Number(string.slice(-3)) > 100 && string.includes('e')) {
          string = 'Error'
        }
      } else {
        if (Number(string.slice(-3)) > 160 && string.includes('e')) {
          string = 'Error'
        }
      }

    }
    else {

      // Adding in commas to display string
      if (string !== '') {
        let parts = string.split(".");
        string =  parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");

      }
      // Handeling initial zero after decmail true state
      if (string.charAt(string.length-2) === '.' && props.decimalState['initalZero']) {
        let parts = string.split(".");
        string =  parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")  // accounting for commas in this state
        string += '.';
      }
      // Adding zero if only decimal is displayed
      if (string.indexOf('.') === 0) {
        string = '0' + string;
      }
    }
  // Updating State
  setFormatedDisplay(string)
  }, [props.displayValue]);

  
  return (
    <div className='Display'>
      <h2 className='Display-Font'>{displaySecret ? secretFinal: formatedDisplay}</h2>
    </div>
  );
}


// Top level component, houses all calculation and display states
function Main () {

  // States used for systems of calculator
  const [powerOn, setPowerOn] = useState(false);
  const [displayValue, setDisplayValue] = useState(''); // Main state for showing calculated values
  const [operatorValue, setOperatorValue] = useState(null);

  const [memory, setMemory] = useState(0);
  const [freshInput, setFreshInput] = useState(false);
  const [freshMemory, setFreshMemory] = useState(false);
  const [decimalState, setDecimalState] = useState({'decimalOn': false, 'initalZero': false});


  // Allows ints to be typed to display
  const displayLogic = (i, displayCopy) => {
    
    // Handels display manipulation in decimal state
    if (decimalState['decimalOn']) {
      if (decimalState['initalZero']) {
        let string = displayCopy;
        string = string.substring(0, string.length - 1);
        string += i;
        setDecimalState({'decimalOn': true, 'initalZero': false});
        return string
      } else {
        let string = displayCopy;
        string += i;
        return string
      }
    }
    // Handels display manipulation in intiger state
    else {
      if (displayValue === '-0') {
        return ('-' + ((Number(displayCopy) * 10) + Number(i))).toString();
      }
      return ((Number(displayCopy) * 10) + Number(i)).toString();
    }   
  }

  // Activated with ever button click
  const onClick = (i) => {

    // Power On and Off
    if (i === 'AC') {
      setPowerOn(true);
      setDisplayValue('0');
      setDecimalState({'decimalOn': false, 'initalZero': false})
      setFreshInput(false);
      setFreshMemory(false)
      setMemory(0);
      setOperatorValue(null);
      activeMemory = 0;
      return
    } else if (i === 'OFF') {
      setPowerOn(false);
      setMemory(0);
      setDisplayValue('')
      setDecimalState({'decimalOn': false, 'initalZero': false})
      setFreshInput(false);
      setFreshMemory(false)
      setMemory(0);
      setOperatorValue(null);
      activeMemory = 0;
      return
    }
    
    if (powerOn) {

      // Memory Management
      if (i === 'MC') {  // Clear
        setMemory(0)
        return
      } else if (i === 'MR') { // Return
        setDisplayValue(memory.toString())
        setDecimalState({'decimalOn': false, 'initalZero': false});
        return
      } else if (i === 'M-Plus') { // Add
        setMemory(memory + Number(displayValue))
        return
      } else if (i === 'M-Minus') { // Subtract
        setMemory(memory - Number(displayValue))
        return
      }

          
      // Operator states
      if (i === '+') {
        setOperatorValue('+')
        activeMemory = Number(displayValue);
        setFreshInput(true);
        setFreshMemory(true)
        return
      } else if (i === '-') {
        setOperatorValue('-') 
        activeMemory = Number(displayValue);
        setFreshInput(true);
        setFreshMemory(true)
        return
      } else if (i === '*') {
        setOperatorValue('*')
        activeMemory = Number(displayValue);
        setFreshInput(true);
        setFreshMemory(true)
        return
      } else if (i === '/') {
        setOperatorValue('/')
        activeMemory = Number(displayValue);
        setFreshInput(true);
        setFreshMemory(true)
        return
      } else if (i === 'n**') {
        setOperatorValue('n**')
        activeMemory = Number(displayValue);
        setFreshInput(true);
        setFreshMemory(true)
        return
      }
      
      // Equal push event
      if (i === '=') {
        if (operatorValue === null) {
          return
        }
        if (operatorValue === '+') {
          // sets active memory to be equal to last display state given
          if (freshMemory) {
            let activeMemoryHistory = activeMemory;
            activeMemory = Number(displayValue);
            setFreshMemory(false);
            setDisplayValue((activeMemoryHistory + Number(displayValue)).toString());
            return
          } else {
            setDisplayValue((activeMemory + Number(displayValue)).toString()); // standard addition
            setFreshInput(true);
            return
          }
        } else if (operatorValue === '-') {
          // sets active memory to be equal to last display state given
          if (freshMemory) {
            let activeMemoryHistory = activeMemory;
            activeMemory = Number(displayValue);
            setFreshMemory(false);
            setDisplayValue((activeMemoryHistory - Number(displayValue)).toString());
            return
          } else {
            setDisplayValue((Number(displayValue - activeMemory)).toString()); // standard subtraction
            setFreshInput(true);
            return
          }
        } else if (operatorValue === '/') {
          // sets active memory to be equal to last display state given
          if (freshMemory) {
            let activeMemoryHistory = activeMemory;
            activeMemory = Number(displayValue);
            setFreshMemory(false);
            setDisplayValue((activeMemoryHistory / Number(displayValue)).toString());
            return
          } else {
            setDisplayValue((Number(displayValue / activeMemory)).toString()); // standard divistion
            setFreshInput(true);
            return
          }
        }  else if (operatorValue === '*') {
          // sets active memory to be equal to last display state given
            if (freshMemory) {
            let activeMemoryHistory = activeMemory;
            activeMemory = Number(displayValue);
            setFreshMemory(false);
            setDisplayValue((activeMemoryHistory * Number(displayValue)).toString());
            return
          } else {
            setDisplayValue((activeMemory * Number(displayValue)).toString()); // standard multiplacation
            setFreshInput(true);
            return
          }
        }  else if (operatorValue === 'n**') {
            if (freshMemory) {
            let activeMemoryHistory = activeMemory;
            activeMemory = Number(displayValue);
            setFreshMemory(false);
            setDisplayValue((Math.pow(activeMemoryHistory, 1/Number(displayValue))).toString());
            return
          } else {
            setDisplayValue((Math.pow(Number(displayValue), 1/activeMemory)).toString()); // standard square root
            setFreshInput(true);
            return
          }
        }
      }

      // Display Events
      if (i === 'Clear') { // resets all live events
        setDisplayValue('0');
        setDecimalState({'decimalOn': false, 'initalZero': false});
        setFreshInput(false);
        setFreshMemory(false)
        setOperatorValue(null);
        activeMemory = 0;
        return
      } else if (i === '+/-') { // converts to opposite postive/negative state
        if (Number(displayValue) === 0) {
          if (displayValue.length > 1) {
            setDisplayValue(displayValue.slice(1));
            return
          }
          setDisplayValue('-' + displayValue);
          return
        } else {
          setDisplayValue((Number(displayValue) * -1).toString());
          return
        }

      } else if (i === '%') { // turns number to decimal version of percentage
        setDisplayValue((Number(displayValue) / 100).toString());
        setDecimalState({'decimalOn': true, 'initalZero': false});
        return
      } else if (i === '.') { // if not already in; enters the decimal number state
        if (displayValue.length + i.length < 10) {
          if (freshInput) {
            setDisplayValue('.0');
            setDecimalState({'decimalOn': true, 'initalZero': true});
            setFreshInput(false);
            return
          } else if (!decimalState['decimalOn']) {
            setDisplayValue(displayValue.concat('.0'));
            setDecimalState({'decimalOn': true, 'initalZero': true});
            return
          } 
          return
        }
      }

      // Handles display minipluation based off length and operator state
      if (displayValue.length + i.length < 10) {
        if (freshInput) {
          setDisplayValue(i);
          setFreshInput(false);
          return
        } else {
          setDisplayValue(displayLogic(i, displayValue));
          return
        }
      }
    }
  }
   
  return (
    <div className='Box noselect'>
        <Display
          displayValue={displayValue}
          decimalState={decimalState}
          setDisplayValue={setDisplayValue}
        />

        <Keypad 
          setOperatorValue={setOperatorValue}
          onClick={onClick}
        />
      <p className='ON noselect'>ON</p>

    </div>
  );
}


ReactDOM.render(
  <Main />,
  document.getElementById('root')
);


