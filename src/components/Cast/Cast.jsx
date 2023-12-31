import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import css from './Cast.module.css';
import { fetchMovieCast } from 'services/api';
import userImg from '../../images/user-profile.png';

export const Cast = () => {
  const { moviesId } = useParams();
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!moviesId) return;
    const fetchMovie = async () => {
       
      try {
        const data = await fetchMovieCast(moviesId);

        setMovieData(data);
      } catch (error) {
        toast.error('There is something wrong in your action');
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovie();
  }, [moviesId]);
 
  return (
    <>
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <>
          {movieData.length > 0 ? (
            <header>
              <div>
                <ul>
                  {movieData.map(cast => (
                  <li key={cast.id}>
                    <img
                    className={css.imgCast}
                    src={
                      cast.profile_path ?
                      `https://image.tmdb.org/t/p/w200/${cast.profile_path}`:userImg}
                      alt="movie poster"
                      />

                      <div>{`Name: ${cast.original_name}`}</div>
                      <div>{`Character: ${cast.character}`}</div>
                      </li>
                      ))
                       }
                  </ul>
               </div>
             </header>
             ) : (
              <h4>There is not any information about it for now</h4>
             )
          }
        </>
        )
      }
    </>
  );
};
