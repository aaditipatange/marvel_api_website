import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchShows from './SearchCharacters';
import noImage from '../img/download.jpeg';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, makeStyles } from '@material-ui/core';

import '../App.css';
const useStyles = makeStyles({
	card: {
		maxWidth: 250,
		height: 'auto',
		marginLeft: 'auto',
		marginRight: 'auto',
		borderRadius: 5,
		border: '1px solid #1e8678',
		boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
	},
	titleHead: {
		borderBottom: '1px solid #1e8678',
		fontWeight: 'bold'
	},
	grid: {
		flexGrow: 1,
		flexDirection: 'row'
	},
	media: {
		height: '100%',
		width: '100%'
	},
	button: {
		color: '#1e8678',
		fontWeight: 'bold',
		fontSize: 12
	}
});
const ShowList = (props) => {
	const regex = /(<([^>]+)>)/gi;
	const pagenum =Number(props.match.params.pagenum);
	const classes = useStyles();
	const [ loading, setLoading ] = useState(true);
	const [ searchData, setSearchData ] = useState(undefined);
	const [ showsData, setShowsData ] = useState(undefined);
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ error, setError ] = useState('');
	//const [ pagenum, setCurrentPage ] = useState(0);
	let card = null;
 
	function prevPage(){
	 console.log('Inside prevPage')
	 //console.log(page);
     //setCurrentPage(page-1);
	 console.log(pagenum);
	 let page = pagenum-1
	 window.location.href=`/shows/page/${page}`;
	}

	function nextPage(){
	 console.log('Inside nextPage')
     //setCurrentPage(page-(-1));
	 console.log(pagenum);
	 let page = pagenum+1;
	 window.location.href=`/shows/page/${page}`;
	}

	useEffect(() => {
		console.log('on load useeffect');
		async function fetchData() {
			try {
				const { data } = await axios.get('http://api.tvmaze.com/shows');
				setShowsData(data);
				setLoading(false);
			} catch (e) {
				console.log(e);
			}
		}
		fetchData();
	}, []);

	useEffect(
		() => {
			console.log('search useEffect fired');
			async function fetchData() {
				try {
					console.log(`in fetch searchTerm: ${searchTerm}`);
					const { data } = await axios.get('http://api.tvmaze.com/search/shows?q=' + searchTerm);
					setSearchData(data);
					setLoading(false);
				} catch (e) {
					console.log(e);
				}
			}
			if (searchTerm) {
				console.log ('searchTerm is set')
				fetchData();
			}
		},
		[ searchTerm ]
	);

	useEffect(
		() => {
			console.log('pagination useEffect fired');
			async function fetchData() {
				try {
					console.log(`in fetch pagenum: ${pagenum}`);
					const { data } = await axios.get(`http://api.tvmaze.com/shows?page=${pagenum}`);
					setShowsData(data);
					console.log(data);
					setLoading(false);
				} catch (error) {
					console.log(error);
					//throw new Error('404 Page not found');
					setError(error.message);
				}
			}
			if(pagenum){
				console.log('Page requested')
				fetchData();
				//window.location.href=`/shows/page/pagenum`
		}
			
		},
		[ pagenum ]
	);



	const searchValue = async (value) => {
		setSearchTerm(value);
	};
	const buildCard = (show) => {
		return (
			<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={show.id}>
				<Card className={classes.card} variant='outlined'>
					<CardActionArea>
						<Link to={`/shows/${show.id}`}>
							<CardMedia
								className={classes.media}
								component='img'
								image={show.image && show.image.original ? show.image.original : noImage}
								title='show image'
							/>

							<CardContent>
								<Typography className={classes.titleHead} gutterBottom variant='h6' component='h3'>
									{show.name}
								</Typography>
								<Typography variant='body2' color='textSecondary' component='p'>
									{show.summary ? show.summary.replace(regex, '').substring(0, 139) + '...' : 'No Summary'}
									<span>More Info</span>
								</Typography>
							</CardContent>
						</Link>
					</CardActionArea>
				</Card>
			</Grid>
		);
	};

	if (pagenum && searchTerm==="") {
		console.log("Inside Pagination")
		card =
			showsData &&
			showsData.map((show) => {
				return buildCard(show);
			});
	 } 

	 if (searchTerm) {
		card =
			searchData &&
			searchData.map((shows) => {
				let { show } = shows;
				return buildCard(show);
			});
	} else {
		card =
			showsData &&
			showsData.map((show) => {
				return buildCard(show);
			});
	}

	if (loading) {
		return (
			<div>
				<h2>Loading....</h2>
			</div>
		);
	}else if(error){
		return (
			<div>
				<h2>{error}</h2>
			</div>
		);
	} else {
		return (
			<div>
				<button disabled={pagenum>0?false:true} onClick={prevPage}>Previous Page</button>
				&nbsp;&nbsp;
				<button onClick={nextPage}>Next Page</button>
				{/* <a href={`/shows/page/${pagenum-1}`}>Previous Page</a>
				&nbsp;&nbsp;
				<a href={`/shows/page/${pagenum-(-1)}`}>Next Page</a> */}
				<br />
				<br />
				<SearchShows searchValue={searchValue} />
				
				<Grid container className={classes.grid} spacing={5}>
					{card}
				</Grid>
			</div>
		);
	}
};

export default ShowList;
