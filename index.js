const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const {HomeRouter} = require("./routes/home");
const {ConfiguratorRouter} = require("./routes/configurator");
const {OrderRouter} = require("./routes/order");
const {CookieUtils} = require("./utils/CookieUtils");
const {handlebarsHelpers} = require("./utils/handlebars-helpers");
const {COOKIE_BASES, COOKIE_ADDONS} = require("./data/cookies-data");

class CookieMakerApp
{
  constructor()
  {
    this._loadData();
    this._configureApp();
    this._loadUtils();
    this._setRoutes();
    this._run();
  }

  _configureApp()
  {
    this.app = express();

    this.app.use(express.json());
    this.app.use(express.static('public'));
    this.app.use(cookieParser());
    this.app.engine('.hbs', hbs({
      extname: '.hbs',
      helpers: handlebarsHelpers,
    }));
    this.app.set('view engine', '.hbs');
  }

  _setRoutes()
  {
    this.app.use('/', new HomeRouter(this.utils).router);
    this.app.use('/configurator', new ConfiguratorRouter(this.utils).router);
    this.app.use('/order', new OrderRouter(this.utils).router);
  }

  _run()
  {
    this.app.listen(3000, '0.0.0.0', () => {
      console.log('Listening on :3000');
    });
  }

  _loadUtils()
  {
    this.utils = new CookieUtils(this.data);
  }

  _loadData()
  {
    this.data = {
      COOKIE_BASES,
      COOKIE_ADDONS,
    };
  }
}

new CookieMakerApp();
