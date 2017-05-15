export interface Shop {
    id: number;
    name: string;
}

export interface Product {
    id: number;
    name: string;
}
export interface Items {
    id: number;
    product_id: number;
    shop_id: number;
    quantity: number;
    sold: number;
    expirationdate: string;
    price: number;
    discount: number;
    offer: number;
    created_at: string;
    updated_at: string;
    shop: Shop;
    product: Product;
}
