import * as React from 'react'
import EditMovieRankItem from './EditMovieRankItem'
import MovieRankItem from './MovieRankItem'
// import '/Users/joe/Github/top-app/src/CSS/Ranking.css'
interface IMyState {
    rankedMoviesArray: any[],
    isEditingMode: any,
    mode: any
}
interface IMyProps {
    userId: any
}
// this class displays the users top 10 ranked movies and allows them to change the ranking.
class TopTen extends React.Component<IMyProps,IMyState>{

    public constructor(props:any){
        super(props)
        this.state = {
            rankedMoviesArray: [{
                rank:'',
                movieName:'',
                movieId:'',
                posterURL:'',
                ranking:''
            }],
            isEditingMode: false,
            mode: 'view'
        }
        this.changeEditMode = this.changeEditMode.bind(this)
        this.createMovieRankingItems = this.createMovieRankingItems.bind(this)

    }
    public componentDidMount(){
        this.fetchTopTenRanking()
    }

    public fetchTopTenRanking(){
         const url = 'https://topapi.azurewebsites.net/topTenRanking?userId='+this.props.userId
         fetch(url)
         .then(response=>response.json())
         .then(data =>{

             const rankedDataArray = []

             let i =0
             for( i = 0;i<data.length;i++){
                 const movieObject = {
                     movieId: data[i][5],
                     movieName: data[i][0],
                     year: data[i][1],
                     posterURL: data[i][2],
                     ranking: data[i][4]
                 }
                 rankedDataArray.push(movieObject)
             }

             this.setState({
                 rankedMoviesArray: rankedDataArray
             })
         })
         .catch(error =>{
             console.log(error)
         })
    }




    public changeEditMode(){
        if(this.state.mode === 'view'){
            this.setState({
                mode: 'edit'
            })
        } else if(this.state.mode === 'edit'){
            this.setState({
                mode: 'view'
            })
        }
    }
    public createMovieRankingItems(mode:string){
        const items = []
        let i = 0
        if(mode === 'view'){
        for(i=0;i<10;i++){
            if(i<this.state.rankedMoviesArray.length){
                items.push(<MovieRankItem  id = {this.state.rankedMoviesArray[i].ranking} rankedMovie = {this.state.rankedMoviesArray[i]}/>)
            } else {
                items.push(<MovieRankItem  id = {i} rankedMovie = ''/>)
            }
        }
    } else {
        for(i=0;i<10;i++){
            if(i<this.state.rankedMoviesArray.length){
                // ranks that have been set by the user previously
                items.push(<EditMovieRankItem  id = {this.state.rankedMoviesArray[i].ranking} userId = {this.props.userId}rankedMovie = {this.state.rankedMoviesArray[i]}/>)
            } else {
                // empty edit ranking items
                items.push(<EditMovieRankItem   id = {i+1} userId = {this.props.userId} rankedMovie = ''/>)
            }
        }
    }
        return items

    }


    public render(){
        this.componentDidMount()
        if(this.state.mode === 'view'){
            const viewRankItems = this.createMovieRankingItems('view')

        return(
            <div>
                <button onClick = {this.changeEditMode}> change to edit mode </button>
                <div className = 'rank-view-grid-container'>

                    {viewRankItems}
                </div>
            </div>
        )

    } else {
            const editRankItems = this.createMovieRankingItems('edit')
        return(
            <div >
                <button onClick = {this.changeEditMode}> change to view mode </button>
                <div className = 'rank-edit-grid-container'>



                    {editRankItems}
                </div>
            </div>
        )
    }
    }
}

export default TopTen
