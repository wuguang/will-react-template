module.exports = {
    extends: [
      'alloy',
      'alloy/react',
      'alloy/typescript',
    ],
    env: {
      // Your environments (which contains several predefined global variables)
      //
      // browser: true,
      // node: true,
      // mocha: true,
      // jest: true,
      // jquery: true
    },
    globals: {
      // Your global variables (setting to false means it's not allowed to be reassigned)
      // myGlobal: false
    },
    rules: {
      // Customize your rules
      // 禁用规则 no-undef 防止typescript 的全局无法被识别
      'no-undef': 'off',
      // 值类型可以直接推断出来，不需要类型注释
      '@typescript-eslint/no-inferrable-types':'off',
      '@typescript-eslint/no-require-imports':'off'
    },
  };

// yarn add  eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-config-alloy -D
