import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const Signup = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [pic, setPic] = useState();

    const handleClick = () => setShow(!show)

    const postDetails =(pics)=>{}

    const submitHandler = ()=>{}

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
                    p = {1.5}
                    accept='image/*'
                    onChange={(e)=>postDetails(e.target.files[0])}
                />
            </FormControl>

            <Button
                width={"100%"}
                colorScheme='yellow'
                mt={15}
                onClick={submitHandler}
            >
                Sign Up
            </Button>


        </VStack>
    )
}

export default Signup
