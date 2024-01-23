import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import Navigation from '../components/Navigation';
import Signin from '../components/Signin';
import Particles from 'react-particles-js';
import Register from '../components/Register';
import PersonInfo from '../components/PersonInfo';
import Detail from '../components/Detail';
import AddHistory from '../components/AddHistory';
import './App.css';



const particlesOptions = {
	particles: {
    	number:{
    		value: 60,
    		density:{
    			enable: true,
    			value_area: 700
    		}
    	}	
    }
}

const featuredCourses = [
	{
	  title: "General Physics",
	  description: "General Physics",
	  image: "../images/course1.jpg",
	},
	{
	  title: "General Chemistry",
	  description: "General Chemistry",
	  image: "../images/course2.jpg",
	},
  ];

class App extends Component {
	constructor() {
	  super();
	  this.state = {
		courses: [],
		recombycou: [],
		searchfiled: '',
		route: 'signin',
		user: {
		  studentid: '',
		  name: '',
		  email: '',
		},
	  };
	}
  
	loadUser = (data) => {
	  this.setState({
		user: {
		  studentid: data.studentid,
		  name: data.name,
		  email: data.email,
		},
	  });
	};
  
	componentDidMount() {
	  fetch('http://localhost:3000/')
		.then((response) => {
		  if (!response.ok) {
			throw new Error('Network response was not ok');
		  }
		  return response.json();
		})
		.then((data) => {
		  if (Array.isArray(data)) {
			this.setState({ courses: data });
		  } else {
			console.error('Data is not an array', data);
		  }
		})
		.catch((error) => {
		  console.error('Error fetching courses:', error);
		});
  
	  fetch('http://localhost:3000/getrecombycou')
		.then((response) => response.json())
		.then((data) => {
		  this.setState({ recombycou: data });
		})
		.catch((error) => {
		  console.error('Error fetching recommendations:', error);
		});
	}

	onSearchChange = (event) => {
		this.setState({searchfiled: event.target.value })
	}

	onRouteChange = (route) =>{
		this.setState ({route: route});
	}

	render() {
		const { courses, recombycou, searchfiled, route } = this.state;
		const filterCourse = courses.filter((item) => {
		  return item.name.toLowerCase().includes(searchfiled.toLowerCase());
		});
	
		return (
		  <div className="tc">
			<Particles className="particles" params={particlesOptions} />
			{route === "home" ? (
			  <div>
				<div id="nav">
				  <SearchBox searchChange={this.onSearchChange} />
				  <Navigation onRouteChange={this.onRouteChange} />
				</div>
				<div>
				  <CardList onRouteChange={this.onRouteChange} courses={filterCourse} />
				</div>
			  </div>
			) : route === "signin" ? (
			  <div>
				<h1 className="f1">Course Recommender</h1>
				<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
			  </div>
			) : route === "register" ? (
			  <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
			) : route === "personinfo" ? (
			  <div>
				<Navigation onRouteChange={this.onRouteChange} />
				<PersonInfo sid={this.state.user.studentid} onRouteChange={this.onRouteChange} />
			  </div>
			) : route === "addhistory" ? (
			  <div>
				<Navigation onRouteChange={this.onRouteChange} />
				<AddHistory onRouteChange={this.onRouteChange} />
			  </div>
			) : (
			  <div>
				<Navigation onRouteChange={this.onRouteChange} />
				<Detail onRouteChange={this.onRouteChange} />
			  </div>
			)}
			{/**/}
			<div>
			  <h2>Featured Courses</h2>
			  <div className="featured-courses">
				{featuredCourses.map((course, index) => (
				  <div key={index} className="course-card">
					<img src={`images/${course.image}`} alt={course.title} />
					<h3>{course.title}</h3>
					<p>{course.description}</p>
				  </div>
				))}
			  </div>
			</div>
			{/* */}
			<h2>Categories</h2>
			<div className="categories">
			  {/* */}
			  <button>Category 1</button>
			  <button>Category 2</button>
			  {/*  */}
			</div>
		  </div>
		);
	  }
	}
	


export default App;
