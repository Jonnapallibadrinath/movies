import { Chip } from "@material-ui/core";
import axios from "axios"
import { useEffect } from "react";


const Genres = ({
    type,
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    setPage }) => {

      const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setPage(1);
      };
      const handleRemove = (genre) => {
        setSelectedGenres(
          selectedGenres.filter((selected) => selected.id !== genre.id)
        );
        setGenres([...genres, genre]);
        setPage(1);
      };
    const fetchGenres = async ()=>{
        const {data}=await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        // console.log('fuck', data.genres)
        setGenres(data.genres);
        // console.log(data.genres)
    };
    

    useEffect(() => {
      fetchGenres();
  
      // return () => {
      //   setGenres({}); // unmounting
      // };
      // eslint-disable-next-line
    }, []);
  // console.log('genres', genres);
  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          color="primary"
          clickable
          size="small"
          onDelete={() => handleRemove(genre)}
        />
      ))}
      { genres && genres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          clickable
          size="small"
          onClick={() => handleAdd(genre)}
        />
      ))}
      
    </div>
  )
}

export default Genres
