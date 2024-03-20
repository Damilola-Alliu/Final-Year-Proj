import React from "react";
import { useLocation } from "react-router-dom";
import CustomerNavbar from './Components/CustomerNavbar'

function SearchResults() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");

    // Fetch search results based on the query

    return (
        <div>
                 <CustomerNavbar/>
                 
            <h1>Search Results</h1>
            <p>Showing results for: {query}</p>
            {/* Display search results here */}
        </div>
    );
}

export default SearchResults;
