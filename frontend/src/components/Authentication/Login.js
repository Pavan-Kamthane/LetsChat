import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useToast, } from '@chakra-ui/react'


const Login = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const history = useHistory()
    const toast = useToast()

    const handleClick = () => setShow(!show)

    // const submitHandler = async () => {
    //     setLoading(true);
    //     if (!email || !password) {
    //         toast({
    //             title: "Please Fill all the Fields",
    //             status: "warning",
    //             duration: 5000,
    //             isClosable: true,
    //             position: "bottom",
    //         });
    //         setLoading(false);
    //         return;
    //     }

    //     try {
    //         const config = {
    //             headers: {
    //                 "Content-type": "application/json",
    //             },
    //         };

    //         const response = await axios.post(
    //             "http://localhost:5000/api/user/login",
    //             { email, password },
    //             config
    //         );

    //         const data = response?.data;

    //         if (data) {
    //             localStorage.setItem("userInfo", JSON.stringify(data));
    //             toast({
    //                 title: "Login Successful",
    //                 status: "success",
    //                 duration: 5000,
    //                 isClosable: true,
    //                 position: "bottom",
    //             });
    //             history.push("/chats");
    //         } else {
    //             throw new Error("No data in response");
    //         }
    //     } catch (error) {
    //         console.error("Error Details:", error); // Log full error details
    //         const errorMessage = error.response?.data?.message || error.message || "An error occurred. Please try again.";
    //         toast({
    //             title: "Error Occurred!",
    //             description: errorMessage,
    //             status: "error",
    //             duration: 5000,
    //             isClosable: true,
    //             position: "bottom",
    //         });
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/user/login",
                { email, password },
                config
            );

            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            // setUser(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            history.push("/chats");
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    };


    return (
        <VStack
            spacing={"5px"}
            color={"black"}
        >
            
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
            


            

            <Button
                width={"100%"}
                colorScheme='yellow'
                mt={15}
                onClick={submitHandler}
                isLoading= {loading}
            >
                Login 
            </Button>
            <Button
                variant={"solid"}
                colorScheme='red'
                width={"100%"}
                onClick={()=>{
                    setEmail("guest@example.com");
                    setPassword("123456")
                }}
            >
                Guest User Credentials 
            </Button>


        </VStack>
    )
}

export default Login
