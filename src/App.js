import React, { useState, useRef } from 'react';
import './App.css';
import entery from './audio/entery.wav';
import shuffles from './audio/shuffles.mp3';

const App = () => {
  const entery1 = new Audio(entery);
  const shuffles1 = new Audio(shuffles);
  const draggingItem = useRef();
  const dragOverItem = useRef();

  const [list, setList] = useState([
    'Wake up',
    'Take bath',
    'Learn reactjs',
    'Take a break',
    'Read a book',
    "Have lunch",
    "Learn new skills",
    "Play some game",

  ]);

  // function to handle actions when drag starts 
  const handleDragStart = (e, position) => {
    draggingItem.current = position;
    //display the contents of child dragged or dragging item
    console.log(e.target.innerHTML);
    shuffles1.play();
  };

  // function to handle actions when item dragged on any other item
  const handleDragEnter = (e, position) => {
    dragOverItem.current = position;
  
    //displays the contents of child over which dragged or draggover item
    console.log(e.target.innerHTML);
    entery1.play();
  
    //code to update the positions of the lists
    const listCopy = [...list];
    //on the console index of the child getting dragged and child over which dragged is displayed
    console.log(draggingItem.current, dragOverItem.current);
    const draggingItemContent = listCopy[draggingItem.current];
    listCopy.splice(draggingItem.current, 1);
    listCopy.splice(dragOverItem.current, 0, draggingItemContent);
  
    //here we are changing the current state of the dragging item to dragover item
    draggingItem.current = dragOverItem.current;
    dragOverItem.current = null;
    setList(listCopy);

  };

  return (
    <>
      <div className="header" >DRAGGABLE LIST APP</div>
      <div className="main-content">
        <div className="main-task">
          <div className="heading2">List Items</div>
          <div className="content-box">
            {
              list &&
              list.map((item, index) => (


                <div
                  className="task-header"
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDragEnter={(e) => handleDragEnter(e, index)}

                  key={index}
                  draggable>
                  <div className="numberCircle">  
                  {index}</div>
                  {item}
                </div>

              ))}
          </div>

        </div>
      </div>



    </>
  );
};
export default App;
