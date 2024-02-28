import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function Todo() {
    const [form, setForm] = useState({ title: "" });
    const [todoList, setTodoList]=useState([])
    const getTodos=async()=>{
        try {
            const response = await fetch("https://w3-assignment-b.onrender.com/api/task", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept":"/",
                    "access-token":sessionStorage.getItem("access-token")
                }
            });
    
            if (!response.status) {
                throw new Error('Failed to get todo list');
            }
    
            let data = await response.json();
            console.log("data",data[0]); 
            data= data.map(t=>{
                t.editing=false
                return t
            })
            setTodoList(data)


            // sessionStorage.setItem('token', data.token);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
    useEffect(()=>{
        console.log("first")
        getTodos()
        
    },[])

    const handleChange = (e) => {
        // console.log(form)
        const { name, value } = e.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://w3-assignment-b.onrender.com/api/task", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept":"/",
                    "access-token":sessionStorage.getItem("access-token")
                },
                body: JSON.stringify({
                    title: form.title
                })
            });
    
            if (!response.ok) {
                throw new Error('Failed to save title and description');
            }
    
            const data = await response.json();
            console.log("todolist",data); 
            getTodos()
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const deleteHandler=async (e)=>{
        const taskId=e.target.getAttribute("taskid")
        console.log(e.target)
        console.log("id: ",taskId)
        try {
            const response = await fetch(`https://w3-assignment-b.onrender.com/api/task/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept":"/",
                    "access-token":sessionStorage.getItem("access-token")
                }
            });
    
            if (!response.status) {
                throw new Error('Failed to get todo list');
            }
            getTodos()
            console.log(response); 
            // sessionStorage.setItem('token', data.token);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    const completeHandler=async (e)=>{
        try {
            // console.log(JSON.parse())
            const completed=!todoList.filter(
                t=>{
                    if(t._id===e.target.getAttribute("taskid")){
                        return t
                    }
                }
            )[0].completed
            const response = await fetch(`https://w3-assignment-b.onrender.com/api/task/${e.target.getAttribute("taskid")}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept":"/",
                    "access-token":sessionStorage.getItem("access-token")
                },
                body: JSON.stringify({
                    change:{completed}
                })
            });
    
            if (!response) {
                throw new Error('Failed to save title and description');
            }
            getTodos()
        } catch (error) {
            console.error('Error:', error.message);
        }

    }

    return (<div className='bg-gray-800 h-screen flex flex-col justify-between items-center text-white'>
    <div className="">
      {
        todoList.map(todo => {
          return (
            <div className='flex w-60 justify-between' key={todo._id}>
              <button className='w-10' onClick={completeHandler} taskid={todo._id}>
                {todo.completed ? "[_/]" : "[ ]"}
              </button>
  
              <span
                taskid={todo._id}
                className={todo.completed ? 'line-through' : ''}
              >
                {todo.title}
              </span>
  
              <button onClick={deleteHandler} taskid={todo._id}>delete</button>
            </div>
          );
        })
      }
    </div>
  
    <div className='bg-sky-600 w-min h-min p-10 mt-40'>
      <h1 className='text-white text-3xl text-center'> Add Your tasks</h1>
      <form className='bg-black flex flex-col gap-1 justify-center items-center' onSubmit={handleSubmit}>
        <div className='m-2 flex items-center'>
          <label htmlFor='title' className='text-white'>title:</label>
          <input
            type='title'
            name='title'
            value={form.title}
            onChange={handleChange}
            className='flex-grow bg-gray-200 text-black px-2 py-1 rounded-md ml-2'
          />
        </div>
  
        <button type="submit" className='w-6/12 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md'>
          Submit
        </button>
      </form>
    </div>
  </div>
     );
}
