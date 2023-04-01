import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { API } from '../../config';

const Container = styled.div`
    width: 100%;
    overflow: scroll;
`;

const Table = styled.table`
    font-size: 0.7em;
    border: 1px solid black;
    margin: 0 auto;
    text-align: center;
    width: 90%;
`;

const Th = styled.th`
    border: 1px solid black;
`;

const Td = styled.td`
    overflow: scroll;
    border: 1px solid black;
`;

const FindEventAll = () => {
    const location = useLocation();
    const competitionId = location.state?.competitionId;
    const columns = [ '종목번호', '종목이름', '단체여부' ];
    const [data, setData] = useState([]);
    // const dummy = [
    //     {
    //         id: 0,
    //         name: '이단뛰기',
    //         checkbox: true,
    //         participatePoint: 2,
    //         fstPoint: 10,
    //         sndPoint: 4,
    //         trdPoint: 3
    //     },
    //     {
    //         id: 1,
    //         name: '그냥뛰기',
    //         checkbox: false,
    //         participatePoint: 0,
    //         fstPoint: 10,
    //         sndPoint: 4,
    //         trdPoint: 3
    //     },
    //     {
    //         id: 2,
    //         name: '3단뛰기',
    //         checkbox: true,
    //         participatePoint: 0,
    //         fstPoint: 10,
    //         sndPoint: 4,
    //         trdPoint: 3
    //     }
    // ];


    // 종목번호, 종목이름, 진행여부, 참가점수, 1,2,3등점수
    useEffect(() => {
        axios.get(`${API.EVENT_FIND_ALL}`).then(
            (res) => setData(res.data)
        )
    },[]);

    return (
        <Container>
            <Table>
                <thead>
                    <tr>
                        {columns.map((column, idx) => (
                            <Th key={idx}>{column}</Th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map(({eventId, eventName, isGroupGame}) => (
                        <tr key={eventId}>
                            <Td>{eventId}</Td>
                            <Td>{eventName}</Td>
                            <Td>{isGroupGame ? '단체' : '개인'}</Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default FindEventAll;