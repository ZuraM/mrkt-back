const config = {
  dev: {
    port: process.env.PORT || 3000,
    logger: {
      name: 'default',
      streams: [{
        stream: process.stdout,
        level: 'trace'
      }]
    },
    authSecret: 'V9vVXWz2HVF8YHx', // Usually in process.env. Here for testing purposes
    db: {
      url: 'mongodb://mrkt:N88qqA@ds135427.mlab.com:35427/mrkt-test',
      options: {}
    }
  },
};

module.exports = config[process.env.NODE_ENV] || config['dev'];