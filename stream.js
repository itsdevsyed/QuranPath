const fs = require('fs');

fs.watch('input.txt', (eventType) => {
  if (eventType === 'change') {
    console.log('\nFile changed! New content:');
    
    const stream = fs.createReadStream('input.txt', 'utf8');
    stream.on('data', chunk => {
      console.log(chunk);
    });
  }
});

console.log('Watching for changes in input.txt...');
