import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import AddCompetition from './components/competition/addCompetition';
import FindEventAll from './components/competition/findEventAll';
import Test from './components/competition/test';
import FindCompetition from './components/competition/findCompetition';
import AddOrganization from './components/organization/addOrganization';
import AddPlayer from './components/player/addPlayer';
import FindOrganization from './components/organization/findOrganization';
import FindEvent from './components/competition/findCompetitionEvent';
import ChooseOrganization from './components/competition/chooseOrganization';
import FindPage from './components/competition/\bfindPage';

const Container = styled.div`
    display: flex;
    box-shadow: 0 0 0 1px purple inset;
    width: 100%;
    height: 80vh;
`;

const SideMenu = styled.div`
    overflow: hidden;
    box-shadow: 0 0 0 1px black inset;
    display: flex;
    align-items: center;
    justify-content: centerㅁ;
    flex-direction: column;
    width: 20%;
`;

const Content = styled.div`
    box-shadow: 0 0 0 1px red inset;
    display: flex;
    width: 80%;
    flex-direction: column;
`;

const List = styled.li`
    color: #3498db;
    box-shadow: 0 0 0 1px purple inset;
    :hover > ul {
        opacity: 1;
        max-height: 180px;
    }
    width: 180px;
    margin-top: 10px;
    font-size: 1.5em;
`;

const Ul = styled.ul`
    opacity: 0;
    transition: all .5s ease .1s;
    overflow: hidden;
    max-height: 0;
    font-size: 0.5em;
    padding-left: 8px;
    li {
        margin-top: 5px;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #1abc9c;
    :hover {
        color: #f1c40f;
    };
`;

const Main = () => {
    return (
        <Container>
            <SideMenu>
                <ul>
                    <List>등록
                        <Ul>
                            <li><StyledLink to="/competition/add">대회 등록</StyledLink></li>
                            <li><StyledLink to="/organization/add">단체 등록</StyledLink></li>
                            <li><StyledLink to="/competition/find">대회 조회 및 단체 참가 신청</StyledLink></li>
                        </Ul>
                    </List>
                    <List>조회
                        <Ul>
                            <li><StyledLink to="/event/find/all">전체 종목 조회</StyledLink></li>
                            <li><StyledLink to="/organization/find">단체 조회</StyledLink></li>
                            <li><StyledLink to="/player/find">대회 현황 조회</StyledLink></li>
                            {/* <li>종목별 참가인원수</li>
                            <li>종목별 참가선수 현황</li> */}
                        </Ul>
                    </List>
                    <List>대회 진행
                        <Ul>
                            <li>기록 등록</li>
                            {/* <li>기록 조회<br />(단체 및 개인)</li> */}
                        </Ul>
                    </List>
                    <List>인쇄
                        <Ul>
                            {/* <li>단체 접수 인원 인쇄 및 조회</li> */}
                            <li><StyledLink to="/printPrize" target='_blank'>배번표 인쇄 및 조회</StyledLink></li>
                            {/* <li>개인 성적 인쇄 및 조회</li>
                            <li>기록지 인쇄 및 조회</li>
                            <li>단체 성적 인쇄 및 조회</li>
                            <li>종목별 상장 대상자 인쇄 및 조회</li>
                            <li>상장 관리</li> */}
                        </Ul>
                    </List>
                </ul>
            </SideMenu>
            <Content>
                <Routes>
                    <Route exact path="/" element={<Test />} />
                    <Route path="/competition/add" element={<AddCompetition />} />
                    <Route path="/competition/find" element={<FindCompetition />} />
                    <Route path="/competition/organization/choose" element={<ChooseOrganization />} />
                    <Route path="/event/find/all" element={<FindEventAll />} />
                    <Route path="/event/find" element={<FindEvent />} />
                    <Route path="/organization/add" element={<AddOrganization />} />
                    <Route path="/organization/find" element={<FindOrganization />} />
                    <Route path="/player/add" element={<AddPlayer />} />
                    <Route path="/player/find" element={<FindPage />} />
                </Routes>
            </Content>
        </Container>
    );
};

export default Main;