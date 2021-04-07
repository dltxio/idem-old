export default (response: any, code: number, error: Error) => {
  response.status(code);
  response.send({ error });
};
