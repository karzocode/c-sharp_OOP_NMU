import { useState } from 'react';
import { Play, RotateCcw, Sparkles, Code2, Terminal } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCodeRunner } from '@/hooks/useCodeRunner';

const defaultCode = `using System;

class Program
{
    static void Main()
    {
        // اكتب كودك هنا
        Console.WriteLine("Hello, World!");
        
        // جرب المتغيرات
        string name = "C#";
        int year = 2024;
        Console.WriteLine("أنا بتعلم " + name + " في " + year);
        
        // جرب العمليات الحسابية
        int a = 10;
        int b = 5;
        Console.WriteLine("a + b = " + (a + b));
        Console.WriteLine("a * b = " + (a * b));
    }
}`;

const examples = [
  {
    name: 'Hello World',
    code: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Hello, World!");
        Console.WriteLine("أهلاً بالعالم!");
    }
}`
  },
  {
    name: 'المتغيرات',
    code: `using System;

class Program
{
    static void Main()
    {
        string name = "أحمد";
        int age = 25;
        double price = 99.99;
        bool isActive = true;
        
        Console.WriteLine("الاسم: " + name);
        Console.WriteLine("العمر: " + age);
        Console.WriteLine("السعر: " + price);
        Console.WriteLine("نشط: " + isActive);
    }
}`
  },
  {
    name: 'جملة if',
    code: `using System;

class Program
{
    static void Main()
    {
        int age = 18;
        
        if (age >= 18)
        {
            Console.WriteLine("أنت بالغ!");
        }
        else
        {
            Console.WriteLine("أنت قاصر!");
        }
        
        // درجة
        int score = 85;
        
        if (score >= 90)
            Console.WriteLine("ممتاز!");
        else if (score >= 80)
            Console.WriteLine("جيد جداً!");
        else if (score >= 70)
            Console.WriteLine("جيد");
        else
            Console.WriteLine("يحتاج تحسين");
    }
}`
  },
  {
    name: 'for loop',
    code: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("الأرقام من 1 لـ 5:");
        for (int i = 1; i <= 5; i++)
        {
            Console.WriteLine(i);
        }
        
        Console.WriteLine("\\nجدول الضرب 3:");
        for (int i = 1; i <= 10; i++)
        {
            Console.WriteLine("3 × " + i + " = " + (3 * i));
        }
    }
}`
  },
  {
    name: 'مصفوفة',
    code: `using System;

class Program
{
    static void Main()
    {
        string[] names = { "أحمد", "محمد", "علي", "سارة" };
        
        Console.WriteLine("الأسماء:");
        for (int i = 0; i < names.Length; i++)
        {
            Console.WriteLine((i + 1) + ". " + names[i]);
        }
        
        Console.WriteLine("\\nباستخدام foreach:");
        foreach (string name in names)
        {
            Console.WriteLine(name);
        }
    }
}`
  },
  {
    name: 'دالة',
    code: `using System;

class Program
{
    static void Main()
    {
        SayHello();
        
        int result = Add(5, 3);
        Console.WriteLine("5 + 3 = " + result);
        
        Greet("أحمد");
    }
    
    static void SayHello()
    {
        Console.WriteLine("أهلاً بيك!");
    }
    
    static int Add(int a, int b)
    {
        return a + b;
    }
    
    static void Greet(string name)
    {
        Console.WriteLine("أهلاً يا " + name + "!");
    }
}`
  }
];

export function Simulator() {
  const [code, setCode] = useState(defaultCode);
  const { isRunning, output, error, runCode, clearOutput } = useCodeRunner();

  const handleRun = async () => {
    await runCode(code);
  };

  const handleReset = () => {
    setCode(defaultCode);
    clearOutput();
  };

  const loadExample = (exampleCode: string) => {
    setCode(exampleCode);
    clearOutput();
  };

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
              <Code2 className="w-8 h-8 text-purple-600" />
              محاكي الكود
            </h1>
            <p className="text-muted-foreground">
              اكتب كود C# وجربه مباشرة في المتصفح
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleReset}
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              إعادة
            </Button>
            <Button
              onClick={handleRun}
              disabled={isRunning}
              className="bg-green-600 hover:bg-green-700 text-white gap-2"
            >
              <Play className="w-4 h-4" />
              {isRunning ? 'جاري التشغيل...' : 'تشغيل'}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Examples Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  أمثلة جاهزة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {examples.map((example) => (
                    <button
                      key={example.name}
                      onClick={() => loadExample(example.code)}
                      className="w-full text-right p-3 rounded-lg border hover:bg-muted transition-colors text-sm"
                    >
                      {example.name}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">نصائح</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• استخدم Console.WriteLine() للطباعة</li>
                  <li>• المتغيرات: int, string, double, bool</li>
                  <li>• الحلقات: for, while</li>
                  <li>• الشرط: if, else if, else</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Editor */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader className="p-0">
                <Tabs defaultValue="editor" className="w-full">
                  <TabsList className="w-full justify-start rounded-none border-b bg-muted/50">
                    <TabsTrigger value="editor" className="gap-2 rounded-none">
                      <Code2 className="w-4 h-4" />
                      المحرر
                    </TabsTrigger>
                    <TabsTrigger value="output" className="gap-2 rounded-none">
                      <Terminal className="w-4 h-4" />
                      الناتج
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="editor" className="m-0">
                    <div className="relative" style={{ height: '500px' }}>
                      {/* Line Numbers */}
                      <div className="absolute left-0 top-0 bottom-0 w-10 bg-slate-900/50 border-r border-slate-800 text-right pt-4 pr-2 select-none">
                        {code.split('\n').map((_, i) => (
                          <div key={i} className="text-xs text-slate-600 leading-6">
                            {i + 1}
                          </div>
                        ))}
                      </div>

                      {/* Textarea */}
                      <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full h-full pl-12 pt-4 pr-4 font-mono text-sm bg-slate-950 text-slate-300 resize-none outline-none"
                        style={{ direction: 'ltr', textAlign: 'left' }}
                        spellCheck={false}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="output" className="m-0">
                    <div className="bg-slate-950 p-4 font-mono text-sm" style={{ height: '500px', direction: 'ltr', textAlign: 'left' }}>
                      {error ? (
                        <div className="text-red-400">
                          <div className="font-bold mb-2">خطأ:</div>
                          <pre>{error}</pre>
                        </div>
                      ) : output ? (
                        <div>
                          <div className="text-slate-500 mb-2">// ناتج التنفيذ:</div>
                          <pre className="text-green-400 whitespace-pre-wrap">{output}</pre>
                        </div>
                      ) : (
                        <div className="text-slate-600 italic">
                          اضغط "تشغيل" عشان تشوف الناتج...
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
