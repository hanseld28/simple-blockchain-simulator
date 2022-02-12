import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Blockchain } from './app/blockchain';
import { Block } from './app/block';

const miac: Blockchain = new Blockchain();

function App() {
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState<string>();

  useEffect(() => {
    if (count) {
      setTimeout(() => {
        const block1 = new Block({
          nonce: count,
          data: `[MIAC] The block ${count}`,
          timeStamp: BigInt(Date.now()),
          previousHash: '',
        });

        miac.addNewBlock(block1);

        setStatus(undefined);

        console.log(miac);
      }, 1000);
    }
  }, [count]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => {
            setStatus('MINNING');
            setCount((count) => count + 1);
          }}>
            {status !== 'MINNING' ? `count is: ${count}` : 'minning...'}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
