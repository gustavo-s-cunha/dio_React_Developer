
import { useState } from 'react';
import gitLogo from '../assets/github.png'
import Input from '../components/Input';
import Button from '../components/Button';
import ItemRepo from '../components/ItemRepo';
import { api } from '../services/api';

import { Container } from './styles';

function App() {
  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    await api.get(`repos/${currentRepo}`).then(res => {
      if (res.data?.id) {
        const isExist = repos.find(repo => repo.id === res.data.id);

        if (!isExist) {
          // console.log('Adicionando registro', res.data.id);
          setRepos(prev => [...prev, res.data]);
          setCurrentRepo('');
          return;
        }
      }
    }).catch(err => {
      alert('Repositório não encontrado');
      console.log(err);
    });
  }

  const handleRemoveRepo = (id) => {
    // console.log('Removendo registro', id);
    setRepos(prev => prev.filter(repo => repo.id !== id));
  }


  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt="github logo"/>
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)} />
      <Button onClick={handleSearchRepo}/>
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo}/>)}
    </Container>
  );
}

export default App;
