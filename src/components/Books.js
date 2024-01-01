import { gql, useQuery } from "@apollo/client"

const GET_BOOKS = gql`
  query {
    allBooks {
      title
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
  console.log(data)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const books = data && data.allBooks ? data.allBooks : []

  if (!props.show) {
    return null
  }

  
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
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

export default Books
