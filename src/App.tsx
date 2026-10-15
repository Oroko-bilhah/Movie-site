import { useMemo, useState } from 'react'
import './App.css'

type Movie = {
  title: string
  year: number
  genre: string
  rating: string
  poster: string
  description: string
  runtime: string
  hero?: boolean
}

const movies: Movie[] = [
  {
    title: 'Dune: Part Two',
    year: 2024,
    genre: 'Sci-Fi',
    rating: '8.5',
    runtime: '2h 46m',
    poster: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    hero: true,
    description:
      'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
  },
  {
    title: 'The Batman',
    year: 2022,
    genre: 'Action',
    rating: '7.8',
    runtime: '2h 56m',
    poster: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    description:
      'When a sadistic killer leaves a trail of cryptic clues, Batman follows the evidence into Gotham’s darkest corners.',
  },
  {
    title: 'Oppenheimer',
    year: 2023,
    genre: 'Drama',
    rating: '8.3',
    runtime: '3h 00m',
    poster: 'https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg',
    description:
      'The story of J. Robert Oppenheimer and his role in the development of the atomic bomb.',
  },
  {
    title: 'Interstellar',
    year: 2014,
    genre: 'Sci-Fi',
    rating: '8.7',
    runtime: '2h 49m',
    poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    description:
      'A team of explorers travels beyond this galaxy to discover whether mankind has a future among the stars.',
  },
  {
    title: 'Spider-Man: Across the Spider-Verse',
    year: 2023,
    genre: 'Animation',
    rating: '8.6',
    runtime: '2h 20m',
    poster: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    description:
      'Miles Morales catapults across the multiverse, where he encounters a team of Spider-People protecting its existence.',
  },
  {
    title: 'Poor Things',
    year: 2023,
    genre: 'Drama',
    rating: '7.8',
    runtime: '2h 21m',
    poster: 'https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg',
    description:
      'The incredible tale and fantastical evolution of Bella Baxter, brought back to life by an unorthodox scientist.',
  },
  {
    title: 'The Grand Budapest Hotel',
    year: 2014,
    genre: 'Comedy',
    rating: '8.1',
    runtime: '1h 39m',
    poster: 'https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg',
    description:
      'A legendary concierge and his young protégé become caught up in the theft of a priceless Renaissance painting.',
  },
  {
    title: 'Everything Everywhere All at Once',
    year: 2022,
    genre: 'Sci-Fi',
    rating: '7.8',
    runtime: '2h 19m',
    poster: 'https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg',
    description:
      'An exhausted laundromat owner discovers she must connect with versions of herself across the multiverse.',
  },
  {
    title: 'Past Lives',
    year: 2023,
    genre: 'Romance',
    rating: '7.9',
    runtime: '1h 46m',
    poster: 'https://image.tmdb.org/t/p/w500/k3waqVXSnvCZWfJYNtdamTgTtTA.jpg',
    description:
      'Two deeply connected childhood friends are wrested apart after one family emigrates from South Korea.',
  },
  {
    title: 'John Wick: Chapter 4',
    year: 2023,
    genre: 'Action',
    rating: '7.7',
    runtime: '2h 49m',
    poster: 'https://image.tmdb.org/t/p/w500/h8Rb9gBr48ODIwYUttZNYeMWeUU.jpg',
    description:
      'John Wick uncovers a path to defeating the High Table, but new enemies emerge across the globe.',
  },
  {
    title: 'The Boy and the Heron',
    year: 2023,
    genre: 'Animation',
    rating: '7.5',
    runtime: '2h 04m',
    poster: 'https://image.tmdb.org/t/p/w500/f4oZTcfGrVTXKTWg157AwikXqmP.jpg',
    description:
      'A young boy enters a world shared by the living and the dead in search of a new beginning.',
  },
  {
    title: 'Knives Out',
    year: 2019,
    genre: 'Mystery',
    rating: '7.9',
    runtime: '2h 10m',
    poster: 'https://image.tmdb.org/t/p/w500/pThyQovXQrw2m0s9x82twj48Jq4.jpg',
    description:
      'A detective investigates the death of a famous crime novelist and the family gathered around him.',
  },
]

