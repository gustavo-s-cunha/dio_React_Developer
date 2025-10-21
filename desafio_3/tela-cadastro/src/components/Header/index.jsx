import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo-dio.png';
import { Button } from '../Button';

import { Container, Wrapper, BuscarInputContainer, Input, Row, Menu, MenuRight, UserPicture} from './styles';

const Header = ({autenticado}) => {
  const navigate = useNavigate();

  const handleClick = (page) => () => {
    if (page === 'SignIn') {
      navigate('/login');
    } else if (page === 'SignUp') {
      navigate('/register');
    } else {
      navigate('/');
    }
  };

  return (
    <Wrapper>
      <Container>
          <Row>
            <img src={logo} alt="Logo da dio"/>
            {autenticado ? (
              <>
               <BuscarInputContainer>
                <Input placeholder='Buscar...'/>
               </BuscarInputContainer>
                <Menu>Live Code</Menu>
                <Menu>Global</Menu>
              </>
            ) : null}
          </Row>
          <Row>
              {autenticado ? (
                <UserPicture src="https://avatars.githubusercontent.com/u/17752839?v=4"/>
              ) : (
              <>
                <MenuRight href="/">Home</MenuRight>
                <Button title="Entrar" onClick={handleClick('SignIn')}/>
                <Button title="Cadastrar" onClick={handleClick('SignUp')}/>
              </>)}
          </Row>
      </Container>
    </Wrapper>
  )
}

export { Header }
