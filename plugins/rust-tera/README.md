# Stagewise Rust Plugin

A comprehensive plugin for Stagewise Toolbar that provides intelligent analysis and annotation support for Rust source files and Tera templates.

## Features

### Rust File Analysis
- **Structs**: Detects struct definitions
- **Enums**: Identifies enum declarations
- **Traits**: Recognizes trait definitions
- **Implementations**: Finds impl blocks
- **Macros**: Detects attribute macros (`#[derive]`, `#[cfg]`, etc.)
- **Procedural Macros**: Identifies `#[proc_macro]` definitions
- **Custom MIR**: Detects `#[custom_mir]` usage

### Tera Template Analysis
- **Variables**: Detects `{{ variable }}` syntax
- **Filters**: Identifies `{{ value | filter }}` usage
- **Template Blocks**: Recognizes `{% if %}`, `{% for %}`, `{% block %}`, etc.
- **Comments**: Finds `{# comment #}` blocks
- **Template Inheritance**: Detects `{% extends %}` usage
- **Macros**: Identifies `{% macro %}` definitions
- **Includes**: Finds `{% include %}` statements
- **Conditionals**: Detects `{% if %}` blocks
- **Loops**: Recognizes `{% for %}` iterations

## Installation

```bash
pnpm install
```

## Development

### Running Tests
```bash
# Run tests in watch mode
pnpm test

# Run tests once
pnpm test:run

# Run tests with coverage
pnpm test:coverage
```

### Building
```bash
# Build the plugin
pnpm build

# Build in development mode with watch
pnpm dev
```

## Usage

The plugin automatically analyzes files with `.rs` and `.tera` extensions and provides contextual annotations describing the detected features.

### Example Output

For a Rust file containing structs and traits:
```
Title: "Rust File"
Description: "Contains: Structs, Traits, Implementations, Macros"
```

For a Tera template with variables and loops:
```
Title: "Tera Template" 
Description: "Contains: Variables, Template Blocks, Loops"
```

## Testing

The plugin includes comprehensive test coverage with:
- **23 test cases** covering all major features
- **Sample files** for manual testing
- **Edge case handling** for empty/missing content
- **Regex pattern validation** for accurate detection

### Test Files
- `src/__tests__/utils.test.ts` - Main test suite
- `test-samples/sample.rs` - Sample Rust file for testing
- `test-samples/sample.tera` - Sample Tera template for testing

## Architecture

- **`src/utils.ts`** - Core analysis functions
- **`src/index.tsx`** - Plugin entry point and exports
- **`src/logo.tsx`** - Rust logo component
- **`vitest.config.ts`** - Test configuration
- **`vite.config.ts`** - Build configuration

## Contributing

1. Make changes to the source files
2. Add tests for new features
3. Run `pnpm test` to verify functionality
4. Run `pnpm build` to ensure the plugin builds correctly
