import React from 'react'
import { Link } from 'react-router-dom'
import { classNames } from '../../utils/clases'


import './SideBarMenuItemView.scss';

const SideBarMenuItemView = ({ item, isOpen }) => {
  return (
    <div className='SideBarMenuItemView'>
      <Link to={item.url}>
        <div className={classNames('ItemContent', isOpen ? '' : 'collapsed')}>
          <div className='icon'>
            <item.icon size='32' />
          </div>
          <span className='label'>{item.label}</span>
        </div>
      </Link>
      {
        !isOpen ? (
          <div className='tooltip'>{item.label}</div>
        )
        : null
      }
    </div>
  )
}

export default SideBarMenuItemView
