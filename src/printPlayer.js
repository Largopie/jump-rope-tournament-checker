import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import styled from 'styled-components';

const PrintContainer = styled.div`
    @page {
    size: A4 landscape;
    margin: 0;
    }
    width: 29.7cm;
    height: 21cm;
    padding: 1cm;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
`;

const PrintSubContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const PlayerNumberBox1 = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    height:50vh;
`;

const PlayerNumberBox2 = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    height:50vh;
`;

const PlayerNumberBox3 = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    height:50vh;
`;

const PlayerNumberBox4 = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    height:50vh;
`;

const Number = styled.div`
    font-size: 160px;
`;

const Info = styled.div`
    font-size: 35px;
`;

const PrintPlayer = () => {
    const location = useLocation();
    const ref = useRef();
    const players = location.state?.players;

    const repeat = (players) => {
        const result = [];
        for (let i = 0; i < players.length; i += 4) {
            result.push(
                <div>
                    <PrintSubContainer>
                        <PlayerNumberBox1>
                            <div>
                                <Number>{players[i].cmptAttendId}</Number>
                                <Info>{players[i].eventName} / {players[i].departmentName} / {players[i].playerGender} / {players[i].playerName}</Info>
                            </div>
                        </PlayerNumberBox1>
                        <PlayerNumberBox2>
                            {i + 1 < players.length ?
                                <div>
                                    <Number>{players[i + 1].cmptAttendId}</Number>
                                    <Info>{players[i + 1].eventName} / {players[i + 1].departmentName} / {players[i + 1].playerGender} / {players[i + 1].playerName}</Info>
                                </div>
                                : <div></div>}
                        </PlayerNumberBox2>
                    </PrintSubContainer>
                    <PrintSubContainer>
                        <PlayerNumberBox3>
                            {i + 2 < players.length ?
                                <div>
                                    <Number>{players[i + 2].cmptAttendId}</Number>
                                    <Info>{players[i + 2].eventName} / {players[i + 2].departmentName} / {players[i + 2].playerGender} / {players[i + 2].playerName}</Info>
                                </div>
                                : <div></div>}
                        </PlayerNumberBox3>
                        <PlayerNumberBox4>
                            {i + 3 < players.length ?
                                <div>
                                    <Number>{players[i + 3].cmptAttendId}</Number>
                                    <Info>{players[i + 3].eventName} / {players[i + 3].departmentName} / {players[i + 3].playerGender} / {players[i + 3].playerName}</Info>
                                </div>
                                : <div></div>}
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

