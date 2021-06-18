import React from 'react'
import {Link} from 'react-router-dom'
import './componentsStyle/modal.css'

export const Modal = ({active, setActive, children}) => {
    return(
        <div className = {active? 'Modal active': 'Modal'} onClick={() => setActive(false)} > 
            <div className={active? 'Modal__content active': 'Modal__content'} onClick={event => event.stopPropagation()}>
                <Link onClick={() => setActive(false)} className='CloseModal'>
                    <a href = "replace" className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">clear</i></a>
                </Link>
                {children}
            </div>
        </div>
    )
}
