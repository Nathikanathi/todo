import { useState } from "react";
import './App.css';
function Todo(){
    const [todo,setTodo]=useState("")
    const [items,setItems]=useState([])
    const [edits,setEdits]=useState("")
    
    const addItem=()=>{
        if(edits){
            // console.log(edits)
            const update=items.find((i)=>i.id==edits);
            // console.log(update)
            const updateTodo=items.map((j)=>j.id==update.id?
            { id:j.id, title:todo}:{id:j.id, title:j.title});
            setItems(updateTodo);
            setEdits(0);
            setTodo("");
            return;
        }
        if(todo!==""){
            const num=todo.length+1;
            setItems([{id:num,title:`${todo}`,status:false},...items]);
            setTodo("");
        }
    }
    
    const complete=(select)=>{
        const mark=items.map((i)=>{
            if(i.id===select){
                return({...i,status:!i.status})
            }
            return i
        });

        setItems(mark)
    }

    const delItem=(select)=>{
        const del=items.filter((t)=>t.id!=select);
        setItems([...del]); 
    }

    const editItem=(select)=>{
        // console.log()
        const editTodo=items.find((i)=>i.id==select);
        setTodo(editTodo.title);
        setEdits(select);
    };

    return(
        <>
        <input type="text" className="main" value={todo} onChange={(e)=>setTodo(e.target.value)}/>
        <button onClick={addItem}>{edits?"edit":"add"}</button>
        <ul>
            {
                items.map((list,index)=>(
                    <li className="list">
                     <div>
                     <span>{index+1}</span>
                    <span className={list.status?"done":"change"} key={index}>{list.title}</span>
                    </div>   
                    
                    <button onClick={()=>complete(list.id)}>{list.status?"ReAdd":"complete"}</button>
                    <button onClick={()=>editItem(list.id)}>edit</button>
                    <button onClick={()=>delItem(list.id)}>Delete</button>
                </li> 
                ))
            }
        </ul>
        </>
    );
}
export default Todo;  