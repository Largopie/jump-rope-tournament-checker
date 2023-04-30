import React, { useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const PrintContainer = styled.div`
    @page {
    size: A4;
    margin: 20mm;
    };
    width: 21cm;
    margin: 0 auto;
    text-align: center;
`;

const Button = styled.button`
    margin: 2px;
    width: 50px;
    height: 25px;
    font-size: 10px;
    border : 1px solid #fcf;
    background-color: #ffc;
    :hover {
    background-color: #fcf;
    };
`;

const Input = styled.input`
    font-size: 13px;
    width: 200px;
    height: 25px;
    white-space: pre;
`;

const Label = styled.label`
    font-size: 18px;
`;

const Table = styled.table`
    margin: 0 auto;
    width: 90%;
    border: 1px solid black;
    border-collapse: collapse;
    font-size: 0.8em;
    line-height: 30px;
`;

const Th = styled.th`
    border: 1px solid black;
    background-color: #ffc;
`;

const Td = styled.td`
    border: 1px solid black;
    text-align: center;
`;

const H1 = styled.h1`
    margin-bottom: 20px;
`;

const PrintOrgPlayers = () => {
    const ref = useRef();
    const location = useLocation();
    const players = location.state?.players;

    const [orgVal, setOrgVal] = useState('');

    const onChangeOrgVal = (e) => {
        setOrgVal(e.target.value);
    };

    const groupValues = players.reduce((acc, current, idx, array) => {
        acc[current.cmptAttendId] = acc[current.cmptAttendId] || [];
        acc[current.cmptAttendId].push(current.eventName);
        return acc;
    }, {});

    const mergePlayers = Object.keys(groupValues).map((key) => {
        let index = players.find(player => player.cmptAttendId === key);
        return {
            cmptAttendId: key,
            organizationName: index.organizationName,
            playerAffiliation: index.playerAffiliation,
            playerName: index.playerName,
            playerGender: index.playerGender,
            eventName: groupValues[key]
        };
    });

    // console.log(mergePlayers);

    return (
        <div>
            <Label htmlFor="orgVal">소속 입력</Label>
            <Input id="orgVal" type="text" value={orgVal} onChange={onChangeOrgVal} />
            <ReactToPrint
                trigger={() => <Button>Print</Button>}
                content={() => ref.current}
            />
            <PrintContainer ref={ref} >
                <H1>{orgVal === "" ? "단체를 '정확히' 입력하세요" : orgVal}</H1>
                <Table >
                    <thead>
                        <tr>
                            <Th>선수번호</Th>
                            <Th>소속명</Th>
                            <Th>단체명</Th>
                            <Th>이름</Th>
                            <Th>성별</Th>
                            <Th>참가종목</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {mergePlayers.filter((item) => String(item.organizationName).includes(orgVal))
                            .map(({ cmptAttendId, eventAttendId, playerAffiliation, organizationName, playerName, playerGender, playerBirth, playerTel, eventName, grade, score }) => (
                                <tr key={cmptAttendId + eventAttendId + playerName}>
                                    <Td>{cmptAttendId}</Td>
                                    <Td>{organizationName}</Td>
                                    <Td>{playerAffiliation}</Td>
                                    <Td>{playerName}</Td>
                                    <Td>{playerGender}</Td>
                                    <Td>{eventName.map(((item) => (item+"/")))}</Td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </PrintContainer>
        </div>
    );
};

export default PrintOrgPlayers;