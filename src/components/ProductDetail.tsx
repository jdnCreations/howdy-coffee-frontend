import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Product } from './ProductList';
import ErrorDisplay from './ErrorDisplay';
import LoadingSpinner from './LoadingSpinner';

export default function ProductDetail() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageTitle, setPageTitle] = useState<string>('Howdy Coffee Co.');
  const [itemIsInCart, setItemIsInCart] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  document.title = pageTitle;

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        setIsLoading(true);
        const apiUrl = `http://localhost:3000/api/products/${id}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Could not get data for product:' + id);
        }
        const data: Product = await response.json();
        setProduct(data);
        setIsLoading(false);
        setPageTitle(`Howdy Coffee Co. | ${data.name}`);
      } catch (error) {
        console.error(error);
        setError('Product does not exist.');
      }
    };

    if (id) {
      getProductDetails();
    }
  }, [id]);

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
      // const data = await response.json();
      setItemIsInCart(true);
      // show that item was added to cart
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      {error && <ErrorDisplay error={error} />}
      {isLoading && !error && <LoadingSpinner />}
      {product && (
        <div
          className='bg-amber-900 text-amber-100 rounded rounded-lg p-4 hover:bg-amber-800 min-w-[375px] max-w-[700px]'
          key={product.id}
        >
          <div className='flex items-center justify-between'>
            <p className='font-medium text-3xl pb-2'>{product.name}</p>
            <p className='w-[130px] text-center  bg-amber-950 text-amber-700 rounded rounded-sm'>
              {product.category.name.toLowerCase()}
            </p>
          </div>
          {product.imageUrl && <img src={product.imageUrl} />}
          <p className=''>{product.description}</p>
          <div className='flex justify-between align-bottom items-end'>
            <div className='pr-8'>
              <p>
                {product.description ||
                  'This is the description for the product.'}
              </p>
              <p className='text-xl'>${product.price}</p>
            </div>
            <div className='flex items-end gap-2'>
              {itemIsInCart && (
                <div className='bg-amber-950 text-amber-700 rounded rounded-md center py-2 px-4'>
                  ✓ In Cart
                </div>
              )}
              <button
                className='bg-amber-600 py-2 px-4 font-medium rounded rounded-md mt-2 hover:cursor-pointer'
                onClick={() => handleAddToCart(product.id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        className='p-2 my-4 bg-amber-800 rounded rounded-md text-amber-100 hover:cursor-pointer'
        onClick={() => navigate('/')}
      >
        Back
      </button>
    </div>
  );
}
