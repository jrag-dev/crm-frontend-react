import React from 'react'
import { Link } from 'react-router-dom';


import '../../scss/pages/Profile.scss'

const Profile = () => {
  return (
    <div className="profile-page">
      <h1 className="profile__title">Vista actualmente en contrucción</h1>
      <p className="profile__paragraph">Disculpe las moslestias ocacionadas!</p>
      <Link to="/" className="btn-volver">Regresar</Link>
    </div>
  )
}

export default Profile
