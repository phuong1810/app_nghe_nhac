import React from 'react';
import PropTypes from 'prop-types';
import AlbumItem from './AlbumItem';
import './style.scss';
import Grid from '@material-ui/core/Grid';

AlbumList.propTypes = {
    albumList: PropTypes.array.isRequired
};
AlbumList.defaultProps = {
    albumList: []
}
function AlbumList({ albumList }) {
    return (
        <Grid container spacing={3}>
            {albumList.map(album => (
                <AlbumItem key={album.id} album={album} />
            ))}            
        </Grid>
    );
}

export default AlbumList;