// C# Code Simulator - Simulates basic C# code execution

export function simulateCSharpCode(code: string): string {
  const lines: string[] = [];
  const variables: Record<string, any> = {};
  const objects: Record<string, Record<string, any>> = {};
  
  const codeLines = code.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('//'));
  
  for (let i = 0; i < codeLines.length; i++) {
    const line = codeLines[i];
    
    // Handle Console.WriteLine
    const writeLineMatch = line.match(/Console\.WriteLine\((.*)\);?/);
    if (writeLineMatch) {
      const content = writeLineMatch[1].trim();
      const output = evaluateExpression(content, variables, objects);
      lines.push(output);
      continue;
    }
    
    // Handle Console.Write
    const writeMatch = line.match(/Console\.Write\((.*)\);?/);
    if (writeMatch) {
      const content = writeMatch[1].trim();
      const output = evaluateExpression(content, variables, objects);
      lines.push(output);
      continue;
    }
    
    // Handle variable declaration with initialization
    const varDeclMatch = line.match(/(int|string|double|float|bool|var)\s+(\w+)\s*=\s*(.+);?/);
    if (varDeclMatch) {
      const name = varDeclMatch[2];
      const value = evaluateExpression(varDeclMatch[3].trim(), variables, objects);
      variables[name] = value;
      continue;
    }
    
    // Handle variable assignment
    const assignMatch = line.match(/(\w+)\s*=\s*(.+);?/);
    if (assignMatch && !line.includes('new ')) {
      const name = assignMatch[1];
      const value = evaluateExpression(assignMatch[2].trim(), variables, objects);
      variables[name] = value;
      continue;
    }
    
    // Handle object creation
    const objectCreateMatch = line.match(/(\w+)\s+(\w+)\s*=\s*new\s+(\w+)\((.*)\);?/);
    if (objectCreateMatch) {
      const varName = objectCreateMatch[2];
      objects[varName] = {
        _class: objectCreateMatch[1]
      };
      continue;
    }
    
    // Handle object field assignment
    const fieldAssignMatch = line.match(/(\w+)\.(\w+)\s*=\s*(.+);?/);
    if (fieldAssignMatch) {
      const objName = fieldAssignMatch[1];
      const fieldName = fieldAssignMatch[2];
      const value = evaluateExpression(fieldAssignMatch[3].trim(), variables, objects);
      
      if (objects[objName]) {
        objects[objName][fieldName] = value;
      }
      continue;
    }
    
    // Handle method call on object
    const methodCallMatch = line.match(/(\w+)\.(\w+)\((.*)\);?/);
    if (methodCallMatch && !line.includes('Console.')) {
      const objName = methodCallMatch[1];
      const methodName = methodCallMatch[2];
      
      // Simulate common method calls
      if (methodName === 'Run' && objects[objName]) {
        const name = objects[objName].name || objName;
        lines.push(`${name} is running.`);
      } else if (methodName === 'Speak' && objects[objName]) {
        const sound = objects[objName]._sound || 'speaks';
        lines.push(sound);
      } else if (methodName === 'Shoot' && objects[objName]) {
        const name = objects[objName].name || objName;
        lines.push(`${name} is shooting.`);
      }
      continue;
    }
    
    // Handle array creation
    const arrayCreateMatch = line.match(/(\w+)\[\]\s+(\w+)\s*=\s*new\s+\w+\[(\d+)\];?/);
    if (arrayCreateMatch) {
      const varName = arrayCreateMatch[2];
      const size = parseInt(arrayCreateMatch[3]);
      objects[varName] = { _type: 'array', _size: size, _items: new Array(size).fill(null) };
      continue;
    }
    
    // Handle array element assignment
    const arrayAssignMatch = line.match(/(\w+)\[(\d+)\]\s*=\s*(.+);?/);
    if (arrayAssignMatch) {
      const varName = arrayAssignMatch[1];
      const index = parseInt(arrayAssignMatch[2]);
      const value = evaluateExpression(arrayAssignMatch[3].trim(), variables, objects);
      
      if (objects[varName] && objects[varName]._type === 'array') {
        objects[varName]._items[index] = value;
      }
      continue;
    }
    
    // Handle array access in Console.WriteLine
    const arrayAccessMatch = line.match(/Console\.WriteLine\((\w+)\[(\d+)\]\);?/);
    if (arrayAccessMatch) {
      const varName = arrayAccessMatch[1];
      const index = parseInt(arrayAccessMatch[2]);
      
      if (objects[varName] && objects[varName]._type === 'array') {
        lines.push(String(objects[varName]._items[index] ?? 'null'));
      }
      continue;
    }
  }
  
  return lines.join('\n') || '// Code executed successfully (no output)';
}

function evaluateExpression(expr: string, variables: Record<string, any>, objects: Record<string, any>): string {
  // Remove quotes from string literals
  if (expr.startsWith('"') && expr.endsWith('"')) {
    return expr.slice(1, -1);
  }
  
  // Handle string interpolation
  if (expr.startsWith('$"') && expr.endsWith('"')) {
    let result = expr.slice(2, -1);
    // Replace {variable} with actual values
    result = result.replace(/\{(\w+)\}/g, (match, varName) => {
      return variables[varName] !== undefined ? String(variables[varName]) : match;
    });
    // Replace {object.field} with actual values
    result = result.replace(/\{(\w+)\.(\w+)\}/g, (match, objName, fieldName) => {
      if (objects[objName] && objects[objName][fieldName] !== undefined) {
        return String(objects[objName][fieldName]);
      }
      return match;
    });
    return result;
  }
  
  // Handle variable reference
  if (variables[expr] !== undefined) {
    return String(variables[expr]);
  }
  
  // Handle object field reference
  const fieldRefMatch = expr.match(/(\w+)\.(\w+)/);
  if (fieldRefMatch) {
    const objName = fieldRefMatch[1];
    const fieldName = fieldRefMatch[2];
    if (objects[objName] && objects[objName][fieldName] !== undefined) {
      return String(objects[objName][fieldName]);
    }
  }
  
  // Handle arithmetic expressions
  try {
    // Replace variable names with their values
    let evalExpr = expr;
    for (const [name, value] of Object.entries(variables)) {
      evalExpr = evalExpr.replace(new RegExp(`\\b${name}\\b`, 'g'), String(value));
    }
    // Evaluate simple arithmetic
    const result = Function('"use strict"; return (' + evalExpr + ')')();
    return String(result);
  } catch {
    return expr;
  }
}
