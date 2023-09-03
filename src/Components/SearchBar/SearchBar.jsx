import React from 'react'
import { HiLocationMarker } from 'react-icons/hi'
import './SearchBar.css'
import { AiOutlineSearch } from 'react-icons/ai';

const SearchBar = () => {
  return (
    
      <div className="flexCenter search-bar">
<HiLocationMarker color="var(--blue)" size={25}/>
<input type="text"/>
<button className="button"><AiOutlineSearch className='search-icon'/></button>
</div>
    
  )
}

export default SearchBar
