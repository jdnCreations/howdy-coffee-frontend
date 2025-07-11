import CategoryFilter from '@/components/CategoryFilter';
import ErrorDisplay from '@/components/ErrorDisplay';
import LoadingSpinner from '@/components/LoadingSpinner';
import Pagnination from '@/components/Pagnination';
import ProductList from '@/components/ProductList';
import SearchBar from '@/components/SearchBar';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const [cartToken, setCartToken] = useState<string | null>(null);
  const [itemsInCart, setItemsInCart] = useState([]);

  const navigate = useNavigate();

  const fetchCartItems = useCallback(async () => {
    if (!cartToken) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/api/carts/${cartToken}`
      );
      if (!response.ok) {
        throw new Error('Could not fetch cart items');
      }

      const data = await response.json();
      setItemsInCart(data.items);
    } catch (error) {
      console.error(error);
    }
  }, [cartToken]);

  const handleCartChange = async () => {
    await fetchCartItems();
  };

  useEffect(() => {
    setIsLoading(true);
    setError(null);

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

    const handleCartLoading = async () => {
      if (!cartToken) {
        const existingCartToken = localStorage.getItem('cartToken');
        if (!existingCartToken) {
          console.log('no token found in localStorage');
          createCart();
        } else {
          // TODO: Make sure the cartToken is actually attached to a cart
          console.log('cartToken in localStorage');
          setCartToken(existingCartToken);
        }
      } else {
        console.log('cartToken exists, load cart');
        await fetchCartItems();
      }
    };

    const fetchProducts = async () => {
      try {
        const apiUrl = `http://localhost:3000/api/products?page=${currentPage}&search=${searchQuery}&categoryId=${selectedCategory}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          console.log(response.statusText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
      } catch (error) {
        console.log(error);
        setError('Failed to fetch products, please try again later.');

        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
    handleCartLoading();
  }, [currentPage, searchQuery, selectedCategory, cartToken, fetchCartItems]);

  return (
    <div>
      {!error && (
        <div className='flex gap-2 justify-between sm:justify-end w-full h-full'>
          <CategoryFilter onSelectCategory={setSelectedCategory} />
          <SearchBar onSearchChange={setSearchQuery} />
          <button
            className='bg-amber-800 rounded rounded-sm text-amber-300 px-4 hover:cursor-pointer hover:bg-amber-700'
            onClick={() => navigate('/cart')}
          >
            Cart
          </button>
        </div>
      )}
      {isLoading && <LoadingSpinner />}
      {error && <ErrorDisplay error={error}></ErrorDisplay>}
      {!isLoading && !error && products.length === 0 && (
        <div className='text-amber-600 text-2xl py-2'>
          <p>Sorry, no products match your search.</p>
        </div>
      )}
      {!isLoading && !error && products.length > 0 && (
        <ProductList
          itemsInCart={itemsInCart}
          products={products}
          updateCartItems={handleCartChange}
        />
      )}
      <Pagnination
        currentPage={currentPage}
        totalPages={totalPages}
        onChangePage={setCurrentPage}
      />
    </div>
  );
}
