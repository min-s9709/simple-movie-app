import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import styles from "./Detail.module.css";

function Detail() {
    const [loading, setLoading] = useState(true);
    const [movieDetail, setMovieDetail] = useState([]);
    const {id} = useParams();
    const getMovie = async() => {
        const json = await(
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
            ).json();
            setMovieDetail(json.data.movie); 
            setLoading(false);
        };
    useEffect(() => {
       getMovie();
    },[]);

    return (
    <div className={styles.movie__Detail__container}>
       {loading ? 
       <div className={styles.loader}>
           <span>Loading...</span>
       </div>
       : 
       <div className={styles.movie__Detail}>
           <img src={movieDetail.medium_cover_image}  alt={movieDetail.title} className={styles.movie__Detail__img}/>
           <img src={movieDetail.background_image_original}  alt={movieDetail.title} className={styles.movie__Detail__background__img}/>     
                <div className={styles.movie__Detail__info}>
                    <h2 className={styles.title}>{movieDetail.title_long}</h2>
                    <h3 className={styles.rating}>{`Raiting: ${movieDetail.rating}💛`}</h3>
                    <h3 className={styles.runtime}>{`Runtime: ${movieDetail.runtime} min🕒`}</h3>    
                    <ul>
                        {movieDetail.genres.map(g => <li key={g}>{g}</li>)}    
                    </ul>
                    <div className={styles.movie__Description}>
                        <h3 className={styles.description}>Description💬</h3>
                        <span>
                        {movieDetail.description_full}
                        </span>
                    </div>  
                </div>
       </div>
       } 
    </div>
    );
}
export default Detail;