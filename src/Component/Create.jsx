import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "./Create.css"

const Create = () => {
    const[val,setVal]=useState({username:"",email:"",number:""});
    const[user,setusers]=useState(null);
    const[toggle,setToggle]=useState(false);
    function handleChange(e){
        let{name,value}=e.target;
        setVal({...val,[name]:value})
    }
    function handleSubmit(e){
        e.preventDefault();
        axios.post('http://localhost:5000/user',val).then(()=>{console.log("data sent")
            setVal({username:"",email:"",number:""})
        }).catch(()=>console.log("data not sent")
        )
    }

    // getting user data
    async function getusers() {
        let {data}=await axios.get('http://localhost:5000/user')
        setusers(data)
    }
    getusers();

    function handledelete(id){
        axios.delete(`http://localhost:5000/user/${id}`).then(()=>{console.log("deleted")
            setToggle(!toggle)
        }
        ).catch(()=>console.log("cant delete")
        )
    }

  return (
    <div className='container'>
        <form action="" onSubmit={handleSubmit}>
            <div className="fields">
            <label htmlFor="username">Username</label>
            <input type="text" onChange={handleChange} name='username' value={val.username}/>
            <label htmlFor="email">Email</label>
            <input type="text" onChange={handleChange} name='email' value={val.email}/>
            <label htmlFor="number">Number</label>
            <input type="number" onChange={handleChange} name='number' value={val.number} />
            <input type='submit' value="submit"/>
            </div>
            
        </form>

        <div className="allentries">
           
        {user?.map((item,index)=>{
            if(index==0) return null;
            else
            return (
            <div>
             <fieldset>
                <table>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Number</th>
                    </tr>
                    <tr>
                        <td>{item.username}</td>
                        <td>{item.email}</td>
                        <td>{item.number}</td>
                        <td><button><Link to={`/edituser/${item.id}`}>Edit</Link></button></td>
                        <td><button onClick={()=>handledelete(item.id)}>Delete</button></td>
                    </tr>
                </table>
            </fieldset>
            </div>)
           })}
        </div>
           
       
    </div>
  )
}

export default Create