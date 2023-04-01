import React from 'react';
import styled from 'styled-components';

const Select = styled.select`
    margin-bottom: 10px;
    width: ${(props) => props.wid};
`;


const SelectDep = () => {
    return (
        <div>
            <label htmlFor="department">참가부</label>
            <Select id="department" name="department" wid="60%">
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
        </div>
    );
}