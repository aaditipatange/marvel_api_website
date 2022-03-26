import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
//import noImage from '../img/download.jpeg';
//import { makeStyles, Card, CardContent, CardMedia, Typography, CardHeader } from '@material-ui/core';
import '../App.css';
// const useStyles = makeStyles({
// 	card: {
// 		maxWidth: 550,
// 		height: 'auto',
// 		marginLeft: 'auto',
// 		marginRight: 'auto',
// 		borderRadius: 5,
// 		border: '1px solid #1e8678',
// 		boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
// 	},
// 	titleHead: {
// 		borderBottom: '1px solid #1e8678',
// 		fontWeight: 'bold'
// 	},
// 	grid: {
// 		flexGrow: 1,
// 		flexDirection: 'row'
// 	},
// 	media: {
// 		height: '100%',
// 		width: '100%'
// 	},
// 	button: {
// 		color: '#1e8678',
// 		fontWeight: 'bold',
// 		fontSize: 12
// 	}
// });

const md5 = require('blueimp-md5');
const publickey = '646c22ad868b1200b3d7197c31274da1';
const privatekey = '7b81ba2ba9c789b92452003d492daec9553f4dd4';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
//const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

const Character = () => {
	const [ charData, setCharData ] = useState(undefined);
	const [ loading, setLoading ] = useState(true);
	const NA='N/A';
	//const classes = useStyles();
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
					console.log(e);
				}
			}
			fetchData();
		},
		[ id ]
	);

	// let summary = null;
	// const regex = /(<([^>]+)>)/gi;
	// if (charData && charData.summary) {
	// 	summary = charData && charData.summary.replace(regex, '');
	// } else {
	// 	summary = 'No Summary';
	// }

	if (loading) {
		return (
			<div>
				<h2>Loading....</h2>
			</div>
		);
	} else {
		return (
			<div>
				{charData && charData.data.results[0].name ? charData.data.results[0].name: NA}<br/>
				{/* <img alt={charData.data.results[0].name} src={char.thumbnail.path}'/portrait_fantastic.'{char.thumbnail.extension}/> */}
				{charData && charData.data.results[0].description ? charData.data.results[0].description : NA }<br/>
				{charData && charData.data.results[0].comics.items ? charData.data.results[0].comics.items.map((comic)=>{ return <li>{comic.name}<br/></li>}):<li>N/A</li>}
				{/* {charData && charData.data.results[0].comics ? charData.data.results[0].comics.items.map((comic)=>{ 
					let comicId = comic.resourceURI.split('/')
					comicId = comicId[comicId.length-1];
					let link = 'comic/'+ comicId
					return <Redirect to={link}>{comic.name}<br/></Redirect>}):<li>N/A</li>}<br/> */}
				<br/>{charData && charData.data.results[0].series.items ? charData.data.results[0].series.items.map((series)=>{ return <Link to={series.resourceURI}>{series.name}<br/></Link>}):<li>N/A</li>}
				
            <br/><br/><Link to='/characters/page/0'>Back to all Characters...</Link>
			</div>
			

			// <Card className={classes.card} variant='outlined'>
			// 	<CardHeader className={classes.titleHead} title={charData.data.results.name} />
			// 	<CardMedia
			// 		className={classes.media}
			// 		component='img'
			// 		image={charData.image && charData.image.original ? charData.image.original : noImage}
			// 		title='show image'
			// 	/>

			// 	<CardContent>
			// 		<Typography variant='body2' color='textSecondary' component='span'>
			// 			<dl>
			// 				{/* <p>
			// 					<dt className='title'>Average Rating:</dt>
			// 					{charData && showData.rating.average ? <dd>{charData.rating.average}</dd> : <dd>N/A</dd>}
			// 				</p>
			// 				<p>
			// 					<dt className='title'>Offical Site:</dt>
			// 					{showData && showData.officialSite ? (
			// 						<dd>
			// 							<a rel='noopener noreferrer' target='_blank' href={showData.officialSite}>
			// 								{showData.name} Offical Site
			// 							</a>
			// 						</dd>
			// 					) : (
			// 						<dd>N/A</dd>
			// 					)}
			// 				</p>
			// 				<p>
			// 					<dt className='title'>Network:</dt>
			// 					{showData && showData.network ? <dd>{showData.network && showData.network.name}</dd> : <dd>N/A</dd>}
			// 				</p>
			// 				<p>
			// 					<dt className='title'>Language:</dt>
			// 					{showData && showData.language ? <dd>{showData.language}</dd> : <dd>N/A</dd>}
			// 				</p>
			// 				<p>
			// 					<dt className='title'>Runtime:</dt>
			// 					{showData && showData.runtime ? <dd>{showData.runtime + ' Min'}</dd> : <dd>N/A</dd>}
			// 				</p>
			// 				<p>
			// 					<dt className='title'>Premiered:</dt>
			// 					{showData && showData.premiered ? <dd>{formatDate(showData.premiered)}</dd> : <dd>N/A</dd>}
			// 				</p>
			// 				<p>
			// 					<dt className='title'>Country:</dt>
			// 					{showData && showData.network && showData.network.country.name ? (
			// 						<dd>{showData.network.country.name}</dd>
			// 					) : (
			// 						<dd>N/A</dd>
			// 					)}
			// 				</p>
			// 				<p>
			// 					<dt className='title'>Time Zone:</dt>
			// 					{showData && showData.network && showData.network.country.timezone ? (
			// 						<dd>{showData.network.country.timezone}</dd>
			// 					) : (
			// 						<dd>N/A</dd>
			// 					)}
			// 				</p>
			// 				<p>
			// 					<dt className='title'>Airtime:</dt>
			// 					{showData && showData.schedule.time ? <dd>{tConvert(showData.schedule.time)}</dd> : <dd>N/A</dd>}
			// 				</p>
			// 				<p>
			// 					<dt className='title'>Days Aired:</dt>
			// 					{showData && showData.schedule.days && showData.schedule.days.length >= 1 ? (
			// 						<span>
			// 							{showData.schedule.days.map((day) => {
			// 								if (showData.schedule.days.length > 1) return <dd key={day}>{day}s,</dd>;
			// 								return <dd key={day}>{day}s</dd>;
			// 							})}
			// 						</span>
			// 					) : (
			// 						<dd>N/A</dd>
			// 					)}
			// 				</p>
			// 				<p>
			// 					<dt className='title'>Status:</dt>
			// 					{showData && showData.status ? <dd>{showData.status}</dd> : <dd>N/A</dd>}
			// 				</p>

			// 				<p>
			// 					<dt className='title'>Genres:</dt>
			// 					{showData && showData.genres && showData.genres.length >= 1 ? (
			// 						<span>
			// 							{showData.genres.map((genre) => {
			// 								if (showData.genres.length > 1) return <dd key={genre}>{genre},</dd>;
			// 								return <dd key={genre}>{genre}</dd>;
			// 							})}
			// 						</span>
			// 					) : (
			// 						<dd>N/A</dd>
			// 					)}
			// 				</p> */}
			// 				<p>
			// 					<dt className='title'>Summary:</dt>
			// 					<dd>{summary}</dd>
			// 				</p>
			// 			</dl>
			// 			<Link to='/characters/page/0'>Back to all Characters...</Link>
			// 		</Typography>
			// 	</CardContent>
			// </Card>
		);
	}
};

export default Character;
