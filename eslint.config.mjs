import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import nextVitals from 'eslint-config-next/core-web-vitals';
import eslintPluginTailwindcss from 'eslint-plugin-tailwindcss';

const eslintConfig = defineConfig([
  ...nextVitals,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'features/**']),
  tseslint.configs.recommended,
  prettierConfig,
  {
    plugins: { tailwindcss: eslintPluginTailwindcss },
    settings: {
      tailwindcss: {
        cssConfigPath: './src/app/globals.css',
        functions: ['cx', 'clsx', 'cn', 'cva', 'twMerge'],
      },
    },
    rules: {
      'tailwindcss/classnames-order': 'error',
    },
  },
]);

export default eslintConfig;
