import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'  // UseNavigate instead of useHistory


const Signup = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast()
    const history = useHistory()

    const handleClick = () => setShow(!show)

    // https://api.cloudinary.com/v1_1/dtziay36d/image/upload
    // const postDetails =(pics)=>{
    //     setLoading(true)
    //     if(pic === undefined){
    //         // meaning of this if
    //         // if the image is not in the correct format, it will not be uploaded
    //         toast({
    //             title: 'Please select image.',
    //             status: 'warning',
    //             duration: 5000,
    //             isClosable: true,
    //             position:"bottom"
    //         })
    //         return
    //     }

    //     if (pics.type === "image/jpeg" || pics.type === "image/png"){
    //         // meaning of this if
    //         // if the image is in the correct format, it will be uploaded
    //         const data = new FormData();
    //         data.append("file", pics);
    //         data.append("upload_preset", "chat-app");
    //         data.append("cloud_name", "piyushproj");
    //         fetch("https://api.cloudinary.com/v1_1/dtziay36d/image/upload", {
    //             method: "post",
    //             body: data,
    //         }).then((res)=> res.json()) // meaning is  to convert the response to json
    //         .then((data)=>{
    //             setPic(data.url.toString());
    //             console.log(data.url.toString());
    //         })
    //         .catch((err)=>{
    //             console.log(err)
    //             setLoading(false)
    //         })
    //     }else{
    //         toast({
    //             title: 'Please select image.',
    //             status: 'warning',
    //             duration: 5000,
    //             isClosable: true,
    //             position: "bottom"
    //         })
    //         setLoading(false)
    //         return
    //     }
    // }

    const postDetails = (pics) => {
        setLoading(true);

        if (pics === undefined) {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        if (pics.type !== "image/jpeg" && pics.type !== "image/png") {
            toast({
                title: "Please Select a JPEG or PNG Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        if (pics.type === "image/jpeg" || pics.type === "image/png") {

            const data = new FormData()
            data.append("file", pics)
            data.append("upload_preset",
                "LetsChat"
            )
            data.append("cloud_name",
                "dtziay36d"
            )
            axios.post("https://api.cloudinary.com/v1_1/dtziay36d/image/upload", data)
                .then((response) => {
                    console.log("Cloudinary response:", response);
                    setPic(response.data.url.toString());
                    setLoading(false);
                    toast({
                        title: "Image uploaded successfully!",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom",
                    });
                })
                .catch((error) => {
                    console.log("Cloudinary error:", error);
                    setLoading(false);
                });
        }
    }

    const submitHandler = async () => {
        if (
            !name ||
            !email ||
            !password ||
            !confirmpassword
        ) {
            toast({
                title: "Please fill all the required fileds",
                status: "waring",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false)
            return;
        }

        if (
            password !== confirmpassword
        ) {
            toast({
                title: "Password does not matches",
                status: "waring",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false)
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const { data } = await axios.post(
                "/api/user",   
                {
                    name,email,password, pic
                },
                config
            );

            toast({
                title: "Registration Sucessful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

            localStorage.setItem('userInfo')
            setLoading(false)
            history.push('/chats')
        } catch (error) {
            toast({
                title: "Error occurs",
                description:error.response.data.messsage,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false)
        } 

    }

    return (
        <VStack
            spacing={"5px"}
            color={"black"}
        >
            <FormControl id={"name"} isRequired >
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder='Enter your name'
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                    value={name}
                />
            </FormControl>
            <FormControl id={"email"} isRequired >
                <FormLabel>Email</FormLabel>
                <Input
                    placeholder='Enter your email'
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                    value={email}
                />
            </FormControl>
            <FormControl id={"password"} isRequired >
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? "text" : 'password'}
                        placeholder='Enter your email'
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        value={password}
                    />
                    <InputRightElement
                        width="4.5rem"
                    >
                        <Button h={"1.75rem"} size={"sm"} fontSize={"sm"} colorScheme={"yellow"}
                            onClick={handleClick}
                        >
                            {
                                show ?
                                    "hide" :
                                    "show"

                            }
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id={"confirmpassword"} isRequired >
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? "text" : 'password'}
                        placeholder='Enter your email'
                        onChange={(e) => {
                            setConfirmpassword(e.target.value)
                        }}
                        value={confirmpassword}
                    />
                    <InputRightElement
                        width="4.5rem"
                    >
                        <Button h={"1.75rem"} size={"sm"} fontSize={"sm"} colorScheme={"yellow"}
                            onClick={handleClick}
                        >
                            {
                                show ?
                                    "hide" :
                                    "show"

                            }
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>


            <FormControl id={"pic"} isRequired >
                <FormLabel>Upload your picture</FormLabel>
                <Input
                    type='file'
                    p={1.5}
                    accept='image/*'
                    onChange={(e) => postDetails(e.target.files[0])}
                />
            </FormControl>

            <Button
                width={"100%"}
                colorScheme='yellow'
                mt={15}
                onClick={submitHandler}
                isLoading={loading}
            >
                Sign Up
            </Button>


        </VStack>
    )
}

export default Signup
