import { Container, Heading, VStack, Box, useColorModeValue, Input, Button } from "@chakra-ui/react"
import { useState } from "react";
import { useProductStore } from "../store/product";
import { useToast } from '@chakra-ui/react';

const CreatePage = () => {
    const toast = useToast();

    const { createProduct } = useProductStore();

    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        image: ''
    });

    const handelAddProduct = async () => {
        const { success, message } = await createProduct(newProduct);
        if (success) {
            toast({
                title: 'Success',
                description: message,
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            setNewProduct({ name: '', price: '', image: '' });
        } else {
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    }

    return (
        <Container maxW={'container.sm'}>
            <VStack spacing={8}>
                <Heading as={'h1'} size={'2xl'} textAlign={'center'} mb={8}>Create New Product</Heading>
                <Box w={'full'} bg={useColorModeValue('white', 'gray.800')} p={6} rounded={'lg'} shadow={'md'}>
                    <VStack spacing={4}>
                        <Input type="text"
                            name="name"
                            value={newProduct.name}
                            onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                            placeholder="Product name" />

                        <Input type="number"
                            name="price"
                            value={newProduct.price}
                            onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                            placeholder="Product price" />

                        <Input type="text"
                            name="image"
                            value={newProduct.image}
                            onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
                            placeholder="Product image url" />

                        <Button colorScheme="blue" w={'full'} onClick={handelAddProduct}>Add Product</Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    )
}

export default CreatePage