#!/usr/bin/env node

import jsonlfmt from 'jsonlfmt';
import meow from 'meow';
import * as fs from 'node:fs';
import updateNotifier from 'update-notifier';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
updateNotifier({ pkg }).notify();

const cli = meow(
  `
Usage
  $ jsonlfmt [-s <spacing>] [-w] <filename>

Options
  --write, -w              Write the output to the file                             (default: false)
  --spacing, -s            A number or string for the spacing for the result        (default: false)

Examples
  $ jsonlfmt index.jsonl

  ...
  (formatted JSONL)

  $ jsonlfmt -w index.jsonl

  $ jsonlfmt -w something.jsonl --spacing 5
`,
  {
    flags: {
      write: {
        type: 'boolean',
        alias: 'w',
        default: false
      },
      spacing: {
        type: 'string',
        alias: 's',
        default: '2'
      }
    },
    importMeta: import.meta
  }
);

const results = jsonlfmt(
  fs.readFileSync(cli.input[cli.input.length - 1], 'utf-8'),
  isNaN(parseFloat(cli.flags.spacing))
    ? undefined
    : parseFloat(cli.flags.spacing)
);

if (cli.flags.write) {
  fs.writeFileSync(cli.input[cli.input.length - 1], results + '\n');
} else {
  console.log(results);
}
