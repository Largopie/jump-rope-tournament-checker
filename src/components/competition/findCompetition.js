
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
`;

const SearchContainer = styled.div`
    margin: 15px 0px 15px 15px;
`;

const Search = styled.input`
    margin-left: 15px;
`;

const Table = styled.table`
    font-size: 0.7em;
    border: 1px solid black;
    margin: 0 auto;
    text-align: center;
`;

const Th = styled.th`
    border: 1px solid black;
`;

const Td = styled.td`
    overflow: scroll;
    border: 1px solid black;
`;

const FindCompetition = () => {

    const a = [
        {competitionId: Number("1"),
        competitionName: "전국체전",
        recordingSheetName: "string",
        competitionHost: "string",
        hostEmail: "song990320@dongyang.ac.kr",
        hostTel: "0101010101",
        competitionStartDate: "2023-03-16T06:34:12.592Z",
        competitionEndDate: "2023-03-16T06:34:12.592Z"},
        {competitionId: Number("2"),
        competitionName: "국내대회",
        recordingSheetName: "string",
        competitionHost: "string",
        hostEmail: "abc@123.com",
        hostTel: "0101010101",
        competitionStartDate: "2023-03-16T06:34:12.592Z",
        competitionEndDate: "2023-03-16T06:34:12.592Z"},
    ];

    const columns = ['대회ID', '대회이름', '기록지명', '개최자명', '개최자이메일', '개최자전화번호', '대회시작날짜', '대회종료날짜'];

    const [val, setVal] = useState('');
    const [opt, setOpt] = useState('competitionId');

    const setValHandler = (e) => {
        setVal(e.target.value);
    };

    const setOptHandler = (e) => {
        setOpt(e.target.value);
    };

    return (
        <Container>
            <SearchContainer>
                <label htmlFor="search">대회 검색</label>
                <Search onChange={setValHandler} name="search" id="search" />
                
                <select name="searchOption" onChange={setOptHandler}>
                    <option value="">분류 선택</option>
                    <option value="competitionId">대회 ID</option>
                    <option value="competitionName">대회이름</option>
                    <option value="recordingSheetName">기록지명</option>
                    <option value="competitionHost">개최자명</option>
                    <option value="hostEmail">개최자이메일</option>
                    <option value="hostTel">개최자전화번호</option>
                </select>
            </SearchContainer>
            <Table>
                <thead>
                    <tr>
                        {columns.map((column, idx) => (
                            <Th key={idx}>{column}</Th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {a.filter(item => item.competitionName.includes(val))
                    .map(({ competitionId, competitionName, recordingSheetName, competitionHost, hostEmail, hostTel, competitionStartDate, competitionEndDate }) => (
                        <tr key={competitionId}>
                            <Td>{competitionId}</Td>
                            <Td>{competitionName}</Td>
                            <Td>{recordingSheetName}</Td>
                            <Td>{competitionHost}</Td>
                            <Td>{hostEmail}</Td>
                            <Td>{hostTel}</Td>
                            <Td>{competitionStartDate}</Td>
                            <Td>{competitionEndDate}</Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default FindCompetition;