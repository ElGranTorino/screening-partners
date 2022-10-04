import cherio from "cherio";
import puppeteer from "puppeteer";
export const getPageContent = async (url) => {
    const LAUNCH_PUPPETEER_OPTS = {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu',
            '--window-size=1920x1080'
        ],
        headless: true
    };
    const PAGE_PUPPETEER_OPTS = {
        networkIdle2Timeout: 5000,
        waitUntil: 'networkidle2',
        timeout: 60000,
    };
    try {
        const browser = await puppeteer.launch(LAUNCH_PUPPETEER_OPTS);
        const page = (await browser.pages())[0];
        await page.setExtraHTTPHeaders({
            'Accept-Language': 'en-US,en;q=0.9'
        });
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36');
        await page.goto(url, PAGE_PUPPETEER_OPTS);
        const content = await page.content();
        browser.close();
        return content;
    }
    catch (err) {
        throw err;
    }
};
export const getJsonData = (html) => {
    try {
        const $ = cherio.load(html);
        const articles = [];
        $('.xuvV6b.BGxR7d').each((i, selector) => {
            // if($(selector).find('.mnr-c')) return false;
            const article = {};
            article.url = $(selector).find('a').attr('href') || '';
            article.source = $(selector).find('.CEMjEf.NUnG9d span').text() || '';
            article.title = $(selector).find('[role="heading"]').text().replace(/\n/gi, '') || '';
            article.body = $(selector).find('.GI74Re').text().replace(/\n/gi, '') || '';
            article.pubDate = $(selector).find('.OSrXXb.ZE0LJd span').text() || '';
            articles.push(article);
        });
        return articles;
    }
    catch (err) {
        throw err;
    }
};
export const search = async (options) => {
    const { query, locale, start = 0, log } = options;
    const QUERY_STRING = query instanceof Array ? query.join('+') : query.split(' ').join('+');
    const QUERY_URL = `https://www.google.com/search?q=${QUERY_STRING}&tbm=nws&start=${start}&hl=en`;
    return new Promise(async (resolve, reject) => {
        getPageContent(QUERY_URL)
            .then((html) => resolve(getJsonData(html)))
            .catch((err) => reject(err));
    });
};
