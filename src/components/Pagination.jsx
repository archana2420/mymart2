import React from 'react'

const Pagination = ({items,pageSize,currentPage,onPageChange}) => {
    const pagesCount = Math.ceil(items/pageSize)
    if(pagesCount === 1)
    {
        return null
    }

    const pages = []
    for(let pageNo=1;pageNo<=pagesCount;pageNo++)
    {
        pages.push(pageNo)
    }
  return (
    <div>
        <ul className='flex justify-center items-center list-none  mx-8 border-collapse border border-transparent'>
            {
                pages.map(page=>{
                    return <li
                    key={page}
                    className={
                        page === currentPage? 'flex justify-center items-center w-8 h-8 cursor-pointer bg-black text-white border border-black ':'flex justify-center items-center w-8 h-8 cursor-pointer text-black border border-black'
                    }
                    onClick={()=>{
                        onPageChange(page)
                    }}
                    >
                        {page}
                    </li>
                })
            }
        </ul>
    </div>
  )
}

export default Pagination