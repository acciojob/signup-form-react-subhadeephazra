import React, { useState } from 'react';

const Interface = () => {
  const [userInput, setUserInput] = useState({
    name: '',
    email: '',
    gender: 'male', // Set default value to 'male'
    phoneNumber: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const updateInput = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
    // Clear error message when user starts typing
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks
    if (!userInput.name || !userInput.email || !userInput.gender || !userInput.phoneNumber || !userInput.password) {
      setErrorMessage('All fields are mandatory.');
    } else if (!/^[a-zA-Z0-9\s]+$/.test(userInput.name)) {
      setErrorMessage('Name is not alphanumeric.');
    } else if (!userInput.email.includes('@')) {
      setErrorMessage('Email must contain @.');
    } else if (!['male', 'female', 'other'].includes(userInput.gender.toLowerCase())) {
      setErrorMessage('Please identify as male, female, or other.');
    } else if (!/^\d+$/.test(userInput.phoneNumber)) {
      setErrorMessage('Phone Number must contain only numbers.');
    } else if (userInput.password.length < 6) {
      setErrorMessage('Password must contain at least 6 letters.');
    } else {
      // All criteria satisfied, display greeting
      const username = userInput.email.split('@')[0];
      alert(`Hello ${username}`);
      // Clear form after successful submission
      setUserInput({
        name: '',
        email: '',
        gender: 'male',
        phoneNumber: '',
        password: '',
      });
    }
  };

  return (
    <div>
      {/* Show the form all the time */}
      <form onSubmit={handleSubmit}>
        {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}

        <label htmlFor="name" name="name">
          Name:
        </label>
        <input type="text" placeholder="example" data-testid="name" value={userInput.name} onChange={updateInput} />

        <label htmlFor="email" name="email">
          Email address:
        </label>
        <input type="text" placeholder="example@gmail.com" data-testid="email" value={userInput.email} onChange={updateInput} />

        <label htmlFor="gender" name="gender">
          Gender:
        </label>
        <select data-testid="gender" value={userInput.gender} onChange={updateInput}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="phoneNumber" name="phoneNumber">
          Phone Number:
        </label>
        <input type="text" placeholder="phoneno" data-testid="phoneNumber" value={userInput.phoneNumber} onChange={updateInput} />

        <label htmlFor="password" name="password">
          Password:
        </label>
        <input type="password" placeholder="password" data-testid="password" value={userInput.password} onChange={updateInput} />

        <button type="submit" data-testid="submit">
          Submit
        </button>
      </form>
      {
        errorMessage && <p>{errorMessage}</p>
      }
    </div>
  );
};

export default Interface;
