import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import bgImg from './img/flag.jpg'

const StyledLink = styled(Link)`
    text-decoration: none;
`;

const ImgContainer = styled.div`
    text-align: center;
    margin: 10px;
    width: 150px;
    height: 60px;
`;



const Header = () => {
    return (
        <div>
            <ImgContainer><StyledLink to="/"><img src={bgImg} width="80px" height="50px" alt="backgroundImg" /><br/>Home</StyledLink></ImgContainer>
        </div>
    );
};

export default Header;