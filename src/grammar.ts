export type TokenType =
  | 'cro'
  | 'crc'
  | 'sqo'
  | 'sqc'
  | 'cma'
  | 'cln'
  | 'qts'
  | 'num'
  | 'nul'
  | 'eof';

export type TokenTypes = TokenType[];

export function getTokenTypes(): TokenTypes {
  return ['cro', 'crc', 'sqo', 'sqc', 'cma', 'cln', 'qts', 'num', 'nul', 'eof'];
}

export function getExpression(type: TokenType): RegExp {
  switch (type) {
    case 'cro':
      return /\{/;
    case 'crc':
      return /\}/;
    case 'sqo':
      return /\[/;
    case 'sqc':
      return /\]/;
    case 'cma':
      return /\,/;
    case 'cln':
      return /\:/;
    case 'qts':
      return /\"[^\"\\]*(?:\\.[^\"\\]*)*\"/;
    case 'num':
      return /(\-|)([1-9][0-9]*|0)((\.[0-9]*[1-9])|)/;
    case 'nul':
      return /null/;
    case 'eof':
      return /$/;
  }
}

