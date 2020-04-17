import React from 'react'
import './Home.scss'
import history from '../utils/history'

const Home = () => {
  const goToNextPage = () => {
    history.push({
      pathname: './generate'
    })
  }

  return (
    <div className="home-page" onClick={goToNextPage}>
      <h1 className="home-title">MC SANDWICH</h1>
      <footer className="footer">&copy; Background Photo by Chase Fade on Unsplash</footer>
    </div>
  )
}

export default Home
