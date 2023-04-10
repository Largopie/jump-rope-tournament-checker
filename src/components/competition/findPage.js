import React, { useEffect, useState } from 'react';
import { API } from '../../config';
import styled from 'styled-components';
import axios from 'axios';
import PrintPlayer from '../../printPlayer';
import { Link } from 'react-router-dom';

const Container = styled.div`
    overflow: auto;
`;

const Table = styled.table`
    margin: 0 auto;
    width: 80%;
    border: 1px solid black;
    border-collapse: collapse;
    font-size: 0.8em;
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

    const onSearch = (e) => {
        setSearch(e.target.value);
    };

    const onSelectedEvent = (e) => {
        setSelectedEvent(e.target.value);
    };

    const inquirePlayer = (e) => {
        axios.get(`${API.ATTEND_FIND_PLAYER_CMPT}/${e.target.value}`).then(
            (res) => setPlayers(res.data)
        );
        setPlayerInquiring((state) => !state);
        setOrgInquiring(false);
        setEventInquiring(false);
    };

    const inquireOrg = (e) => {
        axios.get(`${API.ATTEND_FIND_ORGANIZATION}/${e.target.value}`).then(
            (res) => setOrganizations(res.data)
        );
        setOrgInquiring((state) => !state);
        setPlayerInquiring(false);
        setEventInquiring(false);
    };

    const inquireEvent = (e) => {
        // console.log(e.target.value);
        axios.get(`${API.ATTEND_FIND_PLAYER_CMPT}/${e.target.value}`).then(
            (res) => setPlayers(res.data)
        );
        setEventInquiring((state) =>!state);
        setPlayerInquiring(false);
        setOrgInquiring(false);
        axios.get(`${API.COMPETITION_EVENT_FIND}/${e.target.value}?type=ALL`).then(
            (res) => setEvents(res.data.filter((event) => event.isProceed === true))
        );
    };

    useEffect(() => {
        axios.get(`${API.COMPETITION_FIND_ALL}`).then(
            (res) => setCompetitions(res.data)
        );
    }, []);

    // console.log(players);

    return (
        <Container>
            <H1>대회 현황 조회</H1>
            <Table>
                <thead>
                    <tr>
                        <th>대회ID</th>
                        <th>대회명</th>
                        <th>참가단체조회</th>
                        <th>참가선수조회</th>
                        <th>종목별선수조회</th>
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
                        </tr>
                    ))}
                </tbody>
            </Table>
            {playerInquiring ?
                <div>
                    <Link to="/print/player" state={{players: players}}>인쇄하기</Link>
                    <h3>참가 선수 조회</h3>
                    <label htmlFor="search">선수 검색 </label>
                    <Input id="search" value={search} onChange={onSearch} />
                    <Table>
                        <thead>
                            <tr>
                                <th>소속단체</th>
                                <th>이름</th>
                                <th>성별</th>
                                <th>생년월일</th>
                                <th>전화번호</th>
                                <th>참가종목</th>
                                <th>점수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.filter(item => item.playerName.includes(search) )
                            .map(({ cmptAttendId, eventAttendId, organizationName, playerName, playerGender, playerBirth, playerTel, eventName, score }) => (
                                <tr key={cmptAttendId + eventAttendId + playerName}>
                                    <Td>{organizationName}</Td>
                                    <Td>{playerName}</Td>
                                    <Td>{playerGender}</Td>
                                    <Td>{playerBirth}</Td>
                                    <Td>{playerTel}</Td>
                                    <Td>{eventName}</Td>
                                    <Td>{score}</Td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                : null}
            {orgInquiring ?
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>단체명</th>
                                <th>단체메일</th>
                                <th>단체전화번호</th>
                                <th>단체대표자명</th>
                                <th>대표자전화번호</th>
                            </tr>
                        </thead>
                        <tbody>
                            {organizations.map(({orgId, orgName, orgEmail, orgTel, orgLeaderName, leaderTel}) => (
                                <tr key={orgId+orgName}>
                                    <Td>{orgName}</Td>
                                    <Td>{orgEmail}</Td>
                                    <Td>{orgTel}</Td>
                                    <Td>{orgLeaderName}</Td>
                                    <Td>{leaderTel}</Td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                : null}
                {eventInquiring ? 
                    <div>
                        <label htmlFor="selectedEvent">종목 선택</label>
                        <select id="selectedEvent" value={selectedEvent} onChange={onSelectedEvent}>
                            <option value="0">선택하세요</option>
                            {events.map(({ cmptEventId, eventName  }) => (
                                <option key={cmptEventId+eventName} value={eventName}>{eventName}</option>
                            ))}
                        </select>
                        <h3>총 인원 : {players.filter((item) => item.eventName === selectedEvent).length}</h3>
                        <Table>
                        <thead>
                            <tr>
                                <th>소속단체</th>
                                <th>이름</th>
                                <th>성별</th>
                                <th>생년월일</th>
                                <th>전화번호</th>
                                <th>참가종목</th>
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
                    </div>
                : null}
        </Container>
    );
};

export default FindPage;