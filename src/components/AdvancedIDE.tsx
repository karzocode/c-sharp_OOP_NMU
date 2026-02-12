// ============================================================================
// Advanced C# IDE Component
// Full-featured in-browser code editor with syntax highlighting
// All rights reserved to Karzo Code - Owner: Eng. Kariem Tamer
// ============================================================================

import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Play, RotateCcw, Copy, Check, Download, Code, Terminal, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { simulateCSharpCode } from '../utils/codeSimulator';

interface AdvancedIDEProps {
  initialCode?: string;
  onRun?: (code: string, output: string) => void;
  height?: string;
  showExamples?: boolean;
  readOnly?: boolean;
}

// C# Keywords for syntax highlighting
const csharpKeywords = [
  'abstract', 'as', 'base', 'bool', 'break', 'byte', 'case', 'catch', 'char', 'checked',
  'class', 'const', 'continue', 'decimal', 'default', 'delegate', 'do', 'double', 'else',
  'enum', 'event', 'explicit', 'extern', 'false', 'finally', 'fixed', 'float', 'for',
  'foreach', 'goto', 'if', 'implicit', 'in', 'int', 'interface', 'internal', 'is', 'lock',
  'long', 'namespace', 'new', 'null', 'object', 'operator', 'out', 'override', 'params',
  'private', 'protected', 'public', 'readonly', 'ref', 'return', 'sbyte', 'sealed',
  'short', 'sizeof', 'stackalloc', 'static', 'string', 'struct', 'switch', 'this', 'throw',
  'true', 'try', 'typeof', 'uint', 'ulong', 'unchecked', 'unsafe', 'ushort', 'using',
  'virtual', 'void', 'volatile', 'while', 'var', 'async', 'await', 'get', 'set', 'value'
];

// Sample code templates
const codeTemplates = [
  {
    name: { en: 'Hello World', ar: 'مرحبا بالعالم' },
    code: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Hello, World!");
        Console.WriteLine("Welcome to C# OOP!");
    }
}`
  },
  {
    name: { en: 'Variables & Data Types', ar: 'المتغيرات وأنواع البيانات' },
    code: `using System;

class Program
{
    static void Main()
    {
        // Declare variables
        int age = 25;
        string name = "Ahmed";
        double price = 19.99;
        bool isActive = true;
        
        // Print values
        Console.WriteLine("Name: " + name);
        Console.WriteLine("Age: " + age);
        Console.WriteLine("Price: $" + price);
        Console.WriteLine("Active: " + isActive);
    }
}`
  },
  {
    name: { en: 'Simple Class', ar: 'كلاس بسيط' },
    code: `using System;

class Car
{
    public string color;
    public string model;
    
    public void DisplayInfo()
    {
        Console.WriteLine("Model: " + model);
        Console.WriteLine("Color: " + color);
    }
}

class Program
{
    static void Main()
    {
        Car myCar = new Car();
        myCar.model = "Toyota";
        myCar.color = "Red";
        
        myCar.DisplayInfo();
    }
}`
  },
  {
    name: { en: 'Arrays', ar: 'المصفوفات' },
    code: `using System;

class Program
{
    static void Main()
    {
        // Create and initialize array
        int[] numbers = new int[5];
        numbers[0] = 10;
        numbers[1] = 20;
        numbers[2] = 30;
        numbers[3] = 40;
        numbers[4] = 50;
        
        // Print array elements
        for (int i = 0; i < numbers.Length; i++)
        {
            Console.WriteLine("numbers[" + i + "] = " + numbers[i]);
        }
    }
}`
  },
  {
    name: { en: 'If-Else Statement', ar: 'عبارة If-Else' },
    code: `using System;

class Program
{
    static void Main()
    {
        int score = 85;
        
        if (score >= 90)
        {
            Console.WriteLine("Grade: A");
        }
        else if (score >= 80)
        {
            Console.WriteLine("Grade: B");
        }
        else if (score >= 70)
        {
            Console.WriteLine("Grade: C");
        }
        else
        {
            Console.WriteLine("Grade: F");
        }
    }
}`
  },
  {
    name: { en: 'For Loop', ar: 'حلقة For' },
    code: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Counting from 1 to 5:");
        
        for (int i = 1; i <= 5; i++)
        {
            Console.WriteLine("i = " + i);
        }
    }
}`
  }
];

