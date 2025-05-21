import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContexts";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { useLoginPrompt } from "../contexts/LoginPromptContext";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const { user } = useContext(AuthContext);
  const { requireLogin } = useLoginPrompt();

  const favorite = isFavorite(movie.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();

    // Krev innlogging før handling
    requireLogin(user, () => {
      if (favorite) {
        removeFromFavorites(movie.id);
      } else {
        addToFavorites(movie);
      }
    });
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={handleFavoriteClick}
            title={favorite ? "Fjern fra favoritter" : "Legg til i favoritter"}
          >
            ♥
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split("-")[0]}</p>
      </div>
    </div>
  );
}

export default MovieCard;
