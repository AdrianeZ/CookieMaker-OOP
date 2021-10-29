const express = require('express');

class OrderRouter {
    constructor(utils) {
        this.utils = utils;
        this.router = express.Router();
        this.setUpRoutes();
    }

    setUpRoutes() {
        this.router.get('/summary', this.sumary);
        this.router.get('/thanks', this.thanks);
    }

    sumary = (req, res) => {
        const {sum, addons, base, allBases, allAddons} = this.utils.getCookieSettings(req);

        res.render('order/summary', {
            cookie: {
                base,
                addons,
            },
            allBases,
            allAddons,
            sum,
        });
    };

    thanks = (req, res) => {
        const {sum} = this.utils.getCookieSettings(req);

        res
            .clearCookie('cookieBase')
            .clearCookie('cookieAddons')
            .render('order/thanks', {
                sum,
            });
    }
}

module.exports = {
    OrderRouter,
};
