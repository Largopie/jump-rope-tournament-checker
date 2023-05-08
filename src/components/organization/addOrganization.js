import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {API} from '../../config';

const Container = styled.div`
    padding: 15px;
    overflow: scroll;
`;

const H1 = styled.h1`
    margin: 15px;
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

const Input = styled.input`
    outline: none;
    border-radius: 3px;
    margin-bottom: 10px;
    border: 2px solid ${(props) => props.Border};
    width: ${(props) => props.wid};
`;

const AddOrganization = () => {
    const [value, setValue] = useState({
        orgName: '',
        orgEmail: '',
        orgTel: '',
        orgLeaderName: '',
        leaderTel: '',
    });

    const onChangeHandler = (e) => {
        setValue((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value };
        });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (window.confirm('단체를 등록하시겠습니까?')) {
            axios.post(`${API.ORGANIZATION_ADD}`,{
                orgName: value.orgName,
                orgEmail: value.orgEmail,
                orgTel: value.orgTel,
                orgLeaderName: value.orgLeaderName,
                leaderTel: value.leaderTel,
            }).then((res) => res);
            setValue({
                orgName: '',
                orgEmail: '',
                orgTel: '',
                orgLeaderName: '',
                leaderTel: '',
            });
        }
    };

    return (
        <Container>
            <H1>단체 참가 등록</H1>
            <Form>
                <FormRowContainer>
                    <FormColumnContainer wid="60%">
                        <TextContainer><h3>단체 정보 입력</h3></TextContainer>
                        <label htmlFor="orgName">단체 참가명</label>
                        <Input Border="red" placeholder="필수입력" value={value.orgName} onChange={onChangeHandler} wid="60%" type="text" id="orgName" name="orgName" />

                        <label htmlFor="orgEmail">단체 이메일</label>
                        <Input  value={value.orgEmail} onChange={onChangeHandler}  wid="60%" type="email" id="orgEmail" name="orgEmail" />

                        <label htmlFor="orgTel">단체 전화번호</label>
                        <Input value={value.orgTel} onChange={onChangeHandler} wid="60%" type="tel" id="orgTel" name="orgTel" />
                    </FormColumnContainer>
                </FormRowContainer>

                <FormRowContainer>
                    <FormColumnContainer wid="60%">
                        <TextContainer><h3>리더 정보 입력</h3></TextContainer>
                        <label htmlFor="orgLeaderName">리더명</label>
                        <Input Border="red" placeholder="필수입력" value={value.orgLeaderName} onChange={onChangeHandler} wid="60%" type="text" id="orgLeaderName" name="orgLeaderName" />

                        <label htmlFor="leaderTel">리더 전화번호</label>
                        <Input Border="red" placeholder="필수입력" value={value.leaderTel} onChange={onChangeHandler} wid="60%" type="tel" id="leaderTel" name="leaderTel" />
                    </FormColumnContainer>
                </FormRowContainer>
                <FormRowContainer>
                    <Input type="submit" value="단체 등록" onClick={onSubmitHandler} />
                </FormRowContainer>
            </Form>
        </Container>
    );
}

export default AddOrganization;