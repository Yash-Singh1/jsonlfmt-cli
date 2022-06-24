import { exec } from 'node:child_process';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

exec(
  `/usr/bin/env node ${path.join(__dirname, '../cli.mjs')} ${path.join(
    __dirname,
    'input.jsonl'
  )}`,
  function (error, stdout, stderr) {
    if (error || stderr) {
      if (error) {
        console.log(error);
      }
      if (stderr) {
        console.log(stderr);
      }
      process.exit(1);
    }
    const expected = fs.readFileSync(
      path.join(__dirname, 'output.jsonl'),
      'utf-8'
    );
    if (stdout != expected) {
      console.log("Formatter didn't return correct output:");
      console.log();
      console.log('Recieved');
      console.log(stdout);
      console.log();
      console.log('Expected:');
      console.log(expected);
      process.exit(1);
    }
    console.log('Tests Passed successfully!');
  }
);
