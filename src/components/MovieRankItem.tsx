import * as React from 'react'
// import '/Users/joe/Github/top-app/src/CSS/Ranking.css'

interface IMyProps {
    rankedMovie: any,
    id: any
}
class MovieRankItem extends React.Component<IMyProps,{}>{

    public constructor(props:any){
        super(props)
    }
    public render(){

        if(this.props.rankedMovie !==''){

        return(

            <div className = 'rank-view-grid-item'>



                    <img src = {this.props.rankedMovie.posterURL}/>
                    <div>ranking: {this.props.rankedMovie.ranking}</div>
            </div>
        )
    }
        return(
            <div className = 'rank-view-grid-item'>
                Empty ranking slot
            </div>
        )

    }
}

export default MovieRankItem
