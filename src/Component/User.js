import React from 'react';
import axios from 'axios';
import UseAsync from './UseAsync';

async function getUser(id) {
    const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
    );
    return response.data;
}

const User = ( { id } ) => {
    // UsersCustomHook 에서 가져오기(복붙)
    const [state] = UseAsync(() => getUser(id), [id]); // id 바뀔 때마다 재호출
    const { loading, data, error } = state;
    if(loading) return <h1>로딩중 ~</h1>;
    if(error) return <h1>에러에러 ~</h1>;
    if(!data) return null;

    return (
        <div>
            <h2>{data.username}</h2>
            <p>
                Email : {data.email}
            </p>
        </div>
    );
};

export default User;