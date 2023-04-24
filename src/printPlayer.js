import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import styled from 'styled-components';
import { API } from './config';
import axios from 'axios';

const PrintContainer = styled.div`
    @page {
    size: A4 landscape;
    margin: 0;
    }
    width: 29.7cm;
    height: 21cm;
    /* padding: 1cm; */
    margin: 0 auto;
`;

const PrintSubContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const PlayerNumberBox = styled.div`
    width: 29.7cm / 2;
    height: 21cm / 2;
`;

const PlayerNumberBox1 = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 14.85cm;
    height: 10.5cm;
`;

const PlayerNumberBox2 = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 14.85cm;
    height: 10.5cm;
`;

const PlayerNumberBox3 = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 14.85cm;
    height: 10.5cm;
`;

const PlayerNumberBox4 = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 14.85cm;
    height: 10.5cm;
`;

const Number = styled.div`
    font-size: 160px;
`;

const Org = styled.div`
    font-size: 50px;
    margin-bottom: 20px;
`;

const Info = styled.div`
    font-size: 35px;
`;

const PrintPlayer = () => {
    const [players, setPlayers] = useState([]);
    const location = useLocation();
    const ref = useRef();
    const cmptId = location.state?.cmptId;


    useEffect(() => {
        axios.get(`${API.ATTEND_NUMBERTAGS}/${cmptId}`).then((res) => setPlayers(res.data));
    },[cmptId])
    const repeat = (players) => {
        const result = [];
        for (let i = 0; i < players.length; i += 4) {
            result.push(
                <div>
                    <PrintSubContainer>
                        <PlayerNumberBox1>
                            <div>
                                <Number>{players[i].seperatedCmptAttendId}</Number>
                                <Org>{players[i].orgName}</Org>
                                <Info> {players[i].playerName} / {players[i].playerGender} / {players[i].departName}</Info>
                            </div>
                        </PlayerNumberBox1>
                        <PlayerNumberBox2>
                            {i + 1 < players.length ?
                                <div>
                                    <Number>{players[i + 1].seperatedCmptAttendId}</Number>
                                    <Org>{players[i + 1].orgName}</Org>
                                    <Info>{players[i + 1].playerName} / {players[i + 1].playerGender} / {players[i + 1].departName}</Info>
                                </div>
                                : 
                                <div>
                                </div>}
                        </PlayerNumberBox2>
                    </PrintSubContainer>
                    <PrintSubContainer>
                        <PlayerNumberBox3>
                            {i + 2 < players.length ?
                                <div>
                                    <Number>{players[i + 2].seperatedCmptAttendId}</Number>
                                    <Org>{players[i + 2].orgName}</Org>
                                    <Info>{players[i + 2].playerName} / {players[i + 2].playerGender} / {players[i + 2].departName}</Info>
                                </div>
                                :
                                <div>
                                </div>}
                        </PlayerNumberBox3>
                        <PlayerNumberBox4>
                            {i + 3 < players.length ?
                                <div>
                                    <Number>{players[i + 3].seperatedCmptAttendId}</Number>
                                    <Org>{players[i + 3].orgName}</Org>
                                    <Info>{players[i + 3].playerName} / {players[i + 3].playerGender} / {players[i + 3].orgName} / {players[i + 3].departName}</Info>
                                </div>
                                : 
                                <div>
                                </div>}
                        </PlayerNumberBox4>
                    </PrintSubContainer>
                </div>
            );
        };
        return result;
    };


    // console.log(players);
    return (
        <div>
            <ReactToPrint
                trigger={() => <button>Print</button>}
                content={() => ref.current}
            />
            <PrintContainer ref={ref}>
                {/* {players.map(({cmptAttendId, eventAttendId, eventName, departmentName, playerGender, playerName}) => (
                    <div>
                        <PrintSubContainer>
                            <PlayerNumberBox1>
                                <Number>{cmptAttendId} - {eventAttendId}</Number>
                                <Info>{eventName} / {departmentName} / {playerGender} / {playerName}</Info>
                            </PlayerNumberBox1>
                            <PlayerNumberBox2>
                                <Number>{cmptAttendId} - {eventAttendId}</Number>
                                <Info>{eventName} / {departmentName} / {playerGender} / {playerName}</Info>
                            </PlayerNumberBox2>
                        </PrintSubContainer>
                        <PrintSubContainer>
                            <PlayerNumberBox3>
                                <Number>{cmptAttendId} - {eventAttendId}</Number>
                                <Info>{eventName} / {departmentName} / {playerGender} / {playerName}</Info>
                            </PlayerNumberBox3>
                            <PlayerNumberBox4>
                                <Number>{cmptAttendId} - {eventAttendId}</Number>
                                <Info>{eventName} / {departmentName} / {playerGender} / {playerName}</Info>
                            </PlayerNumberBox4>
                        </PrintSubContainer>
                    </div>
                ))} */}
                {repeat(players)}
            </PrintContainer>
        </div>
    );
};

export default PrintPlayer;

