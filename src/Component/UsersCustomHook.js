// 🧡 ?? ) UseAsync로 비동기 전송을 받아와서 사용

import React, {useState} from 'react'; // 💜 useState 아이디 관리위해
import axios from 'axios';
import UseAsync from './UseAsync';
import User from './User';

// 🧡 Hook 함수
async function getUsers() { // callback함수 - getUsers
    // UsersReducer에서 가져오기 (복붙)
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data; // 값은 data가 들고있음
}

const UsersCustomHook = () => {
    // 💜 추가 (클릭시 userId 바꿔줌)
    const [ userId, setUserId ] = useState(null);

    // return [ state, fetchDate ];
            // refetch ) fetchDate가 호출됨 // skip 값 true 💚
    const [state, refetch] = UseAsync(getUsers, [], true); // UseAsync ) state, dispatch 리턴 // UseAsync( callback, deps = [] )

    // UsersReducer에서 가져오기 (복붙)
    const { loading, data, error } = state;
    if(loading) return <h1>로딩중 ~</h1>;
    if(error) return <h1>에러에러 ~</h1>;
    // if(!data) return null;
    if(!data) return <button onClick={refetch}>불러오기</button>; // 💚

    return (
        <div>
            {/* UsersReducer에서 가져오기 (복붙) */}
            <ul>
                {data.map(user => ( // li를 users 배열의 길이 만큼 만듦
                    <li key={user.id} onClick={ () => setUserId(user.id) } >
                        {user.username} ({user.name})
                    </li>
                ))}
            </ul>
            <button onClick={refetch}>다시 불러오기</button>
            {/* 💜 userId 있을때만 */}
            {userId && <User id={userId} />}
        </div>
    );
};

export default UsersCustomHook;