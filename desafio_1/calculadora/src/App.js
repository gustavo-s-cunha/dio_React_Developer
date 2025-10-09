
import Input from './components/Input';
import Button from './components/Button';

import { Container, Content, Row } from './styles';
import { useState } from 'react';

const App = () => {
  const [lastOperation, setLastOperation] = useState('');
  const [currentNumber, setCurrentNumber] = useState('0');
  const [firstNumber, setFirstNumber] = useState('0');
  const [operation, setOperation] = useState('');

  const handleOnClear = (last) => {
    setCurrentNumber('0');
    setFirstNumber('0');
    setOperation('');
    if (!last) {
      setLastOperation('');
    }
  };

  const handleAddNumber = (num) => {
    setCurrentNumber(prev => `${prev === '0' ? '' : prev}${num}`)
  }

  const handleOperation = (operat) => {
    if (firstNumber === '0') {
      // primeira operação
      setFirstNumber(String(currentNumber));
      setCurrentNumber('0');
      setOperation(operat);
      setLastOperation(String(currentNumber) + ' ' + operat);
    } else {
      // já existe uma operação em andamento → faz o cálculo parcial
      const operationResult = (() => {
        switch (operation) {
          case '+': return Number(firstNumber) + Number(currentNumber);
          case '-': return Number(firstNumber) - Number(currentNumber);
          case '*': return Number(firstNumber) * Number(currentNumber);
          case '/': return Number(firstNumber) / Number(currentNumber);
          default: return Number(currentNumber);
        }
      })();

      // acumula a expressão completa
      setLastOperation(prev => prev + ' ' + currentNumber + ' ' + operat);

      // atualiza estados para continuar a sequência
      setFirstNumber(String(operationResult));
      setCurrentNumber('0');
      setOperation(operat);
    }
  };

  const handleEquals = () => {
    if (firstNumber !== '0' && operation !== '' && currentNumber !== '0') {
      const operationResult = (() => {
        switch (operation) {
          case '+': return Number(firstNumber) + Number(currentNumber);
          case '-': return Number(firstNumber) - Number(currentNumber);
          case '*': return Number(firstNumber) * Number(currentNumber);
          case '/': return Number(firstNumber) / Number(currentNumber);
          default: return Number(currentNumber);
        }
      })();

      // aqui mostramos a expressão completa + resultado final
      setLastOperation(prev => prev + ' ' + currentNumber + ' = ' + operationResult);

      setCurrentNumber(String(operationResult));
      setFirstNumber('0');
      setOperation('');
    }
  };

  return (
    <Container>
      <Content>
        <Input value={lastOperation}/>
        <Input value={currentNumber}/>
        <Row>
          <Button label="x" onClick={() => handleOperation('*')}/>
          <Button label="/" onClick={() => handleOperation('/')}/>
          <Button label="c" onClick={() => handleOnClear()}/>
          <Button label="." onClick={() => handleAddNumber('.')}/>
        </Row>
        <Row>
          <Button label="7" onClick={() => handleAddNumber('7')}/>
          <Button label="8" onClick={() => handleAddNumber('8')}/>
          <Button label="9" onClick={() => handleAddNumber('9')}/>
          <Button label="-" onClick={() => handleOperation('-')}/>
        </Row>
        <Row>
          <Button label="4" onClick={() => handleAddNumber('4')}/>
          <Button label="5" onClick={() => handleAddNumber('5')}/>
          <Button label="6" onClick={() => handleAddNumber('6')}/>
          <Button label="+" onClick={() => handleOperation('+')}/>
        </Row>
        <Row>
          <Button label="1" onClick={() => handleAddNumber('1')}/>
          <Button label="2" onClick={() => handleAddNumber('2')}/>
          <Button label="3" onClick={() => handleAddNumber('3')}/>
          <Button label="=" onClick={handleEquals}/>
        </Row>
      </Content>
    </Container>
  );
}

export default App;
