// remove, can not access env in this wayyy
// process.env.TZ = 'Asia/Ho_Chi_Minh';
// import diachinh from 'config/diachinh.json';

export default class GET {
  /**
   * From code, return diachinh ...
   * @param _code
   */
  // getDiaChinh(_code: string): any {
  //     return new Promise((resolve, reject) => {
  //         if (!_code) return resolve(null);
  //         if (typeof diachinh[_code] !== 'undefined') {
  //             let R = diachinh[_code];
  //             return resolve({
  //                 "name": R.name,
  //                 "slug": R.slug,
  //                 "type": R.type,
  //                 "name_with_type": R.name_with_type,
  //                 "code": R.code,
  //             });
  //         };

  //         function _find(collection, key, value) {
  //             if (typeof collection !== 'object') return;
  //             for (let _key in collection) {
  //                 let R = collection[_key];
  //                 if (typeof R === 'object') {
  //                     if (typeof R[key] !== 'undefined' && R[key] === value) {
  //                         return resolve({
  //                             "name": R.name,
  //                             "slug": R.slug,
  //                             "type": R.type,
  //                             "name_with_type": R.name_with_type,
  //                             "code": R.code,
  //                         });
  //                     } else {
  //                         _find(R, key, value);
  //                     }
  //                 }
  //             }
  //         }
  //         _find(diachinh, 'code', _code);
  //     })

  // }

  /**
   * get Age from input
   * @param birthDateString String | timestamp
   * @param _append ' tuổi ...'
   * @returns
   */
  getAge(birthDateString: Date, _append: string): string | number {
    const today = new Date();
    const birthDate = birthDateString;

    const yearsDifference = today.getFullYear() - birthDate.getFullYear();

    const isBeforeBirthday =
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate());

