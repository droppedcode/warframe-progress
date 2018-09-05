process.on('uncaughtException', function (exception) {
  console.log(exception); // to see your exception details in the console
  // if you are on production, maybe you can send the exception details to your
  // email as well ?
});

import { execSync } from 'child_process';

//console.log('Installing packages...');

//execSync('npm install --only=production', { stdio: 'inherit' });

import { Server } from './server';

console.log('Starting server...');

Server.bootstrap();