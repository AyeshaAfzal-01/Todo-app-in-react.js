import { useEffect, useState } from 'react'
import { FaRegEdit } from "react-icons/fa"; // react icons
import { MdDelete } from "react-icons/md";
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState(" ") // todo is our input text
  const [todos, setTodos] = useState([]) // todos is an array that holds all todos
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = JSON.parse(localStorage.getItem("todos"))
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  const saveToLocalStorage = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  

  const handleAdd = () => {
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])   //baki k jo todos hea wo tou rahe gy hi like... we are adding our current todo
     setTodo("");
     saveToLocalStorage();
  }

  const handleEdit = (e, id) => {
   let t =  todos.filter(i=>i.id===id);
   setTodo(t[0].todo)    // take the pointed item to the input box
   let newTodos = todos.filter(item=> {  // same delete function here -> we created an illusion for edit
    return item.id!==id;
   })
   setTodos(newTodos)
   saveToLocalStorage();
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item=> {
      return item.id!==id;
    })
    setTodos(newTodos)
    saveToLocalStorage();
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];  // we have to make other refrence [...] that's why we use this otherwise the refrence remain same of the newTodo array as well as todos
    newTodos[index].isCompleted = !newTodos[index].isCompleted; // toggle
    setTodos(newTodos);
    saveToLocalStorage();
  }
  

  const toggleFinished = (params) => {
    setShowFinished(!showFinished)
  }
  
  return (
    <>
    <Navbar/>
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]">
      <h1 className='font-bold text-center text-2xl'>iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-xl font-bold'>Add a Todo</h2>
          <div className="flex">
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 p-4 py-2 disabled:bg-violet-700 text-xs font-bold text-white mx-2 rounded-full'>Save</button>
          </div>
        </div>
        <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
       <div className='h-[1px] bg-black opacity-15 w-[90%] my-4 mx-auto'></div>
          <h2 className='text-xl font-bold'>Your Todos</h2>
          <div className="todos">
            {todos.length===0 && <div className='m-5'>No todos to display</div>}
            {todos.map(item => {
           return (showFinished || !item.isCompleted) && ( <div key={item.id} className="todo flex justify-between my-3">
            <div className='flex gap-5'>
            <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              {/* state todo named created  */}
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>{handleEdit(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-xs font-bold text-white rounded-md mx-1'><FaRegEdit /></button>
                <button onClick={(e) => {handleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-xs font-bold text-white rounded-md mx-1'><MdDelete /></button>
              </div>
            </div>
           )
            })}
          </div>
      </div>
    </>
  )
}

export default App
