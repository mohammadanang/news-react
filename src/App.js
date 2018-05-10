import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Lightbox from 'react-image-lightbox';
import { Menu, Upload, message, Button, Icon } from 'antd';

const images = [
  'https://images.performgroup.com/di/library/omnisport/7c/94/liverpool-cropped_7pdl7v61e9ca15dvoa6ssugo2.jpg?t=-1689228918&quality=90&w=1280',
  'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png',
  'http://isport.ir/uploads/images/13970117889_skysports-liverpool-manchester_4273508.jpg'
];

class App extends Component {
  constructor() {
    super();

    this.state = {
      filter: '',
      provinces: [],
      photoIndex: 0,
      isOpen: false
    }
  }

  componentDidMount() {
    // ajax
    fetch('http://localhost:8000/api/all')
    .then(response => response.json())
    .then((json) => {
          this.setState({
            provinces: json.data
          })
        })
  }

  filter = () => {
    fetch('http://localhost:8000/api/get?filter=' + this.state.filter)
    .then(response => response.json())
    .then((json) => {
          this.setState({
            provinces: json.data
          })
        })
  };

  onChangeText = (event) => {
    this.setState({
      filter: event.target.value
    })
  };

  handleClick = (e) => {
      console.log('click', e);
      this.setState({
          current: e.key
      });
  };

  renderProvinces(item, index) {
    return <li key={index}>{item.name}</li>
  }

  render() {

    const { photoIndex, isOpen } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to News React</h1>
        </header>
        <p className="App-intro">
          To get filtering data, fill this input below and hit the button.
        </p>
        <input type="text" value={this.state.filter} onChange={this.onChangeText} style={{marginBottom: 8}}/><br/>
        <button onClick={this.filter}>Saring</button>

        <div style={{display: 'flex', justifyContent: 'center', textAlign: 'left'}}>
          <ol>
            { this.state.provinces.map(this.renderProvinces) }
          </ol>
        </div>

        <button type="button" onClick={() => this.setState({ isOpen: true })}>
          Open Lightbox
        </button>

        {isOpen && (
            <Lightbox
                mainSrc={images[photoIndex]}
                nextSrc={images[(photoIndex + 1) % images.length]}
                prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                onCloseRequest={() => this.setState({ isOpen: false })}
                onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length,
              })
            }
                onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length,
              })
            }
            />
        )}
      </div>
    );
  }
}

export default App;
