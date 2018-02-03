import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'


const Card = (props) => {
	return(
  <div style={{margin: '1em'}}>
  	<img width="75" src={props.avatar_url} alt="git img"/>
    <div style={{display: 'inline-block', marginLeft: '10'}}>
    	<div style={{fontSize: '1.25em', fontWeight: 'bold'}}>
      {props.name}
      </div>  
      <div>  
        {props.company}
        </div>  
  </div>
  </div>
        )
}

const CardList = (props) =>{
return(
	<div>
  	{props.cards.map(card => <Card {...card}/>)}
  </div>
)
}

const Repo = (props) => {
	return(
  <div style={{margin: '1em'}}>
  	<div style={{display: 'inline-block', marginLeft: 10}}>
    	<div style={{fontSize: '1.25em', fontWeight: 'bold'}}>
      Fullname: {props.full_name}
      </div>
      <div>
      Repos: {props.name}
      </div>
      <div>
        Created: {props.created_at}
      </div>
      <div>
        Pushed: {props.pushed_at}
      </div>
      <div>
        Updated: {props.updated_at}
      </div>
    </div>
  </div>
      )
}

const RepoList = (props) =>{
return(
	<div>
  	{props.repos.map(repo => <Repo {...repo}/>)}
  </div>
)
}

class Form extends React.Component{
	state={userName: ''}
  
	handleSubmit = (event) => {
    event.preventDefault()
    var returnData = null
    axios.get(`https://api.github.com/users/${this.state.userName}`)
    	.then(resp =>{
        returnData = resp
        console.log(resp)
      })
      .then(resp2 =>{axios.get(`https://api.github.com/users/${this.state.userName}/repos`)
    	.then(resp2 =>{
        console.log(resp2)
        this.props.onSubmit(returnData.data, resp2.data)
      })
    })}
  
  render(){
  	return(
    	<form onSubmit={this.handleSubmit}>
        <input type="text" 
        		value={this.state.userName}
            onChange={(event) => this.setState({userName: event.target.value })}
        		placeholder="Github userName" required/>
        <button type="submit">Add Card</button>
      </form>
    )
  }
}

class App extends React.Component{
  state = {
    cards : [],
    repos : [] 
	};
  
  addNewDetails = (cardInfo, repoInfo) =>{
    console.log(cardInfo);
    console.log(repoInfo)
    this.setState(prevState => ({
    cards: prevState.cards.concat(cardInfo),
    repos: prevState.repos.concat(repoInfo),
    }));

  }
	
  render(){
  	return(
    	<div>
        <Form onSubmit={this.addNewDetails}/>
        <CardList cards={this.state.cards}/>
        <RepoList repos={this.state.repos}/>


      </div>
    )
  }
}
ReactDOM.render(<App /> , document.getElementById('root'))


// {name: "1r0nF1st",
//               	avatar_url: "https://avatars0.githubusercontent.com/u/26969889?v=4",
//               	company: "1r0nF1st"
//               },
//               {name: "jodyjamesw",
//               	avatar_url: "https://avatars3.githubusercontent.com/u/16133660?v=4",
//               	company: "1r0nF1st"
//               }

// const Repo = (props) =>{
// 	return (<div>
//       Full Name: {props.full_name}
//     </div>)
// }

// const RepoList = (props) =>{
// 	return(<div>
// 		{props.cards.map(repo => <Repo {...repo}/>)}
//    </div>
//    )
// }