import styles from '../styles/Home.module.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Button } from '@chakra-ui/button';
import { AiOutlineHeart, AiOutlineStar } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import {
	SimpleGrid,
	Box,
	ButtonGroup,
	IconButton,
	Container,
	Img,
	Text,
	Link,
	Avatar,
	WrapItem,
	Wrap,
	Stack,
	HStack,
	VStack
} from '@chakra-ui/react';
import { ExternalLinkIcon, AddIcon } from '@chakra-ui/icons';
export default function Dashboard() {
	let url = 'https://bestresources.herokuapp.com/resource/';

	const [ data, setData ] = useState(null);
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState(null);

	useEffect(() => {
		if (!data) {
			axios(url)
				.then((response) => {
					console.log(response.data);
					setData(response.data);
				})
				.catch((error) => {
					console.error('Error fetching data: ', error);
					setError(error);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	});
	let data1 = [
		{
			id: 1,
			title: 'W3Schools',
			desc: 'W3Schools - Learn Web development',
			link: 'http://w3schools.com',
			star: true,
			topic: 'Web Development',
			likes: '33',
			url: 'https://www.codedino.org/codeDinoPics/w3schoolsLogo.png'
		},
		{
			id: 3,
			title: 'Django',
			desc: 'Django Documentation',
			link: 'https://docs.djangoproject.com/',
			star: false,
			topic: 'Web Development',
			likes: '34',
			url: 'https://kevin-brown.com/images/django-logo.svg'
		},
		{
			id: 4,
			title: 'OOPS',
			desc: 'Full roadmap and resources for OOPS',
			link: 'https://whimsical.com/object-oriented-programming-cheatsheet-by-love-babbar-YbSgLatbWQ4R5paV7EgqFw',
			star: true,
			topic: 'OOPS',
			likes: '67',
			url: 'https://via.placeholder.com/100?text=No+Image'
		},
		{
			id: 5,
			title: '450 DSA',
			desc: '450 DSA questions for placement by Love babbar (Tracker)',
			link: 'https://450-dsa-tracker.netlify.app/',
			star: false,
			topic: 'DSA',
			likes: '0',
			url: 'https://via.placeholder.com/1000?text=No+Image'
		},
		{
			id: 7,
			title: 'Photopea',
			desc: 'Photopea - Photoshop Alternative (web based)',
			link: 'https://www.photopea.com/',
			star: true,
			topic: 'Graphic Design',
			likes: '4',
			url: 'https://www.photopea.com/promo/thumb256.png'
		},
		{
			id: 8,
			title: 'Devhints',
			desc: 'Devhints - docs for almost every development framework/library',
			link: 'https://devhints.io/',
			star: true,
			topic: 'Docs',
			likes: '5',
			url: 'https://devhints.io/assets/favicon.png'
		}
	];
	if (loading)
		return (
			<div style={{ justifyContent: 'center', display: 'flex', marginTop: '15vh' }}>
				<div>
					<Text justifyContent="center" display="flex" fontSize="xxx-large" mb="8vh">
						Loading
					</Text>
					<Img src="/loading.webp" w="50vh" alt="loading" />{' '}
				</div>
			</div>
		);
	if (error)
		return (
			<div style={{ justifyContent: 'center', display: 'flex', marginTop: '15vh' }}>
				<div>
					<Text justifyContent="center" display="flex" fontSize="xxx-large" mb="8vh">
						Could not load :(
					</Text>
					<Img src="/loading.webp" w="50vh" alt="loading" />{' '}
				</div>
			</div>
		);

	return (
		<div id="main">
			<Head>
				<title>Best Resources</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Container colorScheme="brand" maxW="container.xl">
				<Text textAlign="center" my="4" fontSize="5xl" lineHeight="1.5">
					Welcome to <strong style={{ color: '#20b1ba' }}>BestResources</strong>
				</Text>
				<SimpleGrid columns={[ 1, 2, 3 ]} spacing="40px">
					{' '}
					{data1 ? (
						data1.map((x, index) => (
							<Box
								colorScheme="blue"
								_hover={{
									// transform: 'scale(1.02, 1.02)',
									transformStyle: 'preserve-3d',
									transform:
										'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg)',

									boxShadow: ' 0 5px 10px rgba(154,160,185,0.08),0 15px 40px rgba(166,173,201,0.3)'
								}}
								transform="translate3d(0px, 3px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg)"
								boxShadow="0 7px 30px -10px rgba(150,170,180,0.2)"
								outline="1px grey"
								p="1.5rem"
								transition="box-shadow 0.3s, transform 0.2s"
								// transition= ""
								fontFamily="montserrat"
								borderRadius="lg"
								border="1px"
								borderColor="gray.100"
							>
								<HStack alignItems="start" d="flex" mb="3">
									<Avatar borderRadius="lg" boxSize="100px" backgroundColor="white" src={x.url} />
									<Box>
										<Button
											leftIcon={
												<IconContext.Provider
													value={{
														size: '28px'
													}}
												>
													<div>
														<AiOutlineHeart />
													</div>
												</IconContext.Provider>
											}
											colorScheme="teal"
											variant="solid"
											pl="2"
										>
											{x.likes}
										</Button>
										{x.star ? (
											<IconButton
												icon={
													<IconContext.Provider
														value={{
															size: '28px'
														}}
													>
														<div>
															<AiOutlineStar />
														</div>
													</IconContext.Provider>
												}
												colorScheme="orange"
												variant="outline"
												right="5px"
												ml="1rem"
												p="2.5"
												_last="true"
											/>
										) : null}
									</Box>
								</HStack>
								<HStack mb="3">
									<Text style={{ fontWeight: '700' }}>
										{x.title}{' '}
										<Link key={index} target="_blank" rel="noreferrer" href={x.link} isExternal>
											<ExternalLinkIcon h="2.2em" w="1.8em" mx="2px" />
										</Link>
										<Text style={{ fontWeight: '400' }} color="gray.500">
											{x.desc}
										</Text>
									</Text>
								</HStack>
								<HStack>
									<Box border="2px" borderColor="teal.200" px="2" borderRadius="full">
										{x.topic}
									</Box>
								</HStack>
							</Box>
						))
					) : null}
				</SimpleGrid>
			</Container>
		</div>
	);
}
