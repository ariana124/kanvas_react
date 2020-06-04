import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { read, update } from './apiUser';
import { Redirect } from 'react-router-dom';

class EditProfile extends Component {
    constructor() {
        super()
        this.state = {
            id: "",
            name: "",
            email: "",
            password: "",
            redirectToProfile: false
        }
    }

    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
        // This redirects the user to the signin component if they're not authenticated. 
            if (data.error) {
                this.setState({ redirectToProfile: true })
            } else {
                this.setState({
                    id: data._id,
                    name: data.name,
                    email: data.email,
                    error: ""
                 });
            }
        })
    };

    // A lifecycle method (?), when this component mounts we get the userId to make a GET request to the backend.
    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId);
    };

    // This is a higher order function: a function that returns another function. We need this to handle events.
    handleChange = name => event => {
        // When there's a change happening in user signup input it will clear the old errors.
        this.setState({ [name]: event.target.value });
    };

    clickSubmit = event => {
        // By default when the user clicks the submit button the page refreshes so that's why we're disabling it.
        event.preventDefault();
        const { name, email, password } = this.state;
        const user = {
            name,
            email,
            password: password || undefined
        };
  
        // console.log(user);
        // This handles errors when the user is signing up. (Eg. Email is already in use.)
        const userId = this.props.match.params.userId;
        const token = isAuthenticated().token;
        update(userId, token, user).then(data => {
            if (data.error) {
                this.setState({ error: data.error });
            } else {
                this.setState({ redirectToProfile: true });
            }
        });

    };

    signupForm = (name, email, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={this.handleChange("name")} className="form-control" type="text" value={name}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={this.handleChange("email")} className="form-control" type="email" value={email}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={this.handleChange("password")} className="form-control" type="password" value={password}/>
            </div>
            <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Update</button>
        </form> 
    )

    render() {
        const { id, name, email, password, redirectToProfile } = this.state;
        if (redirectToProfile) {
            return <Redirect to={`/user/${id}`}/>;
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit Profile</h2>
                {this.signupForm(name, email, password)}
            </div>
        )
    }
}

export default EditProfile;