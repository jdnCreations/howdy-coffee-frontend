import { useState } from 'react';

export default function CartPage() {
  const [itemsInCart, setItemsInCart] = useState([{ name: 'A.M. Accolade' }]);

  // get cartId from localStorage, if it exists fetch products from api

  return (
    <div className='text-amber-300 '>
      <h1 className='font-bold text-3xl'>Your cart</h1>
      {itemsInCart.length == 0 && (
        <p>You currently have no items in your cart.</p>
      )}
      <div className='bg-amber-900 rounded rounded-md p-4 my-4'>
        {itemsInCart &&
          itemsInCart.map((item) => (
            <div>
              <p className='font-bold'>{item.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
