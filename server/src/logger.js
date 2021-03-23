const getDateString = () => `[${new Date().toLocaleString()}]`;
const getLogString = (moduleName, log) => `${getDateString()} ${moduleName}: ${log}`;

module.exports = (moduleName) => ({
  log: (log, ...data) => {
    console.log(getLogString(moduleName, log), ...data);
  },
  warn: (log, ...data) => {
    console.warn(getLogString(moduleName, log), ...data);
  },
  error: (log, ...data) => {
    console.error(getLogString(moduleName, log), ...data);
  },
});
