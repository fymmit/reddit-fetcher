#!/usr/bin/env node

const reddit = require('./src');

const subreddit = process.argv[2];

reddit(subreddit).then(res => console.log(res)).catch(e => console.log(e));
