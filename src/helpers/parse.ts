var he = require('he');

export default class helper_parse {
  /**
   * Take only number in a string
   * @param {1} anything
   * @returns number
   * @deprecated - use parseNumeric instead
   */
  parseInt(nnn: any, defaultx?: any): number {
    var n = String(nnn || ' ').match(/\d+/gim);
    if (!n) return defaultx || 0;
    return parseInt(String(n), 10);
  }

  /**
   *
   * @param nnn string with mix alphabet and numeric
   * @param defaultx
   * @returns Number only, but not bigint
   */

  parseNumeric(nnn: any, defaultx?: any): number {
    if (typeof nnn === 'number') return Number(nnn);
    var n = String(nnn || ' ').replace(/[^\d-]+/g, '');
    if (!n || n === '-') return defaultx || 0;
    return Number(n);
  }

  /**
   * Convert to float number
   * @param {*} n
   * @returns Float
   */
  parseFloat(n: any) {
    n = String(n || ' ');
    var f = parseFloat(n);
    if (Number.isNaN(f)) return 0;
    return f;
  }

  /**
   * Take only A-Z a-z 0-9 only
   * @param {1} String
   * @returns Char only
   */
  parseChar(nnn: any) {
    var n = String(nnn || ' ').replace(/[^A-Za-z0-9]/g, '');
    if (!n) return '';
    return String(n).trim();
  }
  /**
   *
   * @param {1} Username
   * Chỉ chữ và dấu chấm ... không có gì khác ...
   */
  parseUsername(nnn: string | number) {
    var n = String(nnn || ' ').replace(/[^A-Za-z0-9.]/g, '');
    if (!n) return '';
    return String(n).trim();
  }
  /**
   * convert a string to Meta key, allow [^A-Za-z0-9-_]
   * @param {1} _string: string
   */
  parseMetaKey(_string: string | number) {
    var n = String(_string || ' ').replace(/[^A-Za-z0-9.\-_:]/giu, '');
    if (!n) return '';
    return String(n).trim();
  }

  /**
   * CLean string and return alphabet character only
   * @param {*} _string
   * @returns Alphabet only
   */
  parseAnphabet(_string: any) {
    var n = String(_string || ' ').replace(/[^\w!.?:]/g, '');
    if (!n) return '';
    return String(n).trim();
  }

  /**
   * Return URL if valid! Return empty string if not
   * @param {*} _url
   * @returns
   */
  parseURL(_url: any) {
    try {
      var n = String(_url || ' ').replace(/[^A-Za-z0-9._\-/#&!;]/g, '-');
      if (!n) return '';
      return String(n).replace(/-+/g, '-').trim();
    } catch (_) {
      return '';
    }
  }

  /**
   * return clean char without `"' or <>, for database
   * @param {*} string
   * @returns clean string
   */

  parseString(stringx: string) {
    stringx = String(stringx || ' ').replace(/'|"|`|>|</g, '');
    return String(stringx).trim();
  }

  /**
   * Parse string like html entities encode
   * @param {*} s
   * @returns
   */
  parseEntities(s: any) {
    s = String(s || ' ');
    return he.escape(s);
  }

  /**
   * Check and return valid JSON
   * @param {*} s
   * @returns Clean and valid JSON
   */
  parseJSON(s: any) {
    // preserve newlines, etc - use valid JSON
    s = String(s).trim();
    s = s.replace(/\+/g, '');
    s = s
      .replace(/\\n/g, '\\n')
      .replace(/\\'/g, "\\'")
      .replace(/\\"/g, '\\"')
      .replace(/\\&/g, '\\&')
      .replace(/\\r/g, '\\r')
      .replace(/\\t/g, '\\t')
      .replace(/\\b/g, '\\b')
      .replace(/\\f/g, '\\f');
    // remove non-printable and other non-valid JSON chars
    s = s.replace(/[\u0000-\u0019]+/g, '');
    return s;
  }

  /**
   * pase email list, eg: email, email, email ...
   * @param {*} emailList email, email
   * @returns array of valid email
   */
  parseEmailList(emailList: any) {
    function isEmail(email: any) {
      if (typeof email === 'undefined') {
        return false;
      }
      email = String(email || ' ').trim();

      var filter =
        /^([a-zA-Z0-9_.-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (filter.test(email)) {
        return true;
      }
      return false;
    }
    if (typeof emailList === 'undefined') return [];
    var s = String(emailList || ' ').split(',');
    return s.filter(function (email) {
      return isEmail(email) ? email : false;
    });
  }

  /**
   * Clean string for category name, tag name
   * DO NOT USE
   * @param {*} value
   * @returns clean string, without /\]]{}+_)(*&^%$#@)
   */
  parseUnchar(value: any) {
    if (typeof value !== 'string') return '';
    var notAllowed = [
      ';',
      '_',
      '>',
      '<',
      "'",
      '%',
      '$',
      '&',
      '/',
      '|',
      ':',
      '=',
      '*',
      '}',
      '{',
      '[',
      ']',
      '~',
      '!',
      '@',
      '#',
      '$',
      '^',
      '(',
      ')',
      '+'
    ];
    for (var i = 0; i < value.length; i++) {
      if (notAllowed.indexOf(value.charAt(i)) > -1) {
        value = value.replace(value.charAt(i), '');
      }
    }
    return String(value).trim();
  }
}
