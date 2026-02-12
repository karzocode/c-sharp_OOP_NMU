import { useState } from 'react';
import { Play, RotateCcw, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCodeRunner } from '@/hooks/useCodeRunner';
import { cn } from '@/lib/utils';

interface CodeEditorProps {
  initialCode: string;
  expectedOutput?: string;
  onSuccess?: () => void;
  readOnly?: boolean;
  height?: string;
}

export function CodeEditor({ 
  initialCode, 
  expectedOutput, 
  onSuccess,
  readOnly = false,
  height = '300px'
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { isRunning, output, error, runCode, clearOutput } = useCodeRunner();

  const handleRun = async () => {
    const result = await runCode(code);
    
    if (result.success && expectedOutput) {
      const normalizedOutput = result.output.trim();
      const normalizedExpected = expectedOutput.trim();
      
      if (normalizedOutput === normalizedExpected) {
        setShowSuccess(true);
        onSuccess?.();
      }
    }
  };

  const handleReset = () => {
    setCode(initialCode);
    clearOutput();
    setShowSuccess(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple syntax highlighting
  const highlightCode = (code: string) => {
    return code
      .replace(/(\/\/.*)/g, '<span class="token-comment">$1</span>')
      .replace(/(".*?")/g, '<span class="token-string">$1</span>')
      .replace(/\b(using|class|static|void|int|string|double|bool|var|if|else|for|while|do|return|new|public|private|protected|internal|virtual|override|abstract|sealed|this|base)\b/g, '<span class="token-keyword">$1</span>')
      .replace(/\b(Console|Math|List|Array)\b/g, '<span class="token-class">$1</span>')
      .replace(/\b(WriteLine|Write|ReadLine|Parse|ToString)\b/g, '<span class="token-function">$1</span>')
      .replace(/\b(\d+)\b/g, '<span class="token-number">$1</span>');
  };

  return (
    <div className="rounded-xl border bg-slate-950 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-xs text-slate-400 mr-2">main.cs</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="h-8 w-8 text-slate-400 hover:text-white"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleReset}
            className="h-8 w-8 text-slate-400 hover:text-white"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Editor */}
      <Tabs defaultValue="code" className="w-full">
        <TabsList className="w-full justify-start rounded-none bg-slate-900 border-b border-slate-800">
          <TabsTrigger value="code" className="rounded-none data-[state=active]:bg-slate-950">
            الكود
          </TabsTrigger>
          <TabsTrigger value="output" className="rounded-none data-[state=active]:bg-slate-950">
            الناتج {output && <span className="mr-1 text-xs">({output.split('\n').length})</span>}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="code" className="m-0">
          <div className="relative" style={{ height }}>
            {/* Line Numbers */}
            <div className="absolute left-0 top-0 bottom-0 w-10 bg-slate-900/50 border-r border-slate-800 text-right pt-4 pr-2 select-none">
              {code.split('\n').map((_, i) => (
                <div key={i} className="text-xs text-slate-600 leading-6">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Syntax Highlighting Layer */}
            <pre 
              className="absolute inset-0 pl-12 pt-4 pr-4 font-mono text-sm text-slate-300 pointer-events-none whitespace-pre-wrap break-words overflow-auto"
              style={{ direction: 'ltr', textAlign: 'left' }}
              dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
            />

            {/* Textarea */}
            <textarea
              value={code}
              onChange={(e) => !readOnly && setCode(e.target.value)}
              readOnly={readOnly}
              className={cn(
                "absolute inset-0 w-full h-full pl-12 pt-4 pr-4 font-mono text-sm text-transparent bg-transparent resize-none outline-none overflow-auto caret-white",
                readOnly && "cursor-default"
              )}
              style={{ direction: 'ltr', textAlign: 'left' }}
              spellCheck={false}
            />
          </div>
        </TabsContent>

        <TabsContent value="output" className="m-0">
          <div 
            className="bg-slate-950 p-4 font-mono text-sm overflow-auto"
            style={{ height }}
          >
            {error ? (
              <div className="text-red-400">
                <div className="font-bold mb-2">خطأ:</div>
                <pre>{error}</pre>
              </div>
            ) : output ? (
              <div className="text-green-400">
                <div className="text-slate-500 mb-2">// ناتج التنفيذ:</div>
                <pre className="text-slate-300 whitespace-pre-wrap">{output}</pre>
              </div>
            ) : (
              <div className="text-slate-600 italic">
                اضغط "تشغيل" عشان تشوف الناتج...
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-t border-slate-800">
        <div className="flex items-center gap-2">
          {showSuccess && (
            <span className="text-green-400 text-sm flex items-center gap-1">
              <Check className="h-4 w-4" />
              ممتاز! الكود صح
            </span>
          )}
          {expectedOutput && !showSuccess && output && (
            <span className="text-yellow-400 text-sm">
              حاول تاني - الناتج مش زي المتوقع
            </span>
          )}
        </div>
        <Button
          onClick={handleRun}
          disabled={isRunning}
          className="bg-green-600 hover:bg-green-700 text-white gap-2"
        >
          <Play className="h-4 w-4" />
          {isRunning ? 'جاري التشغيل...' : 'تشغيل'}
        </Button>
      </div>
    </div>
  );
}
