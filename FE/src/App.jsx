import './App.css';

// import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './components/authentication/LoginButton';
import LogoutButton from './components/authentication/LogoutButton';
import UserProfile from './components/UserProfile';
import ProtectedContent from './components/ProtectedContent';

function App() {
  return (
    <div className="App">
      <h1>Makers Agency Project 1</h1>
      <LoginButton />
      <LogoutButton />
      <UserProfile />
      <ProtectedContent />
    </div>
  )
}

export default App;



// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
