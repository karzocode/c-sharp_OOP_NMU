// ============================================================================
// CSE015 Lecture Notes - Comprehensive Chapter Data
// All rights reserved to Karzo Code - Owner: Eng. Kariem Tamer
// ============================================================================

export interface LessonContent {
  en: string;
  ar: string;
}

export interface CodeExample {
  title: LessonContent;
  code: string;
  output?: string;
  explanation: LessonContent;
  concept?: LessonContent;
  whyItMatters?: LessonContent;
  realWorldAnalogy?: LessonContent;
  stepByStep?: LessonContent;
  commonMistakes?: LessonContent;
  bestPractices?: LessonContent;
}

export interface QuizQuestion {
  id: string;
  type: 'mcq' | 'code-completion' | 'find-bug' | 'output-prediction' | 'concept-reasoning';
  question: LessonContent;
  code?: string;
  options: LessonContent[];
  correctAnswer: number;
  explanation: LessonContent;
  whyCorrect: LessonContent;
  whyOthersWrong: LessonContent[];
  reference: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface SubSection {
  id: string;
  title: LessonContent;
  content: LessonContent;
  examples: CodeExample[];
}

export interface Chapter {
  id: number;
  title: LessonContent;
  description: LessonContent;
  image: string;
  topics: LessonContent[];
  subsections: SubSection[];
  quiz: QuizQuestion[];
  xpReward: number;
  passingScore: number;
}

// ============================================================================
// CHAPTER 1: CLASSES AND OBJECTS
// ============================================================================

const chapter1: Chapter = {
  id: 1,
  title: { en: "Classes and Objects", ar: "الكلاسات والكائنات" },
  description: {
    en: "Learn the fundamental concepts of OOP: classes as blueprints and objects as instances. Understand state, behavior, and the difference between value types and reference types.",
    ar: "تعلم المفاهيم الأساسية للبرمجة كائنية التوجه: الكلاسات كقوالب والكائنات كأمثلة. افهم الحالة، السلوك، والفرق بين أنواع القيمة والمرجع."
  },
  image: "/chapter1-classes-objects.jpg",
  topics: [
    { en: "Basic Concepts of OOP", ar: "المفاهيم الأساسية للـ OOP" },
    { en: "Creating Classes", ar: "إنشاء الكلاسات" },
    { en: "Creating Objects", ar: "إنشاء الكائنات" },
    { en: "State and Behavior", ar: "الحالة والسلوك" },
    { en: "Value-Type Variables", ar: "متغيرات نوع القيمة" },
    { en: "Reference-Type Variables", ar: "متغيرات نوع المرجع" },
    { en: "Memory Layout", ar: "تخطيط الذاكرة" },
    { en: "Reference Variables and Assignment", ar: "متغيرات المرجع والتخصيص" }
  ],
  subsections: [
    {
      id: "1.1",
      title: { en: "Basic Concepts", ar: "المفاهيم الأساسية" },
      content: {
        en: `In Object-Oriented Programming (OOP), a class is a template (or blueprint) for objects, and an object is an instance of a class.

The main difference between OOP and structured programming is that structured programming represents a program using a set of modules or functions, while OOP represents a program using a set of objects and their interactions.

An object is any entity that has:
• STATE: The set of attributes that represent the characteristics of that object (e.g., a television has size, color, model)
• BEHAVIOR: The set of operations that the object can perform (e.g., a television can show picture, change channels, tune for a channel)

In C#, attributes are represented using variables (called fields), while operations are represented using methods.`,
        ar: `في البرمجة كائنية التوجه (OOP)، الكلاس هو قالب (أو مخطط) للكائنات، والكائن هو نسخة من الكلاس.

الفرق الرئيسي بين OOP والبرمجة المنظمة هو أن البرمجة المنظمة تمثل البرنامج باستخدام مجموعة من الوحدات أو الدوال، بينما OOP تمثل البرنامج باستخدام مجموعة من الكائنات وتفاعلاتها.

الكائن هو أي كيان لديه:
• الحالة: مجموعة الخصائص التي تمثل خصائص ذلك الكائن (مثلاً، التلفزيون لديه حجم، لون، موديل)
• السلوك: مجموعة العمليات التي يمكن للكائن أن يؤديها (مثلاً، التلفزيون يمكنه عرض الصورة، تغيير القنوات، ضبط القناة)

في سي شارب، يتم تمثيل الخصائص باستخدام المتغيرات (تسمى fields)، بينما يتم تمثيل العمليات باستخدام الدوال (methods).`
      },
      examples: [
        {
          title: { en: "Understanding Objects in Real Life", ar: "فهم الكائنات في الحياة الواقعية" },
          code: `// Think of a Car as an object
// State (attributes): color, model, year, speed
// Behavior (operations): accelerate(), brake(), turn()`,
          explanation: {
            en: "A car in real life has properties (color, model) and can perform actions (accelerate, brake). In OOP, we model real-world entities as objects with state and behavior.",
            ar: "السيارة في الحياة الواقعية لديها خصائص (لون، موديل) ويمكنها أداء إجراءات (التسارع، الفرملة). في OOP، نمثل الكيانات الواقعية ككائنات لها حالة وسلوك."
          },
          concept: {
            en: "OOP models real-world entities as objects with state (data) and behavior (methods).",
            ar: "OOP تمثل الكيانات الواقعية ككائنات لها حالة (بيانات) وسلوك (دوال)."
          },
          whyItMatters: {
            en: "This makes code more intuitive, reusable, and easier to maintain by mirroring how we think about the real world.",
            ar: "هذا يجعل الكود أكثر بديهية، قابلة لإعادة الاستخدام، وأسهل في الصيانة عن طريق عكس كيفية تفكيرنا في العالم الحقيقي."
          },
          realWorldAnalogy: {
            en: "Like a blueprint (class) for building houses - one blueprint can create many houses (objects), each with its own color, size, and occupants.",
            ar: "مثل المخطط (كلاس) لبناء المنازل - مخطط واحد يمكنه إنشاء العديد من المنازل (كائنات)، كل منها بلونه وحجمه وسكانه الخاصين."
          },
          stepByStep: {
            en: "1. Identify the entity (Car)\n2. Define its attributes (color, model)\n3. Define its behaviors (accelerate, brake)\n4. Create a class template\n5. Create objects from the class",
            ar: "1. حدد الكيان (سيارة)\n2. حدد خصائصه (لون، موديل)\n3. حدد سلوكياته (تسارع، فرملة)\n4. أنشئ قالب الكلاس\n5. أنشئ كائنات من الكلاس"
          },
          commonMistakes: {
            en: "• Confusing class (blueprint) with object (instance)\n• Forgetting that each object has its own copy of fields\n• Mixing state and behavior incorrectly",
            ar: "• الخلط بين الكلاس (المخطط) والكائن (النسخة)\n• نسيان أن كل كائن له نسخته الخاصة من الحقول\n• خلط الحالة والسلوك بشكل غير صحيح"
          },
          bestPractices: {
            en: "• Use meaningful class names (nouns)\n• Keep related data and behavior together\n• Follow Single Responsibility Principle",
            ar: "• استخدم أسماء كلاس ذات معنى (أسماء)\n• احتفظ بالبيانات والسلوك المرتبط معاً\n• اتبع مبدأ المسؤولية الواحدة"
          }
        }
      ]
    },
    {
      id: "1.2",
      title: { en: "Creating a Class", ar: "إنشاء كلاس" },
      content: {
        en: `To create a class, use the class keyword followed by the class name and a pair of curly braces. Inside the class, you define fields (variables) and methods (functions).

The public keyword makes members accessible from outside the class. Without it, members are private by default.`,
        ar: `لإنشاء كلاس، استخدم كلمة class متبوعة باسم الكلاس وزوج من الأقواس المتعرجة. داخل الكلاس، تحدد الحقول (المتغيرات) والدوال (الوظائف).

كلمة public تجعل الأعضاء متاحين من خارج الكلاس. بدونها، تكون الأعضاء private افتراضياً.`
      },
      examples: [
        {
          title: { en: "Creating a Simple Car Class", ar: "إنشاء كلاس سيارة بسيط" },
          code: `class Car
{
    public string color;
    public string model;
    public int year;
}`,
          explanation: {
            en: "This creates a Car class with three public fields: color, model, and year. The 'public' keyword makes these fields accessible from outside the class.",
            ar: "هذا ينشئ كلاس Car مع ثلاثة حقول عامة: color، model، و year. كلمة 'public' تجعل هذه الحقول متاحة من خارج الكلاس."
          },
          concept: {
            en: "A class is a blueprint that defines what data (fields) and actions (methods) its objects will have.",
            ar: "الكلاس هو مخطط يحدد ما هي البيانات (الحقول) والإجراءات (الدوال) التي سيكون لها كائناته."
          },
          whyItMatters: {
            en: "Classes allow us to create reusable templates, reducing code duplication and making maintenance easier.",
            ar: "الكلاسات تسمح لنا بإنشاء قوالب قابلة لإعادة الاستخدام، مما يقلل من تكرار الكود ويجعل الصيانة أسهل."
          },
          realWorldAnalogy: {
            en: "Like a cookie cutter - one shape (class) can produce many cookies (objects) with the same structure but different decorations.",
            ar: "مثل قاطعة الكعك - شكل واحد (كلاس) يمكنه إنتاج العديد من الكعك (كائنات) بنفس الهيكل ولكن بزخارف مختلفة."
          },
          stepByStep: {
            en: "1. Use 'class' keyword\n2. Name your class (PascalCase)\n3. Add curly braces\n4. Declare fields with types\n5. Use 'public' for accessibility",
            ar: "1. استخدم كلمة 'class'\n2. سمّ كلاسك (PascalCase)\n3. أضف الأقواس المتعرجة\n4. أعلن عن الحقول بأنواعها\n5. استخدم 'public' للوصولية"
          },
          commonMistakes: {
            en: "• Forgetting the class keyword\n• Using lowercase for class names\n• Missing semicolons after field declarations\n• Forgetting public access modifier",
            ar: "• نسيان كلمة class\n• استخدام الأحرف الصغيرة لأسماء الكلاسات\n• نسيان الفواصل المنقوطة بعد إعلان الحقول\n• نسيان معدل الوصول public"
          },
          bestPractices: {
            en: "• Use PascalCase for class names (Car, BankAccount)\n• One class per file (convention)\n• Group related fields together",
            ar: "• استخدم PascalCase لأسماء الكلاسات (Car، BankAccount)\n• كلاس واحد لكل ملف (اتفاقية)\n• جمّع الحقول المرتبطة معاً"
          }
        }
      ]
    },
    {
      id: "1.3",
      title: { en: "Creating Objects", ar: "إنشاء كائنات" },
      content: {
        en: `To create an object from a class, use the 'new' keyword followed by the class name and parentheses. This is called instantiation.

Each object created from a class has its own copy of the class's fields. Modifying one object's fields does not affect other objects.`,
        ar: `لإنشاء كائن من كلاس، استخدم كلمة 'new' متبوعة باسم الكلاس والأقواس. هذا يسمى الإنشاء.

كل كائن يُنشأ من كلاس له نسخته الخاصة من حقول الكلاس. تعديل حقول كائن واحد لا يؤثر على الكائنات الأخرى.`
      },
      examples: [
        {
          title: { en: "Creating Multiple Car Objects", ar: "إنشاء كائنات سيارة متعددة" },
          code: `class Car
{
    public string color;
}

class Program
{
    static void Main()
    {
        Car x = new Car();
        Car y = new Car();
        
        x.color = "Red";
        y.color = "Blue";
        
        Console.WriteLine(x.color);  // Output: Red
        Console.WriteLine(y.color);  // Output: Blue
    }
}`,
          output: "Red\nBlue",
          explanation: {
            en: "We create two Car objects using 'new'. Each object has its own 'color' field. Changing x's color doesn't affect y's color.",
            ar: "ننشئ كائنين Car باستخدام 'new'. كل كائن له حقل 'color' الخاص به. تغيير لون x لا يؤثر على لون y."
          },
          concept: {
            en: "The 'new' keyword allocates memory and creates a new instance of the class.",
            ar: "كلمة 'new' تخصص ذاكرة وتنشئ نسخة جديدة من الكلاس."
          },
          whyItMatters: {
            en: "Objects allow us to create multiple independent instances with their own data, enabling complex programs.",
            ar: "الكائنات تسمح لنا بإنشاء نسخ مستقلة متعددة ببياناتها الخاصة، مما يمكّن البرامج المعقدة."
          },
          realWorldAnalogy: {
            en: "Like manufacturing cars from the same blueprint - each car is independent with its own color, owner, and mileage.",
            ar: "مثل تصنيع السيارات من نفس المخطط - كل سيارة مستقلة بلونها ومالكها ومسافتها المقطوعة."
          },
          stepByStep: {
            en: "1. Declare: ClassName variableName;\n2. Instantiate: variableName = new ClassName();\n3. Or combined: ClassName var = new ClassName();\n4. Access fields with dot: var.field",
            ar: "1. أعلن: ClassName variableName;\n2. أنشئ: variableName = new ClassName();\n3. أو مجتمع: ClassName var = new ClassName();\n4. الوصول للحقول بنقطة: var.field"
          },
          commonMistakes: {
            en: "• Forgetting 'new' keyword\n• Using class name instead of variable name\n• Thinking all objects share the same fields\n• NullReferenceException when using uninitialized objects",
            ar: "• نسيان كلمة 'new'\n• استخدام اسم الكلاس بدلاً من اسم المتغير\n• الاعتقاد أن جميع الكائنات تشارك نفس الحقول\n• NullReferenceException عند استخدام كائنات غير مهيأة"
          },
          bestPractices: {
            en: "• Initialize objects immediately when possible\n• Use meaningful variable names\n• Check for null before accessing object members",
            ar: "• مهيئ الكائنات فوراً عندما يكون ذلك ممكناً\n• استخدم أسماء متغيرات ذات معنى\n• تحقق من null قبل الوصول إلى أعضاء الكائن"
          }
        }
      ]
    },
    {
      id: "1.4",
      title: { en: "Value Types vs Reference Types", ar: "أنواع القيمة مقابل أنواع المرجع" },
      content: {
        en: `In C#, variables can be either value types or reference types:

VALUE TYPES (stored on stack):
- int, float, double, bool, char, struct
- Store the actual value directly
- Assignment creates a copy

REFERENCE TYPES (stored on heap):
- class, array, string, interface
- Store a reference (address) to the actual data
- Assignment copies the reference, not the data`,
        ar: `في سي شارب، المتغيرات يمكن أن تكون إما أنواع قيمة أو أنواع مرجع:

أنواع القيمة (تُخزن في stack):
- int، float، double، bool، char، struct
- تخزن القيمة الفعلية مباشرة\n- التخصيص ينشئ نسخة

أنواع المرجع (تُخزن في heap):
- class، array، string، interface
- تخزن مرجعاً (عنواناً) للبيانات الفعلية
- التخصيص ينسخ المرجع، ليس البيانات`
      },
      examples: [
        {
          title: { en: "Value Type vs Reference Type Demonstration", ar: "عرض نوع القيمة مقابل نوع المرجع" },
          code: `class Program
{
    static void Main()
    {
        // Value types
        int a = 5;
        int b = a;  // b gets a COPY of a's value
        b = 10;
        Console.WriteLine("a = " + a);  // a is still 5
        Console.WriteLine("b = " + b);  // b is 10
        
        // Reference types
        Car x = new Car();
        x.color = "Red";
        Car y = x;  // y gets a COPY of x's REFERENCE
        y.color = "Blue";
        Console.WriteLine("x.color = " + x.color);  // Blue!
        Console.WriteLine("y.color = " + y.color);  // Blue
    }
}

class Car
{
    public string color;
}`,
          output: "a = 5\nb = 10\nx.color = Blue\ny.color = Blue",
          explanation: {
            en: "Value types: b = a creates a copy. Changing b doesn't affect a.\nReference types: y = x copies the reference. Both point to the same object!",
            ar: "أنواع القيمة: b = a تنشئ نسخة. تغيير b لا يؤثر على a.\nأنواع المرجع: y = x ينسخ المرجع. كلاهما يشيران إلى نفس الكائن!"
          },
          concept: {
            en: "Value types store data directly; reference types store addresses pointing to data.",
            ar: "أنواع القيمة تخزن البيانات مباشرة؛ أنواع المرجع تخزن عناوين تشير إلى البيانات."
          },
          whyItMatters: {
            en: "Understanding this prevents bugs when passing variables to methods or assigning them to other variables.",
            ar: "فهم هذا يمنع الأخطاء عند تمرير المتغيرات للدوال أو تعيينها لمتغيرات أخرى."
          },
          realWorldAnalogy: {
            en: "Value type = photocopy of a document (changes to copy don't affect original). Reference type = two people having the same house address (both see the same house).",
            ar: "نوع القيمة = نسخة ضوئية من وثيقة (التغييرات على النسخة لا تؤثر على الأصل). نوع المرجع = شخصان لديهما نفس عنوان المنزل (كلاهما يرى نفس المنزل)."
          },
          stepByStep: {
            en: "1. Value type: variable holds the actual value\n2. Assignment: copies the value\n3. Reference type: variable holds an address\n4. Assignment: copies the address\n5. Both references point to same object",
            ar: "1. نوع القيمة: المتغير يحمل القيمة الفعلية\n2. التخصيص: ينسخ القيمة\n3. نوع المرجع: المتغير يحمل عنواناً\n4. التخصيص: ينسخ العنوان\n5. كلا المرجعين يشيران إلى نفس الكائن"
          },
          commonMistakes: {
            en: "• Expecting reference type assignment to create a copy\n• Not understanding why changes 'propagate' through references\n• Confusing when to use struct vs class",
            ar: "• توقع أن تخصيص نوع المرجع ينشئ نسخة\n• عدم فهم لماذا التغييرات 'تنتشر' عبر المراجع\n• الخلط بين متى تستخدم struct مقابل class"
          },
          bestPractices: {
            en: "• Use value types for small, immutable data\n• Use reference types for complex objects\n• Be careful when passing reference types to methods",
            ar: "• استخدم أنواع القيمة للبيانات الصغيرة غير القابلة للتغيير\n• استخدم أنواع المرجع للكائنات المعقدة\n• كن حذراً عند تمرير أنواع المرجع للدوال"
          }
        }
      ]
    }
  ],
  quiz: [], // Will be populated separately
  xpReward: 100,
  passingScore: 70
};

// ============================================================================
// CHAPTER 2: CLASS MEMBERS
// ============================================================================

const chapter2: Chapter = {
  id: 2,
  title: { en: "Class Members", ar: "أعضاء الكلاس" },
  description: {
    en: "Explore fields, methods, static members, and access modifiers. Learn encapsulation and code organization principles.",
    ar: "استكشف الحقول، الدوال، الأعضاء الثابتة، ومعدلات الوصول. تعلم مبادئ التغليف وتنظيم الكود."
  },
  image: "/chapter2-class-members.jpg",
  topics: [
    { en: "Fields", ar: "الحقول" },
    { en: "Methods", ar: "الدوال" },
    { en: "Static Methods", ar: "الدوال الثابتة" },
    { en: "Static Fields", ar: "الحقول الثابتة" },
    { en: "Static Classes", ar: "الكلاسات الثابتة" },
    { en: "Access Modifiers", ar: "معدلات الوصول" },
    { en: "Encapsulation", ar: "التغليف" }
  ],
  subsections: [
    {
      id: "2.1",
      title: { en: "Fields and Methods", ar: "الحقول والدوال" },
      content: {
        en: `Fields and methods inside classes are referred to as class members.

Fields are variables declared directly in a class. They represent the state of an object.

Methods define how an object of a class behaves. They represent the behavior of an object.

Each object gets its own copy of instance fields, but all objects share the same static fields.`,
        ar: `الحقول والدوال داخل الكلاسات تسمى أعضاء الكلاس.

الحقول هي متغيرات معلنة مباشرة في الكلاس. تمثل حالة الكائن.

الدوال تحدد كيف يتصرف كائن الكلاس. تمثل سلوك الكائن.

كل كائن يحصل على نسخته الخاصة من حقول المثيل، لكن جميع الكائنات تشارك نفس الحقول الثابتة.`
      },
      examples: [
        {
          title: { en: "Player Class with Fields and Methods", ar: "كلاس Player مع حقول ودوال" },
          code: `class Player
{
    // Fields (state)
    public string name;
    public int score;
    
    // Methods (behavior)
    public void Run()
    {
        Console.WriteLine(name + " is running.");
    }
    
    public void ScorePoints(int points)
    {
        score += points;
        Console.WriteLine(name + " scored " + points + " points!");
    }
}

class Program
{
    static void Main()
    {
        Player p1 = new Player();
        p1.name = "Salah";
        p1.Run();           // Output: Salah is running.
        p1.ScorePoints(10); // Output: Salah scored 10 points!
    }
}`,
          output: "Salah is running.\nSalah scored 10 points!",
          explanation: {
            en: "The Player class has fields (name, score) to store data and methods (Run, ScorePoints) to define behavior. Each Player object has its own name and score.",
            ar: "كلاس Player لديه حقول (name، score) لتخزين البيانات ودوال (Run، ScorePoints) لتحديد السلوك. كل كائن Player له اسمه ونقاطه الخاصة."
          },
          concept: {
            en: "Fields store data, methods perform operations. Together they define what an object IS and what it DOES.",
            ar: "الحقول تخزن البيانات، الدوال تنفذ العمليات. معاً تحددان ما هو الكائن وماذا يفعل."
          },
          whyItMatters: {
            en: "Separating data (fields) from behavior (methods) creates organized, maintainable code that models real-world entities accurately.",
            ar: "فصل البيانات (الحقول) عن السلوك (الدوال) يخلق كود منظم قابل للصيانة يمثل الكيانات الواقعية بدقة."
          },
          realWorldAnalogy: {
            en: "A bank account has data (balance, account number) and behaviors (deposit, withdraw). The data changes when behaviors are executed.",
            ar: "الحساب البنكي لديه بيانات (رصيد، رقم الحساب) وسلوكيات (إيداع، سحب). البيانات تتغير عند تنفيذ السلوكيات."
          },
          stepByStep: {
            en: "1. Identify what data the object needs (fields)\n2. Identify what actions it performs (methods)\n3. Declare fields with appropriate types\n4. Define methods that operate on those fields\n5. Create objects and call methods",
            ar: "1. حدد ما هي البيانات التي يحتاجها الكائن (الحقول)\n2. حدد ما هي الإجراءات التي يؤديها (الدوال)\n3. أعلن عن الحقول بأنواع مناسبة\n4. عرّف الدوال التي تعمل على تلك الحقول\n5. أنشئ كائنات واستدعِ الدوال"
          },
          commonMistakes: {
            en: "• Declaring fields inside methods (they become local variables)\n• Forgetting parentheses when calling methods\n• Confusing method definition with method call\n• Not using 'this' when parameter names conflict with field names",
            ar: "• إعلان الحقول داخل الدوال (تصبح متغيرات محلية)\n• نسيان الأقواس عند استدعاء الدوال\n• الخلط بين تعريف الدالة واستدعائها\n• عدم استخدام 'this' عندما تتعارض أسماء المعاملات مع أسماء الحقول"
          },
          bestPractices: {
            en: "• Use camelCase for fields (if public)\n• Use PascalCase for methods\n• Keep methods focused on a single task\n• Name methods with verbs (Get, Calculate, Display)",
            ar: "• استخدم camelCase للحقول (إذا كانت عامة)\n• استخدم PascalCase للدوال\n• حافظ على الدوال مركزة على مهمة واحدة\n• سمِّ الدوال بأفعال (Get، Calculate، Display)"
          }
        }
      ]
    },
    {
      id: "2.2",
      title: { en: "Static Members", ar: "الأعضاء الثابتة" },
      content: {
        en: `Static members belong to the class itself, not to any specific object. They can be accessed using the class name directly without creating an object.

Use static for:
- Utility methods (Math.Sqrt, Console.WriteLine)
- Constants that all objects share
- Counter variables that track all objects`,
        ar: `الأعضاء الثابتة تنتمي للكلاس نفسه، ليس لأي كائن محدد. يمكن الوصول إليها باستخدام اسم الكلاس مباشرة بدون إنشاء كائن.

استخدم static لـ:
- دوال المساعدة (Math.Sqrt، Console.WriteLine)
- الثوابت التي تشاركها جميع الكائنات
- متغيرات العداد التي تتتبع جميع الكائنات`
      },
      examples: [
        {
          title: { en: "Static Method Example - Calculator", ar: "مثال دالة ثابتة - حاسبة" },
          code: `class Calculator
{
    // Static method - belongs to the class
    public static double Add(double x, double y)
    {
        return x + y;
    }
    
    public static double Multiply(double x, double y)
    {
        return x * y;
    }
}

class Program
{
    static void Main()
    {
        // Call static methods using class name
        double sum = Calculator.Add(5, 6);
        double product = Calculator.Multiply(4, 7);
        
        Console.WriteLine("Sum: " + sum);        // Output: 11
        Console.WriteLine("Product: " + product); // Output: 28
    }
}`,
          output: "Sum: 11\nProduct: 28",
          explanation: {
            en: "Static methods are called directly using the class name. No object creation is needed. This is useful for utility functions.",
            ar: "الدوال الثابتة تُستدعى مباشرة باستخدام اسم الكلاس. لا حاجة لإنشاء كائن. هذا مفيد لدوال المساعدة."
          },
          concept: {
            en: "Static members are shared across all instances and belong to the class, not individual objects.",
            ar: "الأعضاء الثابتة تُشارك عبر جميع النسخ وتنتمي للكلاس، ليس للكائنات الفردية."
          },
          whyItMatters: {
            en: "Static members save memory (only one copy exists) and provide convenient access to utility functionality without object creation overhead.",
            ar: "الأعضاء الثابتة توفر الذاكرة (توجد نسخة واحدة فقط) وتوفّر وصولاً مريحاً لوظائف المساعدة بدون حمل إنشاء الكائن."
          },
          realWorldAnalogy: {
            en: "Like a company's customer service number - it's the same for all customers (static), while each customer has their own account number (instance).",
            ar: "مثل رقم خدمة العملاء للشركة - هو نفسه لجميع العملاء (ثابت)، بينما كل عميل لديه رقم حسابه الخاص (مثيل)."
          },
          stepByStep: {
            en: "1. Add 'static' keyword to method/field\n2. Access using ClassName.MemberName\n3. No 'new' keyword needed\n4. Static methods can only access static members directly",
            ar: "1. أضف كلمة 'static' للدالة/الحقل\n2. الوصول باستخدام ClassName.MemberName\n3. لا حاجة لكلمة 'new'\n4. الدوال الثابتة يمكنها الوصول للأعضاء الثابتة فقط مباشرة"
          },
          commonMistakes: {
            en: "• Trying to access instance members from static methods\n• Using 'this' in static methods (no instance exists)\n• Forgetting that static fields are shared (one copy for all)\n• Making everything static (defeats OOP purpose)",
            ar: "• محاولة الوصول لأعضاء المثيل من دوال ثابتة\n• استخدام 'this' في الدوال الثابتة (لا يوجد مثيل)\n• نسيان أن الحقول الثابتة مُشاركة (نسخة واحدة للجميع)\n• جعل كل شيء ثابتاً (يهزم هدف OOP)"
          },
          bestPractices: {
            en: "• Use static for stateless utility methods\n• Use static fields sparingly (shared state can cause bugs)\n• Consider thread safety for static members in multi-threaded code",
            ar: "• استخدم static لدوال المساعدة عديمة الحالة\n• استخدم الحقول الثابتة باعتدال (الحالة المشتركة يمكن أن تسبب أخطاء)\n• فكر في أمان الخيوط للأعضاء الثابتة في الكود متعدد الخيوط"
          }
        },
        {
          title: { en: "Static Field - Object Counter", ar: "حقل ثابت - عداد الكائنات" },
          code: `class Student
{
    // Static field - shared by all Student objects
    public static int studentCount = 0;
    
    // Instance field - each student has their own
    public string name;
    
    public Student(string studentName)
    {
        name = studentName;
        studentCount++;  // Increment shared counter
    }
}

class Program
{
    static void Main()
    {
        Console.WriteLine("Students: " + Student.studentCount); // 0
        
        Student s1 = new Student("Ahmed");
        Student s2 = new Student("Sara");
        Student s3 = new Student("Omar");
        
        Console.WriteLine("Students: " + Student.studentCount); // 3
        Console.WriteLine(s1.name + ", " + s2.name + ", " + s3.name);
    }
}`,
          output: "Students: 0\nStudents: 3\nAhmed, Sara, Omar",
          explanation: {
            en: "studentCount is static - all objects share it. Each constructor call increments the same counter. Instance fields (name) are separate for each object.",
            ar: "studentCount ثابت - جميع الكائنات تشاركه. كل استدعاء للمنشئ يزيد نفس العداد. حقول المثيل (name) منفصلة لكل كائن."
          },
          concept: {
            en: "Static fields maintain shared state across all instances of a class.",
            ar: "الحقول الثابتة تحافظ على حالة مشتركة عبر جميع نسخ الكلاس."
          },
          whyItMatters: {
            en: "Useful for tracking global state like counters, configuration settings, or shared resources.",
            ar: "مفيد لتتبع الحالة العامة مثل العدادات، إعدادات التكوين، أو الموارد المشتركة."
          },
          realWorldAnalogy: {
            en: "Like a population counter for a country - all citizens share the same population number, but each has their own name and ID.",
            ar: "مثل عداد السكان لدولة - جميع المواطنين يشتركون في نفس رقم السكان، لكن كل منهم له اسمه ورقم هويته."
          },
          stepByStep: {
            en: "1. Declare static field with initial value\n2. Modify it in constructor or methods\n3. Access using ClassName.fieldName\n4. Changes affect all objects",
            ar: "1. أعلن عن حقل ثابت بقيمة أولية\n2. عدّله في المنشئ أو الدوال\n3. الوصول باستخدام ClassName.fieldName\n4. التغييرات تؤثر على جميع الكائنات"
          },
          commonMistakes: {
            en: "• Forgetting to initialize static fields\n• Not understanding that all instances see the same value\n• Thread safety issues when multiple objects modify static fields concurrently",
            ar: "• نسيان تهيئة الحقول الثابتة\n• عدم فهم أن جميع النسخ ترى نفس القيمة\n• مشاكل أمان الخيوط عندما تعدّل كائنات متعددة الحقول الثابتة في نفس الوقت"
          },
          bestPractices: {
            en: "• Initialize static fields explicitly\n• Consider making static counters read-only via properties\n• Use locks for thread-safe static field modification",
            ar: "• مهيئ الحقول الثابتة صراحة\n• فكر في جعل العدادات الثابتة للقراءة فقط عبر الخصائص\n• استخدم الأقفال لتعديل الحقل الثابت بأمان الخيوط"
          }
        }
      ]
    },
    {
      id: "2.3",
      title: { en: "Access Modifiers and Encapsulation", ar: "معدلات الوصول والتغليف" },
      content: {
        en: `Access modifiers control the visibility of class members:

• public: Accessible from anywhere
• private: Accessible only within the same class (default)
• protected: Accessible within the same class and derived classes
• internal: Accessible within the same assembly

Encapsulation is the OOP principle of hiding internal data and providing controlled access through public methods. This protects data integrity and reduces coupling.`,
        ar: `معدلات الوصول تتحكم في رؤية أعضاء الكلاس:

• public: متاح من أي مكان
• private: متاح فقط داخل نفس الكلاس (افتراضي)
• protected: متاح داخل نفس الكلاس والكلاسات المشتقة
• internal: متاح داخل نفس الـ assembly

التغليف هو مبدأ OOP لإخفاء البيانات الداخلية وتوفير وصول متحكم به عبر دوال عامة. هذا يحمي سلامة البيانات ويقلل الاقتران.`
      },
      examples: [
        {
          title: { en: "Encapsulation with Private Fields", ar: "التغليف مع الحقول الخاصة" },
          code: `class BankAccount
{
    // Private field - cannot be accessed from outside
    private decimal balance;
    
    // Public method to deposit money
    public void Deposit(decimal amount)
    {
        if (amount > 0)
        {
            balance += amount;
            Console.WriteLine("Deposited: $" + amount);
        }
        else
        {
            Console.WriteLine("Invalid amount!");
        }
    }
    
    // Public method to get balance (read-only)
    public decimal GetBalance()
    {
        return balance;
    }
}

class Program
{
    static void Main()
    {
        BankAccount account = new BankAccount();
        
        // account.balance = 1000; // ERROR! Cannot access private field
        
        account.Deposit(500);        // Output: Deposited: $500
        account.Deposit(-100);       // Output: Invalid amount!
        
        Console.WriteLine("Balance: $" + account.GetBalance()); // $500
    }
}`,
          output: "Deposited: $500\nInvalid amount!\nBalance: $500",
          explanation: {
            en: "The balance field is private - it can only be modified through the Deposit method which validates the amount. This prevents invalid states.",
            ar: "حقل balance خاص - لا يمكن تعديله إلا من خلال دالة Deposit التي تتحقق من المبلغ. هذا يمنع الحالات غير الصالحة."
          },
          concept: {
            en: "Encapsulation hides implementation details and exposes only what's necessary through well-defined interfaces.",
            ar: "التغليف يخفي تفاصيل التنفيذ ويكشف فقط ما هو ضروري من خلال واجهات محددة جيداً."
          },
          whyItMatters: {
            en: "Encapsulation prevents external code from putting objects into invalid states, making code more robust and maintainable.",
            ar: "التغليف يمنع الكود الخارجي من وضع الكائنات في حالات غير صالحة، مما يجعل الكود أكثر متانة وقابلية للصيانة."
          },
          realWorldAnalogy: {
            en: "Like an ATM - you can deposit/withdraw (public methods) but cannot directly access the vault (private field). The machine validates your requests.",
            ar: "مثل الصراف الآلي - يمكنك الإيداع/السحب (دوال عامة) لكن لا يمكنك الوصول المباشر للخزنة (حقل خاص). الجهاز يتحقق من طلباتك."
          },
          stepByStep: {
            en: "1. Make fields private\n2. Create public methods to access/modify\n3. Add validation in setter methods\n4. Use properties (covered in Chapter 5) for cleaner syntax",
            ar: "1. اجعل الحقول private\n2. أنشئ دوال عامة للوصول/التعديل\n3. أضف تحقق في دوال الـ setter\n4. استخدم الخصائص (مغطى في الفصل 5) لصيغة أنظف"
          },
          commonMistakes: {
            en: "• Making all fields public (breaks encapsulation)\n• Not validating input in setter methods\n• Forgetting that private is the default access\n• Creating getter methods that return references to mutable private objects",
            ar: "• جعل جميع الحقول public (يكسر التغليف)\n• عدم التحقق من الإدخال في دوال الـ setter\n• نسيان أن private هو الوصول الافتراضي\n• إنشاء دوال getter تُرجع مراجع لكائنات خاصة قابلة للتغيير"
          },
          bestPractices: {
            en: "• Default to private fields\n• Use properties instead of getter/setter methods\n• Validate all inputs\n• Never return references to private mutable objects",
            ar: "• افترض الحقول private افتراضياً\n• استخدم الخصائص بدلاً من دوال getter/setter\n• تحقق من جميع المدخلات\n• لا تُرجع أبداً مراجع لكائنات خاصة قابلة للتغيير"
          }
        }
      ]
    }
  ],
  quiz: [],
  xpReward: 120,
  passingScore: 70
};

// Import quiz data
import chapter1Quiz from './quiz-chapter1';

// Assign quiz to chapter 1
chapter1.quiz = chapter1Quiz;

// Export all chapters
export const chapters: Chapter[] = [chapter1, chapter2];

// ============================================================================
// BADGES AND LEVELS
// ============================================================================

export const badges = [
  { 
    id: "first-steps", 
    name: { en: "First Steps", ar: "أولى الخطوات" }, 
    description: { en: "Complete your first lesson", ar: "أكمل درسك الأول" }, 
    icon: "Footprints", 
    xp: 50 
  },
  { 
    id: "code-master", 
    name: { en: "Code Master", ar: "سيد الكود" }, 
    description: { en: "Complete all 13 lessons", ar: "أكمل جميع الـ 13 درس" }, 
    icon: "Code", 
    xp: 500 
  },
  { 
    id: "quiz-champion", 
    name: { en: "Quiz Champion", ar: "بطل الاختبارات" }, 
    description: { en: "Score 100% on 5 quizzes", ar: "احصل على 100% في 5 اختبارات" }, 
    icon: "Trophy", 
    xp: 300 
  },
  { 
    id: "oop-expert", 
    name: { en: "OOP Expert", ar: "خبير OOP" }, 
    description: { en: "Complete Chapter 13", ar: "أكمل الفصل 13" }, 
    icon: "Star", 
    xp: 400 
  },
  { 
    id: "quick-learner", 
    name: { en: "Quick Learner", ar: "متعلم سريع" }, 
    description: { en: "Complete 3 lessons in one day", ar: "أكمل 3 دروس في يوم واحد" }, 
    icon: "Zap", 
    xp: 150 
  },
  { 
    id: "perfect-score", 
    name: { en: "Perfect Score", ar: "درجة كاملة" }, 
    description: { en: "Pass a quiz with 100% on first attempt", ar: "اجتز اختباراً بنسبة 100% في المحاولة الأولى" }, 
    icon: "Award", 
    xp: 200 
  }
];

export const levels = [
  { name: { en: "Beginner", ar: "مبتدئ" }, minXP: 0, maxXP: 200 },
  { name: { en: "Learner", ar: "متعلم" }, minXP: 201, maxXP: 600 },
  { name: { en: "Intermediate", ar: "متوسط" }, minXP: 601, maxXP: 1200 },
  { name: { en: "Advanced", ar: "متقدم" }, minXP: 1201, maxXP: 2000 },
  { name: { en: "Expert", ar: "خبير" }, minXP: 2001, maxXP: 3000 },
  { name: { en: "Master", ar: "محترف" }, minXP: 3001, maxXP: 999999 }
];

// ============================================================================
// BRANDING
// ============================================================================

export const branding = {
  company: "Karzo Code",
  owner: "Eng. Kariem Tamer",
  copyright: "© 2025 Karzo Code. All rights reserved.",
  tagline: {
    en: "Master C# & Object-Oriented Programming",
    ar: "اتقن سي شارب والبرمجة كائنية التوجه"
  }
};
