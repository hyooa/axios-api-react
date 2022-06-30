import React, { useReducer, useEffect } from 'react';
import axios from 'axios';


    // 초기값
    const initialState = {
        loading : false,
        data : null,
        error : null,
    }

    function reducer(state, action) {
        switch(action.type) {
            case 'POST_ING':
            return {
                loading: true,
                data: null,
                error: null,
            }

            case 'POST_OK':
            return {
                loading: false,
                data: action.data,
                error: null,
            }

            case 'POST_ERROR':
            return {
                loading: false,
                data: null,
                error: action.error,
            }

            default:
            return state;
        }
    }

const PostReducer = () => {
    // 상태관리
    const [ state, dispatch ] = useReducer(reducer, initialState);
    const fetchPost = async () => {
        dispatch({type:'POST_ING'});
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            dispatch({type:'POST_OK', data : response.data})
         }
        catch (e) {
            dispatch({type:'POST_ERROR', error : e})
        }
    }
    

    useEffect(() => {
        fetchPost();
    }, []);

    const {loading, data, error} = state;
    if(loading) return <h1>로딩중</h1>;
    if(error) return <h1>에러에러</h1>;
    if(!data) return null;

    return (
        <div>
            <button onClick={fetchPost}>다시 불러오기</button>
            <ul>
                {data.map(post => (
                    <li key={post.id}>
                        {post.userId} ({post.title})
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default PostReducer;