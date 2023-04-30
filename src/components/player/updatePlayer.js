import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


const UpdatePlayer = () => {
    const location = useLocation();
    const playerId = location.state?.playerId;

    // useEffect(() => (
    //     // 선수 정보 가져오는 api
    //     axios.get(``)
    // ), []);
    console.log(playerId);
    return (
        <div>
            123
        </div>
    );
};

export default UpdatePlayer;