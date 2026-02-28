console.log('Starting no-op test...');
setTimeout(() => {
    console.log('No-op test still running after 10s');
}, 10000);
setTimeout(() => {
    console.log('No-op test finished');
}, 20000);
