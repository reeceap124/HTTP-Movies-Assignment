import React, {useState, useEffect} from 'react';
import axios from 'axios';

const initVal = {
    id: '',
    metascore: '',
    director: '',
    title: '',
    stars: []
}

export const UpdateForm = props => {
    const [movie, setMovie] = useState(initVal)
    
    useEffect(()=> {
        const targetMovie = props.movies.find(
            movie => `${movie.id}` === props.match.params.id
        );
        if (targetMovie) {
            setMovie(targetMovie)
        }

    },[props.movies, props.match.params.id])
    // 

    const handleChange = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }
    const handleNewStars = (e, i) => {
        e.preventDefault();
        const newStars = [...movie.stars];
        newStars[i] = e.target.value;
        setMovie({
            ...movie,
            stars: newStars
        });
    };
    const handleSubmit = e => {
        e.preventDefault()
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then((res)=>{
                console.log('put res', res)
                props.updateMovies((u) => [u, res.data])
                props.history.push(`/movies/${movie.id}`)
            })
            .catch(err => {
                console.log('put err', err)
            })
    }
    return (
        <div>
            <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" onChange={handleChange} placeholder="Movie Title" value={movie.title} />
        <input type="text"  name="director" onChange={handleChange} placeholder="Director" value={movie.director} />
        <input type="text" name="metascore" onChange={handleChange} placeholder="Metascore" value={movie.metascore} /><br/>
        {movie.stars && movie.stars.map((star, i) => {  
            console.log('star',star)      
            return (
                <input key={i} type="text" name='stars' onChange={e => handleNewStars(e, i)} placeholder="Star" value={movie.stars[i]}/>
            )
        })}
        {/* <input type="text" name="stars" onChange={handleChange} placeholder="stars" value={movie.stars} /> */}
        <button onClick={handleSubmit}>
          Update
        </button>
      </form>
        </div>
    )
}