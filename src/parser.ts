import { TokenTypes } from './grammar';
import { Lexer, Token } from './lexer';

export class Parser {
  private lexer: Lexer;

  constructor(readonly input: string) {
    this.lexer = new Lexer(input);
  }

  /**
   * JSON -> OBJECT | ARRAY
   */
  parse(): void {
    let token = this.getToken();
    if (this.isTokenType(token, ['cro'])) {
      /**
       * FIRST(OBJECT)
       */
      this.ungetToken();
      this.parseObject();
      console.log('JSON -> OBJECT');
    } else if (this.isTokenType(token, ['sqo'])) {
      /**
       * FIRST(ARRAY)
       */
      this.ungetToken();
      this.parseArray();
      console.log('JSON -> ARRAY');
    } else {
      this.syntaxError();
    }
    token = this.getToken();
    if (this.isTokenType(token, ['eof'])) {
      /**
       * FOLLOW(JSON)
       */
      console.log('$');
    } else {
      this.syntaxError();
    }
  }

  /**
   * OBJECT -> cro ITEMS crc
   */
  private parseObject(): void {
    let token = this.getToken();
    if (this.isTokenType(token, ['cro'])) {
      /**
       * FIRST(cro ITEMS crc)
       */
      // Consuming cro
      this.parseItems();
      token = this.getToken();
      if (this.isTokenType(token, ['crc'])) {
        /**
         * FIRST(crc)
         */
        // Consuming crc
        console.log('OBJECT -> cro ITEMS crc');
      } else {
        this.syntaxError();
      }
    } else {
      this.syntaxError();
    }
  }

  /**
   * ITEMS -> ITEM ITEMS-PRIME | e
   */
  private parseItems(): void {
    const token = this.getToken();
    if (this.isTokenType(token, ['qts'])) {
      /**
       * FIRST(ITEM ITEMS-PRIME)
       */
      this.ungetToken();
      this.parseItem();
      this.parseItemsPrime();
      console.log('ITEMS -> ITEM ITEMS-PRIME');
    } else if (this.isTokenType(token, ['crc'])) {
      /**
       * FOLLOW(ITEMS)
       */
      this.ungetToken();
      console.log('ITEMS -> e');
    } else {
      this.syntaxError();
    }
  }

  /**
   * ITEM -> KEY cln VALUE
   */
  private parseItem(): void {
    let token = this.getToken();
    if (this.isTokenType(token, ['qts'])) {
      /**
       * FIRST(KEY cln VALUE)
       */
      this.ungetToken();
      this.parseKey();
      token = this.getToken();
      if (this.isTokenType(token, ['cln'])) {
        /**
         * FIRST(cln)
         */
        // Consuming cln
        this.parseValue();
        console.log('ITEM -> KEY cln VALUE');
      } else {
        this.syntaxError();
      }
    } else {
      this.syntaxError();
    }
  }

  /**
   * ITEMS-PRIME -> cma ITEM ITEMS-PRIME | e
   */
  private parseItemsPrime(): void {
    const token = this.getToken();
    if (this.isTokenType(token, ['cma'])) {
      /**
       * FIRST(cma ITEM ITEMS)
       */
      // Consuming cma
      this.parseItem();
      this.parseItemsPrime();
      console.log('ITEMS-PRIME -> cma ITEM ITEMS');
    } else if (this.isTokenType(token, ['crc'])) {
      /**
       * FOLLOW(ITEMS-PRIME)
       */
      this.ungetToken();
      console.log('ITEMS-PRIME -> e');
    } else {
      this.syntaxError();
    }
  }

  /**
   * ARRAY -> sqo VALUES sqc
   */
  private parseArray(): void {
    let token = this.getToken();
    if (this.isTokenType(token, ['sqo'])) {
      /**
       * FIRST(sqo VALUES sqc)
       */
      // Consuming sqo
      this.parseValues();
      token = this.getToken();
      if (this.isTokenType(token, ['sqc'])) {
        /**
         * FIRST(sqc)
         */
        // Consuming sqc
        console.log('ARRAY -> sqo VALUES sqc');
      } else {
        this.syntaxError();
      }
    } else {
      this.syntaxError();
    }
  }

  /**
   * VALUES -> VALUE VALUES-PRIME | e
   */
  private parseValues(): void {
    const token = this.getToken();
    if (this.isTokenType(token, ['cro', 'sqo', 'qts', 'num', 'nul'])) {
      /**
       * FIRST(VALUE VALUES-PRIME)
       */
      this.ungetToken();
      this.parseValue();
      this.parseValuesPrime();
      console.log('VALUES -> VALUE VALUE-PRIME');
    } else if (this.isTokenType(token, ['sqc'])) {
      /**
       * FOLLOW(VALUES)
       */
      this.ungetToken();
      console.log('VALUES -> e');
    } else {
      this.syntaxError();
    }
  }

  /**
   * VALUE -> OBJECT | ARRAY | qts | num | nul
   */
  private parseValue(): void {
    const token = this.getToken();
    if (this.isTokenType(token, ['cro'])) {
      /**
       * FIRST(OBJECT)
       */
      this.ungetToken();
      this.parseObject();
      console.log('VALUE -> OBJECT');
    } else if (this.isTokenType(token, ['sqo'])) {
      /**
       * FIRST(ARRAY)
       */
      this.ungetToken();
      this.parseArray();
      console.log('VALUE -> ARRAY');
    } else if (this.isTokenType(token, ['qts'])) {
      /**
       * FIRST(qts)
       */
      // Consuming qts
      console.log('VALUE -> qts');
    } else if (this.isTokenType(token, ['num'])) {
      /**
       * FIRST(num)
       */
      // Consuming num
      console.log('VALUE -> num');
    } else if (this.isTokenType(token, ['nul'])) {
      /**
       * FIRST(nul)
       */
      // Consuming nul
      console.log('VALUE -> nul');
    } else {
      this.syntaxError();
    }
  }

  /**
   * VALUES-PRIME -> cma VALUE VALUES-PRIME | e
   */
  private parseValuesPrime(): void {
    const token = this.getToken();
    if (this.isTokenType(token, ['cma'])) {
      /**
       * FIRST(cma VALUE VALUES-PRIME)
       */
      // Consuming cma
      this.parseValue();
      this.parseValuesPrime();
      console.log('VALUES-PRIME -> cma VALUE VALUE-PRIME');
    } else if (this.isTokenType(token, ['sqc'])) {
      /**
       * FOLLOW(VALUES-PRIME)
       */
      this.ungetToken();
      console.log('VALUES-PRIME -> e');
    } else {
      this.syntaxError();
    }
  }

  /**
   * KEY -> qts
   */
  private parseKey(): void {
    const token = this.getToken();
    if (this.isTokenType(token, ['qts'])) {
      /**
       * FIRST(qts)
       */
      // Consuming qts
      console.log('KEY -> qts');
    } else {
      this.syntaxError();
    }
  }

  private getToken(): Token {
    return this.lexer.getToken();
  }

  private ungetToken(): void {
    this.lexer.ungetToken();
  }

  private syntaxError(): void {
    throw new Error('Syntax error!');
  }

  private isTokenType({ type }: Token, types: TokenTypes): boolean {
    return new Set(types).has(type);
  }
}

