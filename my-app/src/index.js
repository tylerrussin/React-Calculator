import React, {useState, useRef} from 'react';
import ReactDOM from 'react-dom';
import './index.css';









function Keypad (props) {

  return (

    <div className='Keypad noselect'>

      <div className='Button-0'> <div className='Zero'>0</div></div>
      <div className='Button-Period'> <div className='Period'>.</div></div>
      <div className='Button-Equal'> <div className='Equal'>=</div></div>

      <div className='Button-1'> <div className='One'>1</div></div>
      <div className='Button-2'> <div className='Two'>2</div></div>
      <div className='Button-3'> <div className='Three'>3</div></div>
      
      <div className='Button-4'> <div className='Four'>4</div></div>
      <div className='Button-5'> <div className='Five'>5</div></div>
      <div className='Button-6'> <div className='Six'>6</div></div>

      <div className='Button-7'> <div className='Seven'>7</div></div>
      <div className='Button-8'> <div className='Eight'>8</div></div>
      <div className='Button-9'> <div className='Nine'>9</div></div>

      <div className='Button-Plus'> <div className='Plus'>+</div></div>
      <div className='Button-Minus'> <div className='Minus'>-</div></div>
      <div className='Button-Times'> <div className='Times'>x</div></div>
      <div className='Button-Divid'> <div className='Divid'>/</div></div>
      <div className='Button-SquareRoot'> <div className='SquareRoot'>n**</div></div>

      <div className='Button-MC'> <div className='MC'>MC</div></div>
      <div className='Button-MR'> <div className='MR'>MR</div></div>
      <div className='Button-M-Plus'> <div className='M-Plus'>M+</div></div>
      <div className='Button-M-Minus'> <div className='M-Minus'>M-</div></div>

      <div className='Button-Percent'> <div className='Percent'>%</div></div>
      <div className='Button-Plus-Minus'> <div className='Plus-Minus'>+/-</div></div>
      <div className='Button-Clear'> <div className='Clear'>C</div></div>
      <div className='Button-AC'> <div className='AC'>AC</div></div>
      <div className='Button-OFF' onClick={() => alert('off')}> <div className='OFF'>OFF</div></div>


    </div>
  );
}

function Display (props) {

  return (
    <div className='Display'>

    </div>
  );
}


function Main () {
  return (
    <div className='Box'>
      <Display />
      <Keypad />
      <p className='ON'>ON</p>

    </div>
  );
}














// function NumberButton (props) {
  

//   return (

//       <button onClick={() => props.numberPress(props.value)}>
//         {props.value}
//       </button>
//   );
// }



// function NumberPad (props) {
//   const numArr = [];
//   for (let i = 0; i < 10; i++) {
//     let boxId = i + "_";

//     numArr.push(
//       <NumberButton
//         key={boxId}
//         boxId={boxId}
//         value={i}
//         numberPress={props.numberPress}
//       />
//     )
//   }
//   return (
//     <div>
//       {numArr}
//     </div>
//   );

// }



// function Display (props) {

//   return (
//     <div className='Display'>
//       <h2>{props.displayValue}</h2>
//     </div>
//   );
// }

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
//     <div className='Box'>
//       <h1>Tyler Instruments</h1> 
//         <Display
//           displayValue={displayValue}
//         />

//         <Buttons 
//           setOperatorValue={setOperatorValue}
//           numberPress={numberPress}
//           equalPress={equalPress}
//         />
//         {activeMemory}
//     </div>
//   );
// }

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);


