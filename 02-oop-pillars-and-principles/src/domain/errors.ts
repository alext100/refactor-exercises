export class ExportException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ExportException";
  }
}
