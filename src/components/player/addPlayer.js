import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {API} from '../../config';

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
        playerAge: 0,
        playerTel: ''
    });

    const onChangeHandler = (e) => {
        setValue((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value };
        });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        
    };

    return (
        <Container>
            <Title><h2>선수 등록</h2></Title>
            <Form>
                <FormRowContainer>
                    <FormColumnContainer wid="60%">
                        <TextContainer><h3>선수 정보 입력</h3></TextContainer>

                        <FormRowContainer>
                            <FormColumnContainer wid="60%">
                                <label htmlFor="playerName">선수 이름</label>
                                <Input onChange={onChangeHandler} type="text" id="playerName" name="playerName" />
                            </FormColumnContainer>
                        </FormRowContainer>

                        <FormColumnContainer wid="60%">
                            <FormRowContainer>
                                <FormColumnContainer wid="50%">
                                    <label htmlFor="playerGender">성별</label>
                                    <Select wid="90%"    onChange={onChangeHandler} name="playerGender" id="playerGender">
                                        <option value="male">남성</option>
                                        <option value="female">여성</option>
                                    </Select>
                                </FormColumnContainer>
                                <FormColumnContainer wid="50%">
                                    <label html="playerAge">나이</label>
                                    <Input onChange={onChangeHandler} type="number" id="playerAge" name="playerAge" />
                                </FormColumnContainer>
                            </FormRowContainer>
                        </FormColumnContainer>
                        <FormRowContainer>
                            <FormColumnContainer wid="60%">
                                <label htmlFor="playerTel">전화번호</label>
                                <Input onChange={onChangeHandler} type="tel" id="playerTel" name="playerTel" />
                            </FormColumnContainer>
                        </FormRowContainer>
                    </FormColumnContainer>
                </FormRowContainer>
                <FormRowContainer>
                    <Input type="submit" value="선수 등록" onClick={onSubmitHandler} />
                </FormRowContainer>
            </Form>
        </Container>
    );
}

export default AddPlayer;