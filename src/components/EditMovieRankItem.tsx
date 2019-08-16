import * as React from 'react'
import '/Users/joe/Github/top-app/src/CSS/Ranking.css'
interface IMyProps {
    rankedMovie: any,
    userId:any,
    id:any

}
interface IMyState{
    myMovieArray: any[],
    newMovieRank: any
}
class EditMovieRankItem extends React.Component<IMyProps,IMyState>{

    constructor(props:any){
        super(props)
        this.state = {
            myMovieArray:[],
            newMovieRank: ''
        }
        this.fetchMyMovies = this.fetchMyMovies.bind(this)
        this.newMovieRank = this.newMovieRank.bind(this)
        this.saveRankingChanges = this.saveRankingChanges.bind(this)
        this.createMovieSelectOptions = this.createMovieSelectOptions.bind(this)

    }
    public componentDidMount(){
        this.fetchMyMovies()
    }
    public fetchMyMovies(){
        const url = 'https://topapi.azurewebsites.net/home?userId='+this.props.userId
        fetch(url)
        .then(response => response.json())
        .then(data=>{

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


    public newMovieRank(event:any){
        // this is called whenever a new movie is selected to be ranked
        const movie = event.target.value
        this.setState({
            newMovieRank:movie
        })
    }

    public saveRankingChanges(){


            const movieToUpdate = this.findMovieToUpdate(this.state.newMovieRank)
            console.log(JSON.stringify(movieToUpdate))
            const url = 'https://topapi.azurewebsites.net/topTenRanking'
            fetch(url,{
                method: "POST",
                body: JSON.stringify(movieToUpdate),
                headers:{
                    'Content-Type': 'application/json',
                }

            })

    }

    public findMovieToUpdate(movieName:string){
        const movieToUpdate = {
            movieId:this.props.rankedMovie.movieId,
            movieName: this.props.rankedMovie.movieName,
            posterURL:'',
            userId: this.props.userId,
            ranking: this.props.id
        }
        let i = 0
        for(i=0;i<this.state.myMovieArray.length;i++){
            if(this.state.myMovieArray[i].movieName === movieName){
                movieToUpdate.movieId = this.state.myMovieArray[i].movieId
                movieToUpdate.movieName = this.state.myMovieArray[i].movieName
                movieToUpdate.posterURL = this.state.myMovieArray[i].posterURL
            }
        }
        return movieToUpdate
    }

    public createMovieSelectOptions(){
        const options =[]
        if(this.props.rankedMovie !==''){
            options.push(<option>{this.props.rankedMovie.movieName}</option>)
            let i = 0;
            for(i=0;i<this.state.myMovieArray.length;i++){
                options.push(<option>{this.state.myMovieArray[i].movieName}</option>)
            }
            return options
        } else {
            options.push(<option>empty ranking slot </option>)
            let i = 0;
            for(i=0;i<this.state.myMovieArray.length;i++){
                options.push(<option>{this.state.myMovieArray[i].movieName}</option>)
            }
            return options
        }
        return options
    }

    public render(){
        const options = this.createMovieSelectOptions()
        const rank = Number(this.props.id)
        return(
            <div className = 'rank-edit-grid-item'>
                <select onChange = {this.newMovieRank}>
                {options}
                </select>

                {rank}

                <button onClick = {this.saveRankingChanges}> save rank</button>
            </div>
        )
    }
}

export default EditMovieRankItem
