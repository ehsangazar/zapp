interface IQuerystring {
  username: string;
  password: string;
}

interface IHeaders {
  "h-Custom": string;
}

interface IReply {
  200: { success: boolean };
  302: { url: string };
  "4xx": { error: string };
}

export interface IFastify {
  Querystring: IQuerystring;
  Headers: IHeaders;
  Reply: IReply;
}

export interface IValidationCompiler {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: any;
}

export interface IValidationCompilerResult {
  value?: unknown;
  errors?: unknown;
}
