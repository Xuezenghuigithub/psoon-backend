class Regex {
  static isEmail (email){
    const rule = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return rule.test(email);
  }
  static isId (id){
    return /^[a-fA-F0-9]{24}$/.test(id);
  }
}

module.exports = Regex;