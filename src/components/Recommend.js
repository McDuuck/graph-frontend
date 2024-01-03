import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'

const ALL_BOOKS = gql`
    query {
        allBooks {
        title
        genres
        author {
            name
            born
            bookCount
        }
        published
        }
    }
    `
const ALL_AUTHORS = gql`
    query {
        allAuthors {
        name
        born
        bookCount
        }
    }
    `
const Recommend = (props) => {
    const { loading, error, data } = useQuery(ALL_BOOKS, {
        pollInterval: 2000,
    })

    const favoriteGenre = localStorage.getItem('favoriteGenre')

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    // Get all books
    const books = data && data.allBooks ? data.allBooks : []

    // Filter books by selected genre
    const filteredBooks = favoriteGenre ? books.filter(book => book.genres.includes(favoriteGenre)) : books

    if (!props.show) {
        return null
    }

    return (
        <div>
            <h2>Recommended</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Books</th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {filteredBooks.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Recommend
