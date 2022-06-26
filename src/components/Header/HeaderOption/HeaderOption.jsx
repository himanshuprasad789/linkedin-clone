import React from 'react'
import './HeaderOption.scss'
const HeaderOption = ({Icon,title}) => {
  return (
    <div className='header-option'>
        {Icon && <Icon className='header-option__icon' fontSize='small'>{Icon}</Icon>}
        <h4 className='header-option__title'>{title}</h4>
    </div>
  )
}

export default HeaderOption