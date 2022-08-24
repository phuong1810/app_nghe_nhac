import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ViewListIcon from '@material-ui/icons/ViewList';
import CategoryIcon from '@material-ui/icons/Category';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import Member from './Member';
import Category from './Category';
import Album from './Album';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
// import Home from '../../features/Home';

const OnLogout = () =>{
  // const navigate = useNavigate();
  localStorage.removeItem('jwtToken');
  // navigate('/admin/login');
  window.location.replace('/admin/login');
}

export const mainListItems = (
 
  
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link to={ '/admin' }>Dashboard</Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <CategoryIcon />
      </ListItemIcon>
      <Link component={ Category } to={ '/admin/category' }>Category</Link>   
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ViewListIcon/>
      </ListItemIcon>
      <Link component={ Album } to={ '/admin/album' }>List Album</Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <Link component={ Member } to={ '/admin/member' }>Member</Link>      
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <Button variant="contained" color="primary" onClick={OnLogout}>
        Logout
      </Button>     
    </ListItem>
  </div>
);
export const secondaryListItems = (
  <div>

  </div>
);