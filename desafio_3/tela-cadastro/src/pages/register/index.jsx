import { useNavigate } from "react-router-dom";
import { Container, Title, Column, SubtitleRegister, EsqueciText, CriarText, Row, Wrapper, TitleRegister, InformationRegister } from './styles';
import { Button } from '../../components/Button';
import { MdEmail, MdLock, MdPeople } from 'react-icons/md'
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';
import hexSha1 from "hex-sha1";

import { useForm } from "react-hook-form";

const Register = () => {
    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors } } = useForm({
      reValidateMode: 'onChange',
      mode: 'onChange',
    });

    const onSubmit = async (formData) => {
      try {
        const name = formData.name?.trim();
        const email = formData.email?.trim();
        const senha = formData.senha?.trim();

        if (!name || !email || !senha) {
          alert('Por favor, preencha todos os campos.');
          return;
        }

        const password = hexSha1(senha);

        api.post('/users', { name, email, senha: password })
          .then(({ data }) => {
            const user = Array.isArray(data) ? data[0] : data;

            if (user?.id) {
              navigate('/feed');
            } else {
              alert('Usuário ou senha inválido.');
            }
          })
          .catch((error) => {
            console.error('Erro ao tentar registrar o usuário:', error);
            alert('Erro ao realizar registro. Tente novamente mais tarde.');
          });

      } catch (error) {
        console.error('Erro ao tentar autenticar o usuário:', error);
        alert('Erro ao realizar login. Tente novamente mais tarde.');
      }
    };

    return (
      <>
        <Header />
        <Container>
          <Column>
            <Title>
              A plataforma para você aprender com experts, dominar as principais tecnologias e entrar mais rápido nas empresas mais desejadas.
            </Title>
          </Column>
          <Column>
            <TitleRegister>Comece agora grátis</TitleRegister>
            <Wrapper>
              <SubtitleRegister>Crie sua conta e faça a diferença.</SubtitleRegister>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Input required placeholder="Nome Completo" leftIcon={<MdPeople />} name="name" control={control} />
                  <Input required placeholder="E-mail" leftIcon={<MdEmail />} name="email" control={control} />
                  <Input required type="password" placeholder="Senha" leftIcon={<MdLock />} name="senha" control={control} />
                  {errors.senha && <span>Senha é obrigatório</span>}
                  <Button title="Cadastrar-se" variant="secondary" type="submit" />
                </form>
                <InformationRegister>
                  <br />
                  Ao clicar em "Cadastrar-se", declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.
                </InformationRegister>
                <Row>
                  <EsqueciText>Já tenho conta.</EsqueciText>
                  <Button 
                    title={<CriarText>Fazer login</CriarText>}
                    onClick={() => navigate('/login')}
                  />
                </Row>
            </Wrapper>
          </Column>
        </Container>
      </>
    )
}

export { Register }