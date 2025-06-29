type Product = {
  id: number;
  name: string;
  price: number;
};

interface ProductsListProps {
  products: Array<Product>;
}

export default function ProductList({ products }: ProductsListProps) {
  return (
    <div className='bg-amber-950'>
      <div className='grid grid-cols-3 gap-2 my-4'>
        {products.map((product) => (
          <div
            className='bg-amber-900 text-white rounded rounded-lg p-4 hover:bg-amber-800'
            key={product.id}
          >
            <p className='font-medium text-lg'>{product.name}</p>
            <p>${product.price}</p>
            <button
              className='bg-amber-700 rounded rounded-md p-2 hover:bg-amber-600 mt-2'
              onClick={() => console.log(`clicked on ${product.name}`)}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
