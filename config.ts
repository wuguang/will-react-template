// This rule disallows explicit type declarations on parameters, variables and properties where the type can be easily inferred from its value.
// 值类型可以直接推断出来，不需要定义类型
const mockPort:number = 3000;

module.exports = {
    'devServerAddr':'https://www.baidu.com',
    'sitServerAddr':'https://www.baidu.com',
    'mockServerAddr':`http://localhost:${mockPort}`,
    mockPort, 
}


// "eslint": "eslint --ext .js,.jsx,.ts,.tsx,.vue --ignore-pattern \"bad.*\" .",
// "prettier": "prettier -l \"./**/*\"",
// "prettier:fix": "prettier --write -l \"./**/*\"",

