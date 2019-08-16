
import * as React from 'react';

// this class is a button that is displayed alongside a movie search result, allowing users to add it to their list of movies
interface IMyState  {
    movieName:string;
    year: string;

}
interface IAddMovieProps {
    movieName: any
    year: any
    posterURL: any,
    userId: any
}
class AddMovie extends React.Component<IAddMovieProps,IMyState> {

    public static defaultProps = {
        movieName: '',
        year: '',
        posterURL: '',
        userId: ''
    }
    constructor(props:any){
        super(props)
        this.postMovieData = this.postMovieData.bind(this)

    }

    public postMovieData(event:any){
        event.preventDefault();

        console.log(JSON.stringify(this.props))
        fetch('https://topapi.azurewebsites.net/addMovie',{
            method: 'POST',
            body: JSON.stringify(this.props),
            headers:{
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                response.json().then((data)=>{
                    console.log(data)
                    alert('movie added successfully')
                })
            })
            .catch(error => {
                console.log(error)
            })
    }


  public render() {
    return (
      <div className="AddMovie">
        <form onSubmit = {this.postMovieData}>
            <input type = 'submit'value = 'Add movie' />

        </form>
      </div>
    );
  }
}


export default AddMovie;
