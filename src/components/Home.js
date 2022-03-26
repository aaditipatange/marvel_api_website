import React from 'react';
import '../App.css';

const Home = () => {
	return (
		<div>
			<p>
				This is a Marvel Application where you can get information about Marvel Characters, Comics and Series. Please click on any of the aboce button 
				to explore the contents on this API.
			</p>

			{/* <p className='hometext'>
				The application queries two of TV Maze's end-points:{' '}
				<a rel='noopener noreferrer' target='_blank' href='http://api.tvmaze.com/shows'>
					http://api.tvmaze.com/shows
				</a>{' '}
				and{' '}
				<a rel='noopener noreferrer' target='_blank' href='http://api.tvmaze.com/search/shows?q=SEARCH_TERM'>
					http://api.tvmaze.com/search/shows?q=SEARCH_TERM
				</a>{' '}
				for searching the shows in the API (Where SEARCH_TERM is what the user types into the search input)
			</p> */}
		</div>
	);
};

export default Home;
