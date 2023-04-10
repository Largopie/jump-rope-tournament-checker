import React, { useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import styled from 'styled-components';
import Image from './img/prize.jpg';

const Container = styled.div`
`;

const SettingRowContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const SettingContainer = styled.div`
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

const PrizeSubContainer = styled.div`
    text-align: center;
    width: 100%;
    display: flex;
    flex-direction: row;
`;

const Button = styled.button`
    width: 200px;
    height: 50px;
    font-size: 20px;
    background-color: #ffc;
    :hover {
    background-color: #fcf;

    }
`;

const InputDiv = styled.div`
    font-size: 30px;
`;

const Input = styled.input`
    font-size: 20px;
    width: 200px;
    height: 50px;
`;

const Text = styled.div`
    font-family: ${(props) => props.fontFamily};
    width: 100%;
    text-align: center;
    margin-bottom: 25px;
`;

const Select = styled.select`
    font-size: 20px;
    width: 200px;
    height: 50px;
`;

const PrintPrize = () => {
    const ref = useRef();
    const [value, setValue] = useState({
        competitionName: '',
        playerName: '',
        organizationName: '',
        rank: '',
    });

    const [font, setFont] = useState('');
    const [see, setSee] = useState(false);
    // Text State
    const [textTop, setTextTop] = useState(32);
    const [textFontSize, setTextFontSize] = useState(30);

    // Content State
    const [prizeContent, setPrizeContent] = useState('');
    const [contentFontSize, setContentFontSize] = useState(40);
    const [contentTop, setContentTop] = useState(35);

    // Day State
    const [dayContent, setDayContent] = useState('');
    const [dayFontSize, setDayFontSize] = useState(20);
    const [dayTop, setDayTop] = useState(38);

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
            setContentTop(contentTop - 1);
        };
        if (e.target.innerText === '하') {
            setContentTop(contentTop + 1);
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



    const repeat = () => {
        const result = [];
        for (let i = 0; i < 5; i++) {
            result.push(
                <PrizeContainer backgroundImg={see}>
                    <PrizeTextContainer top={textTop} fontSize={textFontSize}>
                        <PrizeSubContainer>
                            <Text fontFamily={font}>음악 줄넘기</Text>
                            <Text fontFamily={font}>3위</Text>
                        </PrizeSubContainer>
                        <PrizeSubContainer>
                            <Text fontFamily={font}>인터벌초등학교</Text>
                            <Text fontFamily={font}>김철민</Text>
                        </PrizeSubContainer>
                    </PrizeTextContainer>
                    <ContentContainer top={contentTop} fontSize={contentFontSize}>
                        <Text fontFamily={font}>{prizeContent}</Text>
                    </ContentContainer>
                    <DayContainer top={dayTop} fontSize={dayFontSize}>
                        <Text fontFamily={font}>{dayContent}</Text>
                    </DayContainer>
                </PrizeContainer>
            );
        };
        return result;
    };


    return (
        <div>
            <ReactToPrint
                trigger={() => <Button>Print</Button>}
                content={() => ref.current}
            />
            <label htmlFor="fontSetting" style={{ fontSize:"25px" }}>폰트 변경</label>
            <Select id="fontSetting" onChange={onClickHandle}>
                <option>-- 폰트 선택 --</option>
                <option value="NotoSansKR">NotoSansKR</option>
                <option value="ChosunGs">초선Gs</option>
                <option value="궁서체">궁서체</option>
                <option value="굴림체">굴림체</option>
                <option value="돋움체">돋움체</option>
            </Select>
            <Button onClick={seeBackGround}>{see ? '배경보이기' : '배경숨기기'}</Button>
            <SettingRowContainer>
                <SettingContainer>
                    <h1>종목/순위/단체(소속)/성명 부분</h1>
                    <SettingSubContainer width="400px">
                        <h2>상 하 조정</h2>
                        <Button onClick={onTextTopChange}>상</Button>
                        <Button onClick={onTextTopChange}>하</Button>
                    </SettingSubContainer>
                    <SettingSubContainer width="400px">
                        <h2>폰트 크기 조정</h2>
                        <Button onClick={onTextFontChange}>+</Button>
                        <Button onClick={onTextFontChange}>-</Button>
                    </SettingSubContainer>
                </SettingContainer>

                <SettingContainer>
                    <h1>상장 내용 작성 부분</h1>
                    <InputDiv>
                        <label id="prizeContent">상장 내용 작성</label>
                        <Input id="prizeContent" type="text" value={prizeContent} onChange={onPrizeContentHandle} />
                    </InputDiv>
                    <SettingSubContainer width="400px">
                        <h2>상 하 조정</h2>
                        <Button onClick={onContentTopChange}>상</Button>
                        <Button onClick={onContentTopChange}>하</Button>
                    </SettingSubContainer>
                    <SettingSubContainer width="400px">
                        <h2>폰트 크기 조정</h2>
                        <Button onClick={onContentFontChange}>+</Button>
                        <Button onClick={onContentFontChange}>-</Button>
                    </SettingSubContainer>
                </SettingContainer>

                <SettingContainer>
                    <h1>날짜 작성 부분</h1>
                    <InputDiv>
                        <label id="dayContent">날짜 내용 작성</label>
                        <Input id="dayContent" type="text" value={dayContent} onChange={onDayContentHandle} />
                    </InputDiv>
                    <SettingSubContainer width="400px">
                        <h2>상 하 조정</h2>
                        <Button onClick={onDayTopChange}>상</Button>
                        <Button onClick={onDayTopChange}>하</Button>
                    </SettingSubContainer>
                    <SettingSubContainer width="400px">
                        <h2>폰트 크기 조정</h2>
                        <Button onClick={onDayFontChange}>+</Button>
                        <Button onClick={onDayFontChange}>-</Button>
                    </SettingSubContainer>
                </SettingContainer>
            </SettingRowContainer>

            <Container ref={ref}>
                {/* <PrizeContainer  backgroundImg={see}>
                    <PrizeTextContainer>
                        <PrizeSubContainer>
                            <Text fontFamily={font}>음악 줄넘기</Text>
                            <Text fontFamily={font}>3위</Text>
                        </PrizeSubContainer>
                        <PrizeSubContainer>
                            <Text fontFamily={font}>인터벌초등학교</Text>
                            <Text fontFamily={font}>김철민</Text>
                        </PrizeSubContainer>
                    </PrizeTextContainer>
                    <ContentContainer>
                        <Text fontFamily={font}>{prizeContent}</Text>
                    </ContentContainer>
                    <DayContainer fontSize={dayFontSize}>
                        <Text fontFamily={font}>2023년 4월 3일</Text>
                    </DayContainer>
                </PrizeContainer> */}
                {repeat()}
            </Container>
        </div>
    );
};

export default PrintPrize;