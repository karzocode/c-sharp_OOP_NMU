import { useState, useRef } from 'react';
import { Play, RotateCcw, Info, Layers, Box, Code2 } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ClassNode {
  id: string;
  name: string;
  attributes: string[];
  methods: string[];
  x: number;
  y: number;
  parentId?: string;
}

interface ObjectInstance {
  id: string;
  classId: string;
  name: string;
  properties: Record<string, string>;
  x: number;
  y: number;
}

const defaultClasses: ClassNode[] = [
  {
    id: 'animal',
    name: 'Animal',
    attributes: ['name: string', 'age: int'],
    methods: ['Eat()', 'Sleep()'],
    x: 300,
    y: 50
  },
  {
    id: 'dog',
    name: 'Dog',
    attributes: ['breed: string'],
    methods: ['Bark()', 'Fetch()'],
    x: 150,
    y: 250,
    parentId: 'animal'
  },
  {
    id: 'cat',
    name: 'Cat',
    attributes: ['color: string'],
    methods: ['Meow()', 'Climb()'],
    x: 450,
    y: 250,
    parentId: 'animal'
  }
];

const defaultObjects: ObjectInstance[] = [
  {
    id: 'dog1',
    classId: 'dog',
    name: 'myDog',
    properties: { name: 'Buddy', age: '3', breed: 'Golden' },
    x: 100,
    y: 450
  },
  {
    id: 'cat1',
    classId: 'cat',
    name: 'myCat',
    properties: { name: 'Whiskers', age: '2', color: 'Orange' },
    x: 400,
    y: 450
  }
];

