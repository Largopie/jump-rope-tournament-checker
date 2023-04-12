import React from 'react';
import bgImg from '../../img/flag.jpg';
import styled from 'styled-components';

const Container = styled.div`
    padding: 15px;
    margin: 20px;
    width: 100%;
    height: 100%;
    background-image: ${`url(${bgImg})`};
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`;

const Home = () => {
    return (
        <Container>
            <h1>줄넘기 대회 웹 사이트</h1><br/>
            <h2>엑셀 입력 방법</h2><br/>
            <p>선수명, 참가부, 성별, 생년월일, 연락처, 종목 아래의</p>
            <p>항목들만 작성하셔야 하며 이외의 항목 작성 시 신청서가</p>
            <p>접수되지 않습니다.</p>
            <p>참여하는 종목에는 o라고 작성하여 입력해주시고</p>
            <p>참여하지 않는 종목은 빈칸으로 비워두시기 바랍니다.</p>
            <br />
            <p>소속명을 비우고 내용 작성시 기관명이 소속명으로 자동으로 작성됩니다.</p>
            <br />
            <p>엑셀파일의 참가부 부분에는 아래의 항목만 작성 할 수 있습니다.</p>
            <br />
            <h2>참가부</h2>
            <p>- 유치부</p>
            <p>- 초등1</p>
            <p>- 초등2</p>
            <p>- 초등3</p>
            <p>- 초등4</p>
            <p>- 초등5</p>
            <p>- 초등6</p>
            <p>- 중고등부</p>
            <p>- 일반부</p>


        </Container>
    );
}

export default Home;