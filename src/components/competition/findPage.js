import React, { useEffect, useState } from 'react';
import { API } from '../../config';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Container = styled.div`
    padding: 15px;
    overflow: auto;
`;

const UpdateContainer = styled.div`
    border: 1px solid black;
    padding: 5px;
    display: flex;
    flex-direction: column;
    width: 200px;
`;

const Table = styled.table`
    margin: 15px 0px 15px 0px;
    width: 80%;
    border: 1px solid black;
    border-collapse: collapse;
    font-size: 0.8em;
    line-height: 30px;
`;

const Th = styled.th`
    border: 1px solid black;
`;

const Td = styled.td`
    border: 1px solid black;
    text-align: center;
`;

const Input = styled.input`
    outline: none;
`;

const H1 = styled.h1`
    margin: 15px;
`;

const H2 = styled.h2`
    margin: 15px 0px 15px 0px;
`;

const Button = styled.button`
    width: 100px;
    height: 30px;
    background-color: #ffc;
    border: 1px solid #fcf;
    :hover {
        background-color: #fcf;
    };
`;

const StyledLink = styled(Link)`
    margin: 5px;
    background-color: #ffc;
    border: 1px solid #fcf;
    text-decoration: none;
    color: black;
    :hover {
        background-color: #fcf;
    };
`;

