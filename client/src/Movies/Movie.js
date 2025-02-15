import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  handleEditClick = e => {
    e.preventDefault();
    this.props.history.push(`/edit_movie/${this.props.match.params.id}`)
  }

  handleDelete = (e) => {
    e.preventDefault()
    axios
      .delete(`http://localhost:5000/api/movies/${this.state.movie.id}`)
      .then(res => {
        console.log('delete res',res)
      })
      .catch(err => console.log(err.response));
      const newMovies = this.props.movies.filter(movie => movie.id !== this.state.movie.id);
      this.props.setMovies(newMovies);
      this.props.history.push('/');
    // this.props.deletedMovie(this.state.movie.id);
    
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }
    return (
      
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <button onClick={this.handleEditClick}>Edit</button>
        <button onClick={this.handleDelete}>Delete Movie</button>
      </div>
    );
  }
}
