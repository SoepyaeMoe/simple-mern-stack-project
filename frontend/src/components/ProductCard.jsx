import { Card, CardBody, Heading, Image, Text, Stack, HStack, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, Input, ModalFooter, Button, useDisclosure, useToast, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter } from "@chakra-ui/react"
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useProductStore } from "../store/product";
function ProductCard({ product }) {
    // for chakra ui modal
    const productUpdateModal = useDisclosure();
    const confirmAlert = useDisclosure();

    const { updateProduct, deleteProduct } = useProductStore();
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const toast = useToast();

    const handelProductUpdate = async (pid) => {
        const { success, message } = await updateProduct(updatedProduct, pid);
        if (success) {
            toast({
                title: 'Success',
                description: message,
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            productUpdateModal.onClose();
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

    const handelProductDelete = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        console.log(success, message);
        if (success) {
            toast({
                title: 'Success',
                description: message,
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            confirmAlert.onClose();
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
        <>
            <Card>
                <Image src={product.image} h={48} w={'full'} objectFit={'cover'} />
                <CardBody>
                    <Stack>
                        <Heading size='md'>{product.name}</Heading>
                        <Text fontSize={'lg'} fontWeight={'bold'}>$ {product.price}</Text>
                    </Stack>
                    <HStack mt={5}>
                        <IconButton
                            onClick={productUpdateModal.onOpen}
                            colorScheme='blue'
                            aria-label='Search database'
                            icon={<FiEdit />}
                        />
                        <IconButton
                            onClick={confirmAlert.onOpen}
                            colorScheme='red'
                            aria-label='Search database'
                            icon={<RiDeleteBin6Line />}
                        />
                    </HStack>
                </CardBody>
            </Card>
            <Modal
                size={'lg'}
                isOpen={productUpdateModal.isOpen}
                onClose={productUpdateModal.onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Product Update</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Input type="text" placeholder='Product name' value={updatedProduct.name} onChange={e => setUpdatedProduct({ ...updatedProduct, name: e.target.value })} />
                        </FormControl>

                        <FormControl mt={4}>
                            <Input type="number" placeholder='Price' value={updatedProduct.price} onChange={e => setUpdatedProduct({ ...updatedProduct, price: e.target.value })} />
                        </FormControl>

                        <FormControl mt={4}>
                            <Input type="text" placeholder='Image Url' value={updatedProduct.image} onChange={e => setUpdatedProduct({ ...updatedProduct, image: e.target.value })} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => handelProductUpdate(product._id)}>
                            Save
                        </Button>
                        <Button onClick={productUpdateModal.onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <AlertDialog
                motionPreset='slideInBottom'
                // leastDestructiveRef={cancelRef}
                onClose={confirmAlert.onClose}
                isOpen={confirmAlert.isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>Delet Product!</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Are you sure you want to delete '{product.name}'?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button onClick={confirmAlert.onClose}>
                            No
                        </Button>
                        <Button colorScheme='red' ml={3} onClick={() => handelProductDelete(product._id)}>
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default ProductCard