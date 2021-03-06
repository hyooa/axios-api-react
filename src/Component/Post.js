import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Post = () => {
    // π μνκ΄λ¦¬
    // 1. μμ²­μ κ²°κ³Ό
    // 2. λ‘λ©μν
    // 3. μλ¬
    const [ posts, setPosts ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const fetchPost = async () => {
        try { // μμ²­ μμ
            setLoading(true);
            setError(null);
            setPosts(null);

            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setPosts(response.data);
        }
        catch (e) { // μλ¬
            setError(e);
        }
        setLoading(false);
    }

    // π μμ²­μ ν λ²λ§ !!
    useEffect(() => {
        fetchPost();
    }, [])

    if(loading) return <h1>λ‘λ©μ€</h1>;
    if(error) return <h1>μλ¬ λ°μ</h1>;
    if(!posts) return null;

    return (
        <div>
            <button onClick={fetchPost}>λ€μ λΆλ¬μ€κΈ°</button>
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