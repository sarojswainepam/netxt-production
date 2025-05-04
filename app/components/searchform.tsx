import React from 'react';
import Form from 'next/form';

const SearchForm = ({ query }: { query?: string }) => {
    return (
        <Form action="/" scroll={false}>

            <input name="query" defaultValue={query} placeholder='Search Blogs' />
            <button type="submit">Submit</button>
        </Form>
    )
}

export default SearchForm