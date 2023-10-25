import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

function Menu() {

  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" component="a" sx={{ flexGrow: 1 }}>
          Product Management
        </Typography>
        <Button startIcon={<ViewListRoundedIcon />} component={Link} to="/" color="inherit">List</Button>
        <Button startIcon={<AddCircleRoundedIcon />} component={Link} to="/register" color="inherit">Register</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Menu;