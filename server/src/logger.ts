const getDateString = () => `[${new Date().toLocaleString()}]`;
const getLogString = (moduleName: string, log: string) =>
  `${getDateString()} ${moduleName}: ${log}`;

export = (moduleName: string) => ({
  log: (log: string, ...data: any) => {
    console.log(getLogString(moduleName, log), ...data);
  },
  warn: (log: string, ...data: any) => {
    console.warn(getLogString(moduleName, log), ...data);
  },
  error: (log: string, ...data: any) => {
    console.error(getLogString(moduleName, log), ...data);
  }
});
