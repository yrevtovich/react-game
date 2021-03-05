import React from 'react';
import { Avatar, Grid, Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme: Theme) => createStyles({
  footer: {
    padding: '5px 0',
    width: '100%',
    marginTop: 'auto',
    backgroundColor: theme.palette.primary.main,
    zIndex: 0,
  },
  footerLogo: {
    width: '100px',
    height: '30px',
  },
  footerLogoWrapper: {
    '@media(max-width: 480px)': {
      width: '100%',
      justifyContent: 'center',
    },
  },
  year: {
    // color: theme.palette.background.main,
    fontSize: '18px',
    '@media(max-width: 480px)': {
      width: '100%',
      marginBottom: '20px',
      textAlign: 'center',
    },
  },
  avatar: {
    marginRight: '10px',
    color: '#000',
    '&:last-child': {
      marginRight: 0,
    },
  },
  avatars: {
    '@media(max-width: 480px)': {
      width: '100%',
      justifyContent: 'center',
      marginBottom: '20px',
    },
  },
}));

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <footer
      className={classes.footer}
    >
      <Container maxWidth={false}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <div className={classes.footerLogoWrapper}>
            <Button href="https://rs.school/js/" rel="noreferrer" target="_blank">
              <img className={classes.footerLogo} src="assets/images/rs_school_js.svg" alt="rsschool" />
            </Button>
          </div>
          <span className={classes.year}>React-game, 2021</span>
          <Button
            className={classes.avatar}
            href="https://github.com/yrevtovich"
            rel="noreferrer"
            target="_blank"
          >
            <GitHubIcon
              // color="secondary"
              fontSize="large"
            />
          </Button>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
