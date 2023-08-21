import { useState, useEffect } from 'react'
import axios from 'axios'
import ProductItem from './ProductItem.js'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../store/slices/products.js'
import {
  fetchWishlistedProducts,
  wishlistsReset,
} from '../store/slices/wishlists.js'
import Paginate from '../components/Paginate'
import Loader from './Loader.js'
import useWindowWidth from '../hooks/useWindowWidth.js'
import Search from './Search.js'
import Checkbox from './custom/Checkbox.js'
import StarIcon from '../assets/icons/StarIcon.js'
import Sort from './Sort.js'
import ProductListings from './ProductListings.js'

const Home = () => {
  const dispatch = useDispatch()
  const [sort, setSort] = useState('')
  const { keyword = '', pageNumber = 1 } = useParams()
  const {
    productsData: products,
    loading,
    pages,
    page,
  } = useSelector((state) => state.products)
  const { isMobile } = useWindowWidth()
  const { userData } = useSelector((state) => state.user)
  const { wishlistsData, isBookmarkUpdated } = useSelector(
    (state) => state.wishlists
  )
  const isLoggedIn = userData?.email

  useEffect(() => {
    dispatch(fetchProducts(keyword, pageNumber, sort))
  }, [keyword, pageNumber, sort])

  useEffect(() => {
    if (isLoggedIn || isBookmarkUpdated) {
      dispatch(fetchWishlistedProducts())
      dispatch(wishlistsReset())
    }
  }, [isLoggedIn, isBookmarkUpdated])

  if (loading) return <Loader />

  if (products?.length <= 0) {
    return (
      <div className="flex flex-col justify-center items-center mt-32">
        <h3 className="text-3xl text-center mb-2">No products found!</h3>
        <Link className="bg-indigo-500 text-indigo-50 py-2 px-4 rounded" to="/">
          Back to Home page
        </Link>
      </div>
    )
  }

  return (
    <div>
      {isMobile && <Search />}

      <div className="flex max-w-5xl mx-auto" style={{ minHeight: '75vh' }}>
        <div className="flex flex-col">
          <Sort sort={sort} setSort={setSort} />
          <ProductListings
            isLoggedIn={isLoggedIn}
            products={products}
            wishlistsData={wishlistsData}
          />
        </div>
      </div>

      <Paginate pages={pages} page={page} keyword={keyword} />
    </div>
  )
}

export default Home
