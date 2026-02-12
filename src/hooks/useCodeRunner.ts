import { useState, useCallback } from 'react';
import type { CodeExecutionResult } from '@/types';

// Simple C# code simulator for educational purposes
// This simulates C# execution in the browser
export function useCodeRunner() {
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const simulateCSharpExecution = (code: string): string => {
    const outputs: string[] = [];
    const lines = code.split('\n');
    
    // Simple variable storage
    const variables: Record<string, any> = {};
    
    // Track braces
    let braceCount = 0;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Skip empty lines and comments
      if (!line || line.startsWith('//') || line.startsWith('/*') || line.startsWith('*')) {
        continue;
      }
      
      // Track braces
      braceCount += (line.match(/{/g) || []).length;
      braceCount -= (line.match(/}/g) || []).length;
      
      // Skip class declarations, usings, and method signatures
      if (line.startsWith('using ') || 
          line.startsWith('class ') || 
          line.startsWith('public class') ||
          line.startsWith('private') && line.includes('(') && !line.includes('=') ||
          line.startsWith('public') && line.includes('(') && !line.includes('=') ||
          line === '{' || line === '}') {
        continue;
      }
      
      // Handle Console.WriteLine
      const writeLineMatch = line.match(/Console\.WriteLine\s*\(\s*(.*)\s*\)\s*;?/);
      if (writeLineMatch) {
        let content = writeLineMatch[1].trim();
        
        // Handle string concatenation
        if (content.includes('+')) {
          const parts = content.split('+').map(p => p.trim());
          let result = '';
          for (const part of parts) {
            if (part.startsWith('"') && part.endsWith('"')) {
              result += part.slice(1, -1);
            } else if (variables[part] !== undefined) {
              result += variables[part];
            } else if (!isNaN(Number(part))) {
              result += part;
            }
          }
          outputs.push(result);
          continue;
        }
        
        // Handle string literals
        if (content.startsWith('"') && content.endsWith('"')) {
          outputs.push(content.slice(1, -1));
          continue;
        }
        
        // Handle variables
        if (variables[content] !== undefined) {
          outputs.push(String(variables[content]));
          continue;
        }
        
        // Handle expressions in parentheses
        if (content.startsWith('(') && content.endsWith(')')) {
          content = content.slice(1, -1);
        }
        
        // Handle arithmetic expressions
        if (content.includes('+') || content.includes('-') || content.includes('*') || content.includes('/')) {
          try {
            // Replace variables with their values
            let expr = content;
            for (const [varName, varValue] of Object.entries(variables)) {
              expr = expr.replace(new RegExp(`\\b${varName}\\b`, 'g'), String(varValue));
            }
            // Simple evaluation (be careful with eval)
            const result = Function('"use strict"; return (' + expr + ')')();
            outputs.push(String(result));
            continue;
          } catch {
            outputs.push(content);
            continue;
          }
        }
        
        outputs.push(content);
        continue;
      }
      
      // Handle Console.Write (no newline)
      const writeMatch = line.match(/Console\.Write\s*\(\s*(.*)\s*\)\s*;?/);
      if (writeMatch) {
        let content = writeMatch[1].trim();
        if (content.startsWith('"') && content.endsWith('"')) {
          outputs.push(content.slice(1, -1));
        } else if (variables[content] !== undefined) {
          outputs.push(String(variables[content]));
        } else {
          outputs.push(content);
        }
        continue;
      }
      
      // Handle variable declarations with initialization
      const varDeclMatch = line.match(/(?:int|string|double|bool|var)\s+(\w+)\s*=\s*(.+);?/);
      if (varDeclMatch) {
        const varName = varDeclMatch[1];
        let varValue = varDeclMatch[2].trim();
        
        // Handle string values
        if (varValue.startsWith('"') && varValue.endsWith('"')) {
          variables[varName] = varValue.slice(1, -1);
        } else if (varValue === 'true') {
          variables[varName] = true;
        } else if (varValue === 'false') {
          variables[varName] = false;
        } else if (!isNaN(Number(varValue))) {
          variables[varName] = Number(varValue);
        } else if (variables[varValue] !== undefined) {
          variables[varName] = variables[varValue];
        }
        continue;
      }
      
      // Handle variable assignment
      const assignMatch = line.match(/(\w+)\s*=\s*(.+);?/);
      if (assignMatch) {
        const varName = assignMatch[1];
        let varValue = assignMatch[2].trim();
        
        if (variables[varName] !== undefined) {
          if (varValue.startsWith('"') && varValue.endsWith('"')) {
            variables[varName] = varValue.slice(1, -1);
          } else if (!isNaN(Number(varValue))) {
            variables[varName] = Number(varValue);
          } else if (variables[varValue] !== undefined) {
            variables[varName] = variables[varValue];
          }
        }
        continue;
      }
      
      // Handle increment/decrement
      const incMatch = line.match(/(\w+)(\+\+|--);?/);
      if (incMatch) {
        const varName = incMatch[1];
        const operator = incMatch[2];
        if (variables[varName] !== undefined && typeof variables[varName] === 'number') {
          variables[varName] += operator === '++' ? 1 : -1;
        }
        continue;
      }
      
      // Handle +=, -=, *=, /=
      const compoundMatch = line.match(/(\w+)\s*(\+=|-=|\*=|\/=)\s*(.+);?/);
      if (compoundMatch) {
        const varName = compoundMatch[1];
        const operator = compoundMatch[2];
        let value = compoundMatch[3].trim();
        
        if (variables[varName] !== undefined && typeof variables[varName] === 'number') {
          const numValue = !isNaN(Number(value)) ? Number(value) : variables[value] || 0;
          switch (operator) {
            case '+=': variables[varName] += numValue; break;
            case '-=': variables[varName] -= numValue; break;
            case '*=': variables[varName] *= numValue; break;
            case '/=': variables[varName] /= numValue; break;
          }
        }
        continue;
      }
    }
    
    return outputs.join('\n');
  };

  const runCode = useCallback(async (code: string): Promise<CodeExecutionResult> => {
    setIsRunning(true);
    setOutput('');
    setError('');
    
    const startTime = performance.now();
    
    try {
      // Simulate execution delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const result = simulateCSharpExecution(code);
      const executionTime = performance.now() - startTime;
      
      setOutput(result);
      setIsRunning(false);
      
      return {
        success: true,
        output: result,
        executionTime
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'حدث خطأ غير معروف';
      setError(errorMessage);
      setIsRunning(false);
      
      return {
        success: false,
        output: '',
        error: errorMessage,
        executionTime: performance.now() - startTime
      };
    }
  }, []);

  const clearOutput = useCallback(() => {
    setOutput('');
    setError('');
  }, []);

  return {
    isRunning,
    output,
    error,
    runCode,
    clearOutput
  };
}
