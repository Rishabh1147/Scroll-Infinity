import { Input } from '@/components/ui/input'
import { useState } from 'react'


const Explore = () => {

  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Post</h2>
        <div className="flex gap-1 w-full px-4 rounded-lg bg-dark-4">
          <img 
            src="/assets/icons/search.svg" 
            alt="search"
            width={24}
            height={24} 
          />
          <Input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
      <h3 className="body-bold md:h3-bold">Popular Today</h3>
      <div className="flex-center gap-3 bg-dark-3 px-4 py-2 rounded-xl cursor-pointer">
        <p className="small-medium md:base-medium text-light-2  ">All</p>
        <img 
          src="/assets/icons/filter.svg" 
          alt="" 
        />
      </div>
      </div>
    </div>
  )
}

export default Explore
