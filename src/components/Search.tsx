import React from 'react';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
    return (<section className='search'>
        <FaSearch />
        <input type="text"
            name="search"
            placeholder='Search Twitter'
            autoComplete='off'
        />
    </section>);
};

export default Search;
