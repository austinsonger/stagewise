import type { ContextElement } from '@stagewise/toolbar';

export function getSelectedElementAnnotation(element: ContextElement) {
  // Check if the element is a Rust file or Tera template
  const isRustFile = element.path?.endsWith('.rs');
  const isTeraTemplate = element.path?.endsWith('.tera');
  
  if (!isRustFile && !isTeraTemplate) {
    return null;
  }

  // Extract information based on file type
  if (isRustFile) {
    return {
      title: 'Rust File',
      description: getRustFileDescription(element),
    };
  }
  
  if (isTeraTemplate) {
    return {
      title: 'Tera Template',
      description: getTeraTemplateDescription(element),
    };
  }

  return null;
}

function getRustFileDescription(element: ContextElement): string {
  // Extract information about Rust file
  const content = element.content || '';
  
  // Check for common Rust patterns
  const hasMacros = content.includes('#[');
  const hasStructs = content.includes('struct ');
  const hasEnums = content.includes('enum ');
  const hasTraits = content.includes('trait ');
  const hasImpl = content.includes('impl ');
  const hasCustomMir = content.includes('#[custom_mir');
  const hasProcMacro = content.includes('#[proc_macro');
  
  const features = [
    hasStructs && 'Structs',
    hasEnums && 'Enums',
    hasTraits && 'Traits',
    hasImpl && 'Implementations',
    hasMacros && 'Macros',
    hasCustomMir && 'Custom MIR',
    hasProcMacro && 'Procedural Macros',
  ].filter(Boolean);
  
  return features.length > 0
    ? `Contains: ${features.join(', ')}`
    : 'Rust source file';
}

function getTeraTemplateDescription(element: ContextElement): string {
  // Extract information about Tera template
  const content = element.content || '';

  // Check for common Tera patterns
  const hasVariables = /\{\{\s*\w+/.test(content);
  const hasFilters = /\|\s*\w+/.test(content);
  const hasBlocks = /\{\%\s*(if|for|block|extends|include|macro)/.test(content);
  const hasComments = /\{\#/.test(content);
  const hasInheritance = /\{\%\s*extends/.test(content);
  const hasMacros = /\{\%\s*macro/.test(content);
  const hasIncludes = /\{\%\s*include/.test(content);
  const hasConditionals = /\{\%\s*if/.test(content);
  const hasLoops = /\{\%\s*for/.test(content);

  const features = [
    hasVariables && 'Variables',
    hasFilters && 'Filters',
    hasBlocks && 'Template Blocks',
    hasComments && 'Comments',
    hasInheritance && 'Template Inheritance',
    hasMacros && 'Macros',
    hasIncludes && 'Includes',
    hasConditionals && 'Conditionals',
    hasLoops && 'Loops',
  ].filter(Boolean);

  return features.length > 0
    ? `Contains: ${features.join(', ')}`
    : 'Tera template file';
}