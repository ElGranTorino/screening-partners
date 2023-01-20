'use strict';

/**
 * news-report service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::news-report.news-report');
