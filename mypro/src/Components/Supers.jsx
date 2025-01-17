import React, { useState, useEffect } from "react";
import Item from "./Item";
import { UserButton } from "@clerk/clerk-react";

const TodoList = ({ supabase }) => {
  const [todoItems, setTodoItems] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [doneArr, setDoneArr] = useState([]);

  //   this is the code for fetching the data from database for the first time;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await supabase.from("todoList").select("*");
        console.log(data);
        setTodoItems(data ?? []);
      } catch (error) {
        console.log("the error is : ", error);
      }
    };
    fetchData();
  }, [refresh]);

  const changeStatus = async (id, newStatus) => {
    try {
      await supabase
        .from("todoList")
        .update({ sample: newStatus })
        .eq("id", id);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log("an error occured ", error);
    }
  };

  useEffect(() => {
    const taskDone = async () => {
      try {
        const { data } = await supabase
          .from("todoList")
          .select("text")
          .eq("status", 1);

        console.log("the data is for task done :", data);
        setDoneArr(data ?? []);
        console.log(doneArr);
      } catch (error) {
        console.log(error);
      }
    };
    taskDone();
  }, []);

  //   code for the post  request to add a new item in the list

  const postData = async () => {
    const text = prompt("enter your data");
    try {
      const { data } = await supabase
        .from("todoList")
        .insert([{ text }])
        .then((data, error) => {
          if (data) {
            setRefresh((prev) => !prev);
          } else {
            console.log("an error occured !", error);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  // code for deleting the todo Items

  const deleteItem = async (d_id) => {
    try {
      const {} = await supabase
        .from("todoList")
        .delete()
        .eq("id", d_id)

        .then((data, error) => {
          if (data) {
            setRefresh((prev) => !prev);
          } else {
            console.log("error ", error);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  //   code for updating the todoItem

  const updateItem = async (d_id) => {
    const { data: preData, error } = await supabase
      .from("todoList")
      .select("text")
      .eq("id", d_id)
      .single();

    if (error) {
      throw error;
    }

    try {
      const newText = prompt("enter your data ", preData.text);
      const { data, error } = await supabase
        .from("todoList")
        .update({ text: newText })
        .eq("id", d_id);

      if (!error) {
        setRefresh((prev) => !prev);
      }
    } catch (error) {
      console.log("an error occured ", error);
    }
  };

  return (
    <div className="mx-80">
      <div className=" flex justify-center  mt-10">
        <div className="w-full h-10 bg-purple-600 text-white flex justify-between items-center font-semibold  ring-2 ring-gray-500 ring-offset-4 ring-offset-blue-100/50 rounded-md p-6">
          <UserButton />
          <span className="font-sans font-semibold text-lg">ToDo List : </span>
          <span className="text-3xl cursor-pointer" onClick={postData}>
            {" "}
            +{" "}
          </span>
        </div>
      </div>


      {[...todoItems].reverse().map((item, index) => (
        // console.log("the item name is : ",index),
        <Item
          key={index}
          text={item.text}
          deleteItem={deleteItem}
          id={item.id}
          updatItem={updateItem}
          name={item.sample}
          changeStatus={changeStatus}
        />
      ))}
      <h3 className="flex justify-center py-10">Completed Lists : </h3>

      {doneArr.map((item) => {
        <Item text={item.text} />;
      })}
    </div>
  );
};

export default TodoList;
