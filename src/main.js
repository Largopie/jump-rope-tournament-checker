import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import RContest from './register/r-contest';
import REvent from './register/r-event';
import Test from './register/test';

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
    width: 25%;
`;

const Content = styled.div`
    box-shadow: 0 0 0 1px red inset;
    display: flex;
    width: 75%;
    flex-direction: column;
`;

const List = styled.li`
    box-shadow: 0 0 0 1px purple inset;
    :hover > ul {
        opacity: 1;
        max-height: 200px;
    }
    width: 200px;
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
`;

const Main = () => {
    return (
        <Container>
            <SideMenu>
                <ul>
                    <List h="125px">대회 준비
                        <Ul>
                            <li><StyledLink to="/contest">대회 등록</StyledLink></li>
                            <li><StyledLink to="/event">종목 선택 등록</StyledLink></li>
                            <li>댠체 참가 등록</li>
                            <li>선수 등록</li>
                            <li>종목 별 점수 등록</li>
                        </Ul>
                    </List>
                    <List h="100px">선수등록 현황
                        <Ul>
                            <li>참가선수 현황</li>
                            <li>단체별 참가인원수</li>
                            <li>종목별 참가인원수</li>
                            <li>종목별 참가선수 현황</li>
                        </Ul>
                    </List>
                    <List h="70px">대회 진행
                        <Ul>
                            <li>기록 등록</li>
                            <li>기록 조회<br />(단체 및 개인)</li>
                        </Ul>
                    </List>
                    <List h="160px">인쇄
                        <Ul>
                            <li>단체 접수 인원 인쇄 및 조회</li>
                            <li>배번표 인쇄 및 조회</li>
                            <li>개인 성적 인쇄 및 조회</li>
                            <li>기록지 인쇄 및 조회</li>
                            <li>단체 성적 인쇄 및 조회</li>
                            <li>종목별 상장 대상자 인쇄 및 조회</li>
                            <li>상장 관리</li>
                        </Ul>
                    </List>
                </ul>
            </SideMenu>
            <Content>
                <Routes>
                    <Route exact path="/" element={<Test />} />
                    <Route path="/contest" element={<RContest />} />
                    <Route path="/event" element={<REvent />} />
                </Routes>
            </Content>
        </Container>
    );
};

export default Main;