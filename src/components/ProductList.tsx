import { useNavigate } from 'react-router-dom';

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

interface ProductsListProps {
  products: Array<Product>;
}

export default function ProductList({ products }: ProductsListProps) {
  const navigate = useNavigate();
  const handleViewProduct = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className='bg-amber-950'>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 my-4'>
        {products.map((product) => (
          <div
            className='bg-amber-900 text-white rounded rounded-lg p-4 hover:bg-amber-800'
            key={product.id}
          >
            <div className='flex items-top justify-between'>
              <p className='font-medium text-2xl pb-2'>{product.name}</p>
              <p className='w-[130px] h-full text-center  bg-amber-950 text-amber-700 rounded rounded-sm'>
                {product.category.name.toLowerCase()}
              </p>
            </div>
            <p>${product.price}</p>
            <button
              className='bg-amber-700 rounded rounded-md p-2 hover:bg-amber-600 mt-2 hover:cursor-pointer'
              onClick={() => handleViewProduct(product.id.toString())}
            >
              View Product
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
