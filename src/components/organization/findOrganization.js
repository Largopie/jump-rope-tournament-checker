
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { API } from '../../config';

const Container = styled.div`
    width: 100%;
    overflow: scroll;
`;

const DetailUpdateContent = styled.div`
    margin-top: 10px;
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
    cursor: pointer;
    text-decoration: none;
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
const FindOrganization = () => {
    const orgColumns = ['단체번호', '단체이름', '이메일', '전화번호', '리더명', '리더전화번호'];
    const orgPlyaerColumns = ['단체이름', '선수번호', '선수이름', '성별', '생년월일', '전화번호'];

    const orgDummy = [
        {
            orgId: 1,
            orgName: 'Organ',
            orgEmail: 'nnheo@example.com',
            orgTel: '010-1234-5678',
            orgLeaderName: '최초원',
            leaderTel: '010-1234-1234',
        },
        {
            orgId: 2,
            orgName: '최초원',
            orgEmail: 'nnheo@example.com',
            orgTel: '010-1234-5678',
            orgLeaderName: '최초원',
            leaderTel: '010-1234-1234',
        }
    ];

    const playerDummy = [
        {
            organizationName: 'Organ',
            playerId: 1,
            playerName: '최초원',
            playerGender: '남자',
            playerAge: 20,
            playerTel: '010-1234-5678',
        },
        {
            organizationName: 'Organ',
            playerId: 2,
            playerName: '최초원',
            playerGender: '남자',
            playerAge: 20,
            playerTel: '010-1234-5678',
        },
        {
            organizationName: 'Organ',
            playerId: 3,
            playerName: '최초원',
            playerGender: '남자',
            playerAge: 20,
            playerTel: '010-1234-5678',
        }
    ];


    const [data, setData] = useState([]);
    const [playerData, setPlayerData] = useState([]);
    const [val, setVal] = useState('');
    const [opt, setOpt] = useState('orgId');
    const [deleteResponse, setDeleteResponse] = useState(false);
    const [updateState, setUpdateState] = useState(false);
    const [detailUpdateState, setDetailUpdateState] = useState(false);
    const [detailPlayerState, setDetailPlayerState] = useState(false);

    const [detail, setDetail] = useState({
        orgId: '',
        orgName: '',
        orgEmail: '',
        orgTel: '',
        orgLeaderName: '',
        leaderTel: '',
    });

    const detailOnChange = (e) => {
        setDetail((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value };
        });
    };

    const setValHandler = (e) => {
        setVal(e.target.value);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (window.confirm('수정하시겠습니까?')) {
            axios.put(`${API.ORGANIZATION_UPDATE}`, detail);
            setUpdateState((state) => !state);
            alert('수정완료!');
        }
    };

    const handleCancel = () => {
        if (window.confirm('수정을 취소하시겠습니까?')) {
            setDetailUpdateState(false);
            alert('취소되었습니다!');
            setDetail({
                orgId: '',
                orgName: '',
                orgEmail: '',
                orgTel: '',
                orgLeaderName: '',
                leaderTel: '',
            });
        }
    };

    const doDelete = (e) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            axios.delete(`${API.ORGANIZATION_DELETE}`, {
                data: [e.target.value]
            }).then(() => setDeleteResponse((state) => !state));
        } else {
            alert('취소 되었습니다.');
        }
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

    const updateOrg = (e) => {
        if (window.confirm('단체정보를 수정하시겠습니까?')) {
            setDetail(data[e.target.innerText - 1]);
            setDetailUpdateState(true);
        }
        
    };

    const updateOrgPlayer = (e) => {
        if (window.confirm('단체에 소속된 선수를 조회합니다.')) {
            setDetailPlayerState(true);
        }
        axios.get(`${API.PLAYER_FIND_ORG}/${e.target.innerText}`).then(
            (res) => setPlayerData(res.data)
        );
    };

    const sendCsvFile = (e) => {
        e.preventDefault();
        //axios로 csv파일 보내야 함.
        console.log('sendCsvFile');
    };

    const clickAddPlayer = (e) => {
        window.open('/jump-rope-tournament-checker/player/add', '', 'width=800,height=600');
    };

    useEffect(() => {
        axios.get(`${API.ORGANIZATION_FIND_ALL}`).then(
            (res) => setData(res.data)
        );
    }, [deleteResponse, updateState]);

    return (
        <Container>
            <SearchContainer>
                <label htmlFor="search">단체 검색</label>
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
                        {orgColumns.map((column, idx) => (
                            <Th key={idx}>{column}</Th>
                        ))}
                        <Th>삭제여부</Th>
                    </tr>
                </thead>
                <tbody>
                    {orgDummy.filter(item => String(item[opt]).includes(val))
                        .map(({ orgId, orgName, orgEmail, orgTel, orgLeaderName, leaderTel }) => (
                            <tr key={orgId}>
                                <Td><A onClick={updateOrg}>{orgId}</A></Td>
                                <Td><A onClick={updateOrgPlayer}>{orgName}</A></Td>
                                <Td>{orgEmail}</Td>
                                <Td>{orgTel}</Td>
                                <Td>{orgLeaderName}</Td>
                                <Td>{leaderTel}</Td>
                                <Td><button value={orgId} onClick={doDelete}>삭제</button></Td>
                            </tr>
                        ))}
                </tbody>
            </Table>
            {detailUpdateState ?
                <DetailUpdateContent>
                    <ColumnContainer>
                        <RowContainer>
                            <form>
                                <ColumnContainer>
                                    <TitleContent><h3>단체 정보 수정</h3></TitleContent>
                                    <input disabled type="text" value={detail.orgId} />
                                    <input type="text" name="orgName" value={detail.orgName} onChange={detailOnChange} />
                                    <input type="text" name="orgEmail" value={detail.orgEmail} onChange={detailOnChange} />
                                    <input type="text" name="orgTel" value={detail.orgTel} onChange={detailOnChange} />
                                    <input type="text" name="orgLeaderName" value={detail.orgLeaderName} onChange={detailOnChange} />
                                    <input type="text" name="leaderTel" value={detail.leaderTel} onChange={detailOnChange} />
                                    <input type="submit" onClick={handleOnSubmit} value="수정" />
                                    <input type="button" onClick={handleCancel} value="취소" />
                                </ColumnContainer>
                            </form>
                        </RowContainer>
                    </ColumnContainer>
                </DetailUpdateContent>
                : null}
            {detailPlayerState ?
                <ColumnContainer>
                    <TitleContent><h3>선수 목록</h3></TitleContent>
                    <RowContainer>
                        <form>
                            <label htmlFor="csv">선수등록(CSV)</label>
                            <input type="file" id="csv" accept=".csv" />
                            <input type="submit" onClick={sendCsvFile} value="파일등록" />
                        </form>
                        <Link to="/player/add" target="_blank">일반선수등록</Link>
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
                            {playerDummy.filter(item => String(item[opt]).includes(val))
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
        </Container>
    );
}

export default FindOrganization;