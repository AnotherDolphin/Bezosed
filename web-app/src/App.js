import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import Transaction from './Transaction';

function App() {

  const [data, setData] = useState([]);

  const spendingTotal = data.reduce((prev,add)=> prev+add.amount, 0)
  const spentOnBezos = data.filter(t=> t.bezosed).reduce((prev,add)=> prev+add.amount, 0)

  const fetchAndSet = () =>{
    fetch('http://localhost:3000/transactions').then(async res => {
      let transaction = await res.json()
      setData(transaction)
    })
  }

  useEffect(() => {
    fetchAndSet();
    // periodically check backend to update transactions
    setInterval(() => {
      fetchAndSet()
    }, 300000);
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>welcome back to your</p>
        <h1>Bezos Scale</h1>
      </header>
      <div className='transactions'>
        Transactions (latest first)
        {data.length > 0 && (
            [...data].reverse().map(transaction => (
              <Transaction key={transaction.id} props={transaction} setParent={fetchAndSet}></Transaction>
            ))
        )}
      </div>
      <div className='total-div'>
        <h3>You gave Jeff Bezos</h3>
          <h2>${spentOnBezos}</h2>
        <h3>this month</h3>
        <p>Total spending: ${spendingTotal}</p>
        <p>
          Besoz takes 
          <span>
            {Math.round(spentOnBezos/spendingTotal*10000)/100}%
          </span>
          of all your spending
        </p>
      </div>
    </div>
  );
}

export default App;
