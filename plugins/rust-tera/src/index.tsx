import type { Plugin } from '@stagewise/toolbar';
import { getSelectedElementAnnotation } from './utils';
import { RustLogo } from './logo';

export const rustPlugin: Plugin = {
  id: 'rust',
  name: 'Rust & Tera',
  description: 'Rust and Tera templating support for Stagewise Toolbar',
  version: '0.1.0',
  icon: RustLogo,
  getSelectedElementAnnotation,
};

export default rustPlugin;

// Export utilities for external use
export { getSelectedElementAnnotation } from './utils';
export { RustLogo } from './logo';
