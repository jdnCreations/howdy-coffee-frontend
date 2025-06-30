import CategoryFilter from '@/components/CategoryFilter';
import ErrorDisplay from '@/components/ErrorDisplay';
import LoadingSpinner from '@/components/LoadingSpinner';
import Pagnination from '@/components/Pagnination';
import ProductList from '@/components/ProductList';
import SearchBar from '@/components/SearchBar';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setError(null);

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
  }, [currentPage, searchQuery, selectedCategory]);

  return (
    <div>
      {!error && (
        <div className='flex gap-2  justify-end w-full h-full'>
          <CategoryFilter onSelectCategory={setSelectedCategory} />
          <SearchBar onSearchChange={setSearchQuery} />
        </div>
      )}
      {isLoading && <LoadingSpinner />}
      {error && <ErrorDisplay error={error}></ErrorDisplay>}
      {!isLoading && !error && products.length === 0 && (
        <p>No products found.</p>
      )}
      {!isLoading && !error && products.length > 0 && (
        <ProductList products={products} />
      )}
      <Pagnination
        currentPage={currentPage}
        totalPages={totalPages}
        onChangePage={setCurrentPage}
      />
    </div>
  );
}