const genres = [
  'All genres',
  'Action',
  'Comedy',
  'Drama',
  'Animation',
  'Sci-Fi',
  'Romance',
  'Mystery',
]

const categories = ['Discover', 'Trending', 'Top rated', 'My list']

function App() {
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('All genres')
  const [category, setCategory] = useState('Discover')
  const [favorites, setFavorites] = useState<string[]>([])
  const [selected, setSelected] = useState<Movie | null>(null)
  const [trailer, setTrailer] = useState(false)

  const hero = movies[0]
  const visibleMovies = useMemo(() => {
    let result = movies.filter((movie) => !movie.hero)

    if (category === 'My list') {
      result = result.filter((movie) => favorites.includes(movie.title))
    }
    if (genre !== 'All genres') {
      result = result.filter((movie) => movie.genre === genre)
    }
    if (query.trim()) {
      result = result.filter((movie) =>
        `${movie.title} ${movie.genre} ${movie.year}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      )
    }
    if (category === 'Top rated') {
      result = [...result].sort((a, b) => Number(b.rating) - Number(a.rating))
    }
    if (category === 'Trending') {
      result = [...result].sort((a, b) => b.year - a.year)
    }

    return result
  }, [category, favorites, genre, query])

  const toggleFavorite = (title: string) => {
    setFavorites((current) =>
      current.includes(title)
        ? current.filter((item) => item !== title)
        : [...current, title],
    )
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Reelgood home">
          <span className="brand-mark">R</span>
          <span>
            reel<span className="brand-light">good</span>
          </span>
        </a>

        <nav className="main-nav" aria-label="Main navigation">
          {categories.map((item) => (
            <button
              key={item}
              className={`nav-link ${category === item ? 'active' : ''}`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="header-tools">
          <label className="search-box">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 4 4" />
            </svg>
            <input
              aria-label="Search movies"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search movies..."
            />
            <kbd>⌘ K</kbd>
          </label>
          <button className="avatar" aria-label="Your profile">
            A
          </button>
        </div>
      </header>

      <section
        className="hero"
        id="home"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(11,11,13,.98) 0%, rgba(11,11,13,.84) 34%, rgba(11,11,13,.23) 73%, rgba(11,11,13,.3) 100%), linear-gradient(0deg, #0b0b0d 0%, transparent 38%), url(${hero.poster.replace('/w500/', '/original/')})`,
        }}
      >
        <div className="hero-content">
          <div className="eyebrow">
            <span className="eyebrow-line" /> THIS WEEK’S FEATURE
          </div>
          <h1>{hero.title}</h1>
          <div className="hero-meta">
            <span>{hero.year}</span>
            <i />
            <span>{hero.genre}</span>
            <i />
            <span>{hero.runtime}</span>
            <span className="rating">
              <b>★</b> {hero.rating}
            </span>
          </div>
          <p>{hero.description}</p>
          <div className="hero-actions">
            <button
              className="button button-primary"
              onClick={() => {
                setSelected(hero)
                setTrailer(true)
              }}
            >
              <span className="play-icon">▶</span> Watch trailer
            </button>
            <button
              className="button button-secondary"
              onClick={() => {
                setSelected(hero)
                setTrailer(false)
              }}
            >
              More details <span aria-hidden="true">↗</span>
            </button>
          </div>
          <div className="feature-note">
            <span className="feature-dot" /> A journey beyond imagination
          </div>
        </div>
        <div className="hero-count">
          <span>01</span>
          <i /> 04
        </div>
      </section>

      <section className="catalog" aria-label="Movie catalog">
        <div className="catalog-heading">
          <div>
            <div className="section-kicker">YOUR NEXT FAVORITE</div>
            <h2>
              {category === 'My list'
                ? 'Your watchlist'
                : category === 'Trending'
                  ? 'Trending now'
                  : category === 'Top rated'
                    ? 'Top rated films'
                    : 'Explore movies'}
            </h2>
          </div>
          <div className="catalog-controls">
            <label className="genre-select">
              <span className="sr-only">Filter by genre</span>
              <select
                value={genre}
                onChange={(event) => setGenre(event.target.value)}
              >
                {genres.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <span className="select-chevron">⌄</span>
            </label>
            <span className="movie-count">{visibleMovies.length} titles</span>
          </div>
        </div>

        <div className="movie-grid">
          {visibleMovies.map((movie, index) => (
            <article
              className="movie-card"
              key={movie.title}
              style={{ animationDelay: `${index * 35}ms` }}
            >
              <div
                className="poster-wrap"
                onClick={() => {
                  setSelected(movie)
                  setTrailer(false)
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    setSelected(movie)
                    setTrailer(false)
                  }
                }}
                aria-label={`View ${movie.title} details`}
              >
                <img
                  src={movie.poster}
                  alt={`${movie.title} poster`}
                  loading="lazy"
                />
                <span className="poster-overlay">
                  <span className="poster-play">▶</span>
                  <span>View details</span>
                </span>
                <span className="poster-rating">
                  <b>★</b> {movie.rating}
                </span>
                <button
                  className={`favorite-button ${favorites.includes(movie.title) ? 'is-favorite' : ''}`}
                  aria-label={
                    favorites.includes(movie.title)
                      ? `Remove ${movie.title} from watchlist`
                      : `Add ${movie.title} to watchlist`
                  }
                  onClick={(event) => {
                    event.stopPropagation()
                    toggleFavorite(movie.title)
                  }}
                >
                  {favorites.includes(movie.title) ? '♥' : '♡'}
                </button>
              </div>
              <div className="card-info">
                <h3>{movie.title}</h3>
                <div className="card-meta">
                  <span>{movie.year}</span>
                  <i />
                  <span>{movie.genre}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {visibleMovies.length === 0 && (
          <div className="empty-state">
            <span>◌</span>
            <h3>
              {category === 'My list' && !query
                ? 'Your list is waiting'
                : 'No movies found'}
            </h3>
            <p>
              {category === 'My list' && !query
                ? 'Save a film with the heart icon and it’ll be here.'
                : 'Try a different title or filter to find your next watch.'}
            </p>
            <button
              className="text-button"
              onClick={() => {
                setQuery('')
                setGenre('All genres')
                if (category === 'My list') setCategory('Discover')
              }}
            >
              Explore all movies <span>→</span>
            </button>
          </div>
        )}

        <footer className="catalog-footer">
          <span>Curated for your next movie night.</span>
          <span className="footer-brand">
            REELGOOD <i>•</i> FILM DISCOVERY
          </span>
        </footer>
      </section>

      {selected && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelected(null)
          }}
        >
          <section
            className="movie-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${selected.title} details`}
          >
            <button
              className="modal-close"
              onClick={() => setSelected(null)}
              aria-label="Close details"
            >
              ×
            </button>
            {trailer ? (
              <div className="trailer-panel">
                <div
                  className="trailer-art"
                  style={{
                    backgroundImage: `linear-gradient(rgba(11,11,13,.25),rgba(11,11,13,.78)),url(${selected.poster.replace('/w500/', '/original/')})`,
                  }}
                >
                  <span className="trailer-play">▶</span>
                  <span>TRAILER PREVIEW</span>
                </div>
              </div>
            ) : (
              <img className="modal-poster" src={selected.poster} alt="" />
            )}
            <div className="modal-copy">
              <div className="section-kicker">
                {trailer ? 'NOW PLAYING' : 'FILM DETAILS'}
              </div>
              <h2>{selected.title}</h2>
              <div className="hero-meta">
                <span>{selected.year}</span>
                <i />
                <span>{selected.genre}</span>
                <i />
                <span>{selected.runtime}</span>
                <span className="rating">
                  <b>★</b> {selected.rating}
                </span>
              </div>
              <p>{selected.description}</p>
              <button
                className="button button-secondary"
                onClick={() => toggleFavorite(selected.title)}
              >
                {favorites.includes(selected.title)
                  ? '♥ In your list'
                  : '♡ Add to my list'}
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  )
}

export default App
