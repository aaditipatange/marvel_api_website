// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React from 'react';
//import logo from './img/tvm-header-logo.png';
import logo from './logo.svg';
import './App.css';
import CharacterList from './components/CharacterList';
import Characters from './components/Characters';
import ComicList from './components/ComicList';
import Comics from './components/Comics';
import SeriesList from './components/SeriesList';
import Series from './components/Series';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

const App = () => {
	return (
		<Router>
			<div className='App'>
				<header className='App-header'>
					<img src={logo} className='App-logo' alt='logo' />
					<h1 className='App-title'>Welcome to the React.js TV Maze API Example</h1>
					<Link className='showlink' to='/'>
						Home
					</Link>
					<Link className='showlink' to='/characters/page/0'>
						Characters
					</Link>
                    <Link className='showlink' to='/comics/page/0'>
						Comics
					</Link>
                    <Link className='showlink' to='/series/page/0'>
						Series
					</Link>
				</header>
				<br />
				<br />
				<div className='App-body'>
          <Routes>
					<Route exact path='/' element={<Home/>} />
					<Route exact path='/characters/page/:page' element={<CharacterList/>} />
					<Route exact path='/characters/:id' element={<Characters/>} />
                    <Route exact path='/comics/page/:page' component={ComicList} />
					<Route exact path='/comics/:id' component={Comics} />
                    <Route exact path='/series/page/:page' component={SeriesList} />
					<Route exact path='/series/:id' component={Series} />
          </Routes>
				</div>
			</div>
		</Router>
	);
};

export default App;
