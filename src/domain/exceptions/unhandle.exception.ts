export default class UnhandledException extends Error {
  constructor(error: string) {
    super(error);
  }
}
