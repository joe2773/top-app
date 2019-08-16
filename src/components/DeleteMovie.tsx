import * as React from 'react';

interface IProps {
    movieId: any,
    deleteMovieFromState: (movieId:any)=>void,
    userId: any
}
class DeleteMovie extends React.Component<IProps,{}>{

// This class takes a movie id and user id as props and sends a DELETE request to the API, deleting the desired movie from the users list
    public static defaultProps = {
        movieId: '',

    }
    constructor(props:any){
        super(props)

        this.deleteMovie = this.deleteMovie.bind(this)

    }
    public deleteMovie(event:any){

        fetch('https://topapi.azurewebsites.net/home',{
            method: 'DELETE',
            body: JSON.stringify(this.props),
            headers:{
                'Content-Type': 'application/json',
            }
        })
        .then(response=>response.json())
            .then(data =>{
                console.log('deletion successful')
                this.props.deleteMovieFromState(this.props.movieId)
            })
            .catch(error =>{
                console.log(error)
            })
    }
    public render(){
        return(
            <button onClick = {this.deleteMovie}>delete movie </button>

        )
    }
}

export default DeleteMovie
