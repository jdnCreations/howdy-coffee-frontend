import type { Product } from './ProductList';

export function ProductCard({
  product,
  isInCart,
  count,
  handleViewProduct,
  handleAddToCart,
}: {
  product: Product;
  isInCart: boolean;
  count: number | undefined;
  handleViewProduct: (productId: string) => void;
  handleAddToCart: (productId: number) => void;
}) {
  return (
    <div
      className='bg-amber-900 text-white rounded rounded-lg p-4 hover:bg-amber-800 flex flex-col'
      key={product.id}
    >
      <div className='flex items-begin justify-between'>
        <p className='font-medium text-2xl pb-2'>{product.name}</p>
        <p className='w-[130px] text-center bg-amber-950 text-amber-700 rounded rounded-sm py-2 h-[40px]'>
          {product.category.name.toLowerCase()}
        </p>
      </div>
      <p>${product.price}</p>
      <div className='flex items-end gap-2'>
        {isInCart ? (
          <button className='bg-amber-700 text-amber-400 rounded rounded-md center py-2 px-4 hover:'>
            ✓ In Cart ({count})
          </button>
        ) : (
          <button
            className='bg-amber-700 text-amber-200 rounded rounded-md center py-2 px-4 hover:cursor-pointer hover:bg-amber-600 hover:text-amber-400'
            onClick={() => handleAddToCart(product.id)}
          >
            Add to Cart
          </button>
        )}
        <button
          className='bg-amber-950 text-amber-400 rounded rounded-md p-2 hover:bg-amber-600 mt-2 hover:cursor-pointer'
          onClick={() => handleViewProduct(product.id.toString())}
        >
          View Product
        </button>
      </div>
    </div>
  );
}
