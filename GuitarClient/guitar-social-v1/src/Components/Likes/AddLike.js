// import React, { useEffect } from 'react';
import api from '../../API/axiosConfig';

// function AddLike(props) {
//     const postId = props.postId;
//     const userId = localStorage.getItem("userId");

//     useEffect(() => {
//         console.log(`AddLike function called`);
//         add(postId, userId);
//     }, []);

//     const add = async (thisPostId, thisUserId) => {
//         try {
//             const response = await api.post("/likes/addLike", {
//                 postId: thisPostId,
//                 userId: thisUserId
//             });
//             console.log(response.data);
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }

// export default AddLike;

export function addLikeAPI(postId){
    const addLikeAPI = async (thisPostId) => {
        try {
            const response = await api.post("/likes/addLike", {
                postId: thisPostId,
                userId: localStorage.getItem("userId")
            });
            console.log(`-----------------`);
            console.log(`PASSED | addLikeAPI`)
            console.log("response data:", response.data);
            
        } catch (error) {
            console.log(error);
        }
    }

    addLikeAPI(postId);
}