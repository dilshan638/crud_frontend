import React from 'react'
import { Link } from 'react-router-dom'
function SideNavBar() {
  return (
    <>
      <div style={{ width: '100vw', height: '100vh', display: 'flex' }}>
        <div style={{ width: '250px', backgroundColor: '#3F3F3F' }}>
          <Link to='/page'>
            <div style={{
              marginTop: '40px', borderRadius: '10px', height: '40px',
              backgroundColor: 'darkcyan', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              Page</div>
          </Link>
          <Link to='/user'> 
          <div style={{
              marginTop: '40px', borderRadius: '10px', height: '40px',
              backgroundColor: 'darkcyan', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              User</div>
        </Link>
        </div>

        <div style={{ width: '100vw' }}>
          <h2>
            HASH Maldives is a fast growing Creative Agency with 80 percent of focus on Web Design & Development. Other 20 percent of our focus goes to Graphic Design, Digital Marketing, and Office Solutions.!</h2>
        </div>
      </div>
    </>
  )
}

export default SideNavBar
