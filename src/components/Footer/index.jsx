import React from 'react'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import './style.scss'
function Copyright() {
    return (
      <Typography variant="body2">
        {'Copyright © '}
        <Link color="inherit" href="">
          QP Theme
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}
export default function Footer() {
    return (
        <footer>
            <Container maxWidth="sm">
                <Copyright />
            </Container>
        </footer>
    )
}
