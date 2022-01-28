#!/usr/bin/env node

import clipboardy from 'clipboardy';
import { reddit } from './src/index.js';

const subreddit = process.argv[2];

reddit(subreddit).then(res => {
    console.log(res);
    clipboardy.writeSync(res);
    console.log('Link copied to clipboard. Paste away!');
})
.catch(e => console.log(e));
