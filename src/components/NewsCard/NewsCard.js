import React , {useEffect, useState, createRef} from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Button, Typography, CardActions } from '@mui/material'
import useStyles from './styles'
import styles from './styles'
import classNames from 'classnames';

const NewsCard = ({ article: { description, publishedAt, source, title, url, urlToImage }, i, activeArticle }) => {
  const classes = useStyles();

  //styling-starts

  const styles = {
    media: {
      height: 250,
    },
    border: {
      border: 'solid',
    },
    fullHeightCard: {
      height: '100%',
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderBottom: '10px solid white',
    },
    activeCard: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderBottom: '10px solid #22289a',
    },
    grid: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '20px',
    },
    title: {
      padding: '0 16px',
    },
    cardActions: {
      padding: '0 16px 8px 16px',
      display: 'flex',
      justifyContent: 'space-between',
    },
  }

  //styling-ends

  const [elRefs, setElRefs] = useState([]);
  const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 35);

  useEffect(() => {
    window.scroll(0, 0);

    setElRefs((refs) => Array(20).fill().map((_, j) => refs[j] || createRef()));
  }, []);

  useEffect(() => {
    if (i === activeArticle && elRefs[activeArticle]) {
      scrollToRef(elRefs[activeArticle]);
    }
  }, [i, activeArticle, elRefs]);

  return (
    // classNames(styles.card, activeArticle === i?styles.activeCard:null)
    //activeArticle === i? styles.activeCard:styles.card
    <Card ref={elRefs[i]} style={activeArticle === i? styles.activeCard:styles.card}>
        <CardActionArea href={url} target="_blank">
          <CardMedia style={styles.media} className={classes.media} image={urlToImage || 'https://www.industry.gov.au/sites/default/files/August%202018/image/news-placeholder-738.png'} />
          <div style={styles.details}>
            <Typography variant="body2" component="h2" color="textSecondary">{(new Date(publishedAt)).toDateString()}</Typography>
            <Typography variant="body2" component="h2" color="textSecondary">{source.name}</Typography>
          </div>
          <Typography style={styles.title} gutterBottom variant="h5">{title}</Typography>
          <CardContent>
            <Typography variant="body2" component="p" color="textSecondary">{description}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions style={styles.cardActions}>
          <Button size="small" color="primary">Learn More</Button>
          <Typography variant="h5" color="textSecondary">{i + 1}</Typography>
        </CardActions>
      </Card>
    
    
  )
}

export default NewsCard
