import { useReducer, useEffect } from 'react';

// UsersReducer에서 가져오기 (복붙)
const initialState = { // 초기값
    loading : false,
    data : null,
    error : null,
}

// UsersReducer에서 가져오기 (복붙)
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

function UseAsync( callback, deps = [], skip = false ) { // 함수 전달받기, 초기값 빈배열, 버튼 누르면 실행 💚
    const [ state, dispatch ] = useReducer(reducer, initialState) // 함수, 초기값
    const fetchDate = async () => { // 🧡 비동기 함수
        dispatch({ type : "LOADING" });
        try { // data 에 axios.get(주소), 주소 담겨있음
            const data = await callback(); // callback은 다양하게 변경가능 // callback()에 getUsers 담겨있음
            dispatch({ type : "SUCCESS", data : data });
        }
        catch (e) {
            dispatch({ type : "ERROR" , error : e })
        }
    }
    useEffect(() => {
        if(skip) return; // 💚 skip이 true일때 return // fetchDate() 실행안됨

        fetchDate();

        // 🧡 다음 줄에서만 eslint 설정(노란줄)을 비활성화
        // eslint-disable-next-line
    }, deps)
    return [ state, fetchDate ]; // fetchDate 재 요청가능, ex ) 버튼 누르기
}

export default UseAsync; // 어디서든 사용하게 내보내기