import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

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

const FindEvent = () => {
    const [isChecked, setIsChecked] = useState(false);
    const location = useLocation();
    const competitionId = location.state?.competitionId
    const columns = [ '진행여부', '종목번호', '종목이름', '참가점수', '1등점수', '2등점수', '3등점수'];
    

    const dummy = [
        {
            id: 0,
            name: '이단뛰기',
            checkbox: true,
            participatePoint: 2,
            fstPoint: 10,
            sndPoint: 4,
            trdPoint: 3
        },
        {
            id: 1,
            name: '그냥뛰기',
            checkbox: false,
            participatePoint: 0,
            fstPoint: 10,
            sndPoint: 4,
            trdPoint: 3
        },
        {
            id: 2,
            name: '3단뛰기',
            checkbox: true,
            participatePoint: 0,
            fstPoint: 10,
            sndPoint: 4,
            trdPoint: 3
        }
    ];

    // 종목번호, 종목이름, 진행여부, 참가점수, 1,2,3등점수
    useEffect(() => {
        // competitionId를 이용하여 조회
    });

    return (
        <Container>
            <Table>
                <thead>
                    <tr>
                        {columns.map((column, idx) => (
                            <Th key={idx}>{column}</Th>
                        ))}
                        <Th>삭제여부</Th>
                    </tr>
                </thead>
                <tbody>
                    {dummy.map(({id, name, checkbox, participatePoint, fstPoint, sndPoint, trdPoint}) => (
                        <tr key={id}>
                            <Td><input type="checkbox" checked={checkbox} /></Td>
                            <Td>{id}</Td>
                            <Td>{name}</Td>
                            <Td>{participatePoint}</Td>
                            <Td>{fstPoint}</Td>
                            <Td>{sndPoint}</Td>
                            <Td>{trdPoint}</Td>
                            <Td><button value={competitionId} >삭제</button></Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default FindEvent;