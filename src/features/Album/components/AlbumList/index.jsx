import React from 'react';
import PropTypes from 'prop-types';
import AlbumItem from './AlbumItem';
import './style.scss';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  }));

AlbumList.propTypes = {
    albumList: PropTypes.array.isRequired
};
AlbumList.defaultProps = {
    albumList: []
}
function AlbumList({ albumList }) {

    const classes = useStyles();

    return (
        <Container maxWidth="lg">
            <h1>Album List</h1>
            <Grid container spacing={3} className={classes.container}>
                {albumList.map(album => (
                    <AlbumItem key={album.id} album={album} />
                ))}            
            </Grid>
        </Container>
    );
}

export default AlbumList;