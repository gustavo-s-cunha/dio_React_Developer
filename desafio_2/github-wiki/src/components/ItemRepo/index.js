import React from 'react'

import { ItemContainer } from './styles';

function ItemRepo({repo, handleRemoveRepo}) {
  const handleRemove = () => {
    handleRemoveRepo(repo.id)
  }

  return (
    <ItemContainer >
      <h3>{repo.name}</h3>
      <p>{repo.full_name}</p>
      <div>
        <button className="ver" onClick={() => window.open(repo.html_url, '_blank')}>
          Ver repositório
          {/* <a href={repo.html_url} rel="noreferrer" target="_blank">Ver repositório</a><br /> */}
        </button>
        <button className="remover" onClick={handleRemove}>
          Remover
        </button>
      </div>
      <hr />
    </ItemContainer>
  )
}

export default ItemRepo;
