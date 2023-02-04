import { getExpression, getTokenTypes, TokenType } from './grammar';

export interface Token {
  type: TokenType;
  value: string;
}

export class Lexer {
  private tokens: Token[] = [];
  private ptr: number = 0;

  constructor(input: string) {
    input = input.trim();
    if (!input.length) {
      return;
    }
    while (input.length) {
      let token: Token | null = null;
      for (const type of getTokenTypes()) {
        const res = getExpression(type).exec(input);
        if (!res || res.index) {
          continue;
        }
        if (!token || token.value.length < res[0].length) {
          token = { type: type, value: res[0] };
        }
      }
      if (!token) {
        break;
      }
      this.tokens.push(token);
      input = input.substring(token.value.length).trimStart();
    }
    this.tokens.push({ type: 'eof', value: '' });
    console.table(this.tokens);
  }

  public getToken(): Token {
    return this.tokens[
      this.ptr < this.tokens.length ? this.ptr++ : this.ptr - 1
    ];
  }

  public ungetToken(): void {
    this.ptr = this.ptr == 0 ? 0 : this.ptr - 1;
  }

  public reset(): void {
    this.ptr = 0;
  }
}

