import React from 'react'
import { Link } from 'react-router-dom'
import { classNames } from '../../utils/clases'


import './SideBarMenuCardView.scss'

const SideBarMenuCardView = ({ card, isOpen, usuario }) => {
  return (
    <div className='SideBarMenuCardView'>
      <img className='profile' src={card.photoUrl} width='100%' />
      <div className={classNames('profileInfo', isOpen ? null : 'collapsed')}>
        <div className='name'>
          <p>{usuario?.nombre || card.displayName}</p>
        </div>
        <div className='title'>
          { card.title }
        </div>
        <div className='url'>
          <Link to='/profile'>Ir al perfil</Link>
        </div>
      </div>
    </div>
  )
}

export default SideBarMenuCardView
