import { useState } from 'react'
import { gql, useQuery } from "@apollo/client"
import Genres from './Genres'

const GET_BOOKS = gql`
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


const Books = (props) => {
  const { loading, error, data } = useQuery(GET_BOOKS, {
    pollInterval: 2000,
  })
  const [selectedGenre, setSelectedGenre] = useState(null)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  // Get all books
  const books = data && data.allBooks ? data.allBooks : []

  if (!props.show) {
    return null
  }

  /*
  // Get all unique genres
  const genres = books.reduce((uniqueGenres, book) => {
    book.genres.forEach((genre) => {
      if (!uniqueGenres.includes(genre)) {
        uniqueGenres.push(genre)
      }
    })
    return uniqueGenres;
  }, [])
  */
  // Filter books by selected genre
  const filteredBooks = selectedGenre ? books.filter(book => book.genres.includes(selectedGenre)) : books
  
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>Books</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
            <td style={{ padding: '0 10px' }}>{a.title}</td>
            <td style={{ padding: '0 10px' }}>{a.author.name}</td>
            <td style={{ padding: '0 10px' }}>{a.published}</td>
          </tr>
          ))}
        </tbody>
      </table>
      < br />
      <Genres setGenre={setSelectedGenre} selectedGenre={selectedGenre} />
    </div>
  )
}

/*
{genres.map((a) => (
        <button key={a} onClick={() => setSelectedGenre(a)}>{a}</button>
      ))}
*/

export default Books