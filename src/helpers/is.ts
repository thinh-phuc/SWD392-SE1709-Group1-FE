// @ts-nocheck

export default class helper_is {
  constructor() {}

  isDev(): boolean {
    return process.env.NODE_ENV !== 'production';
  }

  /** Check if date or string of date or timestamp is valid */
  isDate(_input: any): boolean {
    return new Date(_input).toString() !== 'Invalid Date';
  }

  /**
   * Check if it is mobile or not ...
   * @returns Boolean
   */
  isMobile(): boolean {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }

  /**
   * Check if it is email
   * @param {*} email
   * @returns
   */
  isEmail(email: any) {
    if (typeof email === 'undefined') {
      return false;
    }
    email = String(email || ' ').trim();

    var filter =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(email)) {
      return true;
    }
    return false;
  }

  /**
   * Check if String can be a boolean value, valid: true, "true"
   * @param {*} s
   */
  isBoolean(s: any) {
    let a = String(s || ' ');
    return a === 'true' || a === 'false';
  }

  /**
   * Check if it is phone number
   * @param {*} phonenumber
   * @returns
   */
  isPhoneNumber(phonenumber: any) {
    var filter = /^[0-9\-\+]{10,15}$/;
    if (filter.test(phonenumber)) {
      return true;
    }
    return false;
  }

  /**
   * Check if it is number only
   * @param {*} num
   */
  isNumber(inputValue: any) {
    return Boolean(new RegExp('^[0-9]+$', 'g').test(inputValue));
  }

  /**
   * Check if it is a valid bigint
   * @param _big string or number
   * @returns
   */
  isBigInt(_big: string | number | bigint): boolean {
    try {
      if (_big === '') return false;
      return BigInt(String(_big));
    } catch (e) {
      return false;
    }
  }

  /**
   * Check if it is JSON
   * @param {} str
   * @returns
   */
  isJson(str: string) {
    if (typeof str !== 'string') return false;
    try {
      const result = JSON.parse(str);
      const type = Object.prototype.toString.call(result);
      return type === '[object Object]' || type === '[object Array]';
    } catch (err) {
      return false;
    }
  }

  /*
   *	Check if it is a valid URL
   */
  isUrl(_string: any) {
    try {
      new URL(_string);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Check if is string, better than isUrl
   * @param text String
   * @returns link or false
   */
  isLink(text: string): string | boolean {
    if (String(text).match(/\s/g)) return false;
    var $link = String(text)
      .trim()
      .match(/http(s)?:\/\/\S+/g);
    if ($link) {
      return encodeURIComponent($link);
    }
    return false;
  }

  /**
   * Check if it  is number, or if this value greater than bigint, it will return false
   * @param n String
   */
  isNumeric(n: string | number | bigint): boolean {
    n = String(n);
    let checkNum = !isNaN(parseFloat(n)) && isFinite(n);
    if (checkNum && BigInt(`${n}`) > BigInt('999999999999999999')) {
      return false;
    }
    return checkNum;
  }

  /**
   * Check if it is array ...
   */
  isArray(_array: any) {
    return Array.isArray(_array);
  }

  /**
   * Check if it is UTF8
   * @param {} string
   * @returns boolean
   */
  isUTF8(_string: string) {
    if (_string === void 0) _string = '';
    return /[^\u0000-\u007f]/.test(_string);
  }

  /**
   * Check length of string
   */

  isMorethan(s: string | undefined, l: number) {
    if (s === void 0) s = '';
    if (l === void 0) l = 1;
    if (String(s).length > l) return true;
    return false;
  }

  /**
   * Check if less than X character
   * @param {*} s
   * @param {*} l
   * @returns
   */
  isLessthan(s: string | undefined, l: number) {
    if (typeof s === 'undefined') return false;
    if (l === void 0) l = 1;
    if (String(s).length < l) return true;
    return false;
  }

  /**
   * Check if object/array/string is empty or not
   * @param {*} array_or_object
   */
  isEmpty(array_or_object: object | array | string) {
    if (!array_or_object) return true;
    if (array_or_object === void 0) return true;

    if (Array.isArray(array_or_object)) return array_or_object.length === 0;
    if (typeof array_or_object === 'object')
      return Object.keys(array_or_object).length === 0;

    return String(array_or_object).length === 0;
  }

  /**
   * Check if it is Object
   * @param {*} objectornot string or any to check
   */
  isObject(objectornot: any) {
    if (
      typeof objectornot === 'object' &&
      !Array.isArray(objectornot) &&
      objectornot !== null
    )
      return true;

    return false;
  }
}
