import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import noImage from '../img/download.jpeg';
import { makeStyles, Card, CardContent, CardMedia, Typography, CardHeader } from '@material-ui/core';
import '../App.css';
const useStyles = makeStyles({
	card: {
		maxWidth: 550,
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
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';

const Character = () => {
	const [ charData, setCharData ] = useState(undefined);
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState('');
	const classes = useStyles();
	let {id} = useParams();
	
	useEffect(
		() => {
			console.log ("useEffect fired")
			async function fetchData() {
				try {
					const { data: char } = await axios.get(baseUrl+'/'+id+'?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash);
					setCharData(char);
					setLoading(false);
					console.log(char);
				} catch (e) {
					setError('404 Page not Found');
					setLoading(false);
					console.log(e);
				}
			}
			fetchData();
		},
		[ id ]
	);

	if (loading) {
		return (
			<div>
				<h2>Loading....</h2>
			</div>
		);
	}
	else if(error){
		return (
			<div>
				<h2>{error}</h2>
			</div>
		);
	} 
	else {
		return (
			
			<Card className={classes.card} variant='outlined'>
				<CardHeader className={classes.titleHead} title={charData.data.results[0].name} />
				<CardMedia
								className={classes.media}
								component='img'
								image={charData.data.results[0].thumbnail ? `${charData.data.results[0].thumbnail.path}/portrait_fantastic.${charData.data.results[0].thumbnail.extension}` : noImage}
								title='Char image'
							/>

				<CardContent>
					<Typography variant='body2' color='textSecondary' component='span'>
						<dl>
							<p>
								<dt className='title'>Description:</dt>
								{charData && charData.data.results[0].description ? <dd>{charData.data.results[0].description}</dd> : <dd>N/A</dd>}
							</p>
							 <p>
								<dt className='title'>Comics:</dt>
								{charData && charData.data.results[0].comics.items.length>0 ? (
									<dd>
										{charData.data.results[0].comics.items.map((comic)=>{ 
					                     let comicId = comic.resourceURI.split('/')
					                     comicId = comicId[comicId.length-1];
                                         let link = window.location.href.split('characters');
					                     link = link[0] +'comics/'+ comicId;
					                     return <a href={link}>{comic.name}<br/></a>})}
									</dd>
								) : (
									<dd>N/A</dd>
								)}
							</p>
							<p>
								<dt className='title'>Series:</dt>
								{charData && charData.data.results[0].series.items.length>0 ? (
									<dd>
										{charData.data.results[0].series.items.map((series)=>{ 
					                     let seriesId = series.resourceURI.split('/')
					                     seriesId = seriesId[seriesId.length-1];
                                         let link = window.location.href.split('characters');
					                     link = link[0] +'series/'+ seriesId;
					                     return <a href={link}>{series.name}<br/></a>})}
									</dd>
								) : (
									<dd>N/A</dd>
								)}
							</p>
						</dl>
						<Link to='/characters/page/0'>Back to all Characters...</Link>
					</Typography>
				</CardContent>
			</Card>
		);
	}
};

export default Character;
