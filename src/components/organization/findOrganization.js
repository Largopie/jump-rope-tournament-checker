
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API } from '../../config';

const Container = styled.div`
    width: 100%;
    overflow: scroll;
`;

const DetailContent = styled.div`
`;

const SearchContainer = styled.div`
    margin: 15px 0px 15px 15px;
`;

const Search = styled.input`
    margin-left: 15px;
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
`;

const A = styled.a`
    cursor: pointer;
    text-decoration: none;
`;

const RowContainer = styled.div`
    
`;

const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
const FindOrganization = () => {
    const columns = ['단체번호', '단체이름', '이메일', '전화번호', '리더명', '리더전화번호'];

    const data = [
        {
        orgId: '0',
        orgName: '나단체임ㅋ',
        orgEmail: 'k123@dongyang.ac.kr',
        orgTel: '01001010101',
        orgLeaderName: 'Leader',
        leaderTel: '10101010101'
        },
        {
            orgId: '1',
            orgName: '나ㅋ',
            orgEmail: 'kyk@dongyang.ac.kr',
            orgTel: '123456789123',
            orgLeaderName: 'L123',
            leaderTel: '123123123'
        }
    ];

    // const [data, setData] = useState([]);
    const [val, setVal] = useState('');
    const [opt, setOpt] = useState('orgId');
    const [deleteResponse, setDeleteResponse] = useState(false);

    const [detail, setDetail] = useState({
        orgId: '',
        orgName: '',
        orgEmail: '',
        orgTel: '',
        orgLeaderName: '',
        leaderTel: '',
    });
    const [detailState, setDetailState] = useState(false);

    const detailOnChange = (e) => {
        setDetail((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value };
        });
    };

    const setValHandler = (e) => {
        setVal(e.target.value);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (window.confirm('수정하시겠습니까?')) {
            // axios.put 이용하여 수정값 JSON보내기
            alert('수정완료!');
        }
    };

    const handleCancel = () => {
        if (window.confirm('수정을 취소하시겠습니까?')) {
            setDetailState(false);
            alert('취소되었습니다!');
            setDetail({
                orgId: '',
                orgName: '',
                orgEmail: '',
                orgTel: '',
                orgLeaderName: '',
                leaderTel: '',
            });
        }
    };

    const doDelete = (e) => {
        console.log([Number(e.target.value)]);
        // if(window.confirm("정말 삭제하시겠습니까?")) {
        //     axios.delete(`${API.COMPETITION_DELETE}`,{
        //         data: [
        //             e.target.value
        //         ]
        //     }).then((res) => setDeleteResponse((state) => !state));
        // } else {
        //     alert('취소 되었습니다.');
        // }
        
    };

    const setOptHandler = (e) => {
        setOpt(e.target.value);
    };

    const updateOrg = (e) => {
        if (window.confirm('데이터를 수정하시겠습니까?')) {
            setDetail(data[e.target.innerText]);
            setDetailState(true);
        }
        
    };
    // useEffect(() => {
    //     axios.get(`${API.ORGANIZATION_FIND_ALL}`).then(
    //         (res) => setData(res.data)
    //     );
    // }, [deleteResponse]);

    return (
        <Container>
            <SearchContainer>
                <label htmlFor="search">단체 검색</label>
                <Search onChange={setValHandler} name="search" id="search" />
                
                <select name="searchOption" onChange={setOptHandler}>
                    <option value="">분류 선택</option>
                    <option value="orgId">단체번호</option>
                    <option value="orgName">단체이름</option>
                    <option value="orgEmail">이메일</option>
                    <option value="orgTel">전화번호</option>
                    <option value="orgLeaderName">리더명</option>
                    <option value="leaderTel">리더전화번호</option>
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
                    .map(({ orgId, orgName, orgEmail, orgTel, orgLeaderName, leaderTel}) => (
                        <tr key={orgId}>
                            <Td><A onClick={updateOrg}>{orgId}</A></Td>
                            <Td>{orgName}</Td>
                            <Td>{orgEmail}</Td>
                            <Td>{orgTel}</Td>
                            <Td>{orgLeaderName}</Td>
                            <Td>{leaderTel}</Td>
                            <Td><button value={orgId} onClick={doDelete}>삭제</button></Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {detailState ?
            <DetailContent>
                <form>
                    <ColumnContainer>
                        <h3>데이터 꽂히는지 확인</h3>
                        <input disabled type="text" value={detail.orgId}/>
                        <input type="text" name="orgName" value={detail.orgName} onChange={detailOnChange}/>
                        <input type="text" name="orgEmail" value={detail.orgEmail} onChange={detailOnChange}/>
                        <input type="text" name="orgTel" value={detail.orgTel} onChange={detailOnChange}/>
                        <input type="text" name="orgLeaderName" value={detail.orgLeaderName} onChange={detailOnChange}/>
                        <input type="text" name="leaderTel" value={detail.leaderTel} onChange={detailOnChange}/>
                        <input type="submit" onClick={handleOnSubmit} value="수정"/>
                        <input type="button" onClick={handleCancel} value="취소" />
                    </ColumnContainer>
                </form>
            </DetailContent>
            : null}
        </Container>
    );
}

export default FindOrganization;