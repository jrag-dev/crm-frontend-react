import React, {useContext, useEffect} from 'react';
import { VscMenu } from "react-icons/vsc";

import { classNames } from '../../utils/clases';
import SideBarMenuCardView from './SideBarMenuCardView';
import SideBarMenuItemView from './SideBarMenuItemView';

import './SideBarMenu.scss'
import AuthContext from '../../context/auth/authContext';


const SideBarMenu = ({ isOpen, handleClick, items, card }) => {

  // extraer la información del usuario autenticado
  const { usuario, autenticado, usuarioAutenticado } = useContext(AuthContext)

  useEffect(() => {
    usuarioAutenticado()
  }, [])


  return (
    <div className={autenticado ? classNames('SideBarMenu', isOpen ? 'expanded' : 'collapsed') : 'SideBarMenuNone'}>
      <div className='menuButton'>
        <button 
          className='hamburgerIcon'
          onClick={handleClick}
        >
          <VscMenu size='32' />
        </button>
      </div>
      <SideBarMenuCardView 
        usuario={usuario}
        card={card} 
        isOpen={isOpen} 
      />
      {
        items.map(item => (
          <SideBarMenuItemView
            key={item.id}
            item={item}
            isOpen={isOpen}
          />
        ))
      }
    </div>
  )
};

export default SideBarMenu;
