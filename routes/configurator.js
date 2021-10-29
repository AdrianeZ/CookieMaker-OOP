const express = require('express');

class ConfiguratorRouter {
    constructor(utils) {
        this.utils = utils;
        this.router = express.Router();
        this.setUpRoutes();
    }

    setUpRoutes() {
        this.router.get('/select-base/:baseName', this.selectBase);
        this.router.get('/add-addon/:addonName', this.addAddon);
        this.router.get('/delete-addon/:addonName', this.deleteAddon);
    }

    selectBase = (req, res) => {
        const {baseName} = req.params;

        if (!this.utils.data.COOKIE_BASES[baseName]) {
            return this.utils.showErrorPage(res, `There is no such base as ${baseName}.`);
        }

        res
            .cookie('cookieBase', baseName)
            .render('configurator/base-selected', {
                baseName,
            });
    };

    addAddon = (req, res) => {
        const {addonName} = req.params;

        if (!this.utils.data.COOKIE_ADDONS[addonName]) {
            return this.utils.showErrorPage(res, `There is no such addon as ${addonName}.`);
        }

        const addons = this.utils.getAddonsFromReq(req);

        if (addons.includes(addonName)) {
            return this.utils.showErrorPage(res, `${addonName} is already on your cookie. You cannot add it twice.`);
        }

        addons.push(addonName);

        res
            .cookie('cookieAddons', JSON.stringify(addons))
            .render('configurator/added', {
                addonName,
            });
    };

    deleteAddon = (req, res) => {
        const {addonName} = req.params;

        const oldAddons = this.utils.getAddonsFromReq(req);

        if (!oldAddons.includes(addonName)) {
            return this.utils.showErrorPage(res, `Cannot delete something that isn't already added to the cookie. ${addonName} not found on cookie.`);
        }

        const addons = oldAddons.filter(addon => addon !== addonName);

        res
            .cookie('cookieAddons', JSON.stringify(addons))
            .render('configurator/deleted', {
                addonName,
            });
    };
}


module.exports = {
    ConfiguratorRouter,
};