const FindPage = () => {
    const [competitions, setCompetitions] = useState([]);
    const [playerInquiring, setPlayerInquiring] = useState(false);
    const [orgInquiring, setOrgInquiring] = useState(false);
    const [eventInquiring, setEventInquiring] = useState(false);
    const [players, setPlayers] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(0);
    const [search, setSearch] = useState('');
    const [eventList, setEventList] = useState([]);
    const [updateToggle, setUpdateToggle] = useState(false);
    const [updateContent, setUpdateContent] = useState({
        cmptAttendId: '',
        eventId: '',
        score: '',
    });

    const onSearch = (e) => {
        setSearch(e.target.value);
    };

    const onSelectedEvent = (e) => {
        setSelectedEvent(e.target.value);
    };

    const inquirePlayer = (e) => {
        setPlayers([]);
        axios.get(`${API.ATTEND_FIND_PLAYER_CMPT}/${e.target.value}`).then(
            (res) => setPlayers(res.data)
        );
        setPlayerInquiring(true);
        setOrgInquiring(false);
        setEventInquiring(false);
    };

    const inquireOrg = (e) => {
        setOrganizations([]);
        axios.get(`${API.ATTEND_FIND_ORGANIZATION}/${e.target.value}`).then(
            (res) => setOrganizations(res.data)
        );
        setOrgInquiring(true);
        setPlayerInquiring(false);
        setEventInquiring(false);
    };

    const inquireEvent = (e) => {
        // console.log(e.target.value);
        setEvents([]);
        axios.get(`${API.ATTEND_FIND_PLAYER_CMPT}/${e.target.value}`).then(
            (res) => setPlayers(res.data)
        );
        setEventInquiring(true);
        setPlayerInquiring(false);
        setOrgInquiring(false);
        axios.get(`${API.COMPETITION_EVENT_FIND}/${e.target.value}?type=ALL`).then(
            (res) => setEvents(res.data.filter((event) => event.isProceed === true))
        );
    };

    const updateScoreToggle = () => {
        setUpdateToggle((state) => !state);
    };

    const onChangeUpdate = (e) => {
        setUpdateContent({ ...updateContent, [e.target.name]: e.target.value });
    };

    const onSubmitUpdate = () => {
        axios.patch(`${API.ATTEND_UPDATE_EVENTSCORE}/${updateContent.cmptAttendId}`, {
            cmptEventId: Number(updateContent.eventId),
            score: Number(updateContent.score)
        });
        window.location.reload();
    };

    useEffect(() => {
        axios.get(`${API.COMPETITION_FIND_ALL}`).then(
            (res) => setCompetitions(res.data)
        );
        axios.get(`${API.EVENT_FIND_ALL}`).then((res) => setEventList(res.data));
    }, []);

    // console.log(updateContent);

    return (
        <Container>
            <H1>대회 현황 조회</H1>
            <Table>
                <thead>
                    <tr>
                        <Th>대회ID</Th>
                        <Th>대회명</Th>
                        <Th>참가단체조회</Th>
                        <Th>참가선수조회</Th>
                        <Th>종목별선수조회</Th>
                        <Th>대회 배번표 출력</Th>
                        <Th>미출력 상장 출력</Th>
                        <Th>대회 상장 전체 출력</Th>
                    </tr>
                </thead>
                <tbody>
                    {competitions.map(({ competitionId, competitionName }) => (
                        <tr key={competitionId}>
                            <Td>{competitionId}</Td>
                            <Td>{competitionName}</Td>
                            <Td><button value={competitionId} onClick={inquireOrg}>조회</button></Td>
                            <Td><button value={competitionId} onClick={inquirePlayer}>조회</button></Td>
                            <Td><button value={competitionId} onClick={inquireEvent}>조회</button></Td>
                            <Td><StyledLink to="/printPlayer" state={{ cmptId: competitionId }}>출력하기</StyledLink></Td>
                            <Td><StyledLink to="/printPrizeFilter" state={{ cmptId: competitionId }}>출력하기</StyledLink></Td>
                            <Td><StyledLink to="/printPrize" state={{ cmptId: competitionId }}>출력하기</StyledLink></Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {playerInquiring ?
                <div>
                    <H2>참가 선수 조회</H2>
                    <label htmlFor="search">선수 검색 </label>
                    <Input id="search" value={search} onChange={onSearch} />
                    <button onClick={updateScoreToggle}>점수 수정하기</button>
                    <StyledLink to="/printOrg-players" state={{players: players}}>단체별 선수 출력</StyledLink>
                    {updateToggle ?
                        <UpdateContainer>
                            <h3>점수 수정</h3><br />
                            <label htmlFor="cmptAttendId">선수 번호</label>
                            <input id="cmptAttendId" name="cmptAttendId" type="text" onChange={onChangeUpdate} />
                            <label htmlFor="eventId">종목 선택</label>
                            <select id="eventId" name="eventId" onChange={onChangeUpdate}>
                                <option value="">--- 종목을 선택하세요 ---</option>
                                {eventList.map(({eventId, eventName}) => (<option key={eventId+eventName} value={eventId}>{eventName}</option>))}
                            </select>
                            <label htmlFor="score">점수</label>
                            <input id="score" name="score" type="number" onChange={onChangeUpdate} />
                            <input type="button" value="수정하기" onClick={onSubmitUpdate} />
                        </UpdateContainer>
                        : null}
                    <Table>
                        <thead>
                            <tr>
                                <Th>선수번호</Th>
                                <Th>소속명</Th>
                                <Th>단체명</Th>
                                <Th>이름</Th>
                                <Th>성별</Th>
                                <Th>생년월일</Th>
                                <Th>전화번호</Th>
                                <Th>참가종목</Th>
                                <Th>배점</Th>
                                <Th>기록점수</Th>
                                <Th>정보수정</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.filter(item => item.playerName.includes(search))
                                .map(({ cmptAttendId, eventAttendId, playerAffiliation, organizationName, playerName, playerGender, playerBirth, playerTel, eventName, grade, score }) => (
                                    <tr key={cmptAttendId + eventAttendId + playerName}>
                                        <Td>{cmptAttendId}</Td>
                                        <Td>{organizationName}</Td>
                                        <Td>{playerAffiliation}</Td>
                                        <Td>{playerName}</Td>
                                        <Td>{playerGender}</Td>
                                        <Td>{playerBirth}</Td>
                                        <Td>{playerTel}</Td>
                                        <Td>{eventName}</Td>
                                        <Td>{grade}</Td>
                                        <Td>{score}</Td>
                                        <Td><StyledLink to="/updatePlayer" state={{ playerId:cmptAttendId }}>수정</StyledLink></Td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                    <Button onClick={() => setPlayerInquiring(false)}>닫기</Button>
                </div>
                : null}
            {orgInquiring ?
                <div>
                    <H2>참가 단체 조회</H2>
                    <Table>
                        <thead>
                            <tr>
                                <Th>단체명</Th>
                                <Th>단체메일</Th>
                                <Th>단체전화번호</Th>
                                <Th>단체대표자명</Th>
                                <Th>대표자전화번호</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {organizations.map(({ orgId, orgName, orgEmail, orgTel, orgLeaderName, leaderTel }) => (
                                <tr key={orgId + orgName}>
                                    <Td>{orgName}</Td>
                                    <Td>{orgEmail}</Td>
                                    <Td>{orgTel}</Td>
                                    <Td>{orgLeaderName}</Td>
                                    <Td>{leaderTel}</Td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Button onClick={() => setOrgInquiring(false)}>닫기</Button>
                </div>
                : null}
            {eventInquiring ?
                <div>
                    <H2>종목별 선수 조회</H2>
                    <label htmlFor="selectedEvent">종목 선택</label>
                    <select id="selectedEvent" value={selectedEvent} onChange={onSelectedEvent}>
                        <option value="0">선택하세요</option>
                        {events.map(({ cmptEventId, eventName }) => (
                            <option key={cmptEventId + eventName} value={eventName}>{eventName}</option>
                        ))}
                    </select>
                    <h3>총 인원 : {players.filter((item) => item.eventName === selectedEvent).length}</h3>
                    <Table>
                        <thead>
                            <tr>
                                <Th>소속단체</Th>
                                <Th>이름</Th>
                                <Th>성별</Th>
                                <Th>생년월일</Th>
                                <Th>전화번호</Th>
                                <Th>참가종목</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.filter((item) => item.eventName === selectedEvent).map(({ cmptAttendId, eventAttendId, organizationName, playerName, playerGender, playerBirth, playerTel, eventName }) => (
                                <tr key={cmptAttendId + eventAttendId + playerName}>
                                    <Td>{organizationName}</Td>
                                    <Td>{playerName}</Td>
                                    <Td>{playerGender}</Td>
                                    <Td>{playerBirth}</Td>
                                    <Td>{playerTel}</Td>
                                    <Td>{eventName}</Td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Button onClick={() => setEventInquiring(false)}>닫기</Button>
                </div>
                : null}
        </Container>
    );
};

export default FindPage;