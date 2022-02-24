import ProductItem from './ProductItem';

const ProductListings = ({ products, isLoggedIn, wishlistsData }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products?.map((product) => {
        const isProductBookmarked =
          wishlistsData?.find((w) => w.product === product?.id) || false;

        return (
          <ProductItem
            isLoggedIn={isLoggedIn}
            product={product}
            isProductBookmarked={isProductBookmarked}
          />
        );
      })}
    </div>
  );
};

export default ProductListings;
