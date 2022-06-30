import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Post = () => {
    // 💚 상태관리
    // 1. 요청의 결과
    // 2. 로딩상태
    // 3. 에러
    const [ posts, setPosts ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const fetchPost = async () => {
        try { // 요청 시작
            setLoading(true);
            setError(null);
            setPosts(null);

            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setPosts(response.data);
        }
        catch (e) { // 에러
            setError(e);
        }
        setLoading(false);
    }

    // 💚 요청은 한 번만 !!
    useEffect(() => {
        fetchPost();
    }, [])

    if(loading) return <h1>로딩중</h1>;
    if(error) return <h1>에러 발생</h1>;
    if(!posts) return null;

    return (
        <div>
            <button onClick={fetchPost}>다시 불러오기</button>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        {post.userId} ({post.title})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Post;