    return (
      (isBeforeBirthday ? yearsDifference - 1 : yearsDifference) +
      '' +
      (_append ? _append : '')
    );
  }

  /**
   * @_filename file name ...
   * @placeholder full URL of an placeholder
   * @return full media link or placeholder
   */
  getMediaLink(
    _filename: string = '',
    placeholder = 'https://placehold.co/600x400'
  ) {
    if (!_filename) return placeholder;

    let REACT_APP_AJAX_UPLOAD_PERMALINK =
      process.env.REACT_APP_AJAX_UPLOAD_PERMALINK;
    return REACT_APP_AJAX_UPLOAD_PERMALINK + '/' + _filename;
  }

  /* format 2 số 5 thành 05 */
  getPad = (n: string | number): string => {
    n = Number(n);
    if (n === 0) return '0';
    if (n < 10 && n > 0) return `0${n}`;
    return `` + n;
  };

  /*
   *	Trimmmm
   */
  getTrim = (s: any) => {
    return String(s || ' ').trim();
  };

  /**
   * Đếm độ dài của cả Unicode luôn!
   * @McJamBi  from Jamviet.com
   */
  getStringLength = (s: any) => {
    try {
      let Str = String(s || ' ');
      return [...Str].length;
    } catch (_) {
      return 0;
    }
  };

  /**
   * Check if passwords length enought and streng enought
   * you should take this password if it has strength point more than 2 and less than 5
   * @param _password
   */
  getPasswordStrength = (_password: string): number => {
    if (String(_password || ' ').trim().length < 6) return 0;
    let strength = 1;
    let password = String(_password || ' ');
    if (password.match(/[a-z]+/)) {
      strength += 1;
    }
    if (password.match(/[A-Z]+/)) {
      strength += 1;
    }
    if (password.match(/[0-9]+/)) {
      strength += 1;
    }
    if (password.match(/[$@#&!]+/)) {
      strength += 1;
    }
    return strength;
  };

  /**
   * Return context of Password Strength
   * @param strength max 5 min 0
   */
  getPasswordStrengthContext(strength: number) {
    switch (strength) {
      case 0:
        return 'password_too_weak';
      case 1:
        return 'password_too_weak';
      case 2:
        return 'password_medium_weak';
      case 3:
        return 'password_weak';
      case 4:
        return 'password_strength_ok';
      case 5:
        return 'password_strength_good';
    }
  }

  /**
   * Get random hash from char and Number
   * @param {*} XLength
   * @returns
   */
  getRandomHash = (XLength: number) => {
    var text = '';

    // Default is 10;
    var Length = XLength ? parseInt(`` + XLength) : 10;

    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < Length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return String(text);
  };

  /**
   * Get a random number only
   * @param {*} string_length Number
   * @returns String Random number
   */
  getRandomNumber = (string_length = 10): string => {
    var text = '';
    // Default is 10;
    var Length = string_length ? Number(string_length) : 10;
    var possible = '1234567890';
    for (var i = 0; i < Length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return String(text);
  };

  /**
   * get Random element in Array
   * @param myArray
   * @returns element
   */
  getRandomElementInArray(myArray: any[]) {
    return myArray[(Math.random() * myArray.length) | 0];
  }

  /**
   * Get random color ...
   * @param num number of hexa code you want
   * @returns HEXA
   */
  // getColorArray(num: number) {
  //     const result = [];
  //     for (let i = 0; i < num; i += 1) {
  //         const letters = '0123456789ABCDEF'.split('');
  //         let color = '#';
  //         for (let j = 0; j < 6; j += 1) {
  //             color += letters[Math.floor(Math.random() * 16)];
  //         }
  //         result.push(color);
  //     }
  //     return result;
  // };

  /**
   * MD5, auto generate if no string
   * @param {*} s
   * @returns MD5
   */
  MD5 = function (s: string | number) {
    if (s === void 0) s = Math.random();
    // @ts-ignore
    function L(k: number, d: number) {
      return (k << d) | (k >>> (32 - d));
    }
    function K(G: number, k: number) {
      var I: number, d: number, F: number, H: number, x: number;
      F = G & 2147483648;
      H = k & 2147483648;
      I = G & 1073741824;
      d = k & 1073741824;
      x = (G & 1073741823) + (k & 1073741823);
      if (I & d) {
        return x ^ 2147483648 ^ F ^ H;
      }
      if (I | d) {
        if (x & 1073741824) {
          return x ^ 3221225472 ^ F ^ H;
        } else {
          return x ^ 1073741824 ^ F ^ H;
        }
      } else {
        return x ^ F ^ H;
      }
    }
    function r(d: number, F: number, k: number) {
      return (d & F) | (~d & k);
    }
    function q(d: number, F: number, k: number) {
      return (d & k) | (F & ~k);
    }
    function p(d: number, F: number, k: number) {
      return d ^ F ^ k;
    }
    function n(d: number, F: number, k: number) {
      return F ^ (d | ~k);
    }
    function u(
      G: number,
      F: any,
      aa: any,
      Z: any,
      k: any,
      H: number,
      I: number
    ) {
      G = K(G, K(K(r(F, aa, Z), k), I));
      return K(L(G, H), F);
    }
    function f(
      G: number,
      F: any,
      aa: any,
      Z: any,
      k: any,
      H: number,
      I: number
    ) {
      G = K(G, K(K(q(F, aa, Z), k), I));
      return K(L(G, H), F);
    }
    function D(
      G: number,
      F: any,
      aa: any,
      Z: any,
      k: any,
      H: number,
      I: number
    ) {
      G = K(G, K(K(p(F, aa, Z), k), I));
      return K(L(G, H), F);
    }
    function t(
      G: number,
      F: any,
      aa: any,
      Z: any,
      k: any,
      H: number,
      I: number
    ) {
      G = K(G, K(K(n(F, aa, Z), k), I));
      return K(L(G, H), F);
    }

    function B(x: number) {
      var k = '',
        F = '',
        G: number,
        d: number;
      for (d = 0; d <= 3; d++) {
        G = (x >>> (d * 8)) & 255;
        F = '0' + G.toString(16);
        k = k + F.substr(F.length - 2, 2);
      }
      return k;
    }

    var C = Array();
    var P: number,
      h: any,
      E: any,
      v: any,
      g: any,
      Y: number,
      X: number,
      W: number,
      V: number;
    var S = 7,
      Q = 12,
      N = 17,
      M = 22;
    var A = 5,
      z = 9,
      y = 14,
      w = 20;
    var o = 4,
      m = 11,
      l = 16,
      j = 23;
    var U = 6,
      T = 10,
      R = 15,
      O = 21;
    Y = 1732584193;
    X = 4023233417;
    W = 2562383102;
    V = 271733878;
    for (P = 0; P < C.length; P += 16) {
      h = Y;
      E = X;
      v = W;
      g = V;
      Y = u(Y, X, W, V, C[P + 0], S, 3614090360);
      V = u(V, Y, X, W, C[P + 1], Q, 3905402710);
      W = u(W, V, Y, X, C[P + 2], N, 606105819);
      X = u(X, W, V, Y, C[P + 3], M, 3250441966);
      Y = u(Y, X, W, V, C[P + 4], S, 4118548399);
      V = u(V, Y, X, W, C[P + 5], Q, 1200080426);
      W = u(W, V, Y, X, C[P + 6], N, 2821735955);
      X = u(X, W, V, Y, C[P + 7], M, 4249261313);
      Y = u(Y, X, W, V, C[P + 8], S, 1770035416);
      V = u(V, Y, X, W, C[P + 9], Q, 2336552879);
      W = u(W, V, Y, X, C[P + 10], N, 4294925233);
      X = u(X, W, V, Y, C[P + 11], M, 2304563134);
      Y = u(Y, X, W, V, C[P + 12], S, 1804603682);
      V = u(V, Y, X, W, C[P + 13], Q, 4254626195);
      W = u(W, V, Y, X, C[P + 14], N, 2792965006);
      X = u(X, W, V, Y, C[P + 15], M, 1236535329);
      Y = f(Y, X, W, V, C[P + 1], A, 4129170786);
      V = f(V, Y, X, W, C[P + 6], z, 3225465664);
      W = f(W, V, Y, X, C[P + 11], y, 643717713);
      X = f(X, W, V, Y, C[P + 0], w, 3921069994);
      Y = f(Y, X, W, V, C[P + 5], A, 3593408605);
      V = f(V, Y, X, W, C[P + 10], z, 38016083);
      W = f(W, V, Y, X, C[P + 15], y, 3634488961);
      X = f(X, W, V, Y, C[P + 4], w, 3889429448);
      Y = f(Y, X, W, V, C[P + 9], A, 568446438);
      V = f(V, Y, X, W, C[P + 14], z, 3275163606);
      W = f(W, V, Y, X, C[P + 3], y, 4107603335);
      X = f(X, W, V, Y, C[P + 8], w, 1163531501);
      Y = f(Y, X, W, V, C[P + 13], A, 2850285829);
      V = f(V, Y, X, W, C[P + 2], z, 4243563512);
      W = f(W, V, Y, X, C[P + 7], y, 1735328473);
      X = f(X, W, V, Y, C[P + 12], w, 2368359562);
      Y = D(Y, X, W, V, C[P + 5], o, 4294588738);
      V = D(V, Y, X, W, C[P + 8], m, 2272392833);
      W = D(W, V, Y, X, C[P + 11], l, 1839030562);
      X = D(X, W, V, Y, C[P + 14], j, 4259657740);
      Y = D(Y, X, W, V, C[P + 1], o, 2763975236);
      V = D(V, Y, X, W, C[P + 4], m, 1272893353);
      W = D(W, V, Y, X, C[P + 7], l, 4139469664);
      X = D(X, W, V, Y, C[P + 10], j, 3200236656);
      Y = D(Y, X, W, V, C[P + 13], o, 681279174);
      V = D(V, Y, X, W, C[P + 0], m, 3936430074);
      W = D(W, V, Y, X, C[P + 3], l, 3572445317);
      X = D(X, W, V, Y, C[P + 6], j, 76029189);
      Y = D(Y, X, W, V, C[P + 9], o, 3654602809);
      V = D(V, Y, X, W, C[P + 12], m, 3873151461);
      W = D(W, V, Y, X, C[P + 15], l, 530742520);
      X = D(X, W, V, Y, C[P + 2], j, 3299628645);
      Y = t(Y, X, W, V, C[P + 0], U, 4096336452);
      V = t(V, Y, X, W, C[P + 7], T, 1126891415);
      W = t(W, V, Y, X, C[P + 14], R, 2878612391);
      X = t(X, W, V, Y, C[P + 5], O, 4237533241);
      Y = t(Y, X, W, V, C[P + 12], U, 1700485571);
      V = t(V, Y, X, W, C[P + 3], T, 2399980690);
      W = t(W, V, Y, X, C[P + 10], R, 4293915773);
      X = t(X, W, V, Y, C[P + 1], O, 2240044497);
      Y = t(Y, X, W, V, C[P + 8], U, 1873313359);
      V = t(V, Y, X, W, C[P + 15], T, 4264355552);
      W = t(W, V, Y, X, C[P + 6], R, 2734768916);
      X = t(X, W, V, Y, C[P + 13], O, 1309151649);
      Y = t(Y, X, W, V, C[P + 4], U, 4149444226);
      V = t(V, Y, X, W, C[P + 11], T, 3174756917);
      W = t(W, V, Y, X, C[P + 2], R, 718787259);
      X = t(X, W, V, Y, C[P + 9], O, 3951481745);
      Y = K(Y, h);
      X = K(X, E);
      W = K(W, v);
      V = K(V, g);
    }
    var i = B(Y) + B(X) + B(W) + B(V);
    return i.toLowerCase();
  };

  /**
   * Sleep for a while, miniseconds
   * @param {*} ms
   * @returns
   */
  sleep = function (ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  /**
   * Cắt content ra thành độ dài mong muốn, thêm dấu 3 chấm vào cho oách!
   * @McJamBi  from                     Jamviet.com
   * @DateTime 2021-07-31T19:53:03+0700
   * (text): String, (maxLength): Number of string length
   */
  getTrimContent = (text: string, maxLength: number) => {
    var ellipsis = '...';
    text = String(text || ' ').trim();
    maxLength = isNaN(maxLength) ? 15 : parseInt(`` + maxLength);

    if (text.length > maxLength) {
      text = text.substring(0, maxLength - ellipsis.length);
      return text.substring(0, text.lastIndexOf(' ')) + ellipsis;
    } else return text;
  };

  /**
   * Strip all slashes from a string
   * @param {*} str
   * @returns
   */
  getStripslashes = (str: string) => {
    if (typeof str === 'undefined') str = ' ';
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Ates Goral (http://magnetiq.com)
    // +      fixed by: Mick@el
    // +   improved by: marrtins
    // +   bugfixed by: Onno Marsman
    // +   improved by: rezna
    // +   input by: Rick Waldron
    // +   reimplemented by: Brett Zamir (http://brett-zamir.me)
    // +   input by: Brant Messenger (http://www.brantmessenger.com/)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: stripslashes('Kevin\'s code');
    // *     returns 1: "Kevin's code"
    // *     example 2: stripslashes('Kevin\\\'s code');
    // *     returns 2: "Kevin\'s code"

    return (str + '').replace(/\\(.?)/g, function (s, n1) {
      switch (n1) {
        case '\\':
          return '\\';
        case '0':
          return '\u0000';
        case '':
          return '';
        default:
          return n1;
      }
    });
  };

  /**
   * Convert UTF to ASCII
   * @param {*} string
   * @param {*} special
   * @returns
   */
  getNonUnicode = (_string: string, special?: boolean) => {
    var str = String(_string || ' ').trim();
    if (str === '') return '';

    let unicode_char: any = {
      a: 'á|à|ả|ã|ạ|ă|ắ|ặ|ằ|ẳ|ẵ|â|ấ|ầ|ẩ|ẫ|ậ',
      d: 'đ',
      e: 'é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ',
      i: 'í|ì|ỉ|ĩ|ị',
      o: 'ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ',
      u: 'ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự',
      y: 'ý|ỳ|ỷ|ỹ|ỵ',
      A: 'Á|À|Ả|Ã|Ạ|Ă|Ắ|Ặ|Ằ|Ẳ|Ẵ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ',
      D: 'Đ',
      E: 'É|È|Ẻ|Ẽ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ',
      I: 'Í|Ì|Ỉ|Ĩ|Ị',
      O: 'Ó|Ò|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ổ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ở|Ỡ|Ợ',
      U: 'Ú|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự',
      Y: 'Ý|Ỳ|Ỷ|Ỹ|Ỵ'
    };
    let unicode_map: any = {};
    for (let name in unicode_char) {
      var value = unicode_char[name].split('|');
      for (var name_u in value) {
        if (value[name_u]) {
          unicode_map[value[name_u]] = name;
        }
      }
    }

    if (special === void 0) {
      special = false;
    }

    str = str.replace(/[^\x00-\x80]/g, function (a) {
      return unicode_map[a] ? unicode_map[a] : a;
    });
    if (special === true) {
      str = str.replace(/[^a-zA-Z0-9]/g, '-');
      for (var i = 0; i <= 10; i++) {
        str = str.replace('--', '-');
      }
      str = str.toLowerCase();
    }
    return String(str).toLowerCase();
  };

  /**
   * Convert title to name or slug like: title-like-this, allow [^a-zA-Z0-9]
   * @param {*} slug
   * @returns slug
   */
  getSlug = (slug: string) => {
    if (slug === void 0) return '';
    try {
      slug = decodeURIComponent(String(slug || ' '));
      slug = this.getNonUnicode(slug).replace(/[^a-zA-Z0-9]/g, ' ');
      slug = String(slug).trim().replace(/\s/g, '-').toLowerCase();
      slug = String(slug).replace(/\-+/g, '-').toLowerCase();
      return slug;
    } catch (_) {
      return '';
    }
  };

  /**
   * Convert unicode symbols to string
   * @param {*} text
   * @returns
   */
  unicodeToChar = (text: string) => {
    return String(text || ' ').replace(
      /\\u[\dA-F]{4}/gi,
      function (match: string) {
        return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
      }
    );
  };

  /**
   * slugify
   * @param {*} srcPath
   * @returns
   */

  slugify = (_string: any) => {
    var ss = this.unicodeToChar(_string);
    return this.getSlug(ss);
  };

  /**
   * Format number
   * @param _number
   * @param thousand_separate
   * @returns
   */
  formatNumber(_number: number, thousand_separate = '.'): string {
    return String(_number || '0')
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, thousand_separate);
  }
}
