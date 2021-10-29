const {handlebarsHelpers} = require("./handlebars-helpers");

class CookieUtils
{
  constructor(data)
  {
    this.data = data;
  }

  showErrorPage(res, description)
  {
    res.render('error', {
      description,
    });
  }

  getAddonsFromReq(req)
  {
    const {cookieAddons} = req.cookies;
    return cookieAddons ? JSON.parse(cookieAddons) : [];
  }

  getCookieSettings(req)
  {
    const {cookieBase: base} = req.cookies;

    const addons = this.getAddonsFromReq(req);

    const allBases = Object.entries(this.data.COOKIE_BASES);
    const allAddons = Object.entries(this.data.COOKIE_ADDONS);

    const sum = (base ? handlebarsHelpers.findPrice(allBases, base) : 0)
        + addons.reduce((prev, curr) => (
            prev + handlebarsHelpers.findPrice(allAddons, curr)
        ), 0);

    return {
      // Selected stuff
      addons,
      base,

      // Calculations
      sum,

      // All possibilities
      allBases,
      allAddons,
    };
  }
}

module.exports =
    {
      CookieUtils
    }