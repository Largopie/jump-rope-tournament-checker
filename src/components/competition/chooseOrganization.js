
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { API } from '../../config';
import AddPlayer from '../player/addPlayer';

const Container = styled.div`
    width: 100%;
    overflow: scroll;
`;

const ModalContainer = styled.div`
    width: 800px;
    height: 600px;
    
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

const Form = styled.form`
    box-shadow: 0 0 0 1px black inset;
`;

const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const TitleContent = styled.div`
    margin: 0 auto;
`;

const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const CSVInput = styled.label`
    padding: 4px 15px;
    background-color: #FF6600;
    border-radius: 4px;
    color: white;
    cursor: pointer;
`;

const Input = styled.input`
    outline: none;
`;

const ChooseOrganization = () => {
    const location = useLocation();
    const competitionId = location.state?.competitionId;
    const orgColumns = ['신청하기', '단체번호','단체이름', '이메일', '전화번호', '리더명', '리더전화번호'];
    const orgPlyaerColumns = ['단체이름', '선수번호', '선수이름', '성별', '생년월일', '전화번호'];
    // const orgDummy = [
    //     {
    //         orgId: 1,
    //         orgName: 'Organ',
    //         orgEmail: 'nnheo@example.com',
    //         orgTel: '010-1234-5678',
    //         orgLeaderName: '최초원',
    //         leaderTel: '010-1234-1234',
    //     },
    //     {
    //         orgId: 2,
    //         orgName: '최초원',
    //         orgEmail: 'nnheo@example.com',
    //         orgTel: '010-1234-5678',
    //         orgLeaderName: '최초원',
    //         leaderTel: '010-1234-1234',
    //     }
    // ];

    // const playerDummy = [
    //     {
    //         organizationName: 'Organ',
    //         playerId: 1,
    //         playerName: '최초원',
    //         playerGender: '남자',
    //         playerAge: 20,
    //         playerTel: '010-1234-5678',
    //     },
    //     {
    //         organizationName: 'Organ',
    //         playerId: 2,
    //         playerName: '최초원',
    //         playerGender: '남자',
    //         playerAge: 20,
    //         playerTel: '010-1234-5678',
    //     },
    //     {
    //         organizationName: 'Organ',
    //         playerId: 3,
    //         playerName: '최초원',
    //         playerGender: '남자',
    //         playerAge: 20,
    //         playerTel: '010-1234-5678',
    //     }
    // ];



    const [data, setData] = useState([]);
    const [playerData, setPlayerData] = useState([]);
    const [val, setVal] = useState('');
    const [opt, setOpt] = useState('orgId');
    const [deleteResponse, setDeleteResponse] = useState(false);
    const [detailPlayerState, setDetailPlayerState] = useState(false);
    const [orgId, setOrgId] = useState(0);
    const [csvFileName, setCsvFileName] = useState('');
    const [modal, setModal] = useState(false);
    const [events, setEvents] = useState([]);
    const [depList, setDepList] = useState([]);

    const setValHandler = (e) => {
        setVal(e.target.value);
    };

    const deletePlayer = (e) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            axios.delete(`${API.PLAYER_DELETE}/${e.target.value}`, {
                data: [e.target.value]
            }).then(() => setDeleteResponse((state) => !state));
        } else {
            alert('취소 되었습니다.');
        }
    };

    const setOptHandler = (e) => {
        setOpt(e.target.value);
    };

    const updateOrgPlayer = (e) => {
        if (window.confirm("단체에 소속된 선수를 조회합니다.")) {
            setDetailPlayerState((state) => !state);
            setOrgId(e.target.value);
        }
        axios.get(`${API.ATTEND_FIND}?cmptId=${competitionId}&orgId=${e.target.value}`).then(
            (res) => setPlayerData('')
        );
    };

    const handleCsvValue = (e) => {
        const val = e.target.value.split('\\');
        setCsvFileName(val[val.length - 1]);
    };

    const sendCsvFile = (e) => {
        e.preventDefault();
        //axios로 csv파일 보내야 함.
        console.log('sendCsvFile');
    };

    const clickAddPlayer = () => {
        setModal((state) => !state);
    };

    // const downloadApply = () => {
    //     axios.get(
    //         `${API.ATTEND_CREATE_FORM}?cmptId=${competitionId}&orgId=${orgId}`, {
    //             responseType: 'blob'
    //         }).then( (res) => {
    //             const blob = new Blob([res.blob]);
    //             const fileUrl = window.URL.createObjectURL(blob);
    //             const link = document.createElement('a');
    //             link.href = fileUrl;
    //             link.style.display = 'none';
    //         })
    //         .catch( (err) => console.log(err));;
    //     console.log(`${API.ATTEND_CREATE_FORM}?cmptId=${competitionId}&orgId=${orgId}`);
    // };

    const check = () => {
        console.log(`${API.ATTEND_CREATE_FORM}?cmptId=${competitionId}&orgId=${orgId}`);
    };

    useEffect(() => {
        axios.get(`${API.ORGANIZATION_FIND_ALL}`).then(
            (res) => setData(res.data)
        );
        
        axios.get(`${API.COMPETITION_EVENT_FIND}/${competitionId}`).then(
            (res) => setEvents(res.data.filter((item) => item.isProceed === true))
        );
        
        axios.get(`${API.DEPART_FIND_ALL}`).then(
            (res) => setDepList(res.data)
        );
        // axios.all([axios.get(`${API.ORGANIZATION_FIND_ALL}`) ,axios.get(`${API.COMPETITION_EVENT_FIND}/${competitionId}`), axios.get(axios.get(`${API.DEPART_FIND_ALL}`))]).then(
        //     axios.spread((res1, res2, res3) => {
        //         setData(res1.data);
        //         setEvents(res2.data.filter((item) => item.isProceed === true));
        //         setDepList(res3.data);
        //     })
        // )
    }, [competitionId, deleteResponse]);

    console.log(depList);

    return (
        <Container>
            <SearchContainer>
                <label htmlFor="search">단체 검색</label>
                <Search onChange={setValHandler} name="search" id="search" />
                <select name="searchOption" onChange={setOptHandler}>
                    <option value="">분류 선택</option>
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
                        {orgColumns.map((column, idx) => (
                            <Th key={idx}>{column}</Th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.filter(item => String(item[opt]).includes(val))
                        .map(({ orgId, orgName, orgEmail, orgTel, orgLeaderName, leaderTel }) => (
                            <tr key={orgId}>
                                <Td><button onClick={updateOrgPlayer} value={orgId}>신청</button></Td>
                                <Td>{orgId}</Td>
                                <Td>{orgName}</Td>
                                <Td>{orgEmail}</Td>
                                <Td>{orgTel}</Td>
                                <Td>{orgLeaderName}</Td>
                                <Td>{leaderTel}</Td>
                            </tr>
                        ))}
                </tbody>
            </Table>
            {detailPlayerState ?
                <ColumnContainer>
                    <TitleContent><h3>선수 목록</h3></TitleContent>
                    <form action={`${API.ATTEND_CREATE_FORM}?`} method="get" target="_blank">
                        <input type="hidden" name="cmptId" value={competitionId} />
                        <input type="hidden" name="orgId" value={orgId} />
                        <button type="submit" onClick={check}>신청서 다운로드</button>
                    </form>
                    <RowContainer>
                        <Form>
                            <Input type="text" value={csvFileName} readOnly onChange={handleCsvValue} />
                            <CSVInput htmlFor="csv">선수등록(CSV)</CSVInput><br />
                            <input type="file" id="csv" accept=".csv" onChange={handleCsvValue} style={{display: "none"}} />
                            <input type="submit" onClick={sendCsvFile} value="파일전송" />
                        </Form>
                        <button onClick={clickAddPlayer}>일반선수등록</button>
                    </RowContainer>
                    <Table>
                        <thead>
                            <tr>
                                {orgPlyaerColumns.map((column, idx) => (
                                    <Th key={idx}>{column}</Th>
                                ))}
                                <Th>삭제여부</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {playerData.filter(item => String(item[opt]).includes(val))
                                .map(({ organizationName, playerId, playerName, playerGender, playerAge, playerTel }) => (
                                    <tr key={playerId}>
                                        <Td>{organizationName}</Td>
                                        <Td>{playerId}</Td>
                                        <Td>{playerName}</Td>
                                        <Td>{playerGender}</Td>
                                        <Td>{playerAge}</Td>
                                        <Td>{playerTel}</Td>
                                        <Td><button value={playerId} onClick={deletePlayer}>삭제</button></Td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </ColumnContainer>
                : null}
                {modal ? 
                    <ModalContainer>
                        <AddPlayer competitionId={competitionId} orgId={orgId} events={events} depList={depList} />
                    </ModalContainer>
                : null}
        </Container>
    );
}

export default ChooseOrganization;