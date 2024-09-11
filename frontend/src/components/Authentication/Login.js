import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'

const Login = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleClick = () => setShow(!show)

    const submitHandler = () => { }

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
