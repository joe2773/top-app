import * as React from 'react';


import DeleteMovie from './DeleteMovie'
import Rating from './Rating'

// import '/Users/joe/Github/top-app/src/CSS/Grid.css'

interface IMyState  {
    myMovieArray: any[]

}
interface IMyProps {
    userId: any
}


// This class automatically displays all of the movies in a users list, giving them the option to delete movies as well
class Home extends React.Component<IMyProps,IMyState>{

    constructor(props:any){
        super(props)
        this.state = {
            myMovieArray: [{
                movieId: '',
                movieName: '',
                year: '',
                posterURL: '',
                rating:''

            }]
        }
        this.deleteMovieFromState = this.deleteMovieFromState.bind(this)
    }
    public componentDidMount(){
        this.fetchMyMovies()

    }

    public fetchMyMovies(){
        const url = 'https://topapi.azurewebsites.net/home?userId='+this.props.userId
        fetch(url)
        .then(response => response.json())
        .then(data=>{
            console.log(data)
            const movieDataArray = []

            let i = 0
            for( i = 0;i<data.length;i++){
                const movieObject = {
                    movieId: data[i][5],
                    movieName: data[i][0],
                    year: data[i][1],
                    posterURL: data[i][2],
                    rating: data[i][4]
                }
                movieDataArray.push(movieObject)
            }
            this.setState({
                myMovieArray:movieDataArray
            })

        })
    }
    // refreshes the page when a movie is deleted, such that the deletion can be shown
    public deleteMovieFromState(movieId:any){
        let i = 0;
        for(i = 0; i < this.state.myMovieArray.length;i++){
            if(this.state.myMovieArray[i].movieId === movieId){
                const updatedMyMovieArray = this.state.myMovieArray
                updatedMyMovieArray.splice(i,1)

                this.setState({
                    myMovieArray: updatedMyMovieArray
                })


            }
        }
    }


    public render(){
        if(this.state.myMovieArray.length !==0){
        return(

            <div className = 'grid-container'>


                {this.state.myMovieArray.map((myMovie: any ) =>(
                    <div className = 'grid-item'key = {myMovie.moveId}>
                        <img src = {myMovie.posterURL}/><br/>
                        rating: {myMovie.rating}/5
                        <Rating movieId = {myMovie.movieId}/>
                        <DeleteMovie userId = {this.props.userId}movieId = {myMovie.movieId} deleteMovieFromState = {this.deleteMovieFromState}/>
                    </div>

                ))}

            </div>
        )
    }
    return(
        <div> className = 'grid-container'>
            <div className = 'grid-item'>
                No movies added, find movies to add in Search
            </div>
        </div>
    )
    }

}

export default Home;
