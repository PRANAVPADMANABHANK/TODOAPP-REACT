import React from "react";
import "./Todo.css";
import { useState, useRef, useEffect } from "react";
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

function Todo() {
  const [todo, setTodo] = useState("");//todo is the input field
  const [todos, setTodos] = useState([]);
  const [editId, setEditID] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  ///old code///

  // const addTodo = () => {
  //  if(todo !== ""){
  //   setTodos([...todos,{list: todo, id : Date.now(), status:false}]);
  //   console.log(todos); // here todos is the array. so that values should map here.
  //   setTodo("");
  //  }
  //  if(editId){
  //   const editTodo = todos.find((todo)=>todo.id === editId)
  //   const updateTodo = todos.map((to)=>to.id === editTodo.id
  //   ?(to = {id : to.id , list : todo})
  //   :(to = {id : to.id , list : to.list}))
  //   setTodos(updateTodo)
  //   setEditID(0);
  //   setTodo('')
  //  }
  // };

  ///old code///

  //updated code////

  const addTodo = () => {
    if (todo !== "") {
      if (editId) {
        const updatedTodos = todos.map((to) =>
          to.id === editId ? { ...to, list: todo } : to
        );
        setTodos(updatedTodos);
        setEditID(0);
      } else {
        setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
      }
      setTodo("");
    }
  };
  
  //updated code////

  const inputRef = useRef("null");

  useEffect(() => {
    inputRef.current.focus();
  });

  const onDelete = (id) =>{
    setTodos(todos.filter((to)=>to.id !== id))
  }
  const onComplete = (id) =>{
    let complete = todos.map((list)=>{
        if(list.id === id){
            return({...list , status : !list.status})
        }
        return list
    })
    setTodos(complete)
  }

  const onEdit = (id) =>{
    const editTodo = todos.find((to)=>to.id === id)
    console.log(editTodo.list, "edit id") 
    setTodo(editTodo.list)
    setEditID(editTodo.id)
    console.log(editTodo)
  }

  return (
    <div className="container">
      <h2>TODO APP</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          ref={inputRef}
          placeholder="Enter your todo"
          className="form-control"
          onChange={(event) => setTodo(event.target.value)}
        />
        <button onClick={addTodo}>{editId ? 'EDIT':'ADD'}</button>
      </form>
      <div className="list">
        <ul>
          {todos.map((to, index) => (
            <li className="list-items" key={index}>
              <div className="list-item-list" id= {to.status ? "list-item":""}>{to.list}</div>
              <span>
                <IoMdDoneAll
                  className="list-item-icons"
                  id="complete"
                  title="Complete"
                  onClick={()=>onComplete(to.id)}
                />
                <FiEdit className="list-item-icons" id="edit" title="Edit" 
                onClick={()=>onEdit(to.id)} />
                <MdDelete
                  className="list-item-icons"
                  id="delete"
                  title="Delete"
                  onClick={()=>onDelete(to.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
