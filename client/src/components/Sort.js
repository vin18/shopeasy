const Sort = ({ sort, setSort }) => {
  return (
    <div className="flex flex-col md:flex-row items-center mb-4">
      <span className="text-gray-900 font-bold md:mr-16">Sort by</span>
      <ul className="flex flex-col md:flex-row font-semibold md:space-x-6 cursor-pointer text-gray-700">
        <li
          className={
            sort === 'newest' &&
            'text-indigo-500 font-semibold md:border-b border-indigo-500'
          }
          onClick={() => setSort('newest')}
        >
          Newest First
        </li>
        <li
          className={
            sort === 'high-to-low' &&
            'text-indigo-500 font-semibold md:border-b border-indigo-500'
          }
          onClick={() => setSort('high-to-low')}
        >
          Price - High to Low
        </li>
        <li
          className={
            sort === 'low-to-high' &&
            'text-indigo-500 font-semibold md:border-b border-indigo-500'
          }
          onClick={() => setSort('low-to-high')}
        >
          Price - Low to High
        </li>
      </ul>
    </div>
  );
};

export default Sort;
