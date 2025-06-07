#!/usr/bin/env node

/**
 * Manual test runner for the Rust plugin utilities
 * This script tests the actual functions with sample files
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import our utility function
import { getSelectedElementAnnotation } from './src/utils.js';

function runTests() {
  console.log('🧪 Running manual tests for Rust plugin utilities\n');

  // Test with sample Rust file
  console.log('📄 Testing Rust file analysis:');
  try {
    const rustContent = readFileSync(join(__dirname, 'test-samples/sample.rs'), 'utf-8');
    const rustElement = {
      path: 'test-samples/sample.rs',
      content: rustContent
    };
    
    const rustResult = getSelectedElementAnnotation(rustElement);
    console.log('✅ Rust file result:', JSON.stringify(rustResult, null, 2));
  } catch (error) {
    console.error('❌ Error testing Rust file:', error.message);
  }

  console.log('\n📄 Testing Tera template analysis:');
  try {
    const teraContent = readFileSync(join(__dirname, 'test-samples/sample.tera'), 'utf-8');
    const teraElement = {
      path: 'test-samples/sample.tera',
      content: teraContent
    };
    
    const teraResult = getSelectedElementAnnotation(teraElement);
    console.log('✅ Tera template result:', JSON.stringify(teraResult, null, 2));
  } catch (error) {
    console.error('❌ Error testing Tera template:', error.message);
  }

  // Test with non-supported file
  console.log('\n📄 Testing non-supported file:');
  const jsElement = {
    path: 'test.js',
    content: 'console.log("hello");'
  };
  
  const jsResult = getSelectedElementAnnotation(jsElement);
  console.log('✅ JavaScript file result:', jsResult);

  console.log('\n🎉 Manual tests completed!');
}

runTests();
