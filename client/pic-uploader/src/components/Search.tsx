import React from 'react'

interface props {
    searchTerm: string,
    setSearchTerm: (a: string) => void
}
const Search = (props: props) => {
    return (
        <div>
            Search
        </div>
    )
}

export default Search
