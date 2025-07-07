import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Product } from './ProductList';
import ErrorDisplay from './ErrorDisplay';
import LoadingSpinner from './LoadingSpinner';

export default function ProductDetail() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageTitle, setPageTitle] = useState<string>('Howdy Coffee Co.');
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

  const handleAddToCart = (productId: number) => {
    console.log(`Add to cart ${productId}`);
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      {error && <ErrorDisplay error={error} />}
      {isLoading && !error && <LoadingSpinner />}
      {product && (
        <div
          className='bg-amber-900 text-white rounded rounded-lg p-4 hover:bg-amber-800 max-w-[700px]'
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
          <div className='flex justify-between align-bottom'>
            <p className='text-xl'>${product.price}</p>
            <button
              className='bg-amber-500 py-2 px-4 font-medium rounded rounded-md mt-2'
              onClick={() => handleAddToCart(product.id)}
            >
              Add to Cart
            </button>
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
