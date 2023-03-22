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

const AddCompetition = () => {
    const [value, setValue] = useState({
        competitionName: '',
        recordingSheetName: '',
        competitionStartDate: '',
        competitionEndDate: '',
        startTime:'',
        endTime:'',
        competitionHost: '',
        hostEmailId: '',
        hostEmail: '',
        hostTel: '',
    });

    const onChangeHandler = (e) => {
        setValue((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value };
        });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (window.confirm('대회를 등록하시겠습니까?')){
            axios.post(API.COMPETITION_ADD, {
                competitionName: value.competitionName,
                recordingSheetName: value.recordingSheetName,
                competitionHost: value.competitionHost,
                hostEmail: `${value.hostEmailId}@${value.hostEmail}`,
                hostTel: value.hostTel,
                competitionStartDate: `${value.competitionStartDate}T${value.startTime}`,
                competitionEndDate: `${value.competitionEndDate}T${value.endTime}`
            }).then((res) => console.log(res));
            setValue({
                competitionName: '',
                recordingSheetName: '',
                competitionStartDate: '',
                competitionEndDate: '',
                startTime:'',
                endTime:'',
                competitionHost: '',
                hostEmailId: '',
                hostEmail: '',
                hostTel: '',
            });
        }
        
    };

    return (
        <Container>
            <Title><h2>대회 등록</h2></Title>
            <Form>
                <FormRowContainer>
                    <FormColumnContainer wid="60%" hei="100%">
                        <TextContainer><h3>대회 정보 입력</h3></TextContainer>
                        <label htmlFor="competitionName">대회명 </label>
                        <Input value={value.competitionName} wid="60%" id="competitionName" name="competitionName" onChange={onChangeHandler} type="text" />

                        <label htmlFor="recordingSheetName">기록지인쇄명</label>
                        <Input value={value.recordingSheetName} wid="60%" id="recordingSheetName" name="recordingSheetName" onChange={onChangeHandler} type="text" />
                        <FormRowContainer wid="100%" hei="100%">
                            <FormColumnContainer wid="50%">
                                <label htmlFor="competitionStartDate">대회 시작 날짜</label>
                                <Input value={value.competitionStartDate} wid="60%" id="competitionStartDate" name="competitionStartDate" onChange={onChangeHandler} type="date" />
                                <Input value={value.startTime} wid="60%" name="startTime" onChange={onChangeHandler} type="time" />
                            </FormColumnContainer>
                            <FormColumnContainer wid="50%">
                                <label htmlFor="competitionEndDate">대회 종료 날짜</label>
                                <Input value={value.competitionEndDate} wid="60%" id="competitionEndDate" name="competitionEndDate" onChange={onChangeHandler} type="date" />
                                
                                <Input value={value.endTime} wid="60%" name="endTime" onChange={onChangeHandler} type="time" />
                            </FormColumnContainer>
                        </FormRowContainer>
                    </FormColumnContainer>
                </FormRowContainer>
                
                <FormRowContainer>
                    <FormColumnContainer wid="60%" hei="100%">
                        <TextContainer><h3>개최측 정보입력</h3></TextContainer>
                        <label htmlFor="competitionHost">개최자</label>
                        <Input value={value.competitionHost} wid="60%" id="competitionHost" name="competitionHost" onChange={onChangeHandler} type="text" />
                        
                        <label htmlFor="orgEmailId">이메일</label>
                        <FormRowContainer>
                            <Input value={value.hostEmailId} wid="50%" id="hostEmailId" name="hostEmailId" onChange={onChangeHandler} type="text" />
                            <label htmlFor="hostEmail"> @</label>
                            <Select wid="50%" id="hostEmail" name="hostEmail" onChange={onChangeHandler}>
                                <option value="">직접입력</option>
                                <option>naver.com</option>
                                <option>gmail.com</option>
                                <option>nate.com</option>
                                <option>yahoo.com</option>
                                <option>hanmail.com</option>
                            </Select>
                            <Input type="text" name="hostEmail" value={value.hostEmail} onChange={onChangeHandler} />
                            
                        </FormRowContainer>
                        <label htmlFor="hostTel">개최측 전화번호</label>
                        <Input value={value.hostTel} wid="60%" id="hostTel" name="hostTel" onChange={onChangeHandler} type="text" />
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