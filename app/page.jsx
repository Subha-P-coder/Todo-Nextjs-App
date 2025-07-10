"use client"
import Todo from "@/components/Todo";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {

    const [formData, setFormData] = useState({
        title:"",
        description:"",
    });

    const [todoData,setTodoData] = useState([]);

    const fetchTodo = async () => {
      const response = await axios('/api');
      setTodoData(response.data.todos);
    }

    const deleteTodo = async (id) => {
      const response = await axios.delete('/api',{
        params:{
          mongoId: id
        }
      })
      toast.success(response.data.msg);
      fetchTodo();
    }

    const completeTodo = async (id) => {
      const response = await axios.put('./api',{},{
        params:{
          mongoId:id
        }
      })
      toast.success(response.data.msg)
      fetchTodo();
    }

    useEffect(() => {
      fetchTodo();
    },[])
    
    const onchangeHandler = (e) => {
          const name = e.target.name; 
          const value = e.target.value;  
          setFormData(form => ({...form , [name]:value}));
          console.log(formData)
    }

    const onsubmitHandler = async (e) => {
      e.preventDefault();
      try{
        //api code
        const response = await axios.post('/api',formData);
        toast.success(response.data.msg)
        setFormData({
          title:"",
          description:""
        })
        await fetchTodo();
      }catch(err){
        toast.error("Error")
      }

    }
    

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-purple-700 flex flex-col ">
      <ToastContainer theme="dark"/>
      <form onSubmit={onsubmitHandler} className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto ">

        <input type="text" name="title" placeholder="Enter Title" value={formData.title} onChange={onchangeHandler}className="px-3 py-2 border-2 w-full text-white border-white mb-1" />

        <textarea name="description" placeholder="Enter Description"  value={formData.description} onChange={onchangeHandler}className="px-3 py-2 border-2 w-full text-white border-white mb-1"></textarea>

        <button type="submit " className="bg-orange-600 py-3 px-11 text-white rounded-full mt-3 mx-auto block">Add Todo</button>
      </form>


      <div className="relative overflow-x-auto mt-20 w-[50%] mx-auto sm:w-[75%] ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                        Id
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Title
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Description
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-center ">
                         Action
                      </th>
                  </tr>
              </thead>
              <tbody>
                {todoData.map((item,index)=> {
                  return <Todo key={index} id={index} title={item.title} description= {item.description} complete = {item.isCompleted} mongoId={item._id}
                  deleteTodo={deleteTodo}
                  completeTodo={completeTodo}/>
                })}
               
              </tbody>
          </table>
      </div>


     


    </div>
  );
}
