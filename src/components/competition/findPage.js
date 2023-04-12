import React, { useEffect, useState } from 'react';
import { API } from '../../config';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Container = styled.div`
    padding: 15px;
    overflow: auto;
`;

const Table = styled.table`
    margin: 0 auto;
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
    margin: 15px;
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
                        <Th>대회ID</Th>
                        <Th>대회명</Th>
                        <Th>참가단체조회</Th>
                        <Th>참가선수조회</Th>
                        <Th>종목별선수조회</Th>
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
                    <H2>참가 선수 조회</H2>
                    <StyledLink to="/print/player" state={{players: players}}>배번표 인쇄하기</StyledLink>
                    <label htmlFor="search">선수 검색 </label>
                    <Input id="search" value={search} onChange={onSearch} />
                    <Table>
                        <thead>
                            <tr>
                                <Th>소속단체</Th>
                                <Th>이름</Th>
                                <Th>성별</Th>
                                <Th>생년월일</Th>
                                <Th>전화번호</Th>
                                <Th>참가종목</Th>
                                <Th>점수</Th>
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
                        <H2>종목별 선수 조회</H2>
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
                    </div>
                : null}
        </Container>
    );
};

export default FindPage;