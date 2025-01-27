import styled from 'styled-components';

export const Text = styled.h1`
  font-size:  ${props =>  props.theme?.sizes?.fontSize  || '14px'};
  color: ${props => props.theme.colors.text};
`;