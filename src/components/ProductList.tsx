import { useNavigate } from 'react-router-dom';
import { ProductCard } from './ProductCard';

export type Product = {
  id: number;
  description?: string;
  imageUrl?: string;
  name: string;
  price: number;
  category: {
    name: string;
  };
};

type Item = {
  id: number;
  productId: number;
  quantity: number;
};

interface ProductsListProps {
  products: Array<Product>;
  itemsInCart: Array<Item>;
  updateCartItems: () => void;
}

export default function ProductList({
  products,
  itemsInCart,
  updateCartItems,
}: ProductsListProps) {
  const navigate = useNavigate();
  const handleViewProduct = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  const handleAddToCart = async (productId: number) => {
    const cartToken = localStorage.getItem('cartToken');
    try {
      const response = await fetch(
        `http://localhost:3000/api/carts/${cartToken}/items`,
        {
          method: 'POST',
          body: JSON.stringify({ productId: productId, quantity: 1 }),
          headers: {
            'content-type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error('Could not add item to cart');
      }

      updateCartItems();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='bg-amber-950'>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 my-4'>
        {products.map((product) => {
          const cartItem = itemsInCart.find(
            (item) => item.productId === product.id
          );

          const isInCart = cartItem ? true : false;
          const quantity = cartItem ? cartItem.quantity : 0;

          return (
            <ProductCard
              key={product.id}
              count={quantity}
              handleViewProduct={handleViewProduct}
              handleAddToCart={handleAddToCart}
              isInCart={isInCart}
              product={product}
            />
          );
        })}
      </div>
    </div>
  );
}
