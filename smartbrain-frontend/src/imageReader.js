import React, {Component} from 'react';
//import logo from './logo.svg';
import './App.css';
// import Particles from 'react-particles-js';
// import particleOptions from './particles';
import TiltBox from './tiltbox';
//import Tilt from 'react-vanilla-tilt';
import InputField from './inputField';
import ImageBox from './imagebox';
import Logout from './logout';
import Clarifai from 'clarifai';



class ImageReader extends Component {
  constructor (props){
    super(props);
    this.state = {
      email:props.email,
      imgURL: '',
      boxes:[],
      entries:props.entries,
    }
  }

  getImg = (event) => {
    event.preventDefault();
    this.setState({imgURL:event.target.value, box:''});
    //console.log(this.state.box);
  }

  submitImage = (e) => {
    e.preventDefault();
    //need to send image URL
     // console.log(path);
     fetch('http://localhost:3001/imageProcessor', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
                                'imgURL':this.state.imgURL})
        })
        .then(res=>res.json())
        .then(res =>{
                    console.log(res.res.outputs[0]);
                     this.setState({'boxes':res.res.outputs[0].data.regions})
                    console.log(this.state.boxes);
                            })
       // .then(console.log(this.state.entries))
        .then(res => console.log(res))
        .catch(err => console.log(err))


    const entry = this.state.entries+1;
    fetch('http://localhost:3001/image', {
          method: 'PUT',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
                                'email':this.state.email,})
        })
        .then(res=>res.json())
        .then(res =>{
               //     console.log(res);
                     this.setState({
                              'entries':entry,
                       }
                              )})
       // .then(console.log(this.state.entries))
        .then(res => console.log(res))
        .catch(err => console.log(err))

    }

  render(){

    return (
      <div className="CoreApp">
        <TiltBox/>
        <div className="welcome">Welcome {this.props.name}. You have entered {this.state.entries} images.</div>
        <div className='welcome2'>Please submit an image url and let MagicReader find the face!</div>
        <InputField getIMG={this.getImg} submitImage={this.submitImage}/>
        <ImageBox ImgUrl = {this.state.imgURL} boxes={this.state.boxes}/>
        <Logout logout={this.props.logout}/>
      </div>
    );
  }
}

export default ImageReader;
