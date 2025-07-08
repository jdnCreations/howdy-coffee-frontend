import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  // get cartToken from localStorage, if it exists fetch products from api
  useEffect(() => {
    const fetchCartItems = async () => {
      const response = await fetch(
        `http://localhost:3000/api/carts/${cartToken}`
      );
      if (!response.ok) {
        throw new Error('Could not fetch cart items');
      }

      const data = await response.json();
      setItemsInCart(data.items);
    };

    const createCart = async () => {
      const response = await fetch('http://localhost:3000/api/carts', {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Could not create new cart');
      }

      const data = await response.json();
      console.log(data);
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
      console.log("we have a cartToken.");
      setCartToken(localStorageCartToken);
    }

    fetchCartItems();
  }, []); 

  const removeItemFromCart = async (productId: number) => {
    const response = await fetch(
      `http://localhost:3000/api/carts/${cartToken}/items`,
      {
        method: 'DELETE',
        body: JSON.stringify({"productId": productId}),
        headers: {
          "content-type": "application/json"
        }
      }
    );
    if (!response.ok) {
      throw new Error('Could not remove item from cart');
    }

    // remove item from itemsInCart
    setItemsInCart(itemsInCart.filter((item) => item.product.id !== productId)); 
  };

  return (
    <div className='text-amber-300 '>
      <h1 className='font-bold text-3xl text-amber-500'>Your cart</h1>
      {itemsInCart.length == 0 && (
        <div>
          <p>You currently have no items in your cart.</p>
          <button onClick={() => navigate("/")}>Back</button>
        </div>
      )}
        {itemsInCart &&
          itemsInCart.map((item) => (
            <div>

          <div className='bg-amber-900 rounded rounded-md p-4 my-4 flex flex-col gap-4'>
            <div key={item.id} className='flex gap-2 justify-between'>
              <div>

              <p className='font-bold'>{item.product.name}</p>
              <p>${item.product.price}</p>
              <p>x {item.quantity}</p>

              </div>
              <button className='border rounded rounded-sm p-2' onClick={() => removeItemFromCart(item.product.id)}>
                Remove from cart
              </button>
            </div>
          </div>
                <div>
        <button className='bg-amber-300 text-amber-900 font-bold text-xl p-2 rounded rounded-md'>Checkout</button>
      </div>
            </div>
          ))}

    </div>
  );
}
