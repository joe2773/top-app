import * as React from 'react'

interface IRatingProps {
    movieId: any
}
class Rating extends React.Component<IRatingProps,{}>{

    public static defaultProps = {
        movieId: ''
    }

    public constructor(props: any){
        super(props)
        this.updateMovieRating = this.updateMovieRating.bind(this)
    }
    public updateMovieRating(event: any){
        const id = event.target.id
        const ratingUpdate = {
            movie_id: this.props.movieId,
            rating: id
        }

        const url = "https://topapi.azurewebsites.net/movieRating"
        fetch(url,{
            method: "POST",
            body: JSON.stringify(ratingUpdate),
            headers:{
                'Content-Type': 'application/json',
            }
        })

        .then(response =>{
            alert('rating updated succesffully, reload the page to see')
        })
        .catch(error =>{
            console.log(error)
        })


    }

    public render(){
        return(
            <div>
                change rating to:
                <button onClick = {this.updateMovieRating} id = '1' > 1 </button>
                <button onClick = {this.updateMovieRating} id = '2' > 2 </button>
                <button onClick = {this.updateMovieRating} id = '3' > 3 </button>
                <button onClick = {this.updateMovieRating} id = '4' > 4 </button>
                <button onClick = {this.updateMovieRating} id = '5' > 5 </button>
            </div>)
    }

}

export default Rating
