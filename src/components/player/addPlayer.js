import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { API } from '../../config';

const Container = styled.div`
    padding: 15px;
    overflow: scroll;
`;

const Table = styled.table`
    border: 1px solid black;
    border-collapse: collapse;
`;

const TextContainer = styled.div`
    margin-bottom: 15px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 0 auto;
`;

const FormRowContainer = styled.div`
    display: flex;
    margin-bottom: 15px;
    flex-direction: row;
    width: ${(props) => props.wid};
    height: ${(props) => props.hei};
`;

const FormColumnContainer = styled.div`
    box-shadow: 0 0 0 1px black inset;
    display: flex;
    flex-direction: column;
    width: ${(props) => props.wid};
    height: ${(props) => props.hei};
`;

const Title = styled.div`
    margin-bottom: 10px;
    text-align: center;
`;

const Input = styled.input`
    margin-bottom: 10px;
    width: ${(props) => props.wid};
`;

const Select = styled.select`
    margin-bottom: 10px;
    width: ${(props) => props.wid};
`;

const AddPlayer = ({ setDetailPlayerState, setModal, competitionId, orgId, depList, events }) => {
    const [checkedList, setCheckedList] = useState([]);
    const [departId, setDepartId] = useState('');
    const [value, setValue] = useState({
        playerName: '',
        playerGender: '',
        playerBirth: '',
        playerTel: '',
        playerAffiliation: '',
    });

    const onChangeHandler = (e) => {
        setValue((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value };
        });
    };

    const onCheckHandler = (value, isChecked) => {
        if (isChecked) {
            setCheckedList((prevState) => {
                return [...prevState, value];
            });
        };

        if (!isChecked && checkedList.includes(value)) {
            setCheckedList(checkedList.filter((item) => item !== value));
        };

    };


    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (window.confirm('선수를 등록하시겠습니까?')) {
            axios.post(`${API.ATTEND_PLAYER}`, {
                cmptId: Number(competitionId),
                orgId: Number(orgId),
                cmptEventIds: checkedList,
                departId: Number(departId),
                playerName: value.playerName,
                playerGender: value.playerGender,
                playerBirth: value.playerBirth,
                playerTel: value.playerTel,
                playerAffiliation: value.playerAffiliation,
            });
            setModal(false);
            setDetailPlayerState(false);
        }

    };


    return (
        <Container>
            <Title><h2>선수 등록</h2></Title>
            <Form>
                <FormColumnContainer wid="60%">
                    <TextContainer><h3>선수 정보 입력</h3></TextContainer>

                    {/* 선수 이름 */}
                    <FormRowContainer>
                        <FormColumnContainer wid="60%">
                            <label htmlFor="playerName">선수 이름</label>
                            <Input value={value.playerName} onChange={onChangeHandler} type="text" id="playerName" name="playerName" />
                        </FormColumnContainer>
                    </FormRowContainer>

                    {/* 성별 */}
                    <FormColumnContainer wid="60%">
                        <FormRowContainer>
                            <FormColumnContainer wid="50%">
                                <label htmlFor="playerGender">성별</label>
                                <Select value={value.playerGender} wid="90%" onChange={onChangeHandler} name="playerGender" id="playerGender">
                                    <option value="">-- 성별 --</option>
                                    <option value="남">남성</option>
                                    <option value="여">여성</option>
                                </Select>
                            </FormColumnContainer>

                            {/* 나이 */}
                            <FormColumnContainer wid="50%">
                                <label html="playerBirth">생년월일</label>
                                <Input value={value.playerBirth} onChange={onChangeHandler} type="date" id="playerBirth" name="playerBirth" />
                            </FormColumnContainer>
                        </FormRowContainer>
                    </FormColumnContainer>

                    {/* 전화번호 */}
                    <FormRowContainer>
                        <FormColumnContainer wid="60%">
                            <label htmlFor="playerTel">전화번호</label>
                            <Input value={value.playerTel} maxLength="11" onChange={onChangeHandler} type="tel" id="playerTel" name="playerTel" />
                        </FormColumnContainer>
                    </FormRowContainer>

                    {/* <FormRowContainer>
                        <FormColumnContainer wid="60%">
                            <label htmlFor="playerAffiliation">소속명</label>
                            <Input value={value.playerAffiliation} onChange={onChangeHandler} type="text" id="playerAffiliation" name="playerAffiliation" />
                        </FormColumnContainer>
                    </FormRowContainer> */}

                    <FormRowContainer>
                        <FormColumnContainer wid="60%">
                            <label htmlFor="departId">부서선택</label>
                            <select id="departId" onChange={(e) => setDepartId(e.target.value)}>
                                {depList.map(({ departId, departName }) => (
                                    <option key={departId} value={departId}>{departName}</option>
                                ))}
                            </select>
                        </FormColumnContainer>
                    </FormRowContainer>
                    <FormRowContainer>
                        <FormColumnContainer wid="60%">
                            <label htmlFor="events">참가종목 선택</label>
                            <Table id="events">
                                <thead>
                                    <tr>
                                        <th>check</th>
                                        <th>이름</th>
                                    </tr>
                                </thead>
                                <tbody style={{ textAlign: "center" }}>
                                    {events.map(({ eventName, eventId }) => (
                                        <tr key={eventName}>
                                            <td><input type="checkbox" onChange={(e) => onCheckHandler(eventId, e.target.checked)} /></td>
                                            <td>{eventName}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </FormColumnContainer>
                    </FormRowContainer>
                </FormColumnContainer>
                <FormRowContainer>
                    <Input type="submit" value="선수 등록" onClick={onSubmitHandler} />
                </FormRowContainer>
            </Form>

        </Container>
    );
}

export default AddPlayer;