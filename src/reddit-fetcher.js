const Parser = require('rss-parser');
const parser = new Parser();

const findImageUrl = (text) => {
    return new Promise((res, rej) => {
        const x = text.substring(0, text.indexOf('[link]') - 2);
        const link = x.substring(x.lastIndexOf('"') + 1);
        if (link.includes('.jpg') || link.includes('.png')) {
            res(link);
        } else {
            rej('Bad post');
        }
    });
};

const main = async (subreddit) => {
    return new Promise(async (res, rej) => {
        const url = `https://www.reddit.com/r/${subreddit}/top/.rss`;
        const rss = await parser.parseURL(url);
        const [first] = rss.items;
        rss.items.forEach((item, i) => {
            findImageUrl(item.content)
                .then((resp) => {
                    res(resp);
                })
                .catch((e) => {
                    if (i > 5) {
                        rej('Bad subreddit');
                    }
                });
        });
    });
};

module.exports = main;
