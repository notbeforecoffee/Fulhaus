import React, {useState} from 'react'
import './sideDrawer.css'


const SideDrawer = (props) => {


  return (

     <nav className={`sideDrawer ${props.name}`}>
        <div className="store_items">items go here</div>

        <div className="totalsContainer">
        <div className="total">Total</div>
        <div className="subTotal">TBD</div>
        </div>
       
        <div className='checkout_btn'>
        <button >
            Checkout
        </button>
        </div>
      
    </nav>
  )
}

export default SideDrawer