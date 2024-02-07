// import React, { useEffect } from 'react';
import api from '../../API/axiosConfig';

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