import { useEffect, useState } from 'react';

interface CartItem {
  cartId: number;
  createdAt: string;
  id: number;
  quantity: number;
  product: {
    id: number;
    imageUrl: string;
    name: string;
    price: number;
  };
}

export default function CartPage() {
  const [itemsInCart, setItemsInCart] = useState<CartItem[]>([]);
  const [cartToken, setCartToken] = useState<string | null>(null);

  // get cartToken from localStorage, if it exists fetch products from api
  useEffect(() => {
    const fetchCartItems = async () => {
      console.log('fetching cart items');
      if (!cartToken) {
        return;
      }
      console.log('fetching response ');
      const response = await fetch(
        `http://localhost:3000/api/carts/${cartToken}`
      );
      if (!response.ok) {
        throw new Error('Could not fetch cart items');
      }

      const data = await response.json();
      setItemsInCart(data.items);
      console.log(data);
    };

    const createCart = async () => {
      const response = await fetch('http://localhost:3000/api/carts', {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Could not create new cart');
      }

      const data = await response.json();
      if (data.cartToken) {
        localStorage.setItem('cartToken', data.cartToken);
        setCartToken(data.cartToken);
      }
    };

    const localStorageCartToken = localStorage.getItem('cartToken');
    if (!localStorageCartToken) {
      console.log('no token found in localStorage');
      createCart();
    } else {
      setCartToken(localStorageCartToken);
    }

    fetchCartItems();
  }, [cartToken]);

  const removeItemFromCart = async (productId: number) => {
    const body = JSON.stringify({ productId: productId });
    const response = await fetch(
      `http://localhost:3000/api/carts/${cartToken}/items`,
      {
        method: 'DELETE',
        body: body,
      }
    );
    if (!response.ok) {
      throw new Error('Could not remove item from cart');
    }

    if (response.status === 204) {
      console.log('success');
    } else {
      console.log('uh oh', response.status);
    }
  };

  return (
    <div className='text-amber-300 '>
      <h1 className='font-bold text-3xl'>Your cart</h1>
      {itemsInCart.length == 0 && (
        <p>You currently have no items in your cart.</p>
      )}
      <div className='bg-amber-900 rounded rounded-md p-4 my-4'>
        {itemsInCart &&
          itemsInCart.map((item) => (
            <div key={item.id}>
              <p className='font-bold'>{item.product.name}</p>
              <p>{item.quantity}</p>
              <button onClick={() => removeItemFromCart(item.product.id)}>
                Remove from cart
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
