import * as React from 'react';
import AddMovie from './AddMovie'
// import '/Users/joe/Github/top-app/src/CSS/Grid.css'
// import '/Users/joe/Github/top-app/src/CSS/Search.css'
interface IMyState  {
    searchTerm: any
    searchData: any
}
interface IMyProps {
    userId: any
}

// This class is the search page of the website, returning search results for a given keyword and allowing users to add search results to their movie list

class Search extends React.Component<IMyProps,IMyState>{


    public constructor(props:any){

        super(props)

        this.state = {
            searchTerm:'',
            searchData: []
        }
        this.fetchIMDBdata = this.fetchIMDBdata.bind(this)
        this.setSearchRequestParams = this.setSearchRequestParams.bind(this)

    }
    public fetchIMDBdata(){

        const apiKey = 'a0163dd3'

        let apiURL = 'https://www.omdbapi.com/?apikey='+apiKey
        apiURL = apiURL+'&s='+this.state.searchTerm
        console.log(apiURL)
        fetch(apiURL)
        .then(response=>response.json())
        .then(data=>{

            if(data.Search !== undefined){
                this.setState({
                    searchData: data.Search
                })
            } else {
                alert('movie not found')
            }
        })
        .catch(error => {
            console.log(error)
        })

    }
    public setSearchRequestParams(event:any){
        const value = event.target.value

        this.setState({
            searchTerm: value
        })

    }

    public render(){
        return(
            <div>

                <div className = 'search-grid-container'>
                    <div className = 'search-grid-item'>
                        <input id = 'searchInput' name = 'searchInput'type = 'text' placeholder= 'search' onChange = {this.setSearchRequestParams}/>
                        <input type = 'submit' value = 'go' onClick = {this.fetchIMDBdata}/>
                    </div>
                </div>

                <div className = 'grid-container'>
                {this.state.searchData.map((searchMovie :any)=> (
                    <div className = 'grid-item' key = {searchMovie.imdbID}>

                     {searchMovie.Title}


                      <img src = {searchMovie.Poster}/>

                     <AddMovie userId = {this.props.userId} movieName = {searchMovie.Title} year = {searchMovie.Year} posterURL = {searchMovie.Poster}/>
                    </div>

                ))}
                </div>
            </div>

        )
    }
}

export default Search;
