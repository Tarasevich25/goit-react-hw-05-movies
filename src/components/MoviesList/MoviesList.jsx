import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import css from './MoviesList.module.css';

export const MoviesList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul>
      {movies.map(({ original_title, id }) => (
        <li key={id} className={css.listItem}>
          <Link to={`/movies/${id}`} state={{ from: location }}>
            {original_title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

MoviesList.propTypes = {
    movies: PropTypes.shape({
      original_title: PropTypes.string,
      id: PropTypes.string,
    }).isRequired,
  };