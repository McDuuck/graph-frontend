import { gql, useQuery } from '@apollo/client'

const ALL_GENRES = gql`
  query {
    allGenres
  }
`

const Genres = (props) => {
    const { data, loading, error } = useQuery(ALL_GENRES, {
        pollInterval: 2000,
    })

    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    const genres = data.allGenres

    return (
        <div>
            {genres.map((genre) => (
                <button key={genre} onClick={() => props.setGenre(genre)}>{genre}</button>
            ))}
            < br />
            <button onClick={() => props.setGenre(null)}>All genres</button>
        </div>
    )
}

export default Genres