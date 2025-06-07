import { describe, it, expect } from 'vitest';
import { getSelectedElementAnnotation } from '../utils';
import type { ContextElement } from '@stagewise/toolbar';

describe('getSelectedElementAnnotation', () => {
  describe('Rust files', () => {
    it('should return null for non-Rust, non-Tera files', () => {
      const element: ContextElement = {
        path: 'test.js',
        content: 'console.log("hello");'
      };
      
      const result = getSelectedElementAnnotation(element);
      expect(result).toBeNull();
    });

    it('should detect basic Rust file', () => {
      const element: ContextElement = {
        path: 'main.rs',
        content: 'fn main() { println!("Hello, world!"); }'
      };
      
      const result = getSelectedElementAnnotation(element);
      expect(result).toEqual({
        title: 'Rust File',
        description: 'Rust source file'
      });
    });

    it('should detect Rust structs', () => {
      const element: ContextElement = {
        path: 'models.rs',
        content: `
          struct User {
            name: String,
            age: u32,
          }
        `
      };
      
      const result = getSelectedElementAnnotation(element);
      expect(result).toEqual({
        title: 'Rust File',
        description: 'Contains: Structs'
      });
    });

    it('should detect Rust enums', () => {
      const element: ContextElement = {
        path: 'types.rs',
        content: `
          enum Color {
            Red,
            Green,
            Blue,
          }
        `
      };
      
      const result = getSelectedElementAnnotation(element);
      expect(result).toEqual({
        title: 'Rust File',
        description: 'Contains: Enums'
      });
    });

    it('should detect Rust traits', () => {
      const element: ContextElement = {
        path: 'traits.rs',
        content: `
          trait Display {
            fn fmt(&self) -> String;
          }
        `
      };
      
      const result = getSelectedElementAnnotation(element);
      expect(result).toEqual({
        title: 'Rust File',
        description: 'Contains: Traits'
      });
    });

    it('should detect Rust implementations', () => {
      const element: ContextElement = {
        path: 'impl.rs',
        content: `
          impl Display for User {
            fn fmt(&self) -> String {
              format!("{}", self.name)
            }
          }
        `
      };
      
      const result = getSelectedElementAnnotation(element);
      expect(result).toEqual({
        title: 'Rust File',
        description: 'Contains: Implementations'
      });
    });

    it('should detect Rust macros', () => {
      const element: ContextElement = {
        path: 'macros.rs',
        content: `
          #[derive(Debug)]
          struct Point {
            x: i32,
            y: i32,
          }
        `
      };
      
      const result = getSelectedElementAnnotation(element);
      expect(result).toEqual({
        title: 'Rust File',
        description: 'Contains: Structs, Macros'
      });
    });

    it('should detect procedural macros', () => {
      const element: ContextElement = {
        path: 'proc_macro.rs',
        content: `
          #[proc_macro]
          pub fn my_macro(input: TokenStream) -> TokenStream {
            // macro implementation
          }
        `
      };
      
      const result = getSelectedElementAnnotation(element);
      expect(result).toEqual({
        title: 'Rust File',
        description: 'Contains: Macros, Procedural Macros'
      });
    });

    it('should detect custom MIR', () => {
      const element: ContextElement = {
        path: 'mir.rs',
        content: `
          #[custom_mir(dialect = "built")]
          fn example() {
            // MIR code
          }
        `
      };
      
      const result = getSelectedElementAnnotation(element);
      expect(result).toEqual({
        title: 'Rust File',
        description: 'Contains: Macros, Custom MIR'
      });
    });

    it('should detect multiple Rust features', () => {
      const element: ContextElement = {
        path: 'complex.rs',
        content: `
          #[derive(Debug, Clone)]
          struct User {
            name: String,
            role: Role,
          }

          enum Role {
            Admin,
            User,
          }

          trait Authenticate {
            fn login(&self) -> bool;
          }

          impl Authenticate for User {
            fn login(&self) -> bool {
              true
            }
          }
        `
      };
      
      const result = getSelectedElementAnnotation(element);
      expect(result).toEqual({
        title: 'Rust File',
        description: 'Contains: Structs, Enums, Traits, Implementations, Macros'
      });
    });
  });

  describe('Tera templates', () => {
    it('should detect basic Tera template', () => {
      const element: ContextElement = {
        path: 'template.tera',
        content: '<h1>Hello World</h1>'
      };
      
      const result = getSelectedElementAnnotation(element);
      expect(result).toEqual({
        title: 'Tera Template',
        description: 'Tera template file'
      });
    });

    it('should detect Tera variables', () => {
      const element: ContextElement = {
        path: 'user.tera',
        content: '<h1>Hello {{ name }}</h1>'
      };
      
      const result = getSelectedElementAnnotation(element);
      expect(result).toEqual({
        title: 'Tera Template',
        description: 'Contains: Variables'
      });
    });

    it('should detect Tera filters', () => {
      const element: ContextElement = {
        path: 'filtered.tera',
        content: '<p>{{ content | safe }}</p>'
      };
      
      const result = getSelectedElementAnnotation(element);
      expect(result).toEqual({
        title: 'Tera Template',
        description: 'Contains: Variables, Filters'
      });
    });

    it('should detect Tera conditionals', () => {
      const element: ContextElement = {
        path: 'conditional.tera',
        content: `
          {% if user.is_admin %}
            <p>Admin panel</p>
          {% endif %}
        `
      };
      
      const result = getSelectedElementAnnotation(element);
      expect(result).toEqual({
        title: 'Tera Template',
        description: 'Contains: Template Blocks, Conditionals'
      });
    });

    it('should detect Tera loops', () => {
      const element: ContextElement = {
        path: 'list.tera',
        content: `
          {% for item in items %}
            <li>{{ item.name }}</li>
          {% endfor %}
        `
      };
      
      const result = getSelectedElementAnnotation(element);
      expect(result).toEqual({
        title: 'Tera Template',
        description: 'Contains: Variables, Template Blocks, Loops'
      });
    });

    it('should detect Tera template inheritance', () => {
      const element: ContextElement = {
        path: 'child.tera',
        content: `
          {% extends "base.tera" %}
          {% block content %}
            <p>Child content</p>
          {% endblock %}
        `
      };
      
      const result = getSelectedElementAnnotation(element);
      expect(result).toEqual({
        title: 'Tera Template',
        description: 'Contains: Template Blocks, Template Inheritance'
      });
    });

    it('should detect Tera includes', () => {
      const element: ContextElement = {
        path: 'page.tera',
        content: `
          <header>
            {% include "header.tera" %}
          </header>
        `
      };
      
      const result = getSelectedElementAnnotation(element);
      expect(result).toEqual({
        title: 'Tera Template',
        description: 'Contains: Template Blocks, Includes'
      });
    });

    it('should detect Tera macros', () => {
      const element: ContextElement = {
        path: 'macros.tera',
        content: `
          {% macro input(name, type="text") %}
            <input name="{{ name }}" type="{{ type }}" />
          {% endmacro %}
        `
      };
      
      const result = getSelectedElementAnnotation(element);
      expect(result).toEqual({
        title: 'Tera Template',
        description: 'Contains: Variables, Template Blocks, Macros'
      });
    });

    it('should detect Tera comments', () => {
      const element: ContextElement = {
        path: 'commented.tera',
        content: `
          {# This is a comment #}
          <p>Visible content</p>
        `
      };
      
      const result = getSelectedElementAnnotation(element);
      expect(result).toEqual({
        title: 'Tera Template',
        description: 'Contains: Comments'
      });
    });

    it('should detect multiple Tera features', () => {
      const element: ContextElement = {
        path: 'complex.tera',
        content: `
          {% extends "base.tera" %}
          {# Page for displaying user list #}
          
          {% block content %}
            <h1>Users</h1>
            {% for user in users %}
              <div class="user">
                <h2>{{ user.name | title }}</h2>
                {% if user.is_active %}
                  <span class="active">Active</span>
                {% endif %}
              </div>
            {% endfor %}
            
            {% include "pagination.tera" %}
          {% endblock %}
        `
      };
      
      const result = getSelectedElementAnnotation(element);
      expect(result).toEqual({
        title: 'Tera Template',
        description: 'Contains: Variables, Filters, Template Blocks, Comments, Template Inheritance, Includes, Conditionals, Loops'
      });
    });
  });

  describe('edge cases', () => {
    it('should handle empty content', () => {
      const element: ContextElement = {
        path: 'empty.rs',
        content: ''
      };
      
      const result = getSelectedElementAnnotation(element);
      expect(result).toEqual({
        title: 'Rust File',
        description: 'Rust source file'
      });
    });

    it('should handle missing content', () => {
      const element: ContextElement = {
        path: 'missing.tera'
      };
      
      const result = getSelectedElementAnnotation(element);
      expect(result).toEqual({
        title: 'Tera Template',
        description: 'Tera template file'
      });
    });

    it('should handle missing path', () => {
      const element: ContextElement = {
        content: 'struct Test {}'
      };
      
      const result = getSelectedElementAnnotation(element);
      expect(result).toBeNull();
    });
  });
});
