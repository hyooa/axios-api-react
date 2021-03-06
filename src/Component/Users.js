import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
    // ๐ ์ํ ๊ด๋ฆฌ (๋น๋๊ธฐ ์ ์ก) // ์๋ฌ, ๋ก๋ฉ์ค์ธ๋ฐ ํ๋ฉด์ ๊ทธ๋ ค์ฃผ๋ฉด ์๋๋๊น ๐
    // 1. ์์ฒญ์ ๊ฒฐ๊ณผ
    // 2. ๋ก๋ฉ์ํ
    // 3. ์๋ฌ
    const [ users, setUsers ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);


        const fetchUsers = async () => { // async ๊ตฌ๋ฌธ (๋น๋๊ธฐํจ์ ์์ ๋ถ์ด๊ธฐ) ํ๋ก๋ฏธ์ค๋ฅผ ํธํ๊ฒ ์ฐ๊ธฐ์ํด
            try {
                // ์์ฒญ์ด ์์ํ  ๋์๋ error์  users๋ฅผ ์ด๊ธฐํ
                setError(null);
                setUsers(null);

                // Loading์ ์์ํ์ผ๋๊น true๋ก ๋ณ๊ฒฝ
                setLoading(true);

                // ๋ฐ์ดํฐ ์กฐํ > axios.get(๊ฒฝ๋ก)
                // ์์ฒญํ ๋ฐ์ดํฐ๋ response.data ์์ ์์
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                setUsers(response.data); // data๊ฐ์ผ๋ก ๊ฒฐ๊ณผ ๋ฃ์ด์ค
            }
            catch (e) { // ์ ์ก ์ค ์๋ฌ ๋ฐ์ํ์ ๋
                setError(e); // ์๋ฌ ๋ด์์ค
            }
            setLoading(false); // ๋ก๋ฉ ๋๋ด๊ธฐ
        }


    // ๐ ์์ฒญ์ ํ ๋ฒ๋ง !! (๋ฆฌ๋ ๋๋ง ๋  ๋๋ง๋ค ์์ฒญ X)
    useEffect(() => {
        fetchUsers(); // ํธ์ถํ๊ธฐ
    }, []); // ํจ์{}๋ ๋ฐฐ์ด[] ๋ฃ์ด์ฃผ๋ฉด ํ ๋ฒ๋ง ๋์ํจ
    
    if(loading) return <h1>...๋ก๋ฉ์ค</h1>;
    if(error) return <h1>์๋ฌ๊ฐ ๋ฐ์ํ์ต๋๋ค.</h1>;
    if(!users) return null; // ๊ฒฐ๊ณผ๊ฐ ์์ผ๋ฉด

    
    return (
        <div>
            <ul>
                {users.map(user => ( // li๋ฅผ users ๋ฐฐ์ด์ ๊ธธ์ด ๋งํผ ๋ง๋ฆ
                    <li key={user.id}>
                        {user.username} ({user.name})
                    </li>
                ))}
            </ul>
            <button onClick={fetchUsers}>๋ถ๋ฌ์ค๊ธฐ</button>
        </div>
    );
};

export default Users;