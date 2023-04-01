
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { API } from '../../config';

const Container = styled.div`
    width: 100%;
    overflow: scroll;
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
    width: 90%;
`;

const Th = styled.th`
    border: 1px solid black;
`;

const Td = styled.td`
    overflow: scroll;
    border: 1px solid black;
`;

const A = styled.a`
    :hover {
        cursor: hand;
    };
    text-decoration: none;
`;


const StyledLink = styled(Link)`
    text-decoration: none;
    color: #1abc9c;
    :hover {
        color: #f1c40f;
    };
`;

const FindCompetition = () => {
    const columns = ['참가단체신청', '대회이름', '기록지명', '개최자명', '개최자이메일', '개최자전화번호', '대회시작날짜', '대회종료날짜'];

    const dummy = [
        {
            competitionId: 0,
            competitionName: '동작구대회',
            recordingSheetName: '동작구대회',
            competitionHost: '김아무개',
            hostEmail: 'a123@naver.com',
            hostTel: '01023431234',
            competitionStartDate: '20230314',
            competitionEndDate: '20230315'
        },
        {
            competitionId: 1,
            competitionName: '강남구대회',
            recordingSheetName: '강남구대회',
            competitionHost: '박아무개',
            hostEmail: 'b123@naver.com',
            hostTel: '01013431234',
            competitionStartDate: '20230314',
            competitionEndDate: '20230315'
        },
        {
            competitionId: 2,
            competitionName: '구로구대회',
            recordingSheetName: '구로구대회',
            competitionHost: '임아무개',
            hostEmail: 'c123@naver.com',
            hostTel: '01012341234',
            competitionStartDate: '20230314',
            competitionEndDate: '20230315'
        },
    ];

    const [data, setData] = useState([]);
    const [val, setVal] = useState('');
    const [opt, setOpt] = useState('competitionId');
    const [deleteResponse, setDeleteResponse] = useState(false);
    const setValHandler = (e) => {
        setVal(e.target.value);
    };

    const doDelete = (e) => {
        console.log([Number(e.target.value)]);
        if(window.confirm("정말 삭제하시겠습니까?")) {
            axios.delete(`${API.COMPETITION_DELETE}`,{
                data: [
                    e.target.value
                ]
            }).then((res) => setDeleteResponse((state) => !state));
        } else {
            alert('취소 되었습니다.');
        }
        
    };

    const setOptHandler = (e) => {
        setOpt(e.target.value);
    };

    const findID = (e) => {
        axios.get(`${API.COMPETITION_FIND}/${e.target.innerText}`).then(
            (res) => console.log(res.data)
        );
        
    };

    const setEvent = (e) => {
        console.log(e.target.id);
    };

    useEffect(() => {
        axios.get(`${API.COMPETITION_FIND_ALL}`).then(
            (res) => setData(res.data)
        );
    }, [deleteResponse]);

    return (
        <Container>
            <SearchContainer>
                <label htmlFor="search">대회 검색</label>
                <Search onChange={setValHandler} name="search" id="search" />
                
                <select name="searchOption" onChange={setOptHandler}>
                    <option value="">분류 선택</option>
                    <option value="competitionId">대회번호</option>
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
                        <Th>삭제여부</Th>
                    </tr>
                </thead>
                <tbody>
                    {dummy.filter(item => String(item[opt]).includes(val) )
                    .map(({ competitionId, competitionName, recordingSheetName, competitionHost, hostEmail, hostTel, competitionStartDate, competitionEndDate }) => (
                        <tr key={competitionId}>
                            <Td><button>신청</button></Td>
                            <Td><StyledLink to="/event/find" state={{competitionId: competitionId}}>{competitionName}</StyledLink></Td>
                            <Td>{recordingSheetName}</Td>
                            <Td>{competitionHost}</Td>
                            <Td>{hostEmail}</Td>
                            <Td>{hostTel}</Td>
                            <Td>{competitionStartDate}</Td>
                            <Td>{competitionEndDate}</Td>
                            <Td><button value={competitionId} onClick={doDelete}>삭제</button></Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default FindCompetition;