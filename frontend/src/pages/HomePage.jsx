import { Container, HStack, Text, Link as ChakraLink, SimpleGrid, Stack } from "@chakra-ui/react"
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "../store/product";
import { useEffect } from "react";

const HomePage = () => {
    const { fetchProducts, products } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <Container maxW='container.xl' py={12}>
            <Stack spacing={8}>
                <Text
                    bgGradient='linear(to-r, cyan.400, blue.500)'
                    bgClip='text'
                    fontSize='3xl'
                    fontWeight='extrabold'
                    textAlign={'center'}
                >
                    Current Products 🚀
                </Text>
                <SimpleGrid
                    spacing={8}
                    columns={{
                        base: 1,
                        md: 2,
                        lg: 3
                    }}>
                    {products.map((product) => <ProductCard key={product._id} product={product} />)}
                </SimpleGrid>
                {products.length === 0 && (<HStack justifyContent={'center'}>
                    <Text
                        color={'gray.500'}
                        fontWeight='bold'
                        fontSize={'lg'}>No products fond 😥</Text>
                    <ChakraLink
                        as={Link}
                        to={'/create'}
                        color={'blue.500'}
                        fontWeight='bold'
                        fontSize={'lg'}
                    >
                        Create a product
                    </ChakraLink>
                </HStack>)}
            </Stack>
        </Container >
    )
}

export default HomePage