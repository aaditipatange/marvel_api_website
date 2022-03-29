import React from 'react';
import logo from './img/download.png';
import './App.css';
import CharacterList from './components/CharacterList';
import Characters from './components/Characters';
import ComicList from './components/ComicList';
import Comics from './components/Comics';
import SeriesList from './components/SeriesList';
import Series from './components/Series';
import Home from './components/Home';
import Error from './components/Error';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

const App = () => {
	return (
		<Router>
			<div className='App'>
				<header className='App-header'>
					<img src={logo} className='App-logo' alt='logo' />
					<h1 className='App-title'>Welcome to the React.js Marvel application</h1>
					<h2 className='App-title'>Please click on below buttons for more Information</h2>
				</header>
				<br />
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
					<br />
					<br />
				<div className='App-body'>
          <Routes>
					<Route exact path='/' element={<Home/>} />
					<Route exact path='/characters/page/:page' element={<CharacterList/>} />
					<Route exact path='/characters/:id' element={<Characters/>} />
                    <Route exact path='/comics/page/:page' element={<ComicList/>} />
					<Route exact path='/comics/:id' element={<Comics/>} />
                    <Route exact path='/series/page/:page' element={<SeriesList/>} />
					<Route exact path='/series/:id' element={<Series/>} />
					<Route exact path='/*' element={<Error/>} />
					<Route exact path='/error' element={<Error/>} />
          </Routes>
				</div>
			</div>
		</Router>
	);
};

export default App;
