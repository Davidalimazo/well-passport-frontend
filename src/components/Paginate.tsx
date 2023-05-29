import { useEffect, useState } from 'react';

// Example items, to simulate fetching from another resources.

interface Props {
  itemsPerPage: number;
  items: Array<any>;
}

function PaginatedItems({ itemsPerPage, items }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerpage = itemsPerPage;

  const lastIndex = currentPage * recordsPerpage;
  const totalPage = Math.ceil(items.length / recordsPerpage);
  //@ts-ignore
  const numbers = [...Array(totalPage + 1).keys()].slice(1);

  const handleNext = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  };


  useEffect(() => {}, []);

  return (
    <>
      <ul className="flex flex-row gap-3 text-lg font-bold font-lekton">
        <li onClick={handleNext}>
          <span className="cursor-pointer">Prev</span>
        </li>
        {numbers.map((n, i) => (
          <li
            key={i}
            className={` ${
              currentPage === n ? 'text-red-500' : 'text-[#6c6969]'
            }`}
          >
            <span className='cursor-pointer' onClick={() => setCurrentPage(n)}>{n}</span>
          </li>
        ))}
        <li onClick={handleNext}>
          <span className="cursor-pointer">Next</span>
        </li>
      </ul>
    </>
  );
}

export default PaginatedItems;
