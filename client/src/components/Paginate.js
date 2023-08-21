import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Paginate = ({ pages, page, keyword = '', isAdmin = false }) => {
  const { page: currentPageStr } = useSelector((state) => state.products)
  const currentPage = Number(currentPageStr)

  const prevLink = !isAdmin
    ? keyword
      ? `/products/search/${keyword}/page/${currentPage - 1}`
      : `/products/page/${currentPage - 1}`
    : `/admin/products/${currentPage - 1}`

  const nextLink = !isAdmin
    ? keyword
      ? `/products/search/${keyword}/products//${currentPage + 1}`
      : `/products/page/${currentPage + 1}`
    : `/admin/products/${currentPage + 1}`

  if (pages <= 1) return null

  return (
    <nav className="mt-8 flex justify-center" aria-label="Page navigation">
      <ul className="inline-flex">
        <li>
          <Link to={prevLink}>
            <button
              disabled={currentPage <= 1}
              className={`h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white rounded-l-lg focus:shadow-outline hover:bg-indigo-100 ${
                currentPage <= 1 && 'cursor-not-allowed'
              }`}
            >
              Prev
            </button>
          </Link>
        </li>

        {[...Array(pages).keys()].map((page) => {
          const link = !isAdmin
            ? keyword
              ? `/products/search/${keyword}/page/${page + 1}`
              : `/products/page/${page + 1}`
            : `/admin/products/${page + 1}`
          const activePage = currentPage === page + 1

          return (
            <li key={page + 1}>
              <Link to={link}>
                <button
                  className={`h-10 px-5 rounded ${
                    activePage ? 'text-white' : 'text-indigo'
                  } transition-colors duration-150 ${
                    activePage && 'bg-indigo-600'
                  } focus:shadow-outline`}
                >
                  {page + 1}
                </button>
              </Link>
            </li>
          )
        })}

        <li>
          <Link to={nextLink}>
            <button
              disabled={currentPage >= pages}
              className={`h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white rounded-r-lg focus:shadow-outline hover:bg-indigo-100 ${
                currentPage >= pages && 'cursor-not-allowed'
              } `}
            >
              Next
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Paginate
