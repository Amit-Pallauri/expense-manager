import React, {  useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';
import FormField from '../components/FormField'
import InputField from '../components/InputField'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import '../styles/signin-styles.css'

const Loginpage = () =>{
	const history = useHistory()
	const dispatch = useDispatch()
	const loader = useSelector( storeState => storeState.userState.loader)
	
	const[user, setUser] = useState({
		email : "",
		password : "",
		errors: {
			email: '',
			password: '',
		}
	})
	
	const validEmailRegex = RegExp(
		/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
	);

	const validateForm = errors => {
		let valid = true;
		Object.values(errors).forEach(val => val.length > 0 && (valid = false));
		return valid;
	};
	
    const handleChange = (event) => {
		event.preventDefault();
		const { name, value } = event.target;
		let errors = user.errors;
		switch (name) {
		  case 'email': 
			errors.email = 
			  validEmailRegex.test(value)
				? ''
				: 'Email is not valid!';
			break;
		  case 'password': 
			errors.password = 
			  value.length < 6
				? 'Password must be at least 6 characters long!'
				: '';
			break;
		  default:
			break;
		}
	
		setUser({...user, errors, [name]: value});
	}

    const handleSubmit = (e) => {
		e.preventDefault();
		if(validateForm(user.errors)) {
			dispatch(loginUser({
				email : user.email,
				password : user.password
			 }, history))	
		  }else{
			alert('please check your credentials again')
		  }
	}

	const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

	return (
		<>
			<div className='login-form-container'>
				<FormField className='login-form' onSubmit={handleSubmit}>
					<div>
						<InputField
							type="email"
							name="email"
							onChange={handleChange}
							value={user.email}
							placeholder="Enter your email"
							required
						/>
						{
							user.errors.email.length > 0 && 
							<span className='error'>{user.errors.email}</span>
						}
					</div>
					<div>
						<InputField
							type="password"
							name="password"
							onChange={handleChange}
							value={user.password}
							placeholder="Enter password"
							required
						/>
						{
							user.errors.password.length > 0 && 
							<span className='error'>{user.errors.password}</span>
						}
					</div>
					<div>
						<InputField type="submit" value="Login"/>
						{
							loader && <Spin className="spinner" indicator={antIcon} />
						}
					</div>
					<p style={{ textAlign : "center", fontWeight : 500}}>new here? click <Link to='/signUp'>here</Link></p>
				</FormField>
				<img className='signin-image' src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/authentication_fsn5.svg" alt=""/>
			</div>
		</>
	);
}

export default  Loginpage;
