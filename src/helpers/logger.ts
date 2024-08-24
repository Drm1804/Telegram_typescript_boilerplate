import log4js from 'log4js';

const _logger = log4js.configure({
  appenders: {
    file: {
      type: 'file',
      filename: 'app.log',
      maxLogSize: 10 * 1024 * 1024,
      backups: 5, // keep five backup files
      compress: true, // compress the backups
      encoding: 'utf-8',
      mode: 0o0640,
      flags: 'w+',
    },
    out: {
      type: 'stdout',
    },
  },
  categories: {
    default: { appenders: ['file', 'out'], level: 'trace' },
  },
});

export function logger(id: string) {
  return _logger.getLogger(id);
}
