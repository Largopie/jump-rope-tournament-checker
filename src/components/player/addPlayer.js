import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { API } from '../../config';

const Container = styled.div`
    padding: 15px;
    overflow: scroll;
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

const AddPlayer = () => {
    const [value, setValue] = useState({
        playerName: '',
        playerGender: '',
        playerAge: '',
        playerTel: '',
        department: '',
    });

    const onChangeHandler = (e) => {
        setValue((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value };
        });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post(`${API.PLAYER_ADD}`, {
            playerName: value.playerName,
            playerGender: value.playerGender,
            playerAge: Number(value.playerAge),
            playerTel: value.playerTel,
            department: value.department
        });
    };

    console.log(value);

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

                    <FormColumnContainer wid="60%">

                        {/* 성별 */}
                        <FormRowContainer>
                            <FormColumnContainer wid="50%">
                                <label htmlFor="playerGender">성별</label>
                                <Select value={value.playerGender} wid="90%" onChange={onChangeHandler} name="playerGender" id="playerGender">
                                    <option value="male">남성</option>
                                    <option value="female">여성</option>
                                </Select>
                            </FormColumnContainer>

                            {/* 나이 */}
                            <FormColumnContainer wid="50%">
                                <label html="playerAge">나이</label>
                                <Input value={value.playerAge} onChange={onChangeHandler} type="number" id="playerAge" name="playerAge" />
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

                    {/* 참가부 */}
                    <FormRowContainer>
                        <FormColumnContainer wid="60%">
                            <label htmlFor="department">참가부</label>
                            <Select value={value.department} id="department" name="department" wid="60%" onChange={onChangeHandler}>
                                <option value="">-- 참가부 선택 --</option>
                                <option value="U">유치부</option>
                                <option value="1">초등 1학년부</option>
                                <option value="2">초등 2학년부</option>
                                <option value="3">초등 3학년부</option>
                                <option value="4">초등 4학년부</option>
                                <option value="5">초등 5학년부</option>
                                <option value="6">초등 6학년부</option>
                                <option value="J">중고등부</option>
                                <option value="N">일반부</option>
                            </Select>
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