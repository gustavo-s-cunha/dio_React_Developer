import { useNavigate  } from "react-router-dom";
import { MdEmail, MdLock } from 'react-icons/md'
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';
import hexSha1 from "hex-sha1";

import { useForm } from "react-hook-form";


import { Container, Title, Column, TitleLogin, SubtitleLogin, EsqueciText, CriarText, Row, Wrapper } from './styles';

const Login = () => {
    const navigate = useNavigate()

    const { control, handleSubmit, formState: { errors  } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
      try {
        const password = hexSha1(formData.senha.trim());
        const response = await api.get('/users', {
          params: {
            email: formData.email.trim(),
            senha: password,
          },
        });

        const user = response?.data?.[0];

        if (user?.id) {
          navigate('/feed');
          return;
        }

        alert('Usuário ou senha inválido.');
      } catch (error) {
        console.error('Erro ao tentar fazer login:', error);
        alert('Erro ao realizar login. Tente novamente mais tarde.');
      }
    };

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                 e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                <TitleLogin>Faça seu login</TitleLogin>
                <SubtitleLogin>Faça a diferença</SubtitleLogin>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input required placeholder="E-mail" leftIcon={<MdEmail />} name="email"  control={control} />
                    {errors.email && <span>E-mail é obrigatório</span>}
                    <Input required type="password" placeholder="Senha" leftIcon={<MdLock />}  name="senha" control={control} />
                    {errors.senha && <span>Senha é obrigatório</span>}
                    <Button title="Entrar" variant="secondary" type="submit"/>
                </form>
                <Row>
                    <EsqueciText>Esqueci minha senha</EsqueciText>
                    <Button 
                      title={<CriarText>Criar Conta</CriarText>}
                      onClick={() => navigate('/register')}
                    />
                </Row>
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { Login }