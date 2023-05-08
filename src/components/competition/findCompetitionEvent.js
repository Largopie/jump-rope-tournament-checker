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
    border-collapse: collapse;
    font-size: 0.7em;
    border: 1px solid black;
    margin: 0 auto;
    text-align: center;
    width: 98%;
    line-height: 30px;
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

const InputBtn = styled.input`
    margin: 20px;
    width: 100px;
    height: 40px;
    font-size: 20px;
    border : 1px solid #fcf;
    background-color: #ffc;
    :hover {
    background-color: #fcf;
    };
`;

const UpdateContainer = styled.div`
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
`;

const FindEvent = () => {
    const location = useLocation();
    const competitionId = location.state?.competitionId;
    const columns = [ '진행여부', '종목이름', '참가점수', '금상', '은상', '동상' ,
    '유치부 1등', '유치부 2등', '유치부 3등', 
    '초등 1 1등', '초등 1 2등', '초등 1 3등', 
    '초등 2 1등', '초등 2 2등', '초등 2 3등', 
    '초등 3 1등', '초등 3 2등', '초등 3 3등', 
    '초등 4 1등', '초등 4 2등', '초등 4 3등', 
    '초등 5 1등', '초등 5 2등', '초등 5 3등', 
    '초등 6 1등', '초등 6 2등', '초등 6 3등',
    '중고등부 1등', '중고등부 2등', '중고등부 3등',
    '일반부 1등', '일반부 2등', '일반부 3등'];
    const [data, setData] = useState([]);


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
                item.fstPrizeStandard = Number(item.fstPrizeStandard),
                item.sndPrizeStandard = Number(item.sndPrizeStandard),
                item.trdPrizeStandard = Number(item.trdPrizeStandard),
                
                item.kinderFstStandard = Number(item.kinderFstStandard),
                item.kinderSndStandard = Number(item.kinderSndStandard),
                item.kinderTrdStandard = Number(item.kinderTrdStandard),

                item.e1FstStandard = Number(item.e1FstStandard),
                item.e1SndStandard = Number(item.e1SndStandard),
                item.e1TrdStandard = Number(item.e1TrdStandard),

                item.e2FstStandard = Number(item.e2FstStandard),
                item.e2SndStandard = Number(item.e2SndStandard),
                item.e2TrdStandard = Number(item.e2TrdStandard),

                item.e3FstStandard = Number(item.e3FstStandard),
                item.e3SndStandard = Number(item.e3SndStandard),
                item.e3TrdStandard = Number(item.e3TrdStandard),

                item.e4FstStandard = Number(item.e4FstStandard),
                item.e4SndStandard = Number(item.e4SndStandard),
                item.e4TrdStandard = Number(item.e4TrdStandard),

                item.e5FstStandard = Number(item.e5FstStandard),
                item.e5SndStandard = Number(item.e5SndStandard),
                item.e5TrdStandard = Number(item.e5TrdStandard),

                item.e6FstStandard = Number(item.e6FstStandard),
                item.e6SndStandard = Number(item.e6SndStandard),
                item.e6TrdStandard = Number(item.e6TrdStandard),

                item.mhFstStandard = Number(item.mhFstStandard),
                item.mhSndStandard = Number(item.mhSndStandard),
                item.mhTrdStandard = Number(item.mhTrdStandard),
                
                item.cmFstStandard = Number(item.cmFstStandard),
                item.cmSndStandard = Number(item.cmSndStandard),
                item.cmTrdStandard = Number(item.cmTrdStandard)
            ))));
            axios.patch(`${API.COMPETITION_EVENT_UPDATAE}`, data).then(window.location.reload());
            // setUpdateState((state) => !state);
            // alert('수정 완료!');
        }else {
            alert('취소되었습니다.');
        }
        
    };

    // 종목번호, 종목이름, 진행여부, 참가점수, 1,2,3등점수
    useEffect(() => {
        axios.get(`${API.COMPETITION_EVENT_FIND}/${competitionId}?type=ALL`).then(
            (res) => setData(res.data)
        );
    },[competitionId]);

    // console.log(competitionId);

    console.log(data);
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
                    kinderFstStandard, kinderSndStandard, kinderTrdStandard,
                    e1FstStandard, e1SndStandard, e1TrdStandard,
                    e2FstStandard, e2SndStandard, e2TrdStandard,
                    e3FstStandard, e3SndStandard, e3TrdStandard,
                    e4FstStandard, e4SndStandard, e4TrdStandard,
                    e5FstStandard, e5SndStandard, e5TrdStandard,
                    e6FstStandard, e6SndStandard, e6TrdStandard,
                    mhFstStandard, mhSndStandard, mhTrdStandard,
                    cmFstStandard, cmSndStandard, cmTrdStandard}) => (
                        <tr key={cmptEventId+eventName}>
                            <Td><Input name={cmptEventId} type="checkbox" id="isProceed" checked={isProceed} onChange={handleOnChange} /></Td>
                            <Td>{eventName}</Td>
                            <Td><Input name={cmptEventId}  type="number" id="partPoint" value={partPoint} onChange={handleOnChange} /> </Td>
                            <Td><Input name={cmptEventId}  type="number" id="fstPrizeStandard" value={fstPrizeStandard} onChange={handleOnChange} /></Td>
                            <Td><Input name={cmptEventId}  type="number" id="sndPrizeStandard" value={sndPrizeStandard} onChange={handleOnChange} /></Td>
                            <Td><Input name={cmptEventId}  type="number" id="trdPrizeStandard" value={trdPrizeStandard} onChange={handleOnChange} /></Td>

                            <Td><Input name={cmptEventId} type="number" id="kinderFstStandard" value={kinderFstStandard} onChange={handleOnChange} /></Td>
                            <Td><Input name={cmptEventId} type="number" id="kinderSndStandard" value={kinderSndStandard} onChange={handleOnChange} /></Td>
                            <Td><Input name={cmptEventId} type="number" id="kinderTrdStandard" value={kinderTrdStandard} onChange={handleOnChange} /></Td>

                            <Td><Input name={cmptEventId} type="number" id="e1FstStandard" value={e1FstStandard} onChange={handleOnChange} /></Td>
                            <Td><Input name={cmptEventId} type="number" id="e1SndStandard" value={e1SndStandard} onChange={handleOnChange} /></Td>
                            <Td><Input name={cmptEventId} type="number" id="e1TrdStandard" value={e1TrdStandard} onChange={handleOnChange} /></Td>

                            <Td><Input name={cmptEventId} type="number" id="e2FstStandard" value={e2FstStandard} onChange={handleOnChange} /></Td>
                            <Td><Input name={cmptEventId} type="number" id="e2SndStandard" value={e2SndStandard} onChange={handleOnChange} /></Td>
                            <Td><Input name={cmptEventId} type="number" id="e2TrdStandard" value={e2TrdStandard} onChange={handleOnChange} /></Td>
                            
                            <Td><Input name={cmptEventId} type="number" id="e3FstStandard" value={e3FstStandard} onChange={handleOnChange} /></Td>
                            <Td><Input name={cmptEventId} type="number" id="e3SndStandard" value={e3SndStandard} onChange={handleOnChange} /></Td>
                            <Td><Input name={cmptEventId} type="number" id="e3TrdStandard" value={e3TrdStandard} onChange={handleOnChange} /></Td>

                            <Td><Input name={cmptEventId} type="number" id="e4FstStandard" value={e4FstStandard} onChange={handleOnChange} /></Td>
                            <Td><Input name={cmptEventId} type="number" id="e4SndStandard" value={e4SndStandard} onChange={handleOnChange} /></Td>
                            <Td><Input name={cmptEventId} type="number" id="e4TrdStandard" value={e4TrdStandard} onChange={handleOnChange} /></Td>

                            <Td><Input name={cmptEventId} type="number" id="e5FstStandard" value={e5FstStandard} onChange={handleOnChange} /></Td>
                            <Td><Input name={cmptEventId} type="number" id="e5SndStandard" value={e5SndStandard} onChange={handleOnChange} /></Td>
                            <Td><Input name={cmptEventId} type="number" id="e5TrdStandard" value={e5TrdStandard} onChange={handleOnChange} /></Td>

                            <Td><Input name={cmptEventId} type="number" id="e6FstStandard" value={e6FstStandard} onChange={handleOnChange} /></Td>
                            <Td><Input name={cmptEventId} type="number" id="e6SndStandard" value={e6SndStandard} onChange={handleOnChange} /></Td>
                            <Td><Input name={cmptEventId} type="number" id="e6TrdStandard" value={e6TrdStandard} onChange={handleOnChange} /></Td>

                            <Td><Input name={cmptEventId} type="number" id="mhFstStandard" value={mhFstStandard} onChange={handleOnChange} /></Td>
                            <Td><Input name={cmptEventId} type="number" id="mhSndStandard" value={mhSndStandard} onChange={handleOnChange} /></Td>
                            <Td><Input name={cmptEventId} type="number" id="mhTrdStandard" value={mhTrdStandard} onChange={handleOnChange} /></Td>

                            <Td><Input name={cmptEventId} type="number" id="cmFstStandard" value={cmFstStandard} onChange={handleOnChange} /></Td>
                            <Td><Input name={cmptEventId} type="number" id="cmSndStandard" value={cmSndStandard} onChange={handleOnChange} /></Td>
                            <Td><Input name={cmptEventId} type="number" id="cmTrdStandard" value={cmTrdStandard} onChange={handleOnChange} /></Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <UpdateContainer>
                <InputBtn type="button" value="수정" onClick={clickUpdateData} />
            </UpdateContainer>
        </Container>
    );
}

export default FindEvent;