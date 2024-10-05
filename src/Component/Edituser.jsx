import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Edituser = () => {
    let { id } = useParams();
    const [user, setUser] = useState();
    let navigate = useNavigate()

    // getting user data
    useEffect(() => {
        async function getuserdata() {
            let { data } = await axios.get(`http://localhost:5000/user/${id}`)
            console.log(data);

            setUser(data)
        }
        getuserdata()
    }, [id])

    function handleChange(e) {
        let { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }
    function handleSubmit(e) {
        e.preventDefault();
        axios.put(`http://localhost:5000/user/${id}`, user).then(() => {
            console.log("data sent")
            setUser({ username: "", email: "", number: "" })
            navigate(-1)
        }).catch(() => console.log("data not sent")
        )
    }
    return (
        <div className='container'>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" onChange={handleChange} name='username' value={user?.username} />
                <label htmlFor="email">Email</label>
                <input type="text" onChange={handleChange} name='email' value={user?.email} />
                <label htmlFor="number">Number</label>
                <input type="number" onChange={handleChange} name='number' value={user?.number} />
                <input type='submit' value="submit" />
            </form>
        </div>
    )
}

export default Edituser