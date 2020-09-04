console.log('module.js');

async function start() {
  await Promise.resolve('async working');
}

start().then(console.log);
