import React, { useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import styled from 'styled-components';

const PrintContainer = styled.div`
    
`;

const PrizeContainer = styled.div`
    background-image: url('public/img/prize.jpg');
    width: 100%;
    height: 100%;
`;

const InputContainer = styled.div`
    box-shadow: 0 0 0 1px black inset;
    
`;

const Input = styled.input`
    outline: none;
`;

const Print = () => {
    const ref = useRef();
    const [value, setValue] = useState({
        competitionName: '',
        playerName: '',
    });

    const onChangeHandler = (e) => {
        setValue((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value };
        });
    };


    return (
        <div>
            <ReactToPrint 
                trigger={() => <button>Print</button>}
                content={() => ref.current}
            />
            <InputContainer>
                <label htmlFor="competitionName">대회이름</label>
                <Input type="text" id="competitionName" name="competitionName" value={value.competitionName} onChange={onChangeHandler} />

                <label htmlFor="playerName">선수이름</label>
                <Input type="text" id="playerName" name="playerName" value={value.playerName} onChange={onChangeHandler} />
            </InputContainer>
            <PrizeContainer ref={ref}>
                <h1>Print</h1>
                <h2>{value.competitionName}</h2>
                <h2>{value.playerName}</h2>
            </PrizeContainer>
        </div>
    );
};

export default Print;