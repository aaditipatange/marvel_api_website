import React from 'react';

const SearchShows = (props) => {
	const handleChange = (e) => {
		props.searchValue(e.target.value);
	};
	// const handleClickP = (p) => {
	// 	console.log(p);
	// }
	// function handleClickP(){
	// 	console.log(props.match.params.pagenum-1);
	// }
	// function handleClickN(){
	// 	console.log();
	// }
	return (
		<form
			method='POST '
			onSubmit={(e) => {
				e.preventDefault();
			}}
			name='formName'
			className='center'
		>
			<label>
				<span>Search Shows: </span>
				<input autoComplete='off' type='text' name='searchTerm' onChange={handleChange} />
			</label>
			<br/>
			<br/>
			{/* <button onClick={handleClickP()}> Previous Page</button> &nbsp;&nbsp; */}
		    {/* <button onClick={handleClickN(this.props.match.params.pagenum+1)}>Next Page</button> */}
		</form>
	);
};

export default SearchShows;
