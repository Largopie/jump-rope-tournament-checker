
import axios from 'axios';
import React, { useEffect, useState } from 'react';
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

const FindOrganization = () => {
    const columns = ['단체번호', '단체이름', '이메일', '전화번호', '리더명', '리더전화번호'];

    const [data, setData] = useState([]);
    const [val, setVal] = useState('');
    const [opt, setOpt] = useState('orgId');
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
        axios.get(`${API.ORGANIZATION_FIND}/${e.target.innerText}`).then(
            (res) => console.log(res.data)
        );
        
    };

    useEffect(() => {
        axios.get(`${API.ORGANIZATION_FIND_ALL}`).then(
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
                    <option value="orgId">단체번호</option>
                    <option value="orgName">단체이름</option>
                    <option value="orgEmail">이메일</option>
                    <option value="orgTel">전화번호</option>
                    <option value="orgLeaderName">리더명</option>
                    <option value="leaderTel">리더전화번호</option>
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
                    {data.filter(item => String(item[opt]).includes(val) )
                    .map(({ orgId, orgName, orgEmail, orgTel, orgLeaderName, leaderTel}) => (
                        <tr key={orgId}>
                            <Td><A onClick={findID}>{orgId}</A></Td>
                            <Td>{orgName}</Td>
                            <Td>{orgEmail}</Td>
                            <Td>{orgTel}</Td>
                            <Td>{orgLeaderName}</Td>
                            <Td>{leaderTel}</Td>
                            <Td><button value={orgId} onClick={doDelete}>삭제</button></Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default FindOrganization;