import Head from 'next/head';
import styles from '../styles/Home.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
export default function Home() {
	let url = 'https://bestresources.herokuapp.com/resource/';

	const [ data, setData ] = useState(null);
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState(null);

	useEffect(() => {
		const ac = new AbortController();
		axios(url)
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {
				console.error('Error fetching data: ', error);
				setError(error);
			})
			.finally(() => {
				setLoading(false);
			})
			.then(() => {
				ac.abort();
			});
	});
	if (loading) return 'Loading...';
	if (error) return 'Error!';
	let style = {
		margin: '20px',
		background: '#eeeeee',
		textDecoration: 'none'
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Best Resources</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to <strong style={{color:"#20b1ba"}}>BestResources</strong>
				</h1>
			<div className={styles.grid}>	{data ? (
					data.map((x) => (
						<a href={x.link} className={styles.card} target="_blank" rel="noreferrer">
							<h3>{x.title}</h3>
							<p>{x.title}</p>
						</a>
					))
				) : null}
				
					
					
				</div>
			</main>

		
		</div>
	);
}
