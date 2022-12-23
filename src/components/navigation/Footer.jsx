import { ContactMail, Email, Phone, Timelapse } from "@mui/icons-material";
import classes from "./footer.module.css";
export const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className="container">
        <div className={classes.footer__logo}>Guitars</div>
        <div className={classes.footer__content}>
          <div className={classes.footer__left}>
            <h3>Contact Information</h3>
            <ul>
              <li>
                <span className={classes.footer__span}>
                  <ContactMail className={classes.footer__icon} />
                  Address
                </span>
              </li>
              <li>
                <span className={classes.footer__span}>
                  <Timelapse className={classes.footer__icon} />
                  Working hours
                </span>
              </li>
              <li>
                <span className={classes.footer__span}>
                  <Phone className={classes.footer__icon} />
                  Phone
                </span>
              </li>
              <li>
                <span className={classes.footer__span}>
                  <Email className={classes.footer__icon} />
                  Email
                </span>
              </li>
            </ul>
          </div>
          <div className={classes.footer__right}>
            <h3>Be the first to know</h3>
            <p>
              Get all the latest information on events and offers <br /> You
              can't afford to miss out
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
