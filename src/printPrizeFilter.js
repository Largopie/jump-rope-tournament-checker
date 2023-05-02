import React, { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import styled from 'styled-components';
import Image from './img/prize.jpg';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { API } from './config';

const Container = styled.div`
`;

const H3 = styled.h3`
    margin-bottom: 10px;
    border-bottom: 1px solid black;
`;

const SettingRowContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const SettingContainer = styled.div`
    padding: 10px;
    box-shadow: 0 0 0 1px black inset;
    width: 30%;
    display: flex;
    flex-direction: column;
`;

const SettingSubContainer = styled.div`
    margin: 10px 10px 10px 0px;
    box-shadow: 0 0 0 1px black inset;
    width: ${props => props.width};
    flex-direction: row;
`;

const PrizeContainer = styled.div`
    @page {
    size: A4 portrait;
    margin: 0;
    };
    width: 21cm;
    height: 29.7cm;
    margin: 0 auto;
    background-image: ${props => !props.backgroundImg ? `url(${Image})` : 'none'};
    background-repeat: no-repeat;
    background-size: cover;
`;

const PrizeTextContainer = styled.div`
    position: relative;
    top: ${props => props.top}%;
    height: 120px;
    font-size: ${props => props.fontSize}px;
`;

const ContentContainer = styled.div`
    position: relative;
    font-size: ${props => props.fontSize}px;
    left: 15%;
    width: 70%;
    height: 290px;
    overflow: hidden;
    line-height: 60px;
    top: ${props => props.top}%;
`;

const DayContainer = styled.div`
    position: relative;
    font-size: ${props => props.fontSize}px;
    top: ${props => props.top}%;
    height: ${props => props.fontSize}px;
`;

const OrganizationContainer = styled.div`
    position: relative;
    font-size: ${props => props.fontSize}px;
    top: ${props => props.top}%;
    height: ${props => props.fontSize}px;
`;

const LeaderContainer = styled.div`
    position: relative;
    font-size: ${props => props.fontSize}px;
    top: ${props => props.top}%;
    height: ${props => props.fontSize}px;
`;

const PrizeSubContainer = styled.div`
    text-align: center;
    width: 100%;
    display: flex;
    flex-direction: row;
`;

const Button = styled.button`
    margin: 2px;
    width: 50px;
    height: 25px;
    font-size: 10px;
    border : 1px solid #fcf;
    background-color: #ffc;
    :hover {
    background-color: #fcf;
    };
`;

const InputDiv = styled.div`
    font-size: 18px;
`;

const Input = styled.input`
    font-size: 13px;
    width: 200px;
    height: 25px;
    white-space: pre;
`;

const Text = styled.div`
    font-family: ${(props) => props.fontFamily};
    width: 100%;
    padding-right: ${(props) =>props.paddingRight}px;
    padding-left: ${(props) =>props.paddingLeft}px;
    text-align: center;
    margin-bottom: 25px;
    white-space: pre-wrap;
`;

const Select = styled.select`
    font-size: 18px;
    width: 200px;
    height: 25px;
`;

const PrintPrizeFilter = () => {
    const ref = useRef();
    const location = useLocation();
    const cmptId = location.state?.cmptId;

    const [data, setData] = useState([]);

    const [font, setFont] = useState('');
    const [see, setSee] = useState(false);
    // Text State
    const [textTop, setTextTop] = useState(32);
    const [textFontSize, setTextFontSize] = useState(30);

    // Content State
    const [prizeContent, setPrizeContent] = useState('위 선수(단체)는 제 4회 동작구 협회장배 줄넘기 대회에서 위와 같이 입상하여 이 상장을 드립니다.');
    const [contentFontSize, setContentFontSize] = useState(40);
    const [contentTop, setContentTop] = useState(35);

    // Day State
    const [dayContent, setDayContent] = useState('2023년 4월 23일');
    const [dayFontSize, setDayFontSize] = useState(30);
    const [dayTop, setDayTop] = useState(35);

    // Organization State
    const [orgContent, setOrgContent] = useState('동 작 구 줄 넘 기 협 회');
    const [orgFontSize, setOrgFontSize] = useState(38);
    const [orgTop, setOrgTop] = useState(39);

    // Leader State
    const [leaderContent, setLeaderContent] = useState('회 장     임     종     환 ');
    const [leaderFontSize, setLeaderFontSize] = useState(38);
    const [leaderTop, setLeaderTop] = useState(40);

    // padding Setting State
    const [topLeft, setTopLeft] = useState(20);
    const [topRight, setTopRight] = useState(20);
    const [bottomLeft, setBottomLeft] = useState(20);
    const [bottomRight, setBottomRight] = useState(20);

    const [eventAttendIds, setEventAttendIds] = useState([]);

    const onClickHandle = (e) => {
        setFont(e.target.value);
    };

    const seeBackGround = () => {
        setSee((state) => !state);
    };

    const onPrizeContentHandle = (e) => {
        setPrizeContent(e.target.value);
    };

    const onDayContentHandle = (e) => {
        setDayContent(e.target.value);
    };

    const onOrgContentHandle = (e) => {
        setOrgContent(e.target.value);
    };

    const onLeaderContentHandle = (e) => {
        setLeaderContent(e.target.value);
    };

    const onTopChange = (e) => {
        if (e.target.innerText === '좁히기'){
            setTopLeft(topLeft + 2 );
            setTopRight(topRight + 2 );
        };
        if (e.target.innerText === '넓히기') {
            setTopLeft(topLeft - 2 < 0 ? 0 : topLeft - 2);
            setTopRight(topRight - 2 < 0 ? 0 : topRight - 2);
        };
    };

    const onBottomChange = (e) => {
        if (e.target.innerText === '좁히기'){
            setBottomLeft(bottomLeft + 2);
            setBottomRight(bottomRight + 2);
        };
        if (e.target.innerText === '넓히기') {
            setBottomLeft(bottomLeft - 2 < 0 ? 0 : bottomLeft - 2);
            setBottomRight(bottomRight - 2 < 0 ? 0 : bottomRight - 2);
        };
    };

    const onTextTopChange = (e) => {
        if (e.target.innerText === '상') {
            setTextTop(textTop - 1);
        };
        if (e.target.innerText === '하') {
            setTextTop(textTop + 1);
        };
    };

    const onTextFontChange = (e) => {
        if (e.target.innerText === '+') {
            setTextFontSize(textFontSize + 1);
        }
        if (e.target.innerText === '-') {
            setTextFontSize(textFontSize - 1);
        }
    };

    const onContentTopChange = (e) => {
        if (e.target.innerText === '상') {
            setContentTop(contentTop + 1);
        };
        if (e.target.innerText === '하') {
            setContentTop(contentTop - 1);
        };
    };

    const onContentFontChange = (e) => {
        if (e.target.innerText === '+') {
            setContentFontSize(contentFontSize + 1);
        };
        if (e.target.innerText === '-') {
            setContentFontSize(contentFontSize - 1);
        };
    };

    const onDayTopChange = (e) => {
        if (e.target.innerText === '상') {
            setDayTop(dayTop - 1);
        };
        if (e.target.innerText === '하') {
            setDayTop(dayTop + 1);
        };
    };

    const onDayFontChange = (e) => {
        if (e.target.innerText === '+') {
            setDayFontSize(dayFontSize + 1);
        };
        if (e.target.innerText === '-') {
            setDayFontSize(dayFontSize - 1);
        };
    };

    const onOrgTopChange = (e) => {
        if (e.target.innerText === '상') {
            setOrgTop(orgTop - 1);
        };
        if (e.target.innerText === '하') {
            setOrgTop(orgTop + 1);
        };
    };

    const onOrgFontChange = (e) => {
        if (e.target.innerText === '+') {
            setOrgFontSize(orgFontSize + 1);
        };
        if (e.target.innerText === '-') {
            setOrgFontSize(orgFontSize - 1);
        };
    };

    const onLeaderTopChange = (e) => {
        if (e.target.innerText === '상') {
            setLeaderTop(leaderTop - 1);
        };
        if (e.target.innerText === '하') {
            setLeaderTop(leaderTop + 1);
        };
    };

    const onLeaderFontChange = (e) => {
        if (e.target.innerText === '+') {
            setLeaderFontSize(leaderFontSize + 1);
        };
        if (e.target.innerText === '-') {
            setLeaderFontSize(leaderFontSize - 1);
        };
    };

    const printSuccess = () => {
        if (window.confirm('상장 출력을 완료하시겠습니까?')){
            axios.patch(`${API.PRIZE_STATE}`, {
                eventAttendIds: eventAttendIds
            });
            alert('상장 출력 완료 처리 되었습니다.');
            window.location.reload();
        };
    };

    // console.log('Day', dayFontSize, dayTop);
    // console.log('ORG', orgFontSize, orgTop);
    // console.log('LEADER',leaderFontSize, leaderTop);
    // console.log('TOP' , topLeft, topRight);
    // console.log('BOTTOM', bottomLeft, bottomRight);
    // console.log(cmptId);

    useEffect(() => {
        axios.get(`${API.PRIZE}/${cmptId}`).then(
            (res) => (
                setData(res.data),
                setEventAttendIds(res.data.filter((item) => item.printed === false).map((item) => item.eventAttendId))
            )
        );
    }, [cmptId])

    // console.log(eventAttendIds);

    // const repeat = () => {
    //     const result = [];
    //     for (let i = 0; i < data.length; i++) {
    //         result.push(
    //             <PrizeContainer backgroundImg={see}>
    //                 <PrizeTextContainer top={textTop} fontSize={textFontSize}>
    //                     <PrizeSubContainer>
    //                         <Text paddingLeft={topLeft} fontFamily={font}>{data[i].cmptName}</Text>
    //                         <Text paddingRight={topRight} fontFamily={font}>{data[i].grade}</Text>
    //                     </PrizeSubContainer>
    //                     <PrizeSubContainer>
    //                         <Text paddingLeft={bottomLeft} fontFamily={font}>{data[i].playerAffiliation}</Text>
    //                         <Text paddingRight={bottomRight} fontFamily={font}>{data[i].playerName}</Text>
    //                     </PrizeSubContainer>
    //                 </PrizeTextContainer>
    //                 <ContentContainer top={contentTop} fontSize={contentFontSize}>
    //                     <Text fontFamily={font}>{prizeContent}</Text>
    //                 </ContentContainer>
    //                 <DayContainer top={dayTop} fontSize={dayFontSize}>
    //                     <Text fontFamily={font}>{dayContent}</Text>
    //                 </DayContainer>
    //                 <OrganizationContainer top={orgTop} fontSize={orgFontSize}>
    //                     <Text fontFamily={font}>{orgContent}</Text>
    //                 </OrganizationContainer >
    //                 <LeaderContainer top={leaderTop} fontSize={leaderFontSize}>
    //                     <Text fontFamily={font}>{leaderContent}</Text>
    //                 </LeaderContainer>
    //             </PrizeContainer>
    //         );
    //     };
    //     return result;
    // };

    // console.log(filterValue);
    // console.log(a);

    return (
        <div>
            <ReactToPrint
                trigger={() => <Button>Print</Button>}
                content={() => ref.current}
            />
            <label htmlFor="fontSetting" style={{ fontSize:"18px" }}>폰트 변경</label>
            <Select id="fontSetting" onChange={onClickHandle}>
                <option>-- 폰트 선택 --</option>
                <option value="NotoSansKR">NotoSansKR</option>
                <option value="ChosunGs">초선Gs</option>
                <option value="궁서체">궁서체</option>
                <option value="굴림체">굴림체</option>
                <option value="돋움체">돋움체</option>
            </Select>
            <Button onClick={seeBackGround}>{see ? '배경보이기' : '배경숨기기'}</Button>
            <Button onClick={printSuccess}>출력완료</Button>
            <SettingRowContainer>
                <SettingContainer>
                    <H3>종목/순위/단체(소속)/성명 부분</H3>
                    <SettingSubContainer width="200px">
                        <h4>윗줄 간격 조정</h4>
                        <Button onClick={onTopChange}>좁히기</Button>
                        <Button onClick={onTopChange}>넓히기</Button>
                    </SettingSubContainer>
                    <SettingSubContainer width="200px">
                        <h4>아랫줄 간격 조정</h4>
                        <Button onClick={onBottomChange}>좁히기</Button>
                        <Button onClick={onBottomChange}>넓히기</Button>
                    </SettingSubContainer>
                    <SettingSubContainer width="200px">
                        <h4>상 하 조정</h4>
                        <Button onClick={onTextTopChange}>상</Button>
                        <Button onClick={onTextTopChange}>하</Button>
                    </SettingSubContainer>
                    <SettingSubContainer width="200px">
                        <h4>폰트 크기 조정</h4>
                        <Button onClick={onTextFontChange}>+</Button>
                        <Button onClick={onTextFontChange}>-</Button>
                    </SettingSubContainer>
                </SettingContainer>

                <SettingContainer>
                    <H3>상장 내용 작성 부분</H3>
                    <InputDiv>
                        <label id="prizeContent">상장 내용 작성</label>
                        <Input id="prizeContent" type="text" value={prizeContent} onChange={onPrizeContentHandle} />
                    </InputDiv>
                    <SettingSubContainer width="200px">
                        <h4>상 하 조정</h4>
                        <Button onClick={onContentTopChange}>상</Button>
                        <Button onClick={onContentTopChange}>하</Button>
                    </SettingSubContainer>
                    <SettingSubContainer width="200px">
                        <h4>폰트 크기 조정</h4>
                        <Button onClick={onContentFontChange}>+</Button>
                        <Button onClick={onContentFontChange}>-</Button>
                    </SettingSubContainer>
                </SettingContainer>

                <SettingContainer>
                    <H3>날짜 작성 부분</H3>
                    <InputDiv>
                        <label id="dayContent">날짜 내용 작성</label>
                        <Input id="dayContent" type="text" value={dayContent} onChange={onDayContentHandle} />
                    </InputDiv>
                    <SettingSubContainer width="200px">
                        <h4>상 하 조정</h4>
                        <Button onClick={onDayTopChange}>상</Button>
                        <Button onClick={onDayTopChange}>하</Button>
                    </SettingSubContainer>
                    <SettingSubContainer width="200px">
                        <h4>폰트 크기 조정</h4>
                        <Button onClick={onDayFontChange}>+</Button>
                        <Button onClick={onDayFontChange}>-</Button>
                    </SettingSubContainer>
                </SettingContainer>

                <SettingContainer>
                    <H3>협회 작성 부분</H3>
                    <InputDiv>
                        <label id="orgContent">협회 이름 작성</label>
                        <Input id="orgContent" type="text" value={orgContent} onChange={onOrgContentHandle} />
                    </InputDiv>
                    <SettingSubContainer width="200px">
                        <h4>상 하 조정</h4>
                        <Button onClick={onOrgTopChange}>상</Button>
                        <Button onClick={onOrgTopChange}>하</Button>
                    </SettingSubContainer>
                    <SettingSubContainer width="200px">
                        <h4>폰트 크기 조정</h4>
                        <Button onClick={onOrgFontChange}>+</Button>
                        <Button onClick={onOrgFontChange}>-</Button>
                    </SettingSubContainer>
                </SettingContainer>

                <SettingContainer>
                    <H3>협회장 작성 부분</H3>
                    <InputDiv>
                        <label id="leaderContent">협회장 이름 작성</label>
                        <Input id="leaderContent" type="text" value={leaderContent} onChange={onLeaderContentHandle} />
                    </InputDiv>
                    <SettingSubContainer width="200px">
                        <h4>상 하 조정</h4>
                        <Button onClick={onLeaderTopChange}>상</Button>
                        <Button onClick={onLeaderTopChange}>하</Button>
                    </SettingSubContainer>
                    <SettingSubContainer width="200px">
                        <h4>폰트 크기 조정</h4>
                        <Button onClick={onLeaderFontChange}>+</Button>
                        <Button onClick={onLeaderFontChange}>-</Button>
                    </SettingSubContainer>
                </SettingContainer>
            </SettingRowContainer>

            <Container ref={ref}>

                {data.filter((item) => item.printed === false).map(({cmptName, grade, playerAffiliation, playerName, printed}) => (
                    <PrizeContainer backgroundImg={see}>
                        <PrizeTextContainer top={textTop} fontSize={textFontSize}>
                            <PrizeSubContainer>
                                <Text paddingLeft={topLeft} fontFamily={font}>{cmptName}</Text>
                                <Text paddingRight={topRight} fontFamily={font}>{grade}</Text>
                            </PrizeSubContainer>
                            <PrizeSubContainer>
                                <Text paddingLeft={bottomLeft} fontFamily={font}>{playerAffiliation}</Text>
                                <Text paddingRight={bottomRight} fontFamily={font}>{playerName}</Text>
                            </PrizeSubContainer>
                        </PrizeTextContainer>
                        <ContentContainer top={contentTop} fontSize={contentFontSize}>
                            <Text fontFamily={font}>{prizeContent}</Text>
                        </ContentContainer>
                        <DayContainer top={dayTop} fontSize={dayFontSize}>
                            <Text fontFamily={font}>{dayContent}</Text>
                        </DayContainer>
                        <OrganizationContainer top={orgTop} fontSize={orgFontSize}>
                            <Text fontFamily={font}>{orgContent}</Text>
                        </OrganizationContainer >
                        <LeaderContainer top={leaderTop} fontSize={leaderFontSize}>
                            <Text fontFamily={font}>{leaderContent}</Text>
                        </LeaderContainer>
                    </PrizeContainer>
                ))}
                {/* {repeat()} */}
            </Container>
        </div>
    );
};

export default PrintPrizeFilter;