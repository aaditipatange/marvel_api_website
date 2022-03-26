import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import SearchComics from './SearchComics';
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
const md5 = require('blueimp-md5');
const publickey = '646c22ad868b1200b3d7197c31274da1';
const privatekey = '7b81ba2ba9c789b92452003d492daec9553f4dd4';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/comics';
const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

const ComList = () => {
	const regex = /(<([^>]+)>)/gi;
	let page = useParams();
	page = parseInt(page.page);
	const itemsPerPage = 20;
	let itemState = itemsPerPage * page;
	const classes = useStyles();
	const [ loading, setLoading ] = useState(true);
	const [ searchData, setSearchData ] = useState(undefined);
	const [ comicData, setComicData ] = useState(undefined);
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ pageCount, setPageCount ] = useState(0);
	const [ itemOffset, setItemOffset ] = useState(0);
	const [ error, setError ] = useState('');
	
	let card = null;

	useEffect(() => {
		console.log('on load useeffect');
		setItemOffset(itemState);
		async function fetchData() {
			try {
				//setItemOffset(itemState);
				console.log(url);
				const { data } = await axios.get(baseUrl + '?offset='+itemOffset+'&limit=20&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash);
				setComicData(data);
				setPageCount(Math.ceil(data.data.total / itemsPerPage));
				setLoading(false);
				if(page>=(Math.ceil(data.data.total / itemsPerPage))){
					setError('404 Page not found');
				}
			} catch (e) {
				console.log(e);
			}
		}
		fetchData();
	}, [itemOffset,page,pageCount,itemState]);

	useEffect(
		() => {
			console.log('search useEffect fired');
			async function fetchData() {
				try {
					console.log(`in fetch searchTerm: ${searchTerm}`);
					const { data } = await axios.get(baseUrl+'?titleStartsWith='+ searchTerm +'&limit=20&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash);
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

	function prevPage(){
		console.log('Inside prevPage')
		//console.log(page);
		//setCurrentPage(page-1);
		let pagenum = window.location.href;
		pagenum = pagenum.split('/');
		pagenum = pagenum[pagenum.length-1];
		console.log(pagenum);
		pagenum = parseInt(pagenum)-1;
		window.location.href=`/comics/page/${pagenum}`;
	   }
   
	   function nextPage(){
		console.log('Inside nextPage')
		//setCurrentPage(page-(-1));
		let pagenum = window.location.href;
		pagenum = pagenum.split('/');
		pagenum = pagenum[pagenum.length-1];
		console.log(pagenum);
		pagenum = parseInt(pagenum)+1;
		window.location.href=`/comics/page/${pagenum}`;
	   }

	// useEffect(
	// 	() => {
	// 		console.log('pagination useEffect fired');
	// 		async function fetchData() {
	// 			try {
	// 				console.log(`in fetch pagenum: ${pagenum}`);
	// 				const { data } = await axios.get(`http://api.tvmaze.com/shows?page=${pagenum}`);
	// 				setShowsData(data);
	// 				console.log(data);
	// 				setLoading(false);
	// 			} catch (error) {
	// 				console.log(error);
	// 				//throw new Error('404 Page not found');
	// 				setError(error.message);
	// 			}
	// 		}
	// 		if(pagenum){
	// 			console.log('Page requested')
	// 			fetchData();
	// 			//window.location.href=`/shows/page/pagenum`
	// 	}
			
	// 	},
	// 	[ pagenum ]
	// );



	const searchValue = async (value) => {
		setSearchTerm(value);
	};
	const buildCard = (comic) => {
		return (
			<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={comic.id}>
				<Card className={classes.card} variant='outlined'>
					<CardActionArea>
						<Link to={`/comics/${comic.id}`}>
							<CardMedia
								className={classes.media}
								component='img'
								image={comic.thumbnail ? `${comic.thumbnail.path}/portrait_fantastic.${comic.thumbnail.extension}` : noImage}
								title='Comic image'
							/>

							<CardContent>
								<Typography className={classes.titleHead} gutterBottom variant='h6' component='h3'>
									{comic.title}
								</Typography>
								<Typography variant='body2' color='textSecondary' component='p'>
									{comic.description ? comic.description.replace(regex, '').substring(0, 139) + '...' : 'No Description'}
								</Typography>
							</CardContent>
						</Link>
					</CardActionArea>
				</Card>
			</Grid>
		);
	};

	// if (pagenum && searchTerm==="") {
	// 	console.log("Inside Pagination")
	// 	card =
	// 		showsData &&
	// 		showsData.map((show) => {
	// 			return buildCard(show);
	// 		});
	//  } 

	 if (searchTerm) {
		card =
			searchData &&
			searchData.data.results.map((comic) => {
				//let { show } = shows;
				return buildCard(comic);
			});
	} else {
		card =
			comicData &&
			comicData.data.results.map((comic) => {
				return buildCard(comic);
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
				<button disabled={page>0?false:true} onClick={prevPage}>Previous Page</button>
				&nbsp;&nbsp;
				<button disabled={page>=(pageCount-1)?true:false} onClick={nextPage}>Next Page</button><br/><br/>
				<SearchComics searchValue={searchValue} />
				<Grid container className={classes.grid} spacing={5}>
					{card}
				</Grid>
			</div>
		);
	}
};

export default ComList;
