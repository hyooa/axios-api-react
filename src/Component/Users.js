import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
    // 💚 상태 관리 (비동기 전송) // 에러, 로딩중인데 화면에 그려주면 안되니까 💚
    // 1. 요청의 결과
    // 2. 로딩상태
    // 3. 에러
    const [ users, setUsers ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);


        const fetchUsers = async () => { // async 구문 (비동기함수 앞에 붙이기) 프로미스를 편하게 쓰기위해
            try {
                // 요청이 시작할 때에는 error와  users를 초기화
                setError(null);
                setUsers(null);

                // Loading은 시작했으니까 true로 변경
                setLoading(true);

                // 데이터 조회 > axios.get(경로)
                // 요청한 데이터는 response.data 안에 있음
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                setUsers(response.data); // data값으로 결과 넣어줌
            }
            catch (e) { // 전송 중 에러 발생했을 떄
                setError(e); // 에러 담아줌
            }
            setLoading(false); // 로딩 끝내기
        }


    // 💚 요청은 한 번만 !! (리렌더링 될 때마다 요청 X)
    useEffect(() => {
        fetchUsers(); // 호출하기
    }, []); // 함수{}랑 배열[] 넣어주면 한 번만 동작함
    
    if(loading) return <h1>...로딩중</h1>;
    if(error) return <h1>에러가 발생했습니다.</h1>;
    if(!users) return null; // 결과가 없으면

    
    return (
        <div>
            <ul>
                {users.map(user => ( // li를 users 배열의 길이 만큼 만듦
                    <li key={user.id}>
                        {user.username} ({user.name})
                    </li>
                ))}
            </ul>
            <button onClick={fetchUsers}>불러오기</button>
        </div>
    );
};

export default Users;