// Syntax highlighting function
function highlightCSharp(code: string): string {
  let highlighted = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Comments (single line)
  highlighted = highlighted.replace(/(\/\/.*$)/gm, `<span class="text-green-500">$1</span>`);
  
  // Comments (multi-line)
  highlighted = highlighted.replace(/(\/\*[\s\S]*?\*\/)/g, `<span class="text-green-500">$1</span>`);
  
  // Strings
  highlighted = highlighted.replace(/("(?:[^"\\]|\\.)*")/g, `<span class="text-yellow-500">$1</span>`);
  
  // Keywords
  const keywordRegex = new RegExp(`\\b(${csharpKeywords.join('|')})\\b`, 'g');
  highlighted = highlighted.replace(keywordRegex, `<span class="text-purple-500 font-semibold">$1</span>`);
  
  // Numbers
  highlighted = highlighted.replace(/\b(\d+\.?\d*)\b/g, `<span class="text-orange-500">$1</span>`);
  
  // Class names (PascalCase after class/struct/enum)
  highlighted = highlighted.replace(/\b(class|struct|enum|interface)\s+(\w+)/g, 
    `$1 <span class="text-cyan-500">$2</span>`);
  
  // Method calls
  highlighted = highlighted.replace(/\.(\w+)\(/g, `.<span class="text-blue-400">$1</span>(`);
  
  return highlighted;
}

export function AdvancedIDE({ 
  initialCode = codeTemplates[0].code, 
  onRun, 
  height = "500px",
  showExamples = true,
  readOnly = false
}: AdvancedIDEProps) {
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [lineCount, setLineCount] = useState(1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightedRef = useRef<HTMLPreElement>(null);
  const isDark = theme === 'dark';

  // Update line count when code changes
  useEffect(() => {
    setLineCount(code.split('\n').length);
  }, [code]);

  // Sync scroll between textarea and highlighted code
  const handleScroll = () => {
    if (textareaRef.current && highlightedRef.current) {
      highlightedRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightedRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  // Handle tab key for indentation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('');
    setErrors([]);
    
    // Simulate compilation delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      const result = simulateCSharpCode(code);
      setOutput(result);
      if (onRun) {
        onRun(code, result);
      }
    } catch (err) {
      setErrors([String(err)]);
    }
    
    setIsRunning(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setCode('');
    setOutput('');
    setErrors([]);
  };

  const loadTemplate = (templateCode: string) => {
    setCode(templateCode);
    setOutput('');
    setErrors([]);
    setShowTemplates(false);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Program.cs';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Generate line numbers
  const lineNumbers = Array.from({ length: Math.max(lineCount, 20) }, (_, i) => i + 1);

  return (
    <div className={`rounded-xl overflow-hidden border ${
      isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-white'
    }`} style={{ height }}>
      {/* Toolbar */}
      <div className={`flex items-center justify-between px-4 py-3 border-b ${
        isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
      }`}>
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-purple-500" />
          <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('C# Editor', 'محرر سي شارب')}
          </span>
          {showExamples && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTemplates(!showTemplates)}
              className="ml-2"
            >
              {t('Templates', 'قوالب')}
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            title={t('Copy code', 'نسخ الكود')}
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownload}
            title={t('Download', 'تحميل')}
          >
            <Download className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            title={t('Clear', 'مسح')}
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            onClick={handleRun}
            disabled={isRunning || !code.trim()}
            className="bg-green-600 hover:bg-green-700 text-white"
            size="sm"
          >
            <Play className="w-4 h-4 mr-1" />
            {isRunning ? t('Running...', 'جاري التشغيل...') : t('Run', 'تشغيل')}
          </Button>
        </div>
      </div>

      {/* Templates Dropdown */}
      {showTemplates && showExamples && (
        <div className={`border-b ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} p-2`}>
          <div className="flex flex-wrap gap-2">
            {codeTemplates.map((template, i) => (
              <Button
                key={i}
                variant="outline"
                size="sm"
                onClick={() => loadTemplate(template.code)}
              >
                {template.name[language]}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Editor Area */}
      <div className="flex" style={{ height: 'calc(100% - 120px)' }}>
        {/* Code Editor */}
        <div className="flex-1 flex relative overflow-hidden">
          {/* Line Numbers */}
          <div className={`select-none py-4 px-3 text-right text-sm font-mono ${
            isDark ? 'bg-gray-850 text-gray-500' : 'bg-gray-100 text-gray-400'
          }`} style={{ minWidth: '50px' }}>
            {lineNumbers.map(num => (
              <div key={num} className="leading-6">{num}</div>
            ))}
          </div>
          
          {/* Editor Container */}
          <div className="relative flex-1">
            {/* Syntax Highlighted Background */}
            <pre
              ref={highlightedRef}
              className={`absolute inset-0 p-4 m-0 font-mono text-sm leading-6 overflow-auto pointer-events-none ${
                isDark ? 'bg-gray-900 text-gray-300' : 'bg-white text-gray-800'
              }`}
              dangerouslySetInnerHTML={{ 
                __html: highlightCSharp(code + '\n') 
              }}
            />
            
            {/* Textarea for editing */}
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onScroll={handleScroll}
              onKeyDown={handleKeyDown}
              disabled={readOnly}
              className={`absolute inset-0 w-full h-full p-4 m-0 font-mono text-sm leading-6 resize-none border-0 outline-none ${
                isDark 
                  ? 'bg-transparent text-transparent caret-white' 
                  : 'bg-transparent text-transparent caret-black'
              }`}
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
            />
          </div>
        </div>
      </div>

      {/* Output Panel */}
      <div className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`} style={{ height: '120px' }}>
        <div className={`flex items-center gap-2 px-4 py-2 border-b ${
          isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
        }`}>
          <Terminal className="w-4 h-4 text-green-500" />
          <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {t('Output', 'الناتج')}
          </span>
        </div>
        <div className={`h-full p-4 font-mono text-sm overflow-auto ${
          isDark ? 'bg-black' : 'bg-gray-50'
        }`}>
          {errors.length > 0 ? (
            <div className="space-y-1">
              {errors.map((error, i) => (
                <div key={i} className="flex items-center gap-2 text-red-500">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              ))}
            </div>
          ) : output ? (
            <pre className="text-green-400 whitespace-pre-wrap">{output}</pre>
          ) : (
            <div className={`flex items-center justify-center h-full ${
              isDark ? 'text-gray-600' : 'text-gray-400'
            }`}>
              <span>{t('Click "Run" to see output', 'اضغط "تشغيل" لرؤية الناتج')}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdvancedIDE;
