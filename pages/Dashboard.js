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
	IconButton,
	Container,
	Img,
	Text,
	Link,
	Avatar,
	HStack,
	Center,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Input
} from '@chakra-ui/react';
import { ExternalLinkIcon, AddIcon } from '@chakra-ui/icons';
export default function Dashboard() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	let url = 'https://bestresources.herokuapp.com/resource/';
	// let url = 'http://localhost:8000/resource/';
	const [ load, setLoad ] = useState(false);
	const [ currentObject, setCurrentObject ] = useState(null);
	const [ data, setData ] = useState(null);
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState(null);
	const [ title, settitle ] = useState('');
	const [ description, setdescription ] = useState();
	const [ link, setlink ] = useState('');
	const [ likes, setlikes ] = useState('');
	const [ image, setimage ] = useState('');
	const [ topic, settopic ] = useState('');
	const [ id, setid ] = useState(null);
	const [ updated, setupdated ] = useState(false);
	const [refresh, setRefresh] = useState(true);
	function handleClose() {
		onClose();
	}
	function like(post) {
		console.log(post);
		axios({
			url: url + post.id + '/',
			method: 'PUT',
			data: post
		})
			.then((res) => {
				console.log(res);
				setRefresh(true);
			})
			.catch((err) => console.log(err));
	}
	function handleUpdate() {
		axios({
			url: url + id + '/',
			method: 'PUT',
			data: { title, description, link, topic, id, image, likes }
		})
			.then((res) => {
				console.log(res);
				setupdated(true);
				setLoad(false);
			})
			.catch((err) => console.log(err));
	}
	function handleEdit(id) {
		setLoad(true);
		onOpen();
		axios({
			url: url + id,
			method: 'get'
		})
			.then((res) => {
				console.log(res.data);
				setCurrentObject(res.data);
				settitle(res.data.title);
				setdescription(res.data.description);
				setlink(res.data.link);
				setlikes(res.data.likes);
				setimage(res.data.image);
				settopic(res.data.topic);
				setid(res.data.id);
				setLoad(false);
			})
			.catch((err) => {
				console.log(err);
				setLoad(false);
			});
	}
	useEffect(() => {
		if (refresh) {
			axios(url)
				.then((response) => {
					console.log(response.data);
					setData(response.data);
					setLoading(false);
				})
				.catch((error) => {
					console.error('Error fetching data: ', error);
					setError(error);
					setLoading(false);
				});
				setRefresh(false);
		}
	}),
		[ refresh ];

	if (loading)
		return (
			<div style={{ justifyContent: 'center', display: 'flex', marginTop: '15vh' }}>
				<div>
					<Text justifyContent="center" display="flex" fontSize="xxx-large" mb="8vh">
						Loading
					</Text>
					<Center pb={8}>
						<iframe
							style={{ width: '50vh' }}
							src="https://giphy.com/embed/RHEqKwRZDwFKE"
							frameBorder={0}
							className="giphy-embed"
							allowFullScreen
						/>
					</Center>

					<Text>Might take upto 30 seconds, API is on heroku :') </Text>

					{/* <Img src="/loading.webp"  alt="loading" />{' '} */}
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
				<Modal
					style={{ fontFamily: 'Product Sans' }}
					closeOnOverlayClick={true}
					onClose={onClose}
					isOpen={isOpen}
					motionPreset="slideInBottom"
					isCentered
				>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Modal Title</ModalHeader>

						<ModalBody>
							{load ? (
								<Center>Loading...</Center>
							) : (
								<Box>
									<Text mb="8px">title</Text>
									<Input
										value={title}
										placeholder="title"
										size="sm"
										onChange={(e) => settitle(e.target.value)}
									/>
									<Text mb="8px">description</Text>
									<Input
										value={description}
										placeholder="description"
										size="sm"
										onChange={(e) => setdescription(e.target.value)}
									/>
									<Text mb="8px">link</Text>
									<Input
										value={link}
										placeholder="link"
										size="sm"
										onChange={(e) => setlink(e.target.value)}
									/>
									<Text mb="8px">likes</Text>
									<Input
										value={likes}
										placeholder="likes"
										size="sm"
										onChange={(e) => setlikes(e.target.value)}
									/>
									<Text mb="8px">image</Text>
									<Input
										value={image}
										placeholder="image"
										size="sm"
										onChange={(e) => setimage(e.target.value)}
									/>
									<Text mb="8px">topic</Text>
									<Input
										value={topic}
										placeholder="topic"
										size="sm"
										onChange={(e) => settopic(e.target.value)}
									/>
								</Box>
							)}
						</ModalBody>
						<ModalFooter>
							<Button onClick={handleUpdate} colorScheme="teal" mr="4">
								Update
							</Button>
							<Button onClick={onClose}>Close</Button>
							{updated ? (
								<Text m="4" d="flex">
									Updated successfully
								</Text>
							) : null}
						</ModalFooter>
					</ModalContent>
				</Modal>
				<SimpleGrid columns={[ 1, 2, 3 ]} spacing="40px">
					{' '}
					{data ? (
						data.map((x, index) => (
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
									{/* <Box>{x.id}</Box> */}
									<Avatar borderRadius="lg" boxSize="100px" backgroundColor="white" src={x.image} />

									<Button
										onClick={(e) => like({ id: x.id, link: x.link, likes: x.likes + 1 })}
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
									<Button onClick={(e) => handleEdit(x.id)}>Edit</Button>
								</HStack>
								<HStack mb="3">
									<div style={{ fontWeight: '700' }}>
										{x.title}{' '}
										<Link key={index} target="_blank" rel="noreferrer" href={x.link} isExternal>
											<ExternalLinkIcon h="2.2em" w="1.8em" mx="2px" />
										</Link>
										<Text style={{ fontWeight: '400' }} color="gray.500">
											{x.description}
										</Text>
									</div>
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
