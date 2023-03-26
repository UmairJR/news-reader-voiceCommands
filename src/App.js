import React, { useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards";
import { makeStyles } from '@material-ui/styles';
import logo from './news-anchor.png';
import wordsToNumbers from "words-to-numbers";
import Footer from "./components/Footer";
import Header from "./components/Header";

// const alanKey = '3eece02658e35607411664568a6bc3ae2e956eca572e1d8b807a3e2338fdd0dc/stage';

function App() {
    //styling-start

    // const useStyles = makeStyles({
    //     footer: {
    //         textAlign: 'center',
    //         position: 'fixed',
    //         left: 0,
    //         bottom: 0,
    //         color: 'black',
    //         width: '100%',
    //         display: 'flex',
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //         height: '120px',
    //         [theme.breakpoints.down('sm')]: {
    //           display: 'none',
    //         },
    //       },
    //       link: {
    //         textDecoration: 'none',
    //         color: 'rgba(21, 101, 192)',
    //       },
    //       image: {
    //         marginLeft: 20,
    //       },
    //       card: {
    //         display: 'flex',
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         width: '50%',
    //         padding: '3%',
    //         borderRadius: 10,
    //         color: 'white',
    //         backgroundColor: 'rgba(21, 101, 192)',
    //         margin: '0 12px',
    //         textAlign: 'center',
    //         height: '25vmin',
    //         [theme.breakpoints.down('sm')]: {
    //           flexDirection: 'column-reverse',
    //           textAlign: 'center',
    //           width: '100%',
    //           height: 'initial',
    //           '&:nth-of-type(1)': {
    //             marginBottom: '12px',
    //           },
    //         },
    //       },
    //       infoContainer: {
    //         display: 'flex',
    //         alignItems: 'center',
    //         justifyContent: 'space-around',
    //         [theme.breakpoints.down('sm')]: {
    //           flexDirection: 'column',
    //         },
    //       },
    //       logoContainer: {
    //         padding: '0 5%',
    //         display: 'flex',
    //         justifyContent: 'space-around',
    //         alignItems: 'center',
    //         width: '100%',
    //         [theme.breakpoints.down('sm')]: {
    //           flexDirection: 'column-reverse',
    //           textAlign: 'center',
    //         },
    //       },
    //       webLogo: {
    //         height: '27vmin',
    //         borderRadius: '15%',
    //         padding: '0 5%',
    //         margin: '3% 0',
    //         [theme.breakpoints.down('sm')]: {
    //           height: '35vmin',
    //         },
    //       },
    //   });
    const styles ={
        
          logoContainer: {
            // padding: '0 5%',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            // [theme.breakpoints.down('sm')]: {
            //   flexDirection: 'column-reverse',
            //   textAlign: 'center',
            // },
          },
          webLogo: {
            height: '20vmin',
            borderRadius: '15%',
            padding: '0 5%',
            // margin: '3% 0',
            backgroundColor: 'black',
            // [theme.breakpoints.down('sm')]: {
            //   height: '35vmin',
            // },
          },
    }

    //styling-ends

    const [newsArticles, setNewsArticles] = useState([])
    const [activeArticle, setActiveArticle] = useState(-1);
    const [isOpen, setIsOpen] = useState(false);
    var greetingWasSaid = false;

    useEffect(() => {

        alanBtn({
            key: process.env.REACT_APP_API_KEY,
            onCommand: ({ command, articles, number }) => {
                if (command === 'newHeadlines') {
                  setNewsArticles(articles);
                //   setActiveArticle(-1);
                }
                else if (command === 'highlight') {
                  setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                }
                else if (command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];
          
                    if (parsedNumber > articles.length) {
                      alanBtn().playText('Please try that again...');
                    } else if (article) {
                      window.open(article.url, '_blank');
                      alanBtn().playText('Opening...');
                    } else {
                      alanBtn().playText('Please try that again...');
                    }
                  } 

              },
        })
    }, []);

    return (
        <div>
        <Header />
        {/* <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-5 mt-5">
            <div style={styles.logoContainer}>
            <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-300 md:text-5xl lg:text-5xl dark:text-black">News</h1>
                <img style={styles.webLogo} src={logo}></img>
                <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-300 md:text-5xl lg:text-5xl dark:text-black">App</h1>
            </div>
            </div> */}
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
            <Footer />
        </div>


    );
}

export default App;