export function OOPSimulator() {
  const [classes] = useState<ClassNode[]>(defaultClasses);
  const [objects] = useState<ObjectInstance[]>(defaultObjects);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedObject, setSelectedObject] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleAnimate = () => {
    setIsAnimating(true);
    setAnimationStep(0);
    
    const interval = setInterval(() => {
      setAnimationStep(prev => {
        if (prev >= 3) {
          clearInterval(interval);
          setIsAnimating(false);
          return 0;
        }
        return prev + 1;
      });
    }, 1500);
  };

  const handleReset = () => {
    setSelectedClass(null);
    setSelectedObject(null);
    setIsAnimating(false);
    setAnimationStep(0);
  };

  // Draw inheritance line
  const renderInheritanceLine = (from: ClassNode, to: ClassNode) => {
    const startX = from.x + 75;
    const startY = from.y + 80;
    const endX = to.x + 75;
    const endY = to.y;
    
    return (
      <svg 
        key={`line-${from.id}-${to.id}`}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#7c3aed" />
          </marker>
        </defs>
        <line
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke="#7c3aed"
          strokeWidth="2"
          strokeDasharray="5,5"
          markerEnd="url(#arrowhead)"
          className={isAnimating ? 'animate-pulse' : ''}
        />
      </svg>
    );
  };

  // Draw object instantiation line
  const renderInstantiationLine = (cls: ClassNode, obj: ObjectInstance) => {
    const startX = cls.x + 75;
    const startY = cls.y + 100;
    const endX = obj.x + 60;
    const endY = obj.y;
    
    return (
      <svg 
        key={`inst-${cls.id}-${obj.id}`}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <line
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke="#f97316"
          strokeWidth="2"
          className={isAnimating && animationStep >= 2 ? 'animate-pulse' : ''}
        />
      </svg>
    );
  };

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
              <Layers className="w-8 h-8 text-purple-600" />
              محاكي OOP
            </h1>
            <p className="text-muted-foreground">
              شوف الـ Classes والـ Objects وعلاقات الوراثة بشكل مرئي
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
              onClick={handleAnimate}
              disabled={isAnimating}
              className="bg-gradient-fajer text-white gap-2"
            >
              <Play className="w-4 h-4" />
              {isAnimating ? 'جاري...' : 'شغل الحركة'}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Visualization Canvas */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Box className="w-5 h-5" />
                  الرسم التوضيحي
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  ref={canvasRef}
                  className="relative bg-slate-50 dark:bg-slate-900 rounded-lg overflow-hidden"
                  style={{ height: '500px' }}
                >
                  {/* Inheritance Lines */}
                  {classes.map(cls => {
                    if (cls.parentId) {
                      const parent = classes.find(c => c.id === cls.parentId);
                      if (parent) {
                        return renderInheritanceLine(parent, cls);
                      }
                    }
                    return null;
                  })}

                  {/* Instantiation Lines */}
                  {objects.map(obj => {
                    const cls = classes.find(c => c.id === obj.classId);
                    if (cls) {
                      return renderInstantiationLine(cls, obj);
                    }
                    return null;
                  })}

                  {/* Classes */}
                  {classes.map((cls) => (
                    <div
                      key={cls.id}
                      onClick={() => setSelectedClass(cls.id)}
                      className={`
                        absolute w-36 p-3 rounded-lg border-2 cursor-pointer transition-all duration-300
                        ${selectedClass === cls.id 
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 shadow-lg' 
                          : 'border-purple-300 bg-white dark:bg-slate-800 hover:border-purple-400'
                        }
                        ${isAnimating && animationStep >= 1 ? 'animate-bounce' : ''}
                      `}
                      style={{ 
                        left: cls.x, 
                        top: cls.y,
                        zIndex: 10
                      }}
                    >
                      <div className="text-xs text-purple-600 font-medium mb-1">Class</div>
                      <div className="font-bold text-sm mb-2">{cls.name}</div>
                      
                      {cls.attributes.length > 0 && (
                        <div className="border-t pt-1 mb-1">
                          {cls.attributes.map((attr, i) => (
                            <div key={i} className="text-xs text-muted-foreground">
                              - {attr}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {cls.methods.length > 0 && (
                        <div className="border-t pt-1">
                          {cls.methods.map((method, i) => (
                            <div key={i} className="text-xs text-blue-600">
                              + {method}
                            </div>
                          ))}
                        </div>
                      )}

                      {cls.parentId && (
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs bg-purple-600 text-white px-2 py-0.5 rounded">
                          extends {classes.find(c => c.id === cls.parentId)?.name}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Objects */}
                  {objects.map((obj) => (
                    <div
                      key={obj.id}
                      onClick={() => setSelectedObject(obj.id)}
                      className={`
                        absolute w-28 p-3 rounded-lg border-2 cursor-pointer transition-all duration-300
                        ${selectedObject === obj.id 
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30 shadow-lg' 
                          : 'border-orange-300 bg-white dark:bg-slate-800 hover:border-orange-400'
                        }
                        ${isAnimating && animationStep >= 3 ? 'animate-pulse' : ''}
                      `}
                      style={{ 
                        left: obj.x, 
                        top: obj.y,
                        zIndex: 10
                      }}
                    >
                      <div className="text-xs text-orange-600 font-medium mb-1">Object</div>
                      <div className="font-bold text-sm mb-2">{obj.name}</div>
                      
                      <div className="border-t pt-1">
                        {Object.entries(obj.properties).map(([key, value], i) => (
                          <div key={i} className="text-xs text-muted-foreground">
                            {key}: {value}
                          </div>
                        ))}
                      </div>

                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs bg-orange-600 text-white px-2 py-0.5 rounded">
                        {classes.find(c => c.id === obj.classId)?.name}
                      </div>
                    </div>
                  ))}

                  {/* Animation Step Indicator */}
                  {isAnimating && (
                    <div className="absolute top-4 left-4 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg">
                      <div className="text-sm font-medium mb-2">خطوة {animationStep + 1} من 4</div>
                      <div className="space-y-1 text-xs">
                        <div className={animationStep >= 0 ? 'text-green-600' : 'text-muted-foreground'}>
                          ✓ تعريف الـ Classes
                        </div>
                        <div className={animationStep >= 1 ? 'text-green-600' : 'text-muted-foreground'}>
                          ✓ الوراثة (Inheritance)
                        </div>
                        <div className={animationStep >= 2 ? 'text-green-600' : 'text-muted-foreground'}>
                          ✓ إنشاء Objects
                        </div>
                        <div className={animationStep >= 3 ? 'text-green-600' : 'text-muted-foreground'}>
                          ✓ تخصيص الخصائص
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Info Panel */}
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  التفاصيل
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedClass ? (
                  <div>
                    <h3 className="font-bold text-lg text-purple-600 mb-2">
                      Class: {classes.find(c => c.id === selectedClass)?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      الـ Class هو القالب اللي بيحدد خصائص وسلوكيات الـ Objects.
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium mb-1">الخصائص (Attributes)</h4>
                        <ul className="text-sm text-muted-foreground">
                          {classes.find(c => c.id === selectedClass)?.attributes.map((attr, i) => (
                            <li key={i}>• {attr}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-1">السلوكيات (Methods)</h4>
                        <ul className="text-sm text-muted-foreground">
                          {classes.find(c => c.id === selectedClass)?.methods.map((method, i) => (
                            <li key={i}>• {method}</li>
                          ))}
                        </ul>
                      </div>

                      {classes.find(c => c.id === selectedClass)?.parentId && (
                        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <h4 className="font-medium text-purple-600 mb-1">الوراثة</h4>
                          <p className="text-sm text-muted-foreground">
                            الـ Class ده بيرث من{' '}
                            <strong>{classes.find(c => c.id === classes.find(cl => cl.id === selectedClass)?.parentId)?.name}</strong>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : selectedObject ? (
                  <div>
                    <h3 className="font-bold text-lg text-orange-600 mb-2">
                      Object: {objects.find(o => o.id === selectedObject)?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      الـ Object هو نسخة حقيقية من الـ Class مع قيم محددة.
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium mb-1">الـ Class</h4>
                        <p className="text-sm text-muted-foreground">
                          {classes.find(c => c.id === objects.find(o => o.id === selectedObject)?.classId)?.name}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-1">القيم</h4>
                        <ul className="text-sm text-muted-foreground">
                          {Object.entries(objects.find(o => o.id === selectedObject)?.properties || {}).map(([key, value], i) => (
                            <li key={i}>• {key}: {value}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                      <Code2 className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">
                      اضغط على أي Class أو Object عشان تشوف التفاصيل
                    </p>
                  </div>
                )}

                {/* OOP Concepts */}
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-medium mb-3">مفاهيم OOP</h4>
                  <div className="space-y-2">
                    <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                      <div className="font-medium text-sm text-purple-600">Class</div>
                      <div className="text-xs text-muted-foreground">القالب اللي بننشئ منه Objects</div>
                    </div>
                    <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                      <div className="font-medium text-sm text-orange-600">Object</div>
                      <div className="text-xs text-muted-foreground">نسخة حقيقية من الـ Class</div>
                    </div>
                    <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                      <div className="font-medium text-sm text-blue-600">Inheritance</div>
                      <div className="text-xs text-muted-foreground">الوراثة من Class لـ Class تاني</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
