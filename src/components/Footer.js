import React from 'react'
import logo from '../logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <footer>
        <img src={logo}/>
        <div className='social-media'>
            <a href='https://www.linkedin.com/in/juan-ignacio-llaberia-241b351b3/'><FontAwesomeIcon icon={faLinkedin} size='2x'/></a>
            <a href='https://github.com/JuaniLlaberia'><FontAwesomeIcon icon={faGithub} size='2x'/></a>
            <a href='https://www.instagram.com/juani_llabe/'><FontAwesomeIcon icon={faInstagram} size='2x'/></a>
        </div>
    </footer>
  )
}

export default Footer
