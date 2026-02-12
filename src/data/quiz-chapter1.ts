// ============================================================================
// CHAPTER 1 QUIZ - CLASSES AND OBJECTS
// 20 Questions - Mixed Types
// All rights reserved to Karzo Code - Owner: Eng. Kariem Tamer
// ============================================================================

import type { QuizQuestion } from './chapters';

export const chapter1Quiz: QuizQuestion[] = [
  // ============================================================================
  // MULTIPLE CHOICE QUESTIONS (MCQ)
  // ============================================================================
  {
    id: "c1-q1",
    type: "mcq",
    question: {
      en: "What is the main difference between OOP and structured programming?",
      ar: "ما هو الفرق الرئيسي بين OOP والبرمجة المنظمة؟"
    },
    options: [
      { en: "OOP uses objects and their interactions", ar: "OOP تستخدم الكائنات وتفاعلاتها" },
      { en: "OOP is faster than structured programming", ar: "OOP أسرع من البرمجة المنظمة" },
      { en: "Structured programming is newer", ar: "البرمجة المنظمة أحدث" },
      { en: "There is no difference between them", ar: "لا يوجد فرق بينهما" }
    ],
    correctAnswer: 0,
    explanation: {
      en: "OOP represents programs using objects and their interactions, while structured programming uses modules or functions.",
      ar: "OOP تمثل البرامج باستخدام الكائنات وتفاعلاتها، بينما البرمجة المنظمة تستخدم الوحدات أو الدوال."
    },
    whyCorrect: {
      en: "This is the fundamental distinction - OOP organizes code around objects (data + behavior), while structured programming organizes around functions/procedures.",
      ar: "هذا هو التمييز الأساسي - OOP تنظم الكود حول الكائنات (بيانات + سلوك)، بينما البرمجة المنظمة تنظم حول الدوال/الإجراءات."
    },
    whyOthersWrong: [
      { en: "Speed depends on implementation, not paradigm.", ar: "السرعة تعتمد على التنفيذ، ليس النموذج." },
      { en: "Structured programming is actually older.", ar: "البرمجة المنظمة في الواقع أقدم." },
      { en: "They are fundamentally different approaches.", ar: "هما نهجان مختلفان أساسياً." }
    ],
    reference: "Section 1.1 - Basic Concepts",
    difficulty: "easy"
  },
  {
    id: "c1-q2",
    type: "mcq",
    question: {
      en: "What keyword is used to create an object in C#?",
      ar: "ما هي الكلمة المفتاحية المستخدمة لإنشاء كائن في سي شارب؟"
    },
    options: [
      { en: "create", ar: "create" },
      { en: "new", ar: "new" },
      { en: "object", ar: "object" },
      { en: "instance", ar: "instance" }
    ],
    correctAnswer: 1,
    explanation: {
      en: "The 'new' keyword allocates memory and creates a new instance of a class.",
      ar: "كلمة 'new' تخصص ذاكرة وتنشئ نسخة جديدة من الكلاس."
    },
    whyCorrect: {
      en: "The 'new' keyword is the standard C# operator for object instantiation.",
      ar: "كلمة 'new' هي المشغل القياسي في سي شارب لإنشاء الكائنات."
    },
    whyOthersWrong: [
      { en: "'create' is not a C# keyword.", ar: "'create' ليست كلمة مفتاحية في سي شارب." },
      { en: "'object' is a type, not a creation keyword.", ar: "'object' هو نوع، ليس كلمة إنشاء." },
      { en: "'instance' is a concept, not a keyword.", ar: "'instance' هو مفهوم، ليس كلمة مفتاحية." }
    ],
    reference: "Section 1.3 - Creating Objects",
    difficulty: "easy"
  },
  {
    id: "c1-q3",
    type: "mcq",
    question: {
      en: "Where are reference-type variables stored?",
      ar: "أين يتم تخزين متغيرات نوع المرجع؟"
    },
    options: [
      { en: "Only in the stack", ar: "فقط في الـ stack" },
      { en: "Only in the heap", ar: "فقط في الـ heap" },
      { en: "The variable is in stack, object is in heap", ar: "المتغير في stack والكائن في heap" },
      { en: "In the CPU cache", ar: "في ذاكرة CPU المؤقتة" }
    ],
    correctAnswer: 2,
    explanation: {
      en: "The reference-type variable (containing the address) is stored in the stack, while the actual object is stored in the heap.",
      ar: "متغير نوع المرجع (يحتوي على العنوان) يُخزن في stack، بينما الكائن الفعلي يُخزن في heap."
    },
    whyCorrect: {
      en: "Reference types have two parts: the reference (address stored in stack) and the actual object (stored in heap).",
      ar: "أنواع المرجع لها جزآن: المرجع (العنوان المخزن في stack) والكائن الفعلي (المخزن في heap)."
    },
    whyOthersWrong: [
      { en: "The reference is in stack, not the whole object.", ar: "المرجع في stack، ليس الكائن كاملاً." },
      { en: "The object is in heap, but the reference variable is elsewhere.", ar: "الكائن في heap، لكن متغير المرجع في مكان آخر." },
      { en: "CPU cache is for temporary processing, not storage.", ar: "ذاكرة CPU المؤقتة للمعالجة المؤقتة، ليس للتخزين." }
    ],
    reference: "Section 1.4 - Value Types vs Reference Types",
    difficulty: "medium"
  },
  {
    id: "c1-q4",
    type: "mcq",
    question: {
      en: "What happens when you assign one reference type variable to another?",
      ar: "ماذا يحدث عندما تخصص متغير نوع مرجع لآخر؟"
    },
    options: [
      { en: "A copy of the object is created", ar: "تُنشأ نسخة من الكائن" },
      { en: "Both variables point to the same object", ar: "كلا المتغيرين يشيران إلى نفس الكائن" },
      { en: "The first object is deleted", ar: "يُحذف الكائن الأول" },
      { en: "A compilation error occurs", ar: "يحدث خطأ في الترجمة" }
    ],
    correctAnswer: 1,
    explanation: {
      en: "Assignment copies the reference (address), not the object. Both variables then point to the same object in memory.",
      ar: "التخصيص ينسخ المرجع (العنوان)، ليس الكائن. كلا المتغيرين يشيران بعد ذلك إلى نفس الكائن في الذاكرة."
    },
    whyCorrect: {
      en: "Reference assignment copies the pointer/address, making both variables reference the same memory location.",
      ar: "تخصيص المرجع ينسخ المؤشر/العنوان، مما يجعل كلا المتغيرين يشيران إلى نفس موقع الذاكرة."
    },
    whyOthersWrong: [
      { en: "That would happen with value types, not reference types.", ar: "هذا يحدث مع أنواع القيمة، ليس أنواع المرجع." },
      { en: "Objects are only deleted when no references exist (garbage collection).", ar: "الكائنات تُحذف فقط عندما لا توجد مراجع (جمع القمامة)." },
      { en: "Reference assignment is valid C# syntax.", ar: "تخصيص المرجع هو صيغة صالحة في سي شارب." }
    ],
    reference: "Section 1.4 - Reference Variables and Assignment",
    difficulty: "medium"
  },
  {
    id: "c1-q5",
    type: "mcq",
    question: {
      en: "Which of the following is a value type in C#?",
      ar: "أي مما يلي هو نوع قيمة في سي شارب؟"
    },
    options: [
      { en: "class", ar: "class" },
      { en: "array", ar: "array" },
      { en: "int", ar: "int" },
      { en: "string", ar: "string" }
    ],
    correctAnswer: 2,
    explanation: {
      en: "int is a value type. class, array, and string are reference types.",
      ar: "int هو نوع قيمة. class و array و string هي أنواع مرجع."
    },
    whyCorrect: {
      en: "int is a primitive value type stored directly on the stack.",
      ar: "int هو نوع قيمة أولي يُخزن مباشرة في stack."
    },
    whyOthersWrong: [
      { en: "class defines reference types.", ar: "class يعرف أنواع مرجع." },
      { en: "array is always a reference type.", ar: "array هو دائماً نوع مرجع." },
      { en: "string is a reference type (immutable).", ar: "string هو نوع مرجع (غير قابل للتغيير)." }
    ],
    reference: "Section 1.4 - Value Types vs Reference Types",
    difficulty: "easy"
  },

  // ============================================================================
  // OUTPUT PREDICTION QUESTIONS
  // ============================================================================
  {
    id: "c1-q6",
    type: "output-prediction",
    question: {
      en: "What is the output of this code?",
      ar: "ما هو ناتج هذا الكود؟"
    },
    code: `class Car
{
    public string color;
}

class Program
{
    static void Main()
    {
        Car a = new Car();
        Car b = new Car();
        a.color = "Red";
        b.color = "Blue";
        Console.WriteLine(a.color);
        Console.WriteLine(b.color);
    }
}`,
    options: [
      { en: "Red\nBlue", ar: "Red\nBlue" },
      { en: "Blue\nRed", ar: "Blue\nRed" },
      { en: "Red\nRed", ar: "Red\nRed" },
      { en: "Compilation error", ar: "خطأ في الترجمة" }
    ],
    correctAnswer: 0,
    explanation: {
      en: "Two separate Car objects are created. Each has its own 'color' field. a.color is 'Red', b.color is 'Blue'.",
      ar: "يُنشأ كائنان Car منفصلان. كل منهما له حقل 'color' الخاص به. a.color هو 'Red'، b.color هو 'Blue'."
    },
    whyCorrect: {
      en: "Each object instantiated with 'new' gets its own copy of instance fields.",
      ar: "كل كائن يُنشأ بـ 'new' يحصل على نسخته الخاصة من حقول المثيل."
    },
    whyOthersWrong: [
      { en: "The order is a then b, not b then a.", ar: "الترتيب هو a ثم b، ليس b ثم a." },
      { en: "Each object has its own color field.", ar: "كل كائن له حقل color الخاص به." },
      { en: "The code is valid C#.", ar: "الكود هو سي شارب صالح." }
    ],
    reference: "Section 1.3 - Creating Objects",
    difficulty: "easy"
  },
  {
    id: "c1-q7",
    type: "output-prediction",
    question: {
      en: "What is the output of this code?",
      ar: "ما هو ناتج هذا الكود؟"
    },
    code: `class Car
{
    public string color;
}

class Program
{
    static void Main()
    {
        Car a = new Car();
        Car b = a;
        a.color = "Red";
        b.color = "Blue";
        Console.WriteLine(a.color);
    }
}`,
    options: [
      { en: "Red", ar: "Red" },
      { en: "Blue", ar: "Blue" },
      { en: "null", ar: "null" },
      { en: "Compilation error", ar: "خطأ في الترجمة" }
    ],
    correctAnswer: 1,
    explanation: {
      en: "b = a makes both variables point to the same object. Changing b.color also changes a.color since they're the same object.",
      ar: "b = a يجعل كلا المتغيرين يشيران إلى نفس الكائن. تغيير b.color يغير أيضاً a.color لأنهما نفس الكائن."
    },
    whyCorrect: {
      en: "When b = a is executed, b receives a copy of the reference (address), not a copy of the object. Both point to the same Car object.",
      ar: "عندما يُنفذ b = a، يستلم b نسخة من المرجع (العنوان)، ليس نسخة من الكائن. كلاهما يشيران إلى نفس كائن Car."
    },
    whyOthersWrong: [
      { en: "a and b point to the same object, so a.color becomes Blue.", ar: "a و b يشيران إلى نفس الكائن، لذا a.color يصبح Blue." },
      { en: "The field was initialized when we set a.color = 'Red'.", ar: "الحقل تم تهيئته عندما عينا a.color = 'Red'." },
      { en: "The code compiles and runs correctly.", ar: "الكود يترجم ويعمل بشكل صحيح." }
    ],
    reference: "Section 1.4 - Reference Variables and Assignment",
    difficulty: "medium"
  },
  {
    id: "c1-q8",
    type: "output-prediction",
    question: {
      en: "What is the output of this code?",
      ar: "ما هو ناتج هذا الكود؟"
    },
    code: `class Program
{
    static void Main()
    {
        int x = 5;
        int y = x;
        y = 10;
        Console.WriteLine(x);
        Console.WriteLine(y);
    }
}`,
    options: [
      { en: "5\n10", ar: "5\n10" },
      { en: "10\n10", ar: "10\n10" },
      { en: "5\n5", ar: "5\n5" },
      { en: "10\n5", ar: "10\n5" }
    ],
    correctAnswer: 0,
    explanation: {
      en: "int is a value type. y = x creates a copy of x's value. Changing y doesn't affect x.",
      ar: "int هو نوع قيمة. y = x تنشئ نسخة من قيمة x. تغيير y لا يؤثر على x."
    },
    whyCorrect: {
      en: "Value types store the actual value. Assignment copies the value, not a reference. x and y are independent.",
      ar: "أنواع القيمة تخزن القيمة الفعلية. التخصيص ينسخ القيمة، ليس مرجعاً. x و y مستقلان."
    },
    whyOthersWrong: [
      { en: "y is a copy, not a reference to x.", ar: "y هي نسخة، ليس مرجعاً إلى x." },
      { en: "y was changed to 10, so it's not 5.", ar: "y تم تغييره إلى 10، لذا ليس 5." },
      { en: "The order is x then y, not y then x.", ar: "الترتيب هو x ثم y، ليس y ثم x." }
    ],
    reference: "Section 1.4 - Value Types vs Reference Types",
    difficulty: "easy"
  },

  // ============================================================================
  // FIND THE BUG QUESTIONS
  // ============================================================================
  {
    id: "c1-q9",
    type: "find-bug",
    question: {
      en: "Find the bug in this code:",
      ar: "أوجد الخطأ في هذا الكود:"
    },
    code: `class Car
{
    string color;
}

class Program
{
    static void Main()
    {
        Car myCar = new Car();
        myCar.color = "Red";
        Console.WriteLine(myCar.color);
    }
}`,
    options: [
      { en: "No bug - code works correctly", ar: "لا يوجد خطأ - الكود يعمل بشكل صحيح" },
      { en: "The 'color' field should be public", ar: "حقل 'color' يجب أن يكون public" },
      { en: "Missing semicolon after class declaration", ar: "فاصلة منقوطة مفقودة بعد إعلان الكلاس" },
      { en: "Car class should be public", ar: "كلاس Car يجب أن يكون public" }
    ],
    correctAnswer: 1,
    explanation: {
      en: "By default, class members are private. The color field needs 'public' modifier to be accessible from outside the class.",
      ar: "افتراضياً، أعضاء الكلاس تكون private. حقل color يحتاج معدل 'public' ليكون متاحاً من خارج الكلاس."
    },
    whyCorrect: {
      en: "Without 'public', the color field is private and cannot be accessed from the Main method. This causes a compilation error.",
      ar: "بدون 'public'، حقل color يكون private ولا يمكن الوصول إليه من دالة Main. هذا يسبب خطأ في الترجمة."
    },
    whyOthersWrong: [
      { en: "The code has an accessibility error.", ar: "الكود لديه خطأ في الوصول." },
      { en: "Semicolons are not required after class declarations.", ar: "الفواصل المنقوطة غير مطلوبة بعد إعلانات الكلاس." },
      { en: "The class itself doesn't need to be public for this example.", ar: "الكلاس نفسه لا يحتاج أن يكون public لهذا المثال." }
    ],
    reference: "Section 1.2 - Creating a Class",
    difficulty: "medium"
  },
  {
    id: "c1-q10",
    type: "find-bug",
    question: {
      en: "Find the bug in this code:",
      ar: "أوجد الخطأ في هذا الكود:"
    },
    code: `class Program
{
    static void Main()
    {
        Car myCar;
        myCar.color = "Red";
        Console.WriteLine(myCar.color);
    }
}

class Car
{
    public string color;
}`,
    options: [
      { en: "Car class should be defined before Program class", ar: "كلاس Car يجب تعريفه قبل كلاس Program" },
      { en: "myCar was never instantiated with 'new'", ar: "myCar لم يُنشأ أبداً بـ 'new'" },
      { en: "Missing semicolon after Car declaration", ar: "فاصلة منقوطة مفقودة بعد إعلان Car" },
      { en: "No bug - code works correctly", ar: "لا يوجد خطأ - الكود يعمل بشكل صحيح" }
    ],
    correctAnswer: 1,
    explanation: {
      en: "myCar is declared but never instantiated. You must use 'new Car()' to create an object before accessing its fields.",
      ar: "myCar مُعلن عنه لكن لم يُنشأ أبداً. يجب استخدام 'new Car()' لإنشاء كائن قبل الوصول إلى حقوله."
    },
    whyCorrect: {
      en: "Declaring a reference variable only creates space for the reference (address), not the actual object. Without 'new', the reference is null.",
      ar: "إعلان متغير مرجع يُنشئ فقط مساحة للمرجع (العنوان)، ليس الكائن الفعلي. بدون 'new'، المرجع يكون null."
    },
    whyOthersWrong: [
      { en: "Class order doesn't matter in C#.", ar: "ترتيب الكلاسات لا يهم في سي شارب." },
      { en: "The semicolon is present.", ar: "الفاصلة المنقوطة موجودة." },
      { en: "The code will throw a NullReferenceException or compilation error.", ar: "الكود سيرمي NullReferenceException أو خطأ في الترجمة." }
    ],
    reference: "Section 1.3 - Creating Objects",
    difficulty: "medium"
  },

  // ============================================================================
  // CODE COMPLETION QUESTIONS
  // ============================================================================
  {
    id: "c1-q11",
    type: "code-completion",
    question: {
      en: "Complete the code to create a new Person object:",
      ar: "أكمل الكود لإنشاء كائن Person جديد:"
    },
    code: `class Person
{
    public string name;
}

class Program
{
    static void Main()
    {
        Person p = ______ Person();
        p.name = "Ahmed";
    }
}`,
    options: [
      { en: "create", ar: "create" },
      { en: "new", ar: "new" },
      { en: "instance", ar: "instance" },
      { en: "object", ar: "object" }
    ],
    correctAnswer: 1,
    explanation: {
      en: "The 'new' keyword is used to instantiate (create) objects from a class.",
      ar: "كلمة 'new' تُستخدم لإنشاء (تنفيذ) كائنات من كلاس."
    },
    whyCorrect: {
      en: "The syntax 'new ClassName()' is the standard way to create objects in C#.",
      ar: "صيغة 'new ClassName()' هي الطريقة القياسية لإنشاء الكائنات في سي شارب."
    },
    whyOthersWrong: [
      { en: "'create' is not a C# keyword.", ar: "'create' ليست كلمة مفتاحية في سي شارب." },
      { en: "'instance' is a noun, not a keyword.", ar: "'instance' هو اسم، ليس كلمة مفتاحية." },
      { en: "'object' is a type, not an instantiation keyword.", ar: "'object' هو نوع، ليس كلمة إنشاء." }
    ],
    reference: "Section 1.3 - Creating Objects",
    difficulty: "easy"
  },
  {
    id: "c1-q12",
    type: "code-completion",
    question: {
      en: "Complete the code to make the 'age' field accessible from outside the class:",
      ar: "أكمل الكود لجعل حقل 'age' متاحاً من خارج الكلاس:"
    },
    code: `class Student
{
    ______ int age;
}

class Program
{
    static void Main()
    {
        Student s = new Student();
        s.age = 20;
    }
}`,
    options: [
      { en: "private", ar: "private" },
      { en: "public", ar: "public" },
      { en: "protected", ar: "protected" },
      { en: "internal", ar: "internal" }
    ],
    correctAnswer: 1,
    explanation: {
      en: "The 'public' access modifier makes members accessible from anywhere, including outside the class.",
      ar: "معدل الوصول 'public' يجعل الأعضاء متاحين من أي مكان، بما في ذلك خارج الكلاس."
    },
    whyCorrect: {
      en: "public allows unrestricted access to the member from any code that can access the class.",
      ar: "public يسمح بوصول غير مقيد للعضو من أي كود يمكنه الوصول للكلاس."
    },
    whyOthersWrong: [
      { en: "private restricts access to within the class only.", ar: "private يقيّد الوصول داخل الكلاس فقط." },
      { en: "protected allows access only within the class and derived classes.", ar: "protected يسمح بالوصول داخل الكلاس والكلاسات المشتقة فقط." },
      { en: "internal restricts access to the same assembly.", ar: "internal يقيّد الوصول لنفس الـ assembly." }
    ],
    reference: "Section 1.2 - Creating a Class",
    difficulty: "easy"
  },

  // ============================================================================
  // CONCEPT REASONING QUESTIONS
  // ============================================================================
  {
    id: "c1-q13",
    type: "concept-reasoning",
    question: {
      en: "Why does changing y.color affect x.color in this code?",
      ar: "لماذا يؤثر تغيير y.color على x.color في هذا الكود؟"
    },
    code: `Car x = new Car();
Car y = x;
y.color = "Blue";`,
    options: [
      { en: "Because Car is a value type", ar: "لأن Car هو نوع قيمة" },
      { en: "Because y = x copies the reference, not the object", ar: "لأن y = x ينسخ المرجع، ليس الكائن" },
      { en: "Because color is a static field", ar: "لأن color هو حقل ثابت" },
      { en: "Because of a compiler bug", ar: "بسبب خطأ في المترجم" }
    ],
    correctAnswer: 1,
    explanation: {
      en: "Classes are reference types. When y = x executes, y receives a copy of x's reference (address), making both variables point to the same object in memory.",
      ar: "الكلاسات هي أنواع مرجع. عندما يُنفذ y = x، يستلم y نسخة من مرجع x (العنوان)، مما يجعل كلا المتغيرين يشيران إلى نفس الكائن في الذاكرة."
    },
    whyCorrect: {
      en: "Reference types store addresses. Assignment copies the address, not the data. Both references point to the same memory location.",
      ar: "أنواع المرجع تخزن العناوين. التخصيص ينسخ العنوان، ليس البيانات. كلا المرجعين يشيران إلى نفس موقع الذاكرة."
    },
    whyOthersWrong: [
      { en: "Car is a class, which is a reference type.", ar: "Car هو كلاس، وهو نوع مرجع." },
      { en: "There's no indication that color is static.", ar: "لا يوجد مؤشر على أن color ثابت." },
      { en: "This is expected behavior, not a bug.", ar: "هذا سلوك متوقع، ليس خطأ." }
    ],
    reference: "Section 1.4 - Reference Variables and Assignment",
    difficulty: "medium"
  },
  {
    id: "c1-q14",
    type: "concept-reasoning",
    question: {
      en: "What is the main advantage of using classes and objects over simple variables?",
      ar: "ما هو الميزة الرئيسية لاستخدام الكلاسات والكائنات مقابل المتغيرات البسيطة؟"
    },
    options: [
      { en: "Classes run faster than simple variables", ar: "الكلاسات تعمل أسرع من المتغيرات البسيطة" },
      { en: "Classes allow grouping related data and behavior together", ar: "الكلاسات تسمح بتجميع البيانات والسلوك المرتبط معاً" },
      { en: "Classes use less memory", ar: "الكلاسات تستخدم ذاكرة أقل" },
      { en: "Classes are required by the C# compiler", ar: "الكلاسات مطلوبة من قبل مترجم سي شارب" }
    ],
    correctAnswer: 1,
    explanation: {
      en: "Classes enable encapsulation - bundling data (fields) and the methods that operate on that data together. This creates organized, maintainable code that models real-world entities.",
      ar: "الكلاسات تمكّن التغليف - تجميع البيانات (الحقول) والدوال التي تعمل على تلك البيانات معاً. هذا يخلق كود منظم قابل للصيانة يمثل الكيانات الواقعية."
    },
    whyCorrect: {
      en: "OOP's main benefit is organizing code around objects that combine state (data) and behavior (methods), mirroring how we think about real-world things.",
      ar: "الفائدة الرئيسية لـ OOP هي تنظيم الكود حول الكائنات التي تجمع الحالة (البيانات) والسلوك (الدوال)، مما يعكس كيفية تفكيرنا في الأشياء الواقعية."
    },
    whyOthersWrong: [
      { en: "Performance depends on usage, not inherently faster.", ar: "الأداء يعتمد على الاستخدام، ليس أسرع بطبيعته." },
      { en: "Objects typically use more memory due to overhead.", ar: "الكائنات عادةً تستخدم ذاكرة أكثر بسبب الحمل الزائد." },
      { en: "C# can be written without classes (though not typical).", ar: "يمكن كتابة سي شارب بدون كلاسات (على الرغم من أنه ليس نموذجياً)." }
    ],
    reference: "Section 1.1 - Basic Concepts",
    difficulty: "medium"
  },
  {
    id: "c1-q15",
    type: "concept-reasoning",
    question: {
      en: "In memory, where is the actual object data stored for a reference type?",
      ar: "في الذاكرة، أين يتم تخزين بيانات الكائن الفعلية لنوع المرجع؟"
    },
    options: [
      { en: "In the stack, alongside the reference variable", ar: "في stack، بجانب متغير المرجع" },
      { en: "In the heap, while the reference is stored in the stack", ar: "في heap، بينما يُخزن المرجع في stack" },
      { en: "In the CPU registers", ar: "في سجلات CPU" },
      { en: "In a special object memory area", ar: "في منطقة ذاكرة كائنات خاصة" }
    ],
    correctAnswer: 1,
    explanation: {
      en: "Reference types have two parts: (1) The reference variable stored in the stack contains the memory address, and (2) The actual object data is stored in the heap at that address.",
      ar: "أنواع المرجع لها جزآن: (1) متغير المرجع المخزن في stack يحتوي على عنوان الذاكرة، و (2) بيانات الكائن الفعلية تُخزن في heap في ذلك العنوان."
    },
    whyCorrect: {
      en: "The stack stores the reference (pointer/address), while the heap stores the actual object data. This separation allows objects to outlive method calls.",
      ar: "stack يخزن المرجع (المؤشر/العنوان)، بينما heap يخزن بيانات الكائن الفعلية. هذا الفصل يسمح للكائنات بالبقاء بعد استدعاءات الدوال."
    },
    whyOthersWrong: [
      { en: "The stack only stores the reference, not the object data.", ar: "stack يخزن فقط المرجع، ليس بيانات الكائن." },
      { en: "CPU registers are for temporary processing, not object storage.", ar: "سجلات CPU للمعالجة المؤقتة، ليس تخزين الكائنات." },
      { en: "The heap is the standard term for this memory area.", ar: "heap هو المصطلح القياسي لمنطقة الذاكرة هذه." }
    ],
    reference: "Section 1.4 - Memory Layout",
    difficulty: "hard"
  },

  // ============================================================================
  // MORE COMPLEX QUESTIONS
  // ============================================================================
  {
    id: "c1-q16",
    type: "output-prediction",
    question: {
      en: "What is the output of this code?",
      ar: "ما هو ناتج هذا الكود؟"
    },
    code: `class Counter
{
    public int count;
}

class Program
{
    static void Main()
    {
        Counter c1 = new Counter();
        Counter c2 = c1;
        c1.count = 5;
        c2.count = c2.count + 3;
        Console.WriteLine(c1.count);
    }
}`,
    options: [
      { en: "5", ar: "5" },
      { en: "8", ar: "8" },
      { en: "3", ar: "3" },
      { en: "0", ar: "0" }
    ],
    correctAnswer: 1,
    explanation: {
      en: "c1 and c2 point to the same Counter object. c1.count = 5 sets count to 5. Then c2.count = c2.count + 3 makes it 8. Since they're the same object, c1.count is also 8.",
      ar: "c1 و c2 يشيران إلى نفس كائن Counter. c1.count = 5 يضبط count على 5. ثم c2.count = c2.count + 3 يجعله 8. لأنهما نفس الكائن، c1.count هو أيضاً 8."
    },
    whyCorrect: {
      en: "c2 = c1 makes both variables reference the same object. Any change through either variable affects the shared object.",
      ar: "c2 = c1 يجعل كلا المتغيرين يشيران إلى نفس الكائن. أي تغيير من خلال أي متغير يؤثر على الكائن المشترك."
    },
    whyOthersWrong: [
      { en: "The value was updated to 8 through c2.", ar: "القيمة تم تحديثها إلى 8 من خلال c2." },
      { en: "8 is the final value, not 3.", ar: "8 هي القيمة النهائية، ليس 3." },
      { en: "The field was initialized to 5, not left at 0.", ar: "الحقل تم تهيئته إلى 5، لم يُترك عند 0." }
    ],
    reference: "Section 1.4 - Reference Variables and Assignment",
    difficulty: "hard"
  },
  {
    id: "c1-q17",
    type: "find-bug",
    question: {
      en: "Find the bug in this code:",
      ar: "أوجد الخطأ في هذا الكود:"
    },
    code: `class Program
{
    static void Main()
    {
        Car car1 = new Car();
        car1.color = "Red";
        
        Car car2 = car1;
        car2 = new Car();
        car2.color = "Blue";
        
        Console.WriteLine(car1.color);
    }
}

class Car
{
    public string color;
}`,
    options: [
      { en: "No bug - output is Blue", ar: "لا يوجد خطأ - الناتج هو Blue" },
      { en: "No bug - output is Red", ar: "لا يوجد خطأ - الناتج هو Red" },
      { en: "car2 should not be reassigned", ar: "car2 يجب ألا يُعاد تعيينه" },
      { en: "Missing 'new' for car2", ar: "'new' مفقود لـ car2" }
    ],
    correctAnswer: 1,
    explanation: {
      en: "The code is valid! car2 initially references the same object as car1, but then car2 = new Car() makes car2 point to a NEW object. Changing car2's color doesn't affect car1. Output is 'Red'.",
      ar: "الكود صالح! car2 في البداية يشير إلى نفس الكائن مثل car1، لكن ثم car2 = new Car() يجعل car2 يشير إلى كائن جديد. تغيير لون car2 لا يؤثر على car1. الناتج هو 'Red'."
    },
    whyCorrect: {
      en: "After car2 = new Car(), car2 points to a different object than car1. They are now independent objects.",
      ar: "بعد car2 = new Car()، car2 يشير إلى كائن مختلف عن car1. هما الآن كائنان مستقلان."
    },
    whyOthersWrong: [
      { en: "car1.color remains 'Red' because car2 now points to a different object.", ar: "car1.color يبقى 'Red' لأن car2 الآن يشير إلى كائن مختلف." },
      { en: "This is the correct answer.", ar: "هذا هو الإجابة الصحيحة." },
      { en: "Reassigning references is valid in C#.", ar: "إعادة تعيين المراجع صالحة في سي شارب." },
      { en: "The 'new' is present for car2.", ar: "'new' موجود لـ car2." }
    ],
    reference: "Section 1.3 - Creating Objects",
    difficulty: "hard"
  },
  {
    id: "c1-q18",
    type: "code-completion",
    question: {
      en: "Complete the code to make the fields accessible:",
      ar: "أكمل الكود لجعل الحقول متاحة:"
    },
    code: `class Employee
{
    ______ string name;
    ______ int id;
}

class Program
{
    static void Main()
    {
        Employee e = new Employee();
        e.name = "John";
        e.id = 123;
    }
}`,
    options: [
      { en: "private, private", ar: "private، private" },
      { en: "public, public", ar: "public، public" },
      { en: "public, private", ar: "public، private" },
      { en: "private, public", ar: "private، public" }
    ],
    correctAnswer: 1,
    explanation: {
      en: "Both fields need to be 'public' to be accessible from the Main method. 'private' (the default) would prevent access.",
      ar: "كلا الحقلين يحتاجان أن يكونا 'public' ليكونا متاحين من دالة Main. 'private' (الافتراضي) سيمنع الوصول."
    },
    whyCorrect: {
      en: "The code accesses both e.name and e.id from outside the class, so both fields must be public.",
      ar: "الكود يصل إلى e.name و e.id من خارج الكلاس، لذا يجب أن يكون كلا الحقلين public."
    },
    whyOthersWrong: [
      { en: "Private fields cannot be accessed from Main.", ar: "الحقول الخاصة لا يمكن الوصول إليها من Main." },
      { en: "id is also being accessed, so it needs to be public too.", ar: "id يتم الوصول إليه أيضاً، لذا يحتاج أن يكون public أيضاً." },
      { en: "name is being accessed, so it needs to be public.", ar: "name يتم الوصول إليه، لذا يحتاج أن يكون public." }
    ],
    reference: "Section 1.2 - Creating a Class",
    difficulty: "easy"
  },
  {
    id: "c1-q19",
    type: "concept-reasoning",
    question: {
      en: "Why is it important to understand the difference between value types and reference types?",
      ar: "لماذا من المهم فهم الفرق بين أنواع القيمة وأنواع المرجع؟"
    },
    options: [
      { en: "It helps write faster code", ar: "يساعد في كتابة كود أسرع" },
      { en: "It prevents bugs when passing data to methods or assigning variables", ar: "يمنع الأخطاء عند تمرير البيانات للدوال أو تعيين المتغيرات" },
      { en: "It reduces memory usage", ar: "يقلل من استخدام الذاكرة" },
      { en: "It's required for compilation", ar: "مطلوب للترجمة" }
    ],
    correctAnswer: 1,
    explanation: {
      en: "Understanding value vs reference types prevents bugs. With reference types, changes through one variable affect all references to the same object. With value types, each variable is independent.",
      ar: "فهم أنواع القيمة مقابل المرجع يمنع الأخطاء. مع أنواع المرجع، التغييرات من خلال متغير واحد تؤثر على جميع المراجع لنفس الكائن. مع أنواع القيمة، كل متغير مستقل."
    },
    whyCorrect: {
      en: "This distinction affects how data flows through your program. Not understanding it leads to unexpected side effects and bugs.",
      ar: "هذا التمييز يؤثر على كيفية تدفق البيانات عبر برنامجك. عدم فهمه يؤدي إلى آثار جانبية غير متوقعة وأخطاء."
    },
    whyOthersWrong: [
      { en: "Performance impact is usually secondary to correctness.", ar: "تأثير الأداء عادةً ثانوي للصحة." },
      { en: "Memory usage is affected but not the primary reason.", ar: "استخدام الذاكرة يتأثر لكنه ليس السبب الأساسي." },
      { en: "The compiler doesn't require you to understand this concept.", ar: "المترجم لا يتطلب منك فهم هذا المفهوم." }
    ],
    reference: "Section 1.4 - Value Types vs Reference Types",
    difficulty: "medium"
  },
  {
    id: "c1-q20",
    type: "mcq",
    question: {
      en: "Which statement about objects is TRUE?",
      ar: "أي عبارة عن الكائنات هي صحيحة؟"
    },
    options: [
      { en: "All objects of the same class share the same fields", ar: "جميع الكائنات من نفس الكلاس تشارك نفس الحقول" },
      { en: "Each object has its own copy of instance fields", ar: "كل كائن له نسخته الخاصة من حقول المثيل" },
      { en: "Objects cannot be created without the 'new' keyword", ar: "لا يمكن إنشاء الكائنات بدون كلمة 'new'" },
      { en: "Objects are always stored in the stack", ar: "الكائنات دائماً تُخزن في stack" }
    ],
    correctAnswer: 1,
    explanation: {
      en: "Each object instantiated from a class gets its own copy of instance (non-static) fields. This allows each object to have its own state.",
      ar: "كل كائن يُنشأ من كلاس يحصل على نسخته الخاصة من حقول المثيل (غير الثابتة). هذا يسمح لكل كائن بأن يكون له حالته الخاصة."
    },
    whyCorrect: {
      en: "Instance fields are per-object. Static fields are shared. This is fundamental to OOP - objects encapsulate their own state.",
      ar: "حقول المثيل هي لكل كائن. الحقول الثابتة مُشاركة. هذا أساسي لـ OOP - الكائنات تغلف حالتها الخاصة."
    },
    whyOthersWrong: [
      { en: "Only static fields are shared. Instance fields are per-object.", ar: "فقط الحقول الثابتة مُشاركة. حقول المثيل هي لكل كائن." },
      { en: "While 'new' is standard, objects can be created through other means (factories, cloning).", ar: "بينما 'new' هي القياسية، يمكن إنشاء الكائنات بطرق أخرى (مصانع، استنساخ)." },
      { en: "Objects are stored in the heap, references in the stack.", ar: "الكائنات تُخزن في heap، المراجع في stack." }
    ],
    reference: "Section 1.3 - Creating Objects",
    difficulty: "medium"
  }
];

export default chapter1Quiz;
