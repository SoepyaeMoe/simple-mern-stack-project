import { Button, useColorMode, Container, Flex, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";
import { IoMdMoon } from "react-icons/io";
import { IoSunnyOutline } from "react-icons/io5";

export const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Container maxW='1140px' px={4}>
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{
                    base: "column",
                    sm: "row",
                }}
            >
                <Text
                    fontSize={{ base: "22", sm: "28" }}
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                    bgGradient={"linear(to-r, cyan.400, blue.500)"}
                    bgClip={"text"}
                >
                    <Link to={'/'}>Product Store</Link>
                </Text>
                <HStack spacing={2} alignItems={'center'}>
                    <Link to={'/create'}>
                        <Button>
                            <FaPlus />
                        </Button>
                    </Link>
                    <Button onClick={toggleColorMode}>
                        {colorMode === 'light' ? <IoMdMoon /> : <IoSunnyOutline />}
                    </Button>
                </HStack>
            </Flex>
        </Container >
    )
}
