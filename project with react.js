import { useState} from 'react';
import { FiSearch} from 'react-icons/fi';
import './styles.css';
import api from './services/api';

function App() {

  const [input, setInput] = useState('Teste Mzv')
  const [cep, setCep] = useState({});

 


   async function handleSearch(){

    if(input === ''){
      alert("Digite algum cep por favor:")
      return;
    }
  
    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
  
    }catch{
      alert("Ops... Erro ao buscar");
      setInput("")
    }
  }

  function handleKeyPress(event){
    if(event.key === 'Enter'){
      handleSearch();
    }
  }

 

  return (
    <div className="container">
      <h1 className="title">TESTE PROJETO BUSCADOR</h1>
      <div className="containerInput">
        <input type="text"
        placeholder="Digite seu cep..."
        value={input}
        onChange={(e) => setInput(e.target.value) }
        onKeyPress={handleKeyPress}/>

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color='#FFF'/>
        </button>
      </div>


      {Object.keys(cep).length > 0 && (
       <main>
       <h2>CEP: {cep.cep} </h2>

       <span>Rua: {cep.logradouro}</span>
       <span>Coplemento: {cep.complemento}</span>
       <span>Bairro: {cep.bairro}</span>
       <span>Local: {cep.localidade} - UF: {cep.uf}</span>
     </main> 
      )}
     
    </div>
  );
}

export default App;

and the css: 
.container{
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: linear-gradient(#121212, #212b46);
}

.title{
    font-size: 40px;
    color: #FFF;
    animation: flipTitle 2s;
}

@keyframes flipTitle{
    from{
       transform: rotateX(90deg);
    }
    to{
       transform: rotateX(0deg);
    }
}

.containerInput{
    background-color: rgba(255, 255, 255, 0.2);
    padding: 15px;
    margin: 34px;
    border-radius: 8px;
    display: flex;
    box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.5);
}

.containerInput input{
    background-color: transparent;
    border: 0;
    outline: none;
    color: #fff;
    font-size: 20px;
    margin-right: 8px;
}

.containerInput input::placeholder{
    color: #F1f1f1;
}

.buttonSearch{
    background-color: transparent;
    align-items: center;
    display: flex;
    justify-content: center;
    cursor: pointer;
    border: 0;
    transition: transform 0.5s;
}

.buttonSearch:hover{
    transform: scale(1.2);
}

main{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background-color: #fff;
    width: 500px;
    padding: 15px;
}

main h2 {
    margin: 16px 0;
    font-size: 40px;
    font-family: courier;
}

main span{
    margin-bottom: 16px;
    font-weight: bold;
    font-size: 20px;
    font-family: courier;
}

@media(width: 620px){
    .title{
        font-size: 60px;
    }

    main h2{
        font-size: 28px;
    }

    main{
        width: 80px;
        min-height: 250px;
    }
}



