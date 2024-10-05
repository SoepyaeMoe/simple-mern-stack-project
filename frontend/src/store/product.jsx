import { create } from 'zustand';
export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => (set({ products })),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return { sucess: false, message: "Please fill in all fields" }
        }

        const res = await fetch("/api/products", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        });
        const data = res.json();
        set((state) => ({ product: [...state.products, data.data] }));
        return { success: true, message: "Product create successfully" }
    },
    fetchProducts: async () => {
        const res = await fetch('/api/products');
        const data = await res.json();
        set({ products: data.data });
    },
    updateProduct: async (updatedProduct, pid) => {

        const res = await fetch(`/api/products/${pid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        });
        const data = await res.json();
        if (!data.success) {
            return { success: false, message: data.message };
        }

        set((state) => ({ products: state.products.map(product => product._id == pid ? data.data : product) }));
        return { success: true, message: "Product updated successfully" }
    },
    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: 'DELETE',
        });
        const data = await res.json();
        if (data.success) {
            set((state) => ({ products: state.products.filter(product => product._id !== pid) }));
        }
        return { success: data.success, message: data.message };
    }
}));