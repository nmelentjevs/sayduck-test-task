import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  card: {
    width: 250,
    margin: '20px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

const PreviewCard = ({ title, createdOn, description, previewImage }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={moment(createdOn, 'YYYY-MM-DD').format('DD MM, YYYY')}
      />
      {previewImage.src ? (
        <CardMedia
          className={classes.media}
          image={previewImage.src}
          title={previewImage.name}
        />
      ) : (
        <CardMedia
          className={classes.media}
          image={require('../../mocks/download.png')}
          title={'No preview'}
        />
      )}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PreviewCard;
