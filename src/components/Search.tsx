import * as React from 'react';
interface IMyState  {
    searchTerm: any
    searchData: any
}

class Search extends React.Component<{},IMyState>{


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
        let apiURL = 'http://www.omdbapi.com/?apikey='+apiKey
        apiURL = apiURL+'&s='+this.state.searchTerm
        console.log(apiURL)
        fetch(apiURL)
        .then(response=>response.json())
        .then(data=>{
            this.setState({
                searchData: data.Search
            })
            console.log(data.Search[0].Poster)
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
                <input name = 'searchInput'type = 'text' placeholder= 'search' onChange = {this.setSearchRequestParams}/>
                <input type = 'submit' value = 'go' onClick = {this.fetchIMDBdata}/>

                <ul>
                {this.state.searchData.map((searchMovie :any)=> (
                    <div key = {searchMovie.imdbID}>
                    <li>
                     {searchMovie.Title}
                     </li>
                     <li>
                      <img src = {searchMovie.Poster}/>
                     </li>
                    </div>

                ))}
                </ul>
            </div>

        )
    }
}
export default Search;
