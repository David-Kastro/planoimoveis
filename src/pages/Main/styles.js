import styled from 'styled-components';

export const Container = styled.View`
    flex: 1;
`;

export const AnnotationContainer = styled.View`
  alignItems: center;
  justifyContent: center;
  backgroundColor: ${props => props.backgroundColor};
  borderRadius: 5;
  padding: 5px;
`;

export const AnnotationText = styled.Text`
  fontSize: 14px;
  color: #FFF;
`;