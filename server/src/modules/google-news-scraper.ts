import cherio from "cherio";
import puppeteer from "puppeteer";
interface IArticle {
    url: string | undefined,
    source: string | undefined,
    title: string | undefined,
    body: string | undefined,
    pubDate: string | undefined,
}
export const getPageContent = async (url: string) => {
    const LAUNCH_PUPPETEER_OPTS: any = {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu',
            '--window-size=1920x1080'
        ],
    };
    const PAGE_PUPPETEER_OPTS: any = {
        networkIdle2Timeout: 5000,
        waitUntil: 'networkidle2',
        timeout: 60000
    }
    try {
        const browser = await puppeteer.launch(LAUNCH_PUPPETEER_OPTS);
        const page = await browser.newPage();

        await page.goto(url, PAGE_PUPPETEER_OPTS);
        const content = await page.content();
        browser.close()

        return content
    } catch (err) {
        throw err
    }
}
export const getJsonData = (html: string) => {
    try {
        const $ = cherio.load(html);
        const articles: Array<IArticle> = [];
        $('.xuvV6b.BGxR7d').each((i: number, selector: object) => {
            // if($(selector).find('.mnr-c')) return false;
            const article  = {} as IArticle

            article.url = $(selector).find('a').attr('href') || ''
            article.source = $(selector).find('.CEMjEf.NUnG9d span').text() || ''
            article.title = $(selector).find('[role="heading"]').text().replace(/\n/gi, '') || ''
            article.body = $(selector).find('.GI74Re').text().replace(/\n/gi, '') || ''
            article.pubDate = $(selector).find('.OSrXXb.ZE0LJd span').text() || ''
            
            articles.push(article)
        })
        return articles
    } catch (err) {
        throw err
    }
}
export const search = async (options: any) => {
    const {query, locale, start = 0, log} = options;

    const QUERY_STRING = query instanceof Array ? query.join('+') : query.split(' ').join('+');
    const QUERY_URL = `https://www.google.com/search?q=${QUERY_STRING}&tbm=nws&start=${start}`
    
    
    return new Promise(async (resolve, reject) => {
        getPageContent(QUERY_URL)
            .then((html) => resolve(getJsonData(html)))
            .catch((err) => reject(err));
    })
}
