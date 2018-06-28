/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import {
  Navbar,
  NavItem,
  Nav,
  NavDropdown,
  MenuItem,
  Glyphicon,
  Button,

} from 'react-bootstrap';

let showLogout = [];
class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName:'',
      position:'',
    };
  }



  async componentDidMount(){
    const isStudent = sessionStorage.getItem('isStudent');
    const isTeacher = sessionStorage.getItem('isTeacher');
    const isTeacherAssistant = sessionStorage.getItem('isTeacherAssistant');
    const isAdmin = sessionStorage.getItem('isAdmin');
    if(isStudent === 'true'){
      const studentFirstName =  sessionStorage.getItem('studentFirstName');
      const studentLastName =  sessionStorage.getItem('studentLastName');
        this.setState({firstName: studentFirstName});
        this.setState({lastName: studentLastName});

      showLogout.push(<Button bsStyle="danger"  style={{'margin-top':'10'}} bsSize="small" onClick={this.logoutRedirect.bind(this)}><span className="glyphicon glyphicon-log-out"/>&nbsp;ออกจากระบบ</Button>)

    }
    if(isTeacher === 'true'){
      const teacherFirstName =  sessionStorage.getItem('teacherFirstName');
      const teacherLastName =  sessionStorage.getItem('teacherLastName');
      this.setState({firstName: teacherFirstName});
      this.setState({lastName: teacherLastName});

      showLogout.push(<Button bsStyle="danger"  style={{'margin-top':'10'}} bsSize="small" onClick={this.logoutRedirect.bind(this)}><span className="glyphicon glyphicon-log-out"/>&nbsp;ออกจากระบบ</Button>)
    }
    if(isTeacherAssistant === 'true'){
      const teacherAssistantFirstName =  sessionStorage.getItem('teacherAssistantFirstName');
      const teacherAssistantLastName =  sessionStorage.getItem('teacherAssistantLastName');
      this.setState({firstName: teacherAssistantFirstName});
      this.setState({lastName: teacherAssistantLastName});

      showLogout.push(<Button bsStyle="danger" style={{'margin-top':'10'}} bsSize="small" onClick={this.logoutRedirect.bind(this)}><Glyphicon glyph="log-out"/>&nbsp;ออกจากระบบ</Button>)
    }
    if(isAdmin === 'true'){
      const adminFirstName =  sessionStorage.getItem('adminFirstName');
      const adminLastName =  sessionStorage.getItem('adminLastName');
      this.setState({firstName: adminFirstName});
      this.setState({lastName: adminLastName});
      showLogout.push(<Button bsStyle="danger"  style={{'margin-top':'10'}} bsSize="small" onClick={this.logoutRedirect.bind(this)}><Glyphicon glyph="log-out"/>&nbsp;ออกจากระบบ</Button>)
    }
  }

  logoutRedirect(){
    sessionStorage.clear();
    window.location.replace("/");
  }

  render() {
    return (

        <Navbar inverse staticTop fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">GE Smart Classroom</a>
            </Navbar.Brand>
          </Navbar.Header>
          {/*<Nav>*/}
          {/*<NavItem eventKey={1} href="#">Link</NavItem>*/}
          {/*<NavItem eventKey={2} href="#">Link</NavItem>*/}
          {/*<NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">*/}
          {/*<MenuItem eventKey={3.1}>Action</MenuItem>*/}
          {/*<MenuItem eventKey={3.2}>Another action</MenuItem>*/}
          {/*<MenuItem eventKey={3.3}>Something else here</MenuItem>*/}
          {/*<MenuItem divider/>*/}
          {/*<MenuItem eventKey={3.4}>Separated link</MenuItem>*/}
          {/*</NavDropdown>*/}
          {/*</Nav>*/}
          <Nav pullRight>

            <NavItem eventKey={2} href="#">

                {/*<img src="https://freeiconshop.com/wp-content/uploads/edd/person-flat.png" style={{*/}
                  {/*width: '30px',*/}
                  {/*height: '30px',*/}
                  {/*'background-color':'white',*/}
                {/*}} alt=""/>*/}
                {/*&nbsp;*/}
                {/*ณัฐปคัลภ์ ลิไชยกุล*/}
                {this.state.position}&nbsp;{this.state.firstName}&nbsp;{this.state.lastName}



            </NavItem>

            {showLogout}

          </Nav>
        </Navbar>


    );
  }
}

export default withStyles(s)(Header);
