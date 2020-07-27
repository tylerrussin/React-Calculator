import React, {useState, useRef} from 'react';
import ReactDOM, { unstable_batchedUpdates } from 'react-dom';
import './index.css';


function Button (props) {

  return (
    <div className={props.cssButton['buttonValue']} onClick={() => props.onClick(props.cssButton['clickValue'])}>
      <div className={props.cssButton['textFont']}>
         {props.cssButton['textValue']}
      </div>
    </div>
  );
}

function Keypad (props) {
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
  let cssArr = []

  for (let i = 0; i < cssButton.length; i++) {
    let boxId = i + "_";

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

function Display (props) {
  let string = props.displayValue;
  
  // Handeling initial zero after decmail true state
  if (string.charAt(string.length-2) === '.' && props.decimalState['initalZero']) {
    string = string.substring(0, string.length - 1);
  }


  // Handleing display minipulation of number based on max display size
  if (props.displayValue.length > 9 || props.displayValue.includes('e')) {
   
    string = Number(string).toExponential(4);

    // Removes trailing zeros in 
    while (string[string.indexOf('e') - 1] === '0') {
      string = string.slice(0, string.indexOf('e') - 1) + string.slice(string.indexOf('e'));
    }
    if (string[string.indexOf('e') - 1] === '.') {
      string = string.slice(0, string.indexOf('e') - 1) + string.slice(string.indexOf('e'));
    }
    

    // Error for decimal and int states
    if (props.decimalState['decimalOn']) {
      
      if (Number(string.slice(-3)) > 100 && string.includes('e')) {
        string = 'Error'
      }
    } else {
      if (Number(string.slice(-3)) > 160 && string.includes('e')) {
        string = 'Error'
      }
    }
  } else {
    if (string !== '') {
      string = Number(string).toLocaleString()
    }

  }



  return (
    <div className='Display'>
      <h2 className='Display-Font'>{string}</h2>
    </div>
  );
}


function Main () {
  const [powerOn, setPowerOn] = useState(false);
  const [memory, setMemory] = useState(0);
  const [displayValue, setDisplayValue] = useState('');
  const [decimalState, setDecimalState] = useState({'decimalOn': false, 'initalZero': false});

  const [activeMemory, setActiveMemory] = useState(0);
  const [operatorValue, setOperatorValue] = useState(null);
  const [prevOperatorValue, setPrevOperatorValue] = useState(null);
  const [equalEvent, setEqualEvent] = useState(false);


  const displayLogic = (i, displayCopy) => {
    if (displayCopy.length + i.length < 10) {
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
      else {
        return ((Number(displayCopy) * 10) + Number(i)).toString();
      }
    }    
  }

  const onClick = (i) => {
    // Power On and Off
    if (i === 'AC') {
      setPowerOn(true);
      setDisplayValue('0');
      setDecimalState({'decimalOn': false, 'initalZero': false})

      return
    } else if (i === 'OFF') {
      setPowerOn(false);
      setMemory(0);
      setDisplayValue('')
      setDecimalState({'decimalOn': false, 'initalZero': false})
      return
    }
    

    if (powerOn) {
      // Memory Management
      if (i === 'MC') {
        setMemory(0)
        return
      } else if (i === 'MR') {
        setDisplayValue(memory.toString())
        setDecimalState({'decimalOn': false, 'initalZero': false});
        return
      } else if (i === 'M-Plus') {
        setMemory(memory + Number(displayValue))
        return
      } else if (i === 'M-Minus') {
        setMemory(memory - Number(displayValue))
        return
      }

          
      // Operator states
      if (i === '+') {
        setOperatorValue('+')
        setActiveMemory(Number(displayValue));
        setEqualEvent(true);
        return
      } else if (i === '-') {
        setOperatorValue('-') 
        return
      } else if (i === '*') {
        setOperatorValue('*')
        return
      } else if (i === '/') {
        setOperatorValue('/')
        return
      } else if (i === 'n**') {
        setOperatorValue('n**')
        return
      }
      
      

      // Equal push
      if (i === '=') {
        if (operatorValue === '+' || prevOperatorValue === '+') {
          if (equalEvent) {
            setDisplayValue((activeMemory + Number(displayValue)).toString());
            return
          } else {
            let activeMemoryCopy = activeMemory;
            setActiveMemory(Number(displayValue));
            setDisplayValue((activeMemoryCopy + Number(displayValue)).toString());
      

            return
          }

        } 
        return
      }

      // Display Events
      // still need comma and max length
      if (i === 'Clear') {
        setDisplayValue('0');
        setDecimalState({'decimalOn': false, 'initalZero': false});
        return
      } else if (i === '+/-') {
        setDisplayValue((Number(displayValue) * -1).toString());
        return
      } else if (i === '%') {
        setDisplayValue((Number(displayValue) / 100).toString());
        setDecimalState({'decimalOn': true, 'initalZero': false});
        return
      } else if (i === '.') {
        if (displayValue.length + i.length < 10) {
          if (!decimalState['decimalOn']) {
            setDisplayValue(displayValue.concat('.0'));
            setDecimalState({'decimalOn': true, 'initalZero': true});
            return
          }
          return
        }
      }
      setEqualEvent(false);
      
      if (operatorValue === null) {
        setDisplayValue(displayLogic(i, displayValue));
      } else if (operatorValue === "+") {
          setActiveMemory(Number(displayValue));
          setDisplayValue(i);
          setPrevOperatorValue('+');
          setOperatorValue(null);
          return
      }
    }
  }
   

  return (
    <div className='Box'>
        <Display
          displayValue={displayValue}
          decimalState={decimalState}
        />

        <Keypad 
          setOperatorValue={setOperatorValue}
          onClick={onClick}
        />
      <p className='ON'>ON</p>

    </div>
  );
}

















// if (operatorValue === '+') {
//   setActiveMemory(activeMemory + displayValue);
//   setDisplayValue(i);

// }
// else if (operatorValue === '-') {
//   setActiveMemory(displayValue - i);
//   setDisplayValue(i);

// }
// else if (operatorValue === '*') {
//   setActiveMemory(activeMemory * displayValue);
//   setDisplayValue(i);

// }
// else if (operatorValue === '/') {
//   setActiveMemory(activeMemory / displayValue);
//   setDisplayValue(i);

// }

// else if (inputTime) {




// function Buttons (props) {

//   return (
//     <div>
//       <NumberPad 
//       numberPress={props.numberPress}
//       />
//       <button onClick={() => props.setOperatorValue('+')}>
//         {'+'}
//       </button>
//       <button onClick={() => props.setOperatorValue('-')}>
//         {'-'}
//       </button>
//       <button onClick={() => props.setOperatorValue('x')}>
//         {'x'}
//       </button>
//       <button onClick={() => props.setOperatorValue('/')}>
//         {'/'}
//       </button>

//       <button onClick={props.equalPress}>
//         {'='}
//       </button>
//     </div>
//   );
// }

// function Main () {
//   const [memory, setMemory] = useState(0);
//   const [activeMemory, setActiveMemory] = useState(0);
//   const [displayValue, setDisplayValue] = useState(0);
//   const [inputTime, setInputTime] = useState(true);


//   const [operatorValue, setOperatorValue] = useState(null);
//   const [equalState, setEqualState] = useState([false, 0]);



//   const equalPress = () => {
    
//     if (operatorValue === "+") {
//       if (equalState[0]) {
//         setDisplayValue(activeMemory + equalState[1]);
//         setActiveMemory(displayValue)
//         setOperatorValue(null);
//         setInputTime(false);

        
//       }
//       else {
//         setDisplayValue(activeMemory + displayValue);
//         setActiveMemory(displayValue);
        
//         setEqualState([true,displayValue]);
//       }

//     }
//     if (operatorValue === "-") {
//       setDisplayValue(activeMemory);
//       setActiveMemory(0);
//       setOperatorValue(null);
//       setInputTime(false);
//     }
//     if (operatorValue === "x") {
//       setDisplayValue(activeMemory * displayValue);
//       setActiveMemory(0);
//       setOperatorValue(null);
//       setInputTime(false);
//     }
//     if (operatorValue === "/") {
//       setDisplayValue(activeMemory / displayValue);
//       setActiveMemory(0);
//       setOperatorValue(null);
//       setInputTime(false);
//     }

//   }

//   const numberPress = (i) => {
//     setEqualState(false)
    
//     if (operatorValue === '+') {
//       setActiveMemory(activeMemory + displayValue);
//       setDisplayValue(i);

//     }
//     else if (operatorValue === '-') {
//       setActiveMemory(displayValue - i);
//       setDisplayValue(i);

//     }
//     else if (operatorValue === 'x') {
//       setActiveMemory(activeMemory * displayValue);
//       setDisplayValue(i);

//     }
//     else if (operatorValue === '/') {
//       setActiveMemory(activeMemory / displayValue);
//       setDisplayValue(i);

//     }

//     else if (inputTime) {
//       if (displayValue === 0) {
//         setDisplayValue(i);
//       }
//       else {
//         setDisplayValue((displayValue * 10) + i)
//       }
  
//     }
//     else {
//       setDisplayValue(i)
//       setInputTime(true)
//     }

//   }

//   return(
//     <div>

//     </div>
//   );
// }

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);


