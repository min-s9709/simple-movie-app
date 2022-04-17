import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";

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
    <div>
       {loading ? <h1>Loading...</h1>: 
       <div>
           <img src={movieDetail.medium_cover_image}  alt={movieDetail.title} />
                <h2>{movieDetail.title_long}</h2>
                <h3>{`Raiting: ${movieDetail.rating}`}</h3>
                <h3>{`Runtime: ${movieDetail.runtime} min`}</h3>    
                <ul>
                    {movieDetail.genres.map(g => <li key={g}>{g}</li>)}    
                </ul>
                <div>
                    <h3>Description</h3>
                    <p>
                        {movieDetail.description_full}
                    </p>
                </div>  
       </div>
       } 
    </div>
    );
}
export default Detail;