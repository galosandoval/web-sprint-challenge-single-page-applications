import React from "react"

const Home = (props) => {
  return (
    <div>
      <div>
      <h3>Your Favorite Food Delivered While Coding</h3>
      </div>
      <div>
      <h4>Food Delivery in Gothan City</h4>
      </div>
      <div className='three-pic-container'>
        <div className="">
        <img src="https://images.unsplash.com/photo-1585759071429-1646f76ab8c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="mcCafe bag being handed off"></img>
        <h5>McDonald's</h5>
        <p>- American - Fast Food - Burgers -</p>
        <link href="https://www.mcdonalds.com/us/en-us.html"></link>
        </div>
      </div>
    </div>
  )
}

export default Home