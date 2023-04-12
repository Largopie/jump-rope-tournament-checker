import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { API } from '../../config';

const Container = styled.div`
    width: 100%;
    overflow: scroll;
`;

const SearchContainer = styled.div`
    margin: 15px 0px 15px 15px;
`;

const Search = styled.input`
    margin-left: 15px;
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
`;

const H1 = styled.h1`
    margin: 15px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #1abc9c;
    :hover {
        color: #f1c40f;
    };
`;

const Form = styled.form`
    border: 1px solid blue;
    width: 350px;
    padding: 5px;
`;

const FindCompetition = () => {
    const columns = ['대회수정', '참가', '종목' ,'대회번호' ,'대회이름', '기록지명', '개최자명', '개최자이메일', '개최자전화번호', '대회시작날짜', '대회종료날짜'];

    // const dummy = [
    //     {
    //         competitionId: 0,
    //         competitionName: '동작구대회',
    //         recordingSheetName: '동작구대회',
    //         competitionHost: '김아무개',
    //         hostEmail: 'a123@naver.com',
    //         hostTel: '01023431234',
    //         competitionStartDate: '20230314',
    //         competitionEndDate: '20230315'
    //     },
    //     {
    //         competitionId: 1,
    //         competitionName: '강남구대회',
    //         recordingSheetName: '강남구대회',
    //         competitionHost: '박아무개',
    //         hostEmail: 'b123@naver.com',
    //         hostTel: '01013431234',
    //         competitionStartDate: '20230314',
    //         competitionEndDate: '20230315'
    //     },
    //     {
    //         competitionId: 2,
    //         competitionName: '구로구대회',
    //         recordingSheetName: '구로구대회',
    //         competitionHost: '임아무개',
    //         hostEmail: 'c123@naver.com',
    //         hostTel: '01012341234',
    //         competitionStartDate: '20230314',
    //         competitionEndDate: '20230315'
    //     },
    // ];

    const [data, setData] = useState([]);
    const [val, setVal] = useState('');
    const [opt, setOpt] = useState('competitionId');
    const [deleteResponse, setDeleteResponse] = useState(false);
    const [updateCmpt, setUpdateCmpt] = useState(false);
    const [render, setRender] = useState(false);
    const [detailCmpt, setDetailCmpt] = useState({
        competitionId: '',
        competitionName: '',
        recordingSheetName: '',
        competitionHost: '',
        hostEmail: '',
        hostTel: '',
        competitionStartDate: '',
        competitionStartTime: '',
        competitionEndDate: '',
        competitionEndTime: '',
    });

    const setValHandler = (e) => {
        setVal(e.target.value);
    };

    const dateFormat = (date) => {
        const dateStr = Date(date);
        const d = new Date(dateStr);   
        
        let month = d.getMonth() + 1;
        let day = d.getDate();
        let hour = d.getHours();
        let minute = d.getMinutes();
        // let second = d.getSeconds();
        

        month = month >= 10 ? month : '0' + month;
        day = day >= 10 ? day : '0' + day;
        hour = hour >= 10 ? hour : '0' + hour;
        minute = minute >= 10 ? minute : '0' + minute;
        // second = second >= 10 ? second : '0' + second;

        return d.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute;
    };

    const doDelete = (e) => {
        // console.log(Number(e.target.value));
        if(window.confirm("정말 삭제하시겠습니까?")) {
            axios.delete(`${API.COMPETITION_DELETE}/${e.target.value}`).then(res => console.log(res.data));
            window.location.reload();
        } else {
            alert('취소 되었습니다.');
        }
        
    };

    const cmptUpdate = (e) => {
        // axios로 대회정보 받아서 detailCmpt에 state 올리기
        axios.get(`${API.COMPETITION_FIND}/${e.target.value}`).then(
            (res) => setDetailCmpt({
                competitionId: res.data.competitionId,
                competitionName: res.data.competitionName,
                recordingSheetName: res.data.recordingSheetName,
                competitionHost: res.data.competitionHost,
                hostEmail: res.data.hostEmail,
                hostTel: res.data.hostTel,
                competitionStartDate: dateFormat(res.data.competitionStartDate).split(' ')[0],
                competitionStartTime: dateFormat(res.data.competitionStartDate).split(' ')[1],
                competitionEndDate: dateFormat(res.data.competitionEndDate).split(' ')[0],
                competitionEndTime: dateFormat(res.data.competitionEndDate).split(' ')[1],
            })
        );
        setUpdateCmpt(true);
    };

    const cancelSubmit = () => {
        alert('수정이 취소되었습니다');
        setUpdateCmpt(false);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        // console.log(new Date(detailCmpt.competitionStartDate + ' ' + detailCmpt.competitionStartTime).toISOString());
        // console.log(detailCmpt);
        axios.patch(`${API.COMPETITION_UPDATE}`, {
                competitionId: detailCmpt.competitionId,
                competitionName: detailCmpt.competitionName,
                recordingSheetName: detailCmpt.recordingSheetName,
                competitionHost: detailCmpt.competitionHost,
                hostEmail: detailCmpt.hostEmail,
                hostTel: detailCmpt.hostTel,
                competitionStartDate: new Date(detailCmpt.competitionStartDate + ' ' + detailCmpt.competitionStartTime).toISOString(),
                competitionEndDate: new Date(detailCmpt.competitionEndDate + ' ' + detailCmpt.competitionEndTime).toISOString()
        });
        setUpdateCmpt(false);
        alert('수정되었습니다');
        window.location.reload();
    };

    const setOptHandler = (e) => {
        setOpt(e.target.value);
    };

    const updateOnChange = (e) => {
        if (e.target.name.includes('Start', 'End')){
            
            setDetailCmpt((prevState) => {
                return {...prevState, [e.target.name] : e.target.value };
            });
        } else {
            setDetailCmpt((prevState) => {
                return {...prevState, [e.target.name] : e.target.value };
            });
        }
        
    };


    useEffect(() => {
        axios.get(`${API.COMPETITION_FIND_ALL}`).then(
            (res) => setData(res.data)
        );
    }, [deleteResponse]);

    // console.log(detailCmpt);

    return (
        <Container>
            <H1>대회 조회 및 참가 단체 신청</H1>
            <SearchContainer>
                <label htmlFor="search">대회 검색</label>
                <Search onChange={setValHandler} name="search" id="search" />
                
                <select name="searchOption" onChange={setOptHandler}>
                    <option value="">분류 선택</option>
                    <option value="competitionId">대회번호</option>
                    <option value="competitionName">대회이름</option>
                    <option value="recordingSheetName">기록지명</option>
                    <option value="competitionHost">개최자명</option>
                    <option value="hostEmail">개최자이메일</option>
                    <option value="hostTel">개최자전화번호</option>
                </select>
            </SearchContainer>
            <Table>
                <thead>
                    <tr>
                        {columns.map((column, idx) => (
                            <Th key={idx}>{column}</Th>
                        ))}
                        <Th>삭제여부</Th>
                    </tr>
                </thead>
                <tbody>
                    {data.filter(item => String(item[opt]).includes(val) )
                    .map(({ competitionId, competitionName, recordingSheetName, competitionHost, hostEmail, hostTel, competitionStartDate, competitionEndDate }) => (
                        <tr key={competitionId}>
                            <Td><button value={competitionId} onClick={cmptUpdate}>수정</button></Td>
                            <Td><StyledLink to="/competition/organization/choose"  state={{competitionId: competitionId}}>신청</StyledLink></Td>
                            <Td><StyledLink to="/event/find" state={{competitionId: competitionId}} >수정</StyledLink></Td>
                            <Td>{competitionId}</Td>
                            <Td>{competitionName}</Td>
                            <Td>{recordingSheetName}</Td>
                            <Td>{competitionHost}</Td>
                            <Td>{hostEmail}</Td>
                            <Td>{hostTel}</Td>
                            <Td>{competitionStartDate}</Td>
                            <Td>{competitionEndDate}</Td>
                            <Td><button value={competitionId} onClick={doDelete}>삭제</button></Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {updateCmpt ?
                <div>
                    <Form>
                        대회ID<input type="text" readOnly value={detailCmpt.competitionId} /><br/>
                        대회명<input type="text" name="competitionName" value={detailCmpt.competitionName} onChange={updateOnChange} /><br/>
                        기록지명<input type="text" name="recordingSheetName" value={detailCmpt.recordingSheetName} onChange={updateOnChange} /><br/>
                        주최자명<input type="text" name="competitionHost" value={detailCmpt.competitionHost} onChange={updateOnChange}/><br/>
                        이메일<input type="text" name="hostEmail" value={detailCmpt.hostEmail} onChange={updateOnChange}/><br/>
                        주최자번호<input type="text" name="hostTel" value={detailCmpt.hostTel} onChange={updateOnChange}/><br/>
                        대회시작날짜<input type="date" name="competitionStartDate" value={detailCmpt.competitionStartDate} onChange={updateOnChange} /><br/>
                        대회시작시간<input type="time" name="competitionStartTime" value={detailCmpt.competitionStartTime} onChange={updateOnChange} /><br/>
                        대회종료날짜<input type="date" name="competitionEndDate" value={detailCmpt.competitionEndDate} onChange={updateOnChange}/><br />
                        대회종료시간<input type="time" name="competitionEndTime" value={detailCmpt.competitionEndTime} onChange={updateOnChange}/><br />
                        <input type="submit" value="수정" onClick={onSubmit} />
                        <button onClick={cancelSubmit}>취소</button>
                    </Form>
                </div>
            : null}
        </Container>
    );
}

export default FindCompetition;