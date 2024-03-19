import React, { useState } from "react";

const Item = (props) => {
const [change , setChange] = useState('');

  const changeFunc=(event)=>{
    // event.preventDefault();
      setChange(event.target.value);
      console.log(event.target.value);
  }

  return (
    // text field
    <div className="flex justify-center mt-5 items-center">
      <div className="w-4/12 h-10 flex gap-2">
        <div className="w-4/5 h-10 bg-gray-600 rounded-md text-md text-white flex items-center p-3 cursor-pointer hover:bg-gray-700 ">
          {props.text}
        </div>

         
        <div className="flex justify-center items-center bg-gray-400 rounded-md  h-10 p-3 text-white  hover:bg-orange-600 cursor-pointer" onClick={()=>{
          props.updatItem(props.id)
        }}>
          update
        </div>

      <div className="flex justify-center items-center bg-gray-400 rounded-md  h-10 p-3  text-black "> <select onChange={changeFunc}  name="status" value={change}>
        <option value="pending">PendingTask</option>
        <option value="active"> ActiveTask</option>
        <option value="completed"> CompletedTask</option>
        <option value="deleted"> DeletedTask</option>
        </select></div>
        {/* <button onClick={getData}>submit</button> */}


        <div
          className="w-1/5 h-10 bg-gray-600 rounded-md text-lg text-white flex justify-center items-center hover:bg-red-500 cursor-pointer"
          onClick={()=>{
            props.deleteItem(props.id);
          }}>Delete</div>
      </div>

      {/* <div className="h-40 w-40 p-6 bg-gray-500 rounded-lg"  >
        <p>{props.name}</p>
      </div> */}
    </div>
  );
};

export default Item;
