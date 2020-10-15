import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/actions/userActions';
import FormField from '../components/FormField'
import InputField from '../components/InputField'

import '../styles/signup-styles.css'
import { Link, useHistory } from 'react-router-dom';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const RegisterPage = () => {
	const history = useHistory()
	const dispatch = useDispatch()
	const loader = useSelector(storeState => storeState.userState.loader )
	const [user, setUser] = useState({
		user_name: '',
		email: '',
		password: '',
		errors: {
			user_name: '',
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
		  case 'user_name': 
			errors.user_name = 
			  value.length < 5
				? 'Full Name must be at least 5 characters long!'
				: '';
			break;
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
			dispatch( registerUser({ 
				user_name : user.user_name,
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
			<div className='register-form-container'>
				<FormField className='register-form'  onSubmit={handleSubmit}>
					<div>
						<InputField
							type="text"
							name="user_name"
							onChange={handleChange}
							value={user.user_name}
							placeholder="Enter Name"
							required
						/>
						{
							user.errors.user_name.length > 0 && 
							<span className='error'>{ user.errors.user_name }</span>
						}
					</div>
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
						<InputField type="submit" value="Register"/>
						{
							loader && <Spin className="spinner" indicator={antIcon} />
						}
					</div>
					<p style={{ textAlign : "center", fontWeight : 500}}>already registered? click <Link to='/signIn'>here</Link></p>
				</FormField>
				<img className='signup-image' src='https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/sign_in_e6hj.svg' alt="signUp"/>
			</div>
		</>
	);
}

export default RegisterPage;
