import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {API} from '../../config';

const Container = styled.div`
    padding: 15px;
    overflow: scroll;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
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

const AddCompetition = () => {
    const [value, setValue] = useState({
        name: '',
        printName: '',
        startDate: '',
        endDate: '',
        startTime:'',
        endTime:'',
        organizer: '',
        orgEmailId: '',
        orgEmailEnd: '',
        orgTel: '',
    });

    const onChangeHandler = (e) => {
        setValue((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value };
        });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post(API.COMPETITION_ADD, {
            competitionName: value.name,
            recordingSheetName: value.printName,
            competitionHost: value.organizer,
            hostEmail: `${value.orgEmailId}@${value.orgEmailEnd}`,
            hostTel: value.orgTel,
            competitionStartDate: `${value.startDate}T${value.startTime}`,
            competitionEndDate: `${value.endDate}T${value.endTime}`
        }).then((res) => console.log(res));
    };

    return (
        <Container>
            <Title><h2>대회 개최 상세내역</h2></Title>
            <Form>
                <FormRowContainer>
                    <FormColumnContainer wid="60%" hei="100%">
                        <h3>대회 정보 입력</h3><br />
                        <label htmlFor="name">대회명 </label>
                        <Input wid="60%" id="name" name="name" onChange={onChangeHandler} type="text" />

                        <label htmlFor="printName">기록지인쇄명</label>
                        <Input wid="60%" id="printName" name="printName" onChange={onChangeHandler} type="text" />
                    </FormColumnContainer>
                </FormRowContainer>
                <FormRowContainer wid="60%" hei="100%">
                    <FormColumnContainer wid="50%">
                        <label htmlFor="startDate">대회 시작 날짜</label>
                        <Input wid="60%" id="startDate" name="startDate" onChange={onChangeHandler} type="date" />
                        <Input wid="60%" name="startTime" onChange={onChangeHandler} type="time" />
                    </FormColumnContainer>
                    <FormColumnContainer wid="50%">
                        <label htmlFor="endDate">대회 종료 날짜</label>
                        <Input wid="60%" id="endDate" name="endDate" onChange={onChangeHandler} type="date" />
                        
                        <Input wid="60%" name="endTime" onChange={onChangeHandler} type="time" />
                    </FormColumnContainer>
                </FormRowContainer>
                <FormRowContainer>
                    <FormColumnContainer wid="60%" hei="100%">
                        <h3>개최측 정보입력</h3><br />
                        <label htmlFor="organizer">개최자</label>
                        <Input wid="60%" id="organizer" name="organizer" onChange={onChangeHandler} type="text" />
                        <label htmlFor="orgEmailId">이메일</label>
                        <FormRowContainer>
                            <Input wid="50%" id="orgEmailId" name="orgEmailId" onChange={onChangeHandler} type="text" />
                            <label htmlFor="orgEmailEnd"> @</label>
                            <Select wid="50%" id="orgEmailEnd" name="orgEmailEnd" onChange={onChangeHandler}>
                                <option value="">직접입력</option>
                                <option>naver.com</option>
                                <option>gmail.com</option>
                                <option>nate.com</option>
                                <option>yahoo.com</option>
                                <option>hanmail.com</option>
                            </Select>
                            <Input type="text" name="orgEmailEnd" value={value.orgEmailEnd} onChange={onChangeHandler} />
                            
                        </FormRowContainer>
                        <label htmlFor="orgTel">개최측 전화번호</label>
                        <Input wid="60%" id="orgTel" name="orgTel" onChange={onChangeHandler} type="text" />
                    </FormColumnContainer>
                </FormRowContainer>
                <FormRowContainer wid="60%" hei="100%">
                    <Input type="submit" value="대회 등록" onClick={onSubmitHandler} />
                </FormRowContainer>
            </Form>
        </Container>
    );
}

export default AddCompetition;