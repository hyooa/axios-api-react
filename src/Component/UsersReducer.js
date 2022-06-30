import React, { useReducer, useEffect } from 'react';
import axios from 'axios';

// 💚 초기값, reducer함수 생성
// 초기값 - loading, data, error 관리해줄 객체 만들기
const initialState = {
    loading : false,
    data : null,
    error : null,
}
// reducer함수
function reducer(state, action) {
    switch(action.type) {
        case 'LOADING':
        return {
            loading : true,
            data : null,
            error : null,
        };

        case 'SUCCESS':
        return {
            loading : false,
            data : action.data,
            error : null,
        };

        case 'ERROR':
        return {
            loading : false,
            data : null,
            error : action.error,
        };

        default :
        return state;
    }
}

const UsersReducer = () => {
    // useReducer ) 하나의 상태를 관리
    const [ state, dispatch ] = useReducer(reducer, initialState); // reducer, 초기값
    const fetchUsers = async () => {

        dispatch({ type : 'LOADING' });
        try { // 비동기 전송 성공했을 때
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            dispatch({ type : 'SUCCESS' , data : response.data })
        }

        catch(e) { // 에러 발생 했을 때
            dispatch({ type : 'ERROR' , error : e })
        }
    }

    // 요청은 한 번만 !!
    useEffect(() => {
        fetchUsers(); // 호출하기
    }, []);

    // 구조분해할당으로 가져오기
    const { loading, data, error } = state;
    if(loading) return <h1>로딩중 ~</h1>;
    if(error) return <h1>에러에러 ~</h1>;
    if(!data) return null;

    return (
        <div>
            <ul>
                {data.map(user => ( // li를 users 배열의 길이 만큼 만듦
                    <li key={user.id}>
                        {user.username} ({user.name})
                    </li>
                ))}
            </ul>
            <button onClick={fetchUsers}>클릭</button>
        </div>
    );
};

export default UsersReducer;