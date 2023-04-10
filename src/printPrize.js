import React, { useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import styled from 'styled-components';
import Image from './img/prize.jpg';

const PrizeContainer = styled.div`
    @page {
    size: A4 portrait;
    margin: 0;
    };
    width: 21cm;
    height: 29.7cm;
    margin: 0 auto;
    /* background-image: url(${Image});
    background-repeat: no-repeat;
    background-size: cover; */
    max-width: 100%;
    max-height: 100%;
`;

const PrizeTextContainer = styled.div`
    position: relative;
    font-size: 30px;
    top: 30%;
`;

const ContentContainer = styled.div`
    position: relative;
    font-size: 40px;
    left: 20%;
    width: 60%;
    line-height: 60px;
    top: 35%;
`;

const DayContainer = styled.div`
    position: relative;
    font-size: 30px;
    top: 40%;
`;

const PrizeSubContainer = styled.div`
    text-align: center;
    width: 100%;
    display: flex;
    flex-direction: row;
`;

const Text = styled.div`
    width: 100%;
    text-align: center;
    margin-bottom: 25px;
`;

const PrintPrize = () => {
    const ref = useRef();
    const [value, setValue] = useState({
        competitionName: '',
        playerName: '',
        organizationName: '',
        rank: '',
    });



    return (
        <div>
            <ReactToPrint 
                trigger={() => <button>Print</button>}
                content={() => ref.current}
            />
            <PrizeContainer ref={ref}>
                <PrizeTextContainer>
                    <PrizeSubContainer>
                        <Text>음악 줄넘기</Text>
                        <Text>3위</Text>
                    </PrizeSubContainer>
                    <PrizeSubContainer>
                        <Text>인터벌초등학교</Text>
                        <Text>김철민</Text>
                    </PrizeSubContainer>
                </PrizeTextContainer>
                <ContentContainer>
                    <Text>위 선수는(단체)는 제 4회 동작구 협회장배 줄넘기 대회에서 위와 같이 입상하여 이 상장을 드립니다.</Text>
                </ContentContainer>
                <DayContainer>
                    <Text>2023년 4월 3일</Text>
                </DayContainer>
            </PrizeContainer>
        </div>
    );
};

export default PrintPrize;