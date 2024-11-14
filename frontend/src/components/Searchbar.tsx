import { ChangeEventHandler } from "react";


interface searchTerm {
    value: string,
    searchHandler: ChangeEventHandler,
    placeholder: string
};


const SearchBar = (props: searchTerm) => {
    return (
        <input
            type="search"
            className='relative w-full  bg-light dark:bg-dark
                 text-light
                 dark:text-dark
                text-sm focus:ring-primary
   focus:border-primary block  p-2.5
   border-primary dark:border-primary

           border-2 dark:border-2 rounded-lg dark:rounded-lg
    dark:placeholder-gray-400
    placeholder-gray-600
    
  truncate
     dark:focus:ring-primary
     dark:focus:border-primary '
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.searchHandler}>

        </input>
    )
}

export default SearchBar;