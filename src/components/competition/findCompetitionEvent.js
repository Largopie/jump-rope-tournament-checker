import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { API } from '../../config';

const Container = styled.div`
    width: 100%;
    overflow: scroll;
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
    margin: 0 auto;
`;

const Input = styled.input`
    width: 20px;
    outline: none;

`;

const FindEvent = () => {
    const location = useLocation();
    const competitionId = location.state?.competitionId;
    const columns = [ '진행여부', '종목이름', '참가점수', '금상', '은상', '동상', '1등점수', '2등점수', '3등점수', '4등점수', '5등점수' ];
    const [data, setData] = useState([]);
    const [updateState, setUpdateState] = useState(false);


    //isProceed, cmptEventId, eventName, partPoint, firstGrandPrizePoint, secondGrandPrizePoint, thirdGrandPrizePoint, fourthGrandPrizePoint, fifthGrandPrizePoint
    // const dummy = [
    //     {
    //         isProceed: true,
    //         cmptEventId: 1,
    //         eventName: '종목1',
    //         partPoint: 100,
    //         fstPrizeStandard: 10,
    //         sndPrizeStandard: 10,
    //         trdPrizeStandard: 10,
    //         firstGrandPrizePoint: 100,
    //         secondGrandPrizePoint: 100,
    //         thirdGrandPrizePoint: 100,
    //         fourthGrandPrizePoint: 100,
    //         fifthGrandPrizePoint: 100
    //     },
    //     {
    //         isProceed: true,
    //         cmptEventId: 2,
    //         eventName: '종목2',
    //         partPoint: 100,
    //         fstPrizeStandard: 10,
    //         sndPrizeStandard: 10,
    //         trdPrizeStandard: 10,
    //         firstGrandPrizePoint: 100,
    //         secondGrandPrizePoint: 100,
    //         thirdGrandPrizePoint: 100,
    //         fourthGrandPrizePoint: 100,
    //         fifthGrandPrizePoint: 100
    //     }
    // ];

    const handleOnChange = (e) => {
        setData(data.map(item => item.cmptEventId === Number(e.target.name) ? {...item, [e.target.id]: e.target.id === "isProceed" ? e.target.checked : e.target.value } : item))
    };

    const clickUpdateData = () => {
        // console.log(data);
        if(window.confirm('수정하시겠습니까?')) {
            setData(data.map((item => (
                item.partPoint = Number(item.partPoint),
                item.firstGrandPrizePoint = Number(item.firstGrandPrizePoint),
                item.secondGrandPrizePoint = Number(item.secondGrandPrizePoint),
                item.thirdGrandPrizePoint = Number(item.thirdGrandPrizePoint),
                item.fourthGrandPrizePoint = Number(item.fourthGrandPrizePoint),
                item.fifthGrandPrizePoint = Number(item.fifthGrandPrizePoint),
                item.fstPrizeStandard = Number(item.fstPrizeStandard),
                item.sndPrizeStandard = Number(item.sndPrizeStandard),
                item.trdPrizeStandard = Number(item.trdPrizeStandard)
            ))));
            axios.patch(`${API.COMPETITION_EVENT_UPDATAE}`, data);
            // setUpdateState((state) => !state);
            // alert('수정 완료!');
            window.location.reload();
        }else {
            alert('취소되었습니다.');
        }
        
    };

    // 종목번호, 종목이름, 진행여부, 참가점수, 1,2,3등점수
    useEffect(() => {
        axios.get(`${API.COMPETITION_EVENT_FIND}/${competitionId}?type=ALL`).then(
            (res) => setData(res.data)
        );
    },[competitionId, updateState]);

    // console.log(competitionId);


    return (
        <Container>
            <h3>종목 등록 / 점수 수정</h3>
            <Table>
                <thead>
                    <tr>
                        {columns.map((column, idx) => (
                            <Th key={idx}>{column}</Th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map(({ isProceed, cmptEventId, eventName,
                    partPoint, fstPrizeStandard, sndPrizeStandard, trdPrizeStandard,
                    firstGrandPrizePoint, secondGrandPrizePoint, thirdGrandPrizePoint, fourthGrandPrizePoint, fifthGrandPrizePoint }) => (
                        <tr key={cmptEventId+eventName}>
                            <Td><Input name={cmptEventId} type="checkbox" id="isProceed" checked={isProceed} onChange={handleOnChange} /></Td>
                            <Td>{eventName}</Td>
                            <Td><Input name={cmptEventId}  type="number" id="partPoint" value={partPoint} onChange={handleOnChange} /> </Td>
                            <Td><Input name={cmptEventId}  type="number" id="fstPrizeStandard" value={fstPrizeStandard} onChange={handleOnChange} /> </Td>
                            <Td><Input name={cmptEventId}  type="number" id="sndPrizeStandard" value={sndPrizeStandard} onChange={handleOnChange} /> </Td>
                            <Td><Input name={cmptEventId}  type="number" id="trdPrizeStandard" value={trdPrizeStandard} onChange={handleOnChange} /> </Td>
                            <Td><Input name={cmptEventId}  type="number" id="firstGrandPrizePoint" value={firstGrandPrizePoint} onChange={handleOnChange} /> </Td>
                            <Td><Input name={cmptEventId}  type="number" id="secondGrandPrizePoint" value={secondGrandPrizePoint} onChange={handleOnChange} /> </Td>
                            <Td><Input name={cmptEventId}  type="number" id="thirdGrandPrizePoint" value={thirdGrandPrizePoint} onChange={handleOnChange} /> </Td>
                            <Td><Input name={cmptEventId}  type="number" id="fourthGrandPrizePoint" value={fourthGrandPrizePoint} onChange={handleOnChange} /> </Td>
                            <Td><Input name={cmptEventId}  type="number" id="fifthGrandPrizePoint" value={fifthGrandPrizePoint} onChange={handleOnChange} /> </Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <input type="button" value="수정" onClick={clickUpdateData} />
        </Container>
    );
}

export default FindEvent;