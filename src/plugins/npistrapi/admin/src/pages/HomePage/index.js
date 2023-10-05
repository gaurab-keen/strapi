/*
 *
 * HomePage
 *
 */
// import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import classes from './index.module.css';
// import PropTypes from 'prop-types';
// import pluginId from '../../pluginId';

const HomePage = () => {
  return (
    // <div>
    //   <h1>{pluginId}&apos;s HomePage</h1>
    //   <p>Happy coding</p>
    // </div>
    <>
    <div className={classes.nav}>
      <h1>Dashboard</h1>
    </div>
    <div className={classes.main}>
      <h1>Welcome to the Dashboard !!</h1>
    </div>
    </>
  );
};

export default HomePage;

// import 'bootstrap/dist/css/bootstrap.min.css';
// import React from 'react';
// // import pluginId from '../../pluginId';
// // import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';

// function HomePage() {
//   return (
//     <>
//       <Navbar className="bg-body-tertiary">
//         <Container>
//           <Navbar.Brand href="#home">Brand link</Navbar.Brand>
//         </Container>
//       </Navbar>
//       <br />
//       <Navbar className="bg-body-tertiary">
//         <Container>
//           <Navbar.Brand>Brand text</Navbar.Brand>
//         </Container>
//       </Navbar>
//       <br />
//       <Navbar className="bg-body-tertiary">
//         <Container>
//           <Navbar.Brand href="#home">
//             <img
//               src="/img/logo.svg"
//               width="30"
//               height="30"
//               className="d-inline-block align-top"
//               alt="React Bootstrap logo"
//             />
//           </Navbar.Brand>
//         </Container>
//       </Navbar>
//       <br />
//       <Navbar className="bg-body-tertiary">
//         <Container>
//           <Navbar.Brand href="#home">
//             <img
//               alt=""
//               src="/img/logo.svg"
//               width="30"
//               height="30"
//               className="d-inline-block align-top"
//             />{' '}
//             React Bootstrap
//           </Navbar.Brand>
//         </Container>
//       </Navbar>
//     </>
//   );
// }

// export default HomePage;
