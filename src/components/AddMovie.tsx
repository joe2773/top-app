
import * as React from 'react';



interface IMyState  {
    movieName:string;
    year: string;
    director: string;
}

class AddMovie extends React.Component<{},IMyState> {

    constructor(props:any){
        super(props)
        this.state = {
            movieName:'',
            year:'',
            director:''
        }
        this.setPostParams = this.setPostParams.bind(this)
        this.postMovieData = this.postMovieData.bind(this)

    }

    public postMovieData(event:any){
        event.preventDefault();

        console.log(JSON.stringify(this.state))
        fetch('http://localhost:5002/home',{
            method: 'POST',
            body: JSON.stringify(this.state),
            headers:{
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                response.json().then((data)=>{
                    console.log(data)

                })
            })
            .catch(error => {
                console.log(error)
            })
    }
    public setPostParams(event:any){
        if(event.target.id === 'movieName'){
            this.setState({
                movieName: event.target.value
            })
        } else if(event.target.id === 'year'){
            this.setState({
                year: event.target.value
            })
        }
    }
    public test(){
        console.log('hi')
    }
  public render() {
    return (
      <div className="AddMovie">
        <form onSubmit = {this.postMovieData}>
            Movie name: <input id = 'movieName' type = 'text' onChange = {this.setPostParams} />
            director: <input  id = 'director' type = 'text' onChange = {this.setPostParams}/>
            year: <input id = 'year' type = 'text' onChange = {this.setPostParams}/>

            <input type = 'submit'value = 'Add movie' />
        </form>
      </div>
    );
  }
}

export default AddMovie;
