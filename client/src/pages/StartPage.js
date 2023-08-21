import heroImage from '../assets/home-hero-2.jpg'
import { useNavigate } from 'react-router-dom'
import CartIcon from '../assets/icons/CartIcon'

const StartPage = () => {
  const navigate = useNavigate()

  return (
    <div className="flex justify-center items-center max-w-7xl mx-auto pt-16 lg:pt-32">
      <div className="w-100 lg:w-2/3 lg:mr-32">
        <h1 className="text-3xl md:text-5xl font-semibold text-gray-800 mb-4">
          Shop your favourite products easily 🚀
        </h1>
        <p className="text-lg text-gray-500">
          ShopEasy - The one stop shopping destination. Ecommerce is
          revolutionizing the way we all shop in India. Checkout latest
          products, happy shopping! ✨
        </p>

        <button
          className={`mt-4 flex items-center bg-indigo-500 text-indigo-100 py-3 px-6 rounded-md text-lg tracking-wide transition-all  hover:scale-105 hover:bg-indigo-700`}
          onClick={() => navigate('/products')}
        >
          <span className="mr-2 flex items-center">
            <span className="mr-1">Buy Products</span> <CartIcon />{' '}
          </span>
        </button>
      </div>
      <div className="hidden lg:block w-3/5">
        <img src={heroImage} alt="home" />
      </div>
    </div>
  )
}

export default StartPage
