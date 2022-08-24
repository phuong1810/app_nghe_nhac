import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AudioPlayer from 'material-ui-audio-player';

AlbumItem.propTypes = {
    album: PropTypes.object
}

AlbumItem.defaultProps = {
    album: {}
}

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
        color: '#f50057',
        '&:hover': {
          color: '#ff4081',
        },
      },
      replayIcon: {
        color: '#e6e600',
      },
      pauseIcon: {
        color: '#0099ff',
      },
      volumeIcon: {
        color: 'rgba(0, 0, 0, 0.54)',
      },
      volumeSlider: {
        color: 'black',
      },
      progressTime: {
        color: 'rgba(0, 0, 0, 0.54)',
      },
      mainSlider: {
        color: '#3f51b5',
        '& .MuiSlider-rail': {
          color: '#7986cb',
        },
        '& .MuiSlider-track': {
          color: '#3f51b5',
        },
        '& .MuiSlider-thumb': {
          color: '#303f9f',
        },
      },
}));

function AlbumItem({ album }) {

    const classes = useStyles();

    // const theme = useTheme();

    return (
        <Grid item xs={3}>
            <Card className={classes.root}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                      {album.name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {album.singer}
                    </Typography>
                    </CardContent>
                    <div className={classes.controls}>
                        <AudioPlayer
                            useStyles={useStyles}
                            src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                            
                            width="100%"
                            variation="default"
                            spacing={3}
                        />
                    </div>
                </div>
            <CardMedia
                className={classes.cover}
                image={album.thumbnailUrl}
                title={album.name} 
            />
            </Card>
        </Grid>
    );
}

export default AlbumItem;
