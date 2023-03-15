import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
    text-decoration: none;
`;

const Header = () => {
    return (
        <div>
            <StyledLink to="/">Home</StyledLink>
        </div>
    );
};

export default Header;