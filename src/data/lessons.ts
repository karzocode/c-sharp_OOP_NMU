import type { Chapter, Badge, Quiz } from '@/types';

export const chapters: Chapter[] = [
  {
    id: 'chapter-1',
    title: 'مقدمة في C#',
    description: 'هنتعرف على لغة C# وإزاي نبدأ نكتب أول كود معانا',
    image: '/images/csharp-intro.jpg',
    order: 1,
    totalXp: 300,
    lessons: [
      {
        id: 'lesson-1-1',
        title: 'إيه هي لغة C#؟',
        description: 'هنعرف إيه هي C# وإزاي بتشتغل',
        content: `
# إيه هي لغة C#؟

C# (سي شارب) هي لغة برمجة حديثة طورتها مايكروسوفت. اللغة دي بتستخدم في:
- تطبيقات الويب
- تطبيقات الموبايل
- ألعاب الفيديو (باستخدام Unity)
- تطبيقات سطح المكتب

## ليه نتعلم C#؟

1. **سهلة التعلم**: C# من أسهل لغات البرمجة للمبتدئين
2. **قوية**: تقدر تعمل بيها أي حاجة
3. **طلب عالي في السوق**: شركات كتير بتدور على مبرمجين C#
4. **مجتمع كبير**: هتلاقي مساعدة في أي وقت

## أول كود في حياتك

في C#، كل برنامج لازم يبدأ بـ "Main" method. دي النقطة اللي بيبدأ منها البرنامج:

\`\`\`csharp
using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Hello, World!");
    }
}
\`\`\`

الكود ده بيطبع "Hello, World!" على الشاشة. جربه بنفسك في المحرر!
        `,
        codeExample: `using System;

class Program
{
    static void Main()
    {
        // اكتب كودك هنا
        Console.WriteLine("Hello, World!");
        
        // جرب تغير النص اللي جوه ""
        Console.WriteLine("أنا باتعلم C#!");
    }
}`,
        expectedOutput: 'Hello, World!\nأنا باتعلم C#!',
        order: 1,
        chapterId: 'chapter-1',
        duration: 15,
        xpReward: 50,
        isLocked: false,
        prerequisites: []
      },
      {
        id: 'lesson-1-2',
        title: 'المتغيرات وأنواع البيانات',
        description: 'هنتعلم إزاي نخزن البيانات في المتغيرات',
        content: `
# المتغيرات وأنواع البيانات

المتغير (Variable) هو زي صندوق بنحط فيه بيانات. كل صندوق ليه نوع معين.

## أنواع البيانات الأساسية

| النوع | الوصف | مثال |
|-------|-------|------|
| int | أرقام صحيحة | 42, -5, 1000 |
| double | أرقام عشرية | 3.14, -0.5 |
| string | نص | "Hello", "C#" |
| bool | صح/غلط | true, false |
| char | حرف واحد | 'A', 'ب' |

## إزاي نعرف متغير؟

\`\`\`csharp
// الصيغة: نوع_المتغير اسم_المتغير = القيمة;
int age = 25;
string name = "أحمد";
double price = 99.99;
bool isActive = true;
\`\`\`

## قواعد تسمية المتغيرات

- ممكن يحتوي على حروف وأرقام وـ _
- مينفعش يبدأ برقم
- مينفعش يكون من الكلمات المحجوزة (زي int, class)
- استخدم camelCase: firstName, userAge

## جرب بنفسك

عرف متغيرات تحفظ:
- اسمك
- عمرك
- هل أنت طالب؟ (true/false)
        `,
        codeExample: `using System;

class Program
{
    static void Main()
    {
        // عرف متغيراتك هنا
        string name = "أحمد";
        int age = 20;
        bool isStudent = true;
        
        // اطبع القيم
        Console.WriteLine("الاسم: " + name);
        Console.WriteLine("العمر: " + age);
        Console.WriteLine("طالب: " + isStudent);
        
        // جرب تغير القيم وشوف النتيجة
    }
}`,
        expectedOutput: 'الاسم: أحمد\nالعمر: 20\nطالب: True',
        order: 2,
        chapterId: 'chapter-1',
        duration: 20,
        xpReward: 75,
        isLocked: true,
        prerequisites: ['lesson-1-1']
      },
      {
        id: 'lesson-1-3',
        title: 'العمليات الحسابية',
        description: 'هنتعلم نعمل حسابات على الأرقام',
        content: `
# العمليات الحسابية

C# بتديك كل العمليات الحسابية اللي محتاجها.

## العمليات الأساسية

\`\`\`csharp
int a = 10;
int b = 3;

int sum = a + b;        // 13 (الجمع)
int diff = a - b;       // 7 (الطرح)
int product = a * b;    // 30 (الضرب)
int quotient = a / b;   // 3 (القسمة - بترمي الكسر)
int remainder = a % b;  // 1 (باقي القسمة)
\`\`\`

## العمليات على الـ double

\`\`\`csharp
double x = 10.0;
double y = 3.0;

double result = x / y;  // 3.333333...
\`\`\`

## اختصارات مفيدة

\`\`\`csharp
int num = 5;

num++;      // زود 1 (بقت 6)
num--;      // نقص 1 (بقت 5)
num += 3;   // زود 3 (بقت 8)
num *= 2;   // اضرب في 2 (بقت 16)
\`\`\`

## ترتيب العمليات

C# بتتبع قواعد الرياضيات العادية:
1. الأقواس ()
2. الضرب والقسمة
3. الجمع والطرح

\`\`\`csharp
int result = 2 + 3 * 4;      // 14 (مش 20!)
int result2 = (2 + 3) * 4;   // 20
\`\`\`
        `,
        codeExample: `using System;

class Program
{
    static void Main()
    {
        // جرب العمليات الحسابية
        int num1 = 15;
        int num2 = 4;
        
        Console.WriteLine("الجمع: " + (num1 + num2));
        Console.WriteLine("الطرح: " + (num1 - num2));
        Console.WriteLine("الضرب: " + (num1 * num2));
        Console.WriteLine("القسمة: " + (num1 / num2));
        Console.WriteLine("الباقي: " + (num1 % num2));
        
        // جرب الـ double
        double decimalResult = (double)num1 / num2;
        Console.WriteLine("قسمة عشرية: " + decimalResult);
    }
}`,
        expectedOutput: 'الجمع: 19\nالطرح: 11\nالضرب: 60\nالقسمة: 3\nالباقي: 3\nقسمة عشرية: 3.75',
        order: 3,
        chapterId: 'chapter-1',
        duration: 20,
        xpReward: 75,
        isLocked: true,
        prerequisites: ['lesson-1-2']
      },
      {
        id: 'lesson-1-4',
        title: 'جمل التحكم (if-else)',
        description: 'هنتعلم نتحكم في تدفق البرنامج',
        content: `
# جمل التحكم (if-else)

أحيانا عايز البرنامج ياخد قرارات بناءً على شروط معينة.

## جملة if

\`\`\`csharp
int age = 18;

if (age >= 18)
{
    Console.WriteLine("أنت بالغ!");
}
\`\`\`

## if-else

\`\`\`csharp
int age = 16;

if (age >= 18)
{
    Console.WriteLine("أنت بالغ!");
}
else
{
    Console.WriteLine("أنت قاصر!");
}
\`\`\`

## if-else if-else

\`\`\`csharp
int score = 85;

if (score >= 90)
{
    Console.WriteLine("ممتاز!");
}
else if (score >= 80)
{
    Console.WriteLine("جيد جداً!");
}
else if (score >= 70)
{
    Console.WriteLine("جيد");
}
else
{
    Console.WriteLine("يحتاج تحسين");
}
\`\`\`

## العمليات المنطقية

| العملية | المعنى | مثال |
|---------|--------|------|
| && | و | age > 18 && age < 60 |
| \|\| | أو | day == "Saturday" \|\| day == "Sunday" |
| ! | ليس | !isClosed |

## المقارنات

| العملية | المعنى |
|---------|--------|
| == | يساوي |
| != | لا يساوي |
| > | أكبر من |
| < | أصغر من |
| >= | أكبر من أو يساوي |
| <= | أصغر من أو يساوي |
        `,
        codeExample: `using System;

class Program
{
    static void Main()
    {
        int age = 20;
        bool hasLicense = true;
        
        // جرب الشروط
        if (age >= 18 && hasLicense)
        {
            Console.WriteLine("تقدر تسوق!");
        }
        else if (age >= 18 && !hasLicense)
        {
            Console.WriteLine("محتاج ترخص أولاً!");
        }
        else
        {
            Console.WriteLine("لسه صغير على السواقة!");
        }
        
        // جرب تغير القيم وشوف النتيجة
    }
}`,
        expectedOutput: 'تقدر تسوق!',
        order: 4,
        chapterId: 'chapter-1',
        duration: 25,
        xpReward: 100,
        isLocked: true,
        prerequisites: ['lesson-1-3']
      }
    ]
  },
  {
    id: 'chapter-2',
    title: 'أساسيات البرمجة',
    description: 'هنتعمق أكتر في مفاهيم البرمجة الأساسية',
    image: '/images/programming-basics.jpg',
    order: 2,
    totalXp: 400,
    lessons: [
      {
        id: 'lesson-2-1',
        title: 'الحلقات (Loops)',
        description: 'هنتعلم نكرر الكود بذكاء',
        content: `
# الحلقات (Loops)

الحلقات بتخلينا نكرر كود أكتر من مرة من غير ما نكتبه كذا مرة.

## for loop

بتستخدم لما نعرف عدد المرات اللي عايزين نكرر فيها:

\`\`\`csharp
// اطبع الأرقام من 1 لـ 5
for (int i = 1; i <= 5; i++)
{
    Console.WriteLine(i);
}
\`\`\`

## while loop

بتستخدم لما مش عارفين عدد المرات:

\`\`\`csharp
int count = 0;

while (count < 5)
{
    Console.WriteLine("العد: " + count);
    count++;
}
\`\`\`

## do-while loop

زي while بس بيتنفذ مرة على الأقل:

\`\`\`csharp
int num = 1;

do
{
    Console.WriteLine(num);
    num++;
} while (num <= 5);
\`\`\`

## break و continue

- **break**: توقف الحلقة فوراً
- **continue**: تخطي التكرار الحالي وكمل للي بعده

\`\`\`csharp
for (int i = 1; i <= 10; i++)
{
    if (i == 5)
        continue;  // هيتخطى الـ 5
    
    if (i == 8)
        break;     // هيقف عند الـ 8
    
    Console.WriteLine(i);
}
// Output: 1, 2, 3, 4, 6, 7
\`\`\`
        `,
        codeExample: `using System;

class Program
{
    static void Main()
    {
        // جرب for loop
        Console.WriteLine("=== for loop ===");
        for (int i = 1; i <= 5; i++)
        {
            Console.WriteLine("i = " + i);
        }
        
        // جرب while loop
        Console.WriteLine("\n=== while loop ===");
        int j = 1;
        while (j <= 5)
        {
            Console.WriteLine("j = " + j);
            j++;
        }
        
        // جرب جدول الضرب
        Console.WriteLine("\n=== جدول الضرب 5 ===");
        for (int k = 1; k <= 10; k++)
        {
            Console.WriteLine("5 × " + k + " = " + (5 * k));
        }
    }
}`,
        expectedOutput: '=== for loop ===\ni = 1\ni = 2\ni = 3\ni = 4\ni = 5\n\n=== while loop ===\nj = 1\nj = 2\nj = 3\nj = 4\nj = 5\n\n=== جدول الضرب 5 ===\n5 × 1 = 5\n5 × 2 = 10\n5 × 3 = 15\n5 × 4 = 20\n5 × 5 = 25\n5 × 6 = 30\n5 × 7 = 35\n5 × 8 = 40\n5 × 9 = 45\n5 × 10 = 50',
        order: 1,
        chapterId: 'chapter-2',
        duration: 25,
        xpReward: 100,
        isLocked: true,
        prerequisites: ['lesson-1-4']
      },
      {
        id: 'lesson-2-2',
        title: 'المصفوفات (Arrays)',
        description: 'هنتعلم نخزن مجموعة من البيانات',
        content: `
# المصفوفات (Arrays)

المصفوفة هي زي رف فيه عدة أدراج، كل درج بيحتوي على قيمة.

## إنشاء مصفوفة

\`\`\`csharp
// طريقة 1
int[] numbers = new int[5];  // مصفوفة فاضية من 5 عناصر
numbers[0] = 10;
numbers[1] = 20;

// طريقة 2
int[] numbers = { 10, 20, 30, 40, 50 };

// طريقة 3
string[] names = new string[] { "أحمد", "محمد", "علي" };
\`\`\`

## الوصول للعناصر

\`\`\`csharp
int[] numbers = { 10, 20, 30, 40, 50 };

Console.WriteLine(numbers[0]);  // 10
Console.WriteLine(numbers[2]);  // 30

// تغيير قيمة
numbers[1] = 25;
\`\`\`

## خصائص المصفوفة

\`\`\`csharp
int[] numbers = { 1, 2, 3, 4, 5 };

Console.WriteLine(numbers.Length);  // 5 (عدد العناصر)
\`\`\`

## التكرار على المصفوفة

\`\`\`csharp
int[] numbers = { 10, 20, 30, 40, 50 };

// باستخدام for
for (int i = 0; i < numbers.Length; i++)
{
    Console.WriteLine(numbers[i]);
}

// باستخدام foreach
foreach (int num in numbers)
{
    Console.WriteLine(num);
}
\`\`\`

## المصفوفات متعددة الأبعاد

\`\`\`csharp
// مصفوفة ثنائية الأبعاد (مصفوفة من مصفوفات)
int[,] matrix = new int[3, 3];
matrix[0, 0] = 1;
matrix[0, 1] = 2;
\`\`\`
        `,
        codeExample: `using System;

class Program
{
    static void Main()
    {
        // عرف مصفوفة
        int[] scores = { 85, 90, 78, 92, 88 };
        
        // اطبع كل العناصر
        Console.WriteLine("الدرجات:");
        for (int i = 0; i < scores.Length; i++)
        {
            Console.WriteLine("طالب " + (i + 1) + ": " + scores[i]);
        }
        
        // احسب المجموع
        int sum = 0;
        foreach (int score in scores)
        {
            sum += score;
        }
        
        double average = (double)sum / scores.Length;
        Console.WriteLine("\nالمجموع: " + sum);
        Console.WriteLine("المتوسط: " + average);
    }
}`,
        expectedOutput: 'الدرجات:\nطالب 1: 85\nطالب 2: 90\nطالب 3: 78\nطالب 4: 92\nطالب 5: 88\n\nالمجموع: 433\nالمتوسط: 86.6',
        order: 2,
        chapterId: 'chapter-2',
        duration: 25,
        xpReward: 100,
        isLocked: true,
        prerequisites: ['lesson-2-1']
      },
      {
        id: 'lesson-2-3',
        title: 'الدوال (Methods)',
        description: 'هنتعلم نكتب كود reusable',
        content: `
# الدوال (Methods)

الدالة هي مجموعة من الأوامر بتعمل حاجة معينة. بنكتبها مرة ونستخدمها كذا مرة.

## تعريف دالة

\`\`\`csharp
// دالة بسيطة
void SayHello()
{
    Console.WriteLine("Hello!");
}

// دالة بتاخد parameters
void Greet(string name)
{
    Console.WriteLine("Hello, " + name + "!");
}

// دالة بترجع قيمة
int Add(int a, int b)
{
    return a + b;
}
\`\`\`

## استخدام الدوال

\`\`\`csharp
SayHello();                    // Output: Hello!
Greet("Ahmed");               // Output: Hello, Ahmed!
int result = Add(5, 3);       // result = 8
Console.WriteLine(result);    // Output: 8
\`\`\`

## أنواع الدوال

### 1. void - ما بترجعش حاجة
\`\`\`csharp
void PrintMessage(string msg)
{
    Console.WriteLine(msg);
}
\`\`\`

### 2. بترجع قيمة
\`\`\`csharp
int Multiply(int a, int b)
{
    return a * b;
}
\`\`\`

## Default Parameters

\`\`\`csharp
void Greet(string name = "Guest")
{
    Console.WriteLine("Hello, " + name);
}

Greet();           // Hello, Guest
Greet("Ahmed");   // Hello, Ahmed
\`\`\`

## Method Overloading

ممكن تعرف دوال بنفس الاسم بس بـ parameters مختلفة:

\`\`\`csharp
int Add(int a, int b) { return a + b; }
double Add(double a, double b) { return a + b; }
int Add(int a, int b, int c) { return a + b + c; }
\`\`\`
        `,
        codeExample: `using System;

class Program
{
    // دالة بترجع مجموع رقمين
    static int Add(int a, int b)
    {
        return a + b;
    }
    
    // دالة بتحسب المساحة
    static double CalculateArea(double width, double height)
    {
        return width * height;
    }
    
    // دالة بترجع الترحيب
    static string GetGreeting(string name)
    {
        return "أهلاً بيك، " + name + "!";
    }
    
    static void Main()
    {
        // جرب الدوال
        int sum = Add(10, 20);
        Console.WriteLine("المجموع: " + sum);
        
        double area = CalculateArea(5.5, 3.0);
        Console.WriteLine("المساحة: " + area);
        
        string greeting = GetGreeting("أحمد");
        Console.WriteLine(greeting);
    }
}`,
        expectedOutput: 'المجموع: 30\nالمساحة: 16.5\nأهلاً بيك، أحمد!',
        order: 3,
        chapterId: 'chapter-2',
        duration: 30,
        xpReward: 100,
        isLocked: true,
        prerequisites: ['lesson-2-2']
      },
      {
        id: 'lesson-2-4',
        title: 'القوائم (Lists)',
        description: 'هنتعلم نستخدم Lists الديناميكية',
        content: `
# القوائم (Lists)

الـ List زي المصفوفة بس ديناميكية - يعني ممكن تكبر وتصغر.

## إنشاء List

\`\`\`csharp
using System.Collections.Generic;

// إنشاء list فاضية
List<int> numbers = new List<int>();

// إنشاء list بقيم
List<string> names = new List<string> { "أحمد", "محمد", "علي" };
\`\`\`

## العمليات على Lists

\`\`\`csharp
List<int> numbers = new List<int>();

// إضافة عنصر
numbers.Add(10);
numbers.Add(20);
numbers.Add(30);

// إضافة في مكان معين
numbers.Insert(1, 15);  // [10, 15, 20, 30]

// حذف عنصر
numbers.Remove(20);     // بيحذر أول 20 يلاقيها
numbers.RemoveAt(0);    // بيحذر العنصر في index 0

// البحث
bool hasTen = numbers.Contains(10);  // false (اتحذف)
int index = numbers.IndexOf(15);     // 0

// عدد العناصر
int count = numbers.Count;  // 2

// مسح كل العناصر
numbers.Clear();
\`\`\`

## التكرار على List

\`\`\`csharp
List<string> names = new List<string> { "أحمد", "محمد", "علي" };

// foreach
foreach (string name in names)
{
    Console.WriteLine(name);
}

// for
for (int i = 0; i < names.Count; i++)
{
    Console.WriteLine(names[i]);
}
\`\`\`

## Methods مفيدة

\`\`\`csharp
List<int> numbers = new List<int> { 5, 2, 8, 1, 9 };

numbers.Sort();         // [1, 2, 5, 8, 9]
numbers.Reverse();      // [9, 8, 5, 2, 1]
numbers.Min();          // 1
numbers.Max();          // 9
numbers.Sum();          // 25
numbers.Average();      // 5.0
\`\`\`
        `,
        codeExample: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        List<int> scores = new List<int>();
        
        // أضف درجات
        scores.Add(85);
        scores.Add(92);
        scores.Add(78);
        scores.Add(95);
        scores.Add(88);
        
        Console.WriteLine("عدد الطلاب: " + scores.Count);
        Console.WriteLine("أعلى درجة: " + scores.Max());
        Console.WriteLine("أقل درجة: " + scores.Min());
        Console.WriteLine("المتوسط: " + scores.Average());
        
        // رتب الدرجات
        scores.Sort();
        Console.WriteLine("\nالدرجات مرتبة:");
        foreach (int score in scores)
        {
            Console.Write(score + " ");
        }
    }
}`,
        expectedOutput: 'عدد الطلاب: 5\nأعلى درجة: 95\nأقل درجة: 78\nالمتوسط: 87.6\n\nالدرجات مرتبة:\n78 85 88 92 95',
        order: 4,
        chapterId: 'chapter-2',
        duration: 30,
        xpReward: 100,
        isLocked: true,
        prerequisites: ['lesson-2-3']
      }
    ]
  },
  {
    id: 'chapter-3',
    title: 'مفاهيم OOP',
    description: 'هنتعلم البرمجة الكائنية التوجه بالتفصيل',
    image: '/images/oop-concepts.jpg',
    order: 3,
    totalXp: 500,
    lessons: [
      {
        id: 'lesson-3-1',
        title: 'الـ Classes والـ Objects',
        description: 'أساس الـ OOP - هنعرف إيه هي الكلاسات والأوبجكتس',
        content: `
# الـ Classes والـ Objects

الـ Class هو القالب (Blueprint) والـ Object هو الشيء اللي بنبنيه من القالب.

## مثال من الحياة

تخيل إن الـ Class هو "خطة البيت" والـ Object هو "البيت نفسه".

## تعريف Class

\`\`\`csharp
public class Person
{
    // Attributes (خصائص)
    public string Name;
    public int Age;
    
    // Methods (سلوكيات)
    public void Introduce()
    {
        Console.WriteLine("أنا " + Name + " وعمري " + Age);
    }
}
\`\`\`

## إنشاء Object

\`\`\`csharp
// إنش object من class Person
Person person1 = new Person();

// تعيين القيم
person1.Name = "أحمد";
person1.Age = 25;

// استدعاء method
person1.Introduce();  // Output: أنا أحمد وعمري 25

// إنش object تاني
Person person2 = new Person();
person2.Name = "محمد";
person2.Age = 30;
person2.Introduce();
\`\`\`

## Constructor

الـ Constructor هو method بيتنفذ لما ننشئ object:

\`\`\`csharp
public class Person
{
    public string Name;
    public int Age;
    
    // Constructor
    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }
}

// استخدامه
Person p = new Person("أحمد", 25);
\`\`\`

## this Keyword

\`\`\`csharp
public Person(string name, int age)
{
    this.Name = name;  // this.Name = الـ attribute, name = الـ parameter
    this.Age = age;
}
\`\`\`
        `,
        codeExample: `using System;

public class Car
{
    // الخصائص
    public string Brand;
    public string Model;
    public int Year;
    
    // Constructor
    public Car(string brand, string model, int year)
    {
        Brand = brand;
        Model = model;
        Year = year;
    }
    
    // Method
    public void DisplayInfo()
    {
        Console.WriteLine(Brand + " " + Model + " (" + Year + ")");
    }
}

class Program
{
    static void Main()
    {
        // إنشاء objects
        Car car1 = new Car("تويوتا", "كورولا", 2023);
        Car car2 = new Car("هوندا", "سيفيك", 2022);
        
        // استدعاء methods
        Console.WriteLine("العربية الأولى:");
        car1.DisplayInfo();
        
        Console.WriteLine("\nالعربية التانية:");
        car2.DisplayInfo();
    }
}`,
        expectedOutput: 'العربية الأولى:\nتويوتا كورولا (2023)\n\nالعربية التانية:\nهوندا سيفيك (2022)',
        order: 1,
        chapterId: 'chapter-3',
        duration: 30,
        xpReward: 125,
        isLocked: true,
        prerequisites: ['lesson-2-4']
      },
      {
        id: 'lesson-3-2',
        title: 'الـ Encapsulation',
        description: 'حماية البيانات باستخدام Access Modifiers',
        content: `
# الـ Encapsulation (التغليف)

التغليف يعني نخفي تفاصيل التنفيذ ونوفر واجهة آمنة للتعامل مع البيانات.

## Access Modifiers

| Modifier | الوصف |
|----------|--------|
| public | متاح من أي مكان |
| private | متاح بس جوه الـ class |
| protected | متاح للـ class والـ classes اللي بترث منه |
| internal | متاح في نفس الـ project |

## Properties

بدل ما نخلي الـ attributes public، نخليها private ونعمل ليها properties:

\`\`\`csharp
public class Person
{
    private string name;  // private
    private int age;
    
    // Property للـ name
    public string Name
    {
        get { return name; }
        set { name = value; }
    }
    
    // Property للـ age مع validation
    public int Age
    {
        get { return age; }
        set 
        { 
            if (value >= 0 && value <= 150)
                age = value;
            else
                Console.WriteLine("عمر غير صالح!");
        }
    }
}
\`\`\`

## Auto-Implemented Properties

\`\`\`csharp
public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
}
\`\`\`

## Read-Only Property

\`\`\`csharp
public class Circle
{
    public double Radius { get; set; }
    
    // Read-only property
    public double Area 
    { 
        get { return Math.PI * Radius * Radius; }
    }
}
\`\`\`

## مثال كامل

\`\`\`csharp
public class BankAccount
{
    private decimal balance;  // محدش يقدر يوصله مباشرة
    
    public decimal Balance
    {
        get { return balance; }
    }
    
    public void Deposit(decimal amount)
    {
        if (amount > 0)
            balance += amount;
    }
    
    public void Withdraw(decimal amount)
    {
        if (amount > 0 && amount <= balance)
            balance -= amount;
    }
}
\`\`\`
        `,
        codeExample: `using System;

public class BankAccount
{
    private decimal balance;
    private string accountNumber;
    
    public string AccountNumber 
    { 
        get { return accountNumber; }
    }
    
    public decimal Balance 
    { 
        get { return balance; }
    }
    
    public BankAccount(string accNum, decimal initialBalance)
    {
        accountNumber = accNum;
        balance = initialBalance;
    }
    
    public void Deposit(decimal amount)
    {
        if (amount > 0)
        {
            balance += amount;
            Console.WriteLine("تم إيداع: " + amount);
        }
    }
    
    public void Withdraw(decimal amount)
    {
        if (amount > 0 && amount <= balance)
        {
            balance -= amount;
            Console.WriteLine("تم سحب: " + amount);
        }
        else
        {
            Console.WriteLine("رصيد غير كافي!");
        }
    }
}

class Program
{
    static void Main()
    {
        BankAccount account = new BankAccount("123456", 1000);
        
        Console.WriteLine("رقم الحساب: " + account.AccountNumber);
        Console.WriteLine("الرصيد: " + account.Balance);
        
        account.Deposit(500);
        Console.WriteLine("الرصيد بعد الإيداع: " + account.Balance);
        
        account.Withdraw(200);
        Console.WriteLine("الرصيد بعد السحب: " + account.Balance);
    }
}`,
        expectedOutput: 'رقم الحساب: 123456\nالرصيد: 1000\nتم إيداع: 500\nالرصيد بعد الإيداع: 1500\nتم سحب: 200\nالرصيد بعد السحب: 1300',
        order: 2,
        chapterId: 'chapter-3',
        duration: 35,
        xpReward: 125,
        isLocked: true,
        prerequisites: ['lesson-3-1']
      },
      {
        id: 'lesson-3-3',
        title: 'الـ Inheritance',
        description: 'هنتعلم الوراثة بين الكلاسات',
        content: `
# الـ Inheritance (الوراثة)

الوراثة بتخلينا نعمل class جديد يورث من class قديم.

## الصيغة

\`\`\`csharp
public class BaseClass
{
    // خصائص وmethods
}

public class DerivedClass : BaseClass
{
    // بيرث كل حاجة من BaseClass
    // وممكن يضيف حاجات جديدة
}
\`\`\`

## مثال

\`\`\`csharp
public class Animal
{
    public string Name { get; set; }
    
    public void Eat()
    {
        Console.WriteLine(Name + " بياكل");
    }
}

public class Dog : Animal
{
    public void Bark()
    {
        Console.WriteLine(Name + " بينبح: ووف ووف!");
    }
}

// استخدام
Dog dog = new Dog();
dog.Name = "كلبي";
dog.Eat();    // موروث من Animal
dog.Bark();   // خاص بـ Dog
\`\`\`

## base Keyword

\`\`\`csharp
public class Animal
{
    public string Name { get; set; }
    
    public Animal(string name)
    {
        Name = name;
    }
}

public class Dog : Animal
{
    public string Breed { get; set; }
    
    public Dog(string name, string breed) : base(name)
    {
        Breed = breed;
    }
}
\`\`\`

## Method Overriding

\`\`\`csharp
public class Animal
{
    public virtual void MakeSound()
    {
        Console.WriteLine("صوت حيوان");
    }
}

public class Dog : Animal
{
    public override void MakeSound()
    {
        Console.WriteLine("ووف ووف!");
    }
}

public class Cat : Animal
{
    public override void MakeSound()
    {
        Console.WriteLine("مياو!");
    }
}
\`\`\`

## sealed Class

ممكن نمنع الوراثة من class باستخدام sealed:

\`\`\`csharp
public sealed class FinalClass
{
    // محدش يقدر يرث منه
}
\`\`\`
        `,
        codeExample: `using System;

public class Employee
{
    public string Name { get; set; }
    public decimal Salary { get; set; }
    
    public Employee(string name, decimal salary)
    {
        Name = name;
        Salary = salary;
    }
    
    public virtual void DisplayInfo()
    {
        Console.WriteLine("الموظف: " + Name);
        Console.WriteLine("الراتب: " + Salary);
    }
}

public class Manager : Employee
{
    public string Department { get; set; }
    
    public Manager(string name, decimal salary, string dept) 
        : base(name, salary)
    {
        Department = dept;
    }
    
    public override void DisplayInfo()
    {
        base.DisplayInfo();
        Console.WriteLine("القسم: " + Department);
        Console.WriteLine("المنصب: مدير");
    }
}

class Program
{
    static void Main()
    {
        Employee emp = new Employee("أحمد", 5000);
        Manager mgr = new Manager("محمد", 10000, "IT");
        
        Console.WriteLine("=== موظف عادي ===");
        emp.DisplayInfo();
        
        Console.WriteLine("\n=== مدير ===");
        mgr.DisplayInfo();
    }
}`,
        expectedOutput: '=== موظف عادي ===\nالموظف: أحمد\nالراتب: 5000\n\n=== مدير ===\nالموظف: محمد\nالراتب: 10000\nالقسم: IT\nالمنصب: مدير',
        order: 3,
        chapterId: 'chapter-3',
        duration: 35,
        xpReward: 125,
        isLocked: true,
        prerequisites: ['lesson-3-2']
      },
      {
        id: 'lesson-3-4',
        title: 'الـ Polymorphism',
        description: 'تعدد الأشكال في الـ OOP',
        content: `
# الـ Polymorphism (تعدد الأشكال)

Polymorphism يعني إن نفس الـ method ممكن تتصرف بطرق مختلفة حسب الـ object.

## نوعين من Polymorphism

### 1. Compile-time (Method Overloading)

نفس الاسم، parameters مختلفة:

\`\`\`csharp
public class Calculator
{
    public int Add(int a, int b)
    {
        return a + b;
    }
    
    public double Add(double a, double b)
    {
        return a + b;
    }
    
    public int Add(int a, int b, int c)
    {
        return a + b + c;
    }
}

// استخدام
Calculator calc = new Calculator();
calc.Add(5, 3);        // int
calc.Add(5.5, 3.2);   // double
calc.Add(1, 2, 3);    // 3 parameters
\`\`\`

### 2. Runtime (Method Overriding)

الـ method بتتنفذ حسب نوع الـ object الفعلي:

\`\`\`csharp
public class Animal
{
    public virtual void MakeSound()
    {
        Console.WriteLine("صوت حيوان");
    }
}

public class Dog : Animal
{
    public override void MakeSound()
    {
        Console.WriteLine("ووف ووف!");
    }
}

public class Cat : Animal
{
    public override void MakeSound()
    {
        Console.WriteLine("مياو!");
    }
}

// استخدام
Animal myAnimal;

myAnimal = new Dog();
myAnimal.MakeSound();  // ووف ووف!

myAnimal = new Cat();
myAnimal.MakeSound();  // مياو!
\`\`\`

## Polymorphism with Arrays/Lists

\`\`\`csharp
List<Animal> animals = new List<Animal>
{
    new Dog(),
    new Cat(),
    new Dog()
};

foreach (Animal animal in animals)
{
    animal.MakeSound();  // كل واحد هينادي الـ method بتاعته
}
\`\`\`

## abstract Classes

\`\`\`csharp
public abstract class Shape
{
    public abstract double GetArea();  // لازم كل class ينفذه
    
    public void Display()
    {
        Console.WriteLine("المساحة: " + GetArea());
    }
}

public class Circle : Shape
{
    public double Radius { get; set; }
    
    public override double GetArea()
    {
        return Math.PI * Radius * Radius;
    }
}
\`\`\`
        `,
        codeExample: `using System;
using System.Collections.Generic;

public abstract class Shape
{
    public string Name { get; set; }
    
    public abstract double GetArea();
    
    public void DisplayInfo()
    {
        Console.WriteLine(Name + " - المساحة: " + GetArea());
    }
}

public class Circle : Shape
{
    public double Radius { get; set; }
    
    public Circle(double radius)
    {
        Name = "دائرة";
        Radius = radius;
    }
    
    public override double GetArea()
    {
        return Math.PI * Radius * Radius;
    }
}

public class Rectangle : Shape
{
    public double Width { get; set; }
    public double Height { get; set; }
    
    public Rectangle(double width, double height)
    {
        Name = "مستطيل";
        Width = width;
        Height = height;
    }
    
    public override double GetArea()
    {
        return Width * Height;
    }
}

class Program
{
    static void Main()
    {
        List<Shape> shapes = new List<Shape>
        {
            new Circle(5),
            new Rectangle(4, 6),
            new Circle(3)
        };
        
        Console.WriteLine("=== الأشكال ===");
        foreach (Shape shape in shapes)
        {
            shape.DisplayInfo();
        }
    }
}`,
        expectedOutput: '=== الأشكال ===\nدائرة - المساحة: 78.5398163397448\nمستطيل - المساحة: 24\nدائرة - المساحة: 28.2743338823081',
        order: 4,
        chapterId: 'chapter-3',
        duration: 40,
        xpReward: 125,
        isLocked: true,
        prerequisites: ['lesson-3-3']
      }
    ]
  },
  {
    id: 'chapter-4',
    title: 'مشاريع عملية',
    description: 'هنطبق اللي اتعلمناه في مشاريع حقيقية',
    image: '/images/projects.jpg',
    order: 4,
    totalXp: 600,
    lessons: [
      {
        id: 'lesson-4-1',
        title: 'نظام إدارة المكتبة',
        description: 'هنبني نظام كامل لإدارة مكتبة',
        content: `
# مشروع نظام إدارة المكتبة

هنبني نظام كامل لإدارة مكتبة باستخدام OOP.

## المتطلبات

- إضافة كتب
- إضافة أعضاء
- استعارة وإرجاع كتب
- عرض الكتب المتاحة

## الكلاسات

### Book Class

\`\`\`csharp
public class Book
{
    public string ISBN { get; set; }
    public string Title { get; set; }
    public string Author { get; set; }
    public bool IsAvailable { get; set; } = true;
    
    public Book(string isbn, string title, string author)
    {
        ISBN = isbn;
        Title = title;
        Author = author;
    }
}
\`\`\`

### Member Class

\`\`\`csharp
public class Member
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<Book> BorrowedBooks { get; set; } = new List<Book>();
    
    public Member(int id, string name)
    {
        Id = id;
        Name = name;
    }
}
\`\`\`

### Library Class

\`\`\`csharp
public class Library
{
    private List<Book> books = new List<Book>();
    private List<Member> members = new List<Member>();
    
    public void AddBook(Book book)
    {
        books.Add(book);
    }
    
    public void AddMember(Member member)
    {
        members.Add(member);
    }
    
    public bool BorrowBook(string isbn, int memberId)
    {
        Book book = books.Find(b => b.ISBN == isbn && b.IsAvailable);
        Member member = members.Find(m => m.Id == memberId);
        
        if (book != null && member != null)
        {
            book.IsAvailable = false;
            member.BorrowedBooks.Add(book);
            return true;
        }
        return false;
    }
}
\`\`\`

## جرب بنفسك

اكمل الكود في المحرر وجرّب:
- إضافة كتب
- إضافة أعضاء
- استعارة كتب
        `,
        codeExample: `using System;
using System.Collections.Generic;

public class Book
{
    public string ISBN { get; set; }
    public string Title { get; set; }
    public string Author { get; set; }
    public bool IsAvailable { get; set; } = true;
    
    public Book(string isbn, string title, string author)
    {
        ISBN = isbn;
        Title = title;
        Author = author;
    }
}

public class Library
{
    private List<Book> books = new List<Book>();
    
    public void AddBook(Book book)
    {
        books.Add(book);
        Console.WriteLine("تم إضافة: " + book.Title);
    }
    
    public void DisplayBooks()
    {
        Console.WriteLine("\n=== الكتب في المكتبة ===");
        foreach (Book book in books)
        {
            string status = book.IsAvailable ? "متاح" : "مُعار";
            Console.WriteLine(book.Title + " - " + book.Author + " (" + status + ")");
        }
    }
}

class Program
{
    static void Main()
    {
        Library library = new Library();
        
        // أضف كتب
        library.AddBook(new Book("001", "C# Basics", "John Doe"));
        library.AddBook(new Book("002", "OOP Guide", "Jane Smith"));
        library.AddBook(new Book("003", "Advanced C#", "Bob Johnson"));
        
        // اعرض الكتب
        library.DisplayBooks();
    }
}`,
        expectedOutput: 'تم إضافة: C# Basics\nتم إضافة: OOP Guide\nتم إضافة: Advanced C#\n\n=== الكتب في المكتبة ===\nC# Basics - John Doe (متاح)\nOOP Guide - Jane Smith (متاح)\nAdvanced C# - Bob Johnson (متاح)',
        order: 1,
        chapterId: 'chapter-4',
        duration: 45,
        xpReward: 150,
        isLocked: true,
        prerequisites: ['lesson-3-4']
      },
      {
        id: 'lesson-4-2',
        title: 'لعبة بسيطة',
        description: 'هنبني لعبة باستخدام OOP',
        content: `
# مشروع لعبة بسيطة

هنبني لعبة RPG بسيطة باستخدام OOP.

## الكلاسات

### Character (Base Class)

\`\`\`csharp
public abstract class Character
{
    public string Name { get; set; }
    public int Health { get; set; }
    public int AttackPower { get; set; }
    
    public Character(string name, int health, int attack)
    {
        Name = name;
        Health = health;
        AttackPower = attack;
    }
    
    public virtual void Attack(Character target)
    {
        target.Health -= AttackPower;
        Console.WriteLine(Name + " هاجم " + target.Name + " بـ " + AttackPower + " ضرر!");
    }
    
    public bool IsAlive()
    {
        return Health > 0;
    }
}
\`\`\`

### Warrior

\`\`\`csharp
public class Warrior : Character
{
    public Warrior(string name) : base(name, 100, 20) { }
    
    public override void Attack(Character target)
    {
        // Warrior بيعمل ضرر أكتر
        int damage = AttackPower + 5;
        target.Health -= damage;
        Console.WriteLine(Name + " (محارب) هاجم بقوة " + damage + "!");
    }
}
\`\`\`

### Mage

\`\`\`csharp
public class Mage : Character
{
    public int Mana { get; set; } = 100;
    
    public Mage(string name) : base(name, 70, 30) { }
    
    public void CastSpell(Character target)
    {
        if (Mana >= 20)
        {
            int spellDamage = AttackPower * 2;
            target.Health -= spellDamage;
            Mana -= 20;
            Console.WriteLine(Name + " (ساحر) ألقى تعويذة بـ " + spellDamage + " ضرر!");
        }
    }
}
\`\`\`

## جرب بنفسك

اكمل الكود وجرّب:
- أنشئ شخصيات
- خليها تحارب بعض
- شوف مين هيكسب!
        `,
        codeExample: `using System;

public class Character
{
    public string Name { get; set; }
    public int Health { get; set; }
    public int AttackPower { get; set; }
    
    public Character(string name, int health, int attack)
    {
        Name = name;
        Health = health;
        AttackPower = attack;
    }
    
    public void Attack(Character target)
    {
        target.Health -= AttackPower;
        Console.WriteLine(Name + " هاجم " + target.Name + "!");
        Console.WriteLine(target.Name + " صحته: " + target.Health);
    }
    
    public bool IsAlive()
    {
        return Health > 0;
    }
}

class Program
{
    static void Main()
    {
        Character hero = new Character("البطل", 100, 25);
        Character monster = new Character("الوحش", 80, 15);
        
        Console.WriteLine("=== بداية المعركة! ===\n");
        
        int round = 1;
        while (hero.IsAlive() && monster.IsAlive())
        {
            Console.WriteLine("--- الجولة " + round + " ---");
            hero.Attack(monster);
            
            if (monster.IsAlive())
            {
                monster.Attack(hero);
            }
            
            Console.WriteLine();
            round++;
        }
        
        if (hero.IsAlive())
            Console.WriteLine("🎉 البطل كسب!");
        else
            Console.WriteLine("💀 الوحش كسب!");
    }
}`,
        expectedOutput: '=== بداية المعركة! ===\n\n--- الجولة 1 ---\nالبطل هاجم الوحش!\nالوحش صحته: 55\nالوحش هاجم البطل!\nالبطل صحته: 85\n\n--- الجولة 2 ---\nالبطل هاجم الوحش!\nالوحش صحته: 30\nالوحش هاجم البطل!\nالبطل صحته: 70\n\n--- الجولة 3 ---\nالبطل هاجم الوحش!\nالوحش صحته: 5\nالوحش هاجم البطل!\nالبطل صحته: 55\n\n--- الجولة 4 ---\nالبطل هاجم الوحش!\nالوحش صحته: -20\n\n🎉 البطل كسب!',
        order: 2,
        chapterId: 'chapter-4',
        duration: 50,
        xpReward: 150,
        isLocked: true,
        prerequisites: ['lesson-4-1']
      },
      {
        id: 'lesson-4-3',
        title: 'نظام الطلبات',
        description: 'نظام إدارة طلبات متكامل',
        content: `
# مشروع نظام الطلبات

هنبني نظام لإدارة طلبات المتجر.

## الكلاسات

### Product

\`\`\`csharp
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public int Stock { get; set; }
    
    public Product(int id, string name, decimal price, int stock)
    {
        Id = id;
        Name = name;
        Price = price;
        Stock = stock;
    }
}
\`\`\`

### OrderItem

\`\`\`csharp
public class OrderItem
{
    public Product Product { get; set; }
    public int Quantity { get; set; }
    
    public decimal TotalPrice => Product.Price * Quantity;
}
\`\`\`

### Order

\`\`\`csharp
public class Order
{
    public int OrderId { get; set; }
    public List<OrderItem> Items { get; set; } = new List<OrderItem>();
    public DateTime OrderDate { get; set; } = DateTime.Now;
    
    public decimal TotalAmount
    {
        get { return Items.Sum(i => i.TotalPrice); }
    }
    
    public void AddItem(Product product, int quantity)
    {
        if (product.Stock >= quantity)
        {
            Items.Add(new OrderItem { Product = product, Quantity = quantity });
            product.Stock -= quantity;
        }
    }
}
\`\`\`

## جرب بنفسك

اكمل الكود وجرّب:
- أضف منتجات
- اعمل طلبات
- احسب الإجمالي
        `,
        codeExample: `using System;
using System.Collections.Generic;
using System.Linq;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public int Stock { get; set; }
    
    public Product(int id, string name, decimal price, int stock)
    {
        Id = id;
        Name = name;
        Price = price;
        Stock = stock;
    }
}

public class Order
{
    public List<Product> Items { get; set; } = new List<Product>();
    
    public void AddProduct(Product product)
    {
        if (product.Stock > 0)
        {
            Items.Add(product);
            product.Stock--;
            Console.WriteLine("تم إضافة: " + product.Name);
        }
        else
        {
            Console.WriteLine("نفذ من المخزن: " + product.Name);
        }
    }
    
    public decimal GetTotal()
    {
        return Items.Sum(p => p.Price);
    }
    
    public void DisplayOrder()
    {
        Console.WriteLine("\n=== تفاصيل الطلب ===");
        foreach (var item in Items)
        {
            Console.WriteLine(item.Name + " - " + item.Price + " جنيه");
        }
        Console.WriteLine("الإجمالي: " + GetTotal() + " جنيه");
    }
}

class Program
{
    static void Main()
    {
        // منتجات
        Product laptop = new Product(1, "لابتوب", 15000, 5);
        Product mouse = new Product(2, "ماوس", 200, 10);
        Product keyboard = new Product(3, "كيبورد", 500, 3);
        
        // طلب جديد
        Order order = new Order();
        order.AddProduct(laptop);
        order.AddProduct(mouse);
        order.AddProduct(keyboard);
        
        order.DisplayOrder();
    }
}`,
        expectedOutput: 'تم إضافة: لابتوب\nتم إضافة: ماوس\nتم إضافة: كيبورد\n\n=== تفاصيل الطلب ===\nلابتوب - 15000 جنيه\nماوس - 200 جنيه\nكيبورد - 500 جنيه\nالإجمالي: 15700 جنيه',
        order: 3,
        chapterId: 'chapter-4',
        duration: 50,
        xpReward: 150,
        isLocked: true,
        prerequisites: ['lesson-4-2']
      },
      {
        id: 'lesson-4-4',
        title: 'المشروع النهائي',
        description: 'هنبني تطبيق كامل بكل اللي اتعلمناه',
        content: `
# المشروع النهائي

هنبني تطبيق Bank Management System كامل!

## المتطلبات

1. إدارة الحسابات (إنشاء، حذف، عرض)
2. إجراء معاملات (إيداع، سحب، تحويل)
3. عرض سجل المعاملات
4. حساب الفوائد

## الهيكل

### BankAccount (Abstract)

\`\`\`csharp
public abstract class BankAccount
{
    public string AccountNumber { get; protected set; }
    public string OwnerName { get; set; }
    public decimal Balance { get; protected set; }
    public List<Transaction> Transactions { get; protected set; }
    
    public abstract void CalculateInterest();
    
    public virtual void Deposit(decimal amount)
    {
        Balance += amount;
        Transactions.Add(new Transaction(amount, "إيداع"));
    }
}
\`\`\`

### SavingsAccount

\`\`\`csharp
public class SavingsAccount : BankAccount
{
    public decimal InterestRate { get; set; } = 0.05m;
    
    public override void CalculateInterest()
    {
        decimal interest = Balance * InterestRate;
        Deposit(interest);
    }
}
\`\`\`

### CheckingAccount

\`\`\`csharp
public class CheckingAccount : BankAccount
{
    public decimal OverdraftLimit { get; set; } = 1000;
    
    public override void Withdraw(decimal amount)
    {
        if (Balance + OverdraftLimit >= amount)
        {
            Balance -= amount;
            Transactions.Add(new Transaction(-amount, "سحب"));
        }
    }
}
\`\`\`

## جرب بنفسك

اكمل الكود وابني نظام بنك كامل!
        `,
        codeExample: `using System;
using System.Collections.Generic;

public class BankAccount
{
    public string AccountNumber { get; set; }
    public string OwnerName { get; set; }
    public decimal Balance { get; protected set; }
    private List<string> transactions = new List<string>();
    
    public BankAccount(string accNum, string owner, decimal initialBalance)
    {
        AccountNumber = accNum;
        OwnerName = owner;
        Balance = initialBalance;
        transactions.Add("فتح حساب: +" + initialBalance);
    }
    
    public void Deposit(decimal amount)
    {
        if (amount > 0)
        {
            Balance += amount;
            transactions.Add("إيداع: +" + amount);
            Console.WriteLine("تم الإيداع بنجاح!");
        }
    }
    
    public void Withdraw(decimal amount)
    {
        if (amount > 0 && amount <= Balance)
        {
            Balance -= amount;
            transactions.Add("سحب: -" + amount);
            Console.WriteLine("تم السحب بنجاح!");
        }
        else
        {
            Console.WriteLine("رصيد غير كافي!");
        }
    }
    
    public void DisplayInfo()
    {
        Console.WriteLine("\n=== معلومات الحساب ===");
        Console.WriteLine("رقم الحساب: " + AccountNumber);
        Console.WriteLine("المالك: " + OwnerName);
        Console.WriteLine("الرصيد: " + Balance + " جنيه");
    }
    
    public void DisplayTransactions()
    {
        Console.WriteLine("\n=== سجل المعاملات ===");
        foreach (var trans in transactions)
        {
            Console.WriteLine(trans);
        }
    }
}

class Program
{
    static void Main()
    {
        // إنشاء حساب
        BankAccount account = new BankAccount("12345", "أحمد محمد", 5000);
        account.DisplayInfo();
        
        // إجراء معاملات
        account.Deposit(2000);
        account.Withdraw(1000);
        account.Withdraw(8000);  // هيفشل
        
        account.DisplayInfo();
        account.DisplayTransactions();
    }
}`,
        expectedOutput: '=== معلومات الحساب ===\nرقم الحساب: 12345\nالمالك: أحمد محمد\nالرصيد: 5000 جنيه\n\nتم الإيداع بنجاح!\nتم السحب بنجاح!\nرصيد غير كافي!\n\n=== معلومات الحساب ===\nرقم الحساب: 12345\nالمالك: أحمد محمد\nالرصيد: 6000 جنيه\n\n=== سجل المعاملات ===\nفتح حساب: +5000\nإيداع: +2000\nسحب: -1000',
        order: 4,
        chapterId: 'chapter-4',
        duration: 60,
        xpReward: 150,
        isLocked: true,
        prerequisites: ['lesson-4-3']
      }
    ]
  }
];

export const badges: Badge[] = [
  {
    id: 'badge-1',
    name: 'المبتدئ',
    description: 'أكمل أول درس',
    icon: '🌟',
    requirement: 'complete-first-lesson',
    xpBonus: 50,
    isUnlocked: false
  },
  {
    id: 'badge-2',
    name: 'الطالب المجتهد',
    description: 'أكمل 5 دروس',
    icon: '📚',
    requirement: 'complete-5-lessons',
    xpBonus: 100,
    isUnlocked: false
  },
  {
    id: 'badge-3',
    name: 'خبير الكود',
    description: 'أكمل 10 دروس',
    icon: '💻',
    requirement: 'complete-10-lessons',
    xpBonus: 200,
    isUnlocked: false
  },
  {
    id: 'badge-4',
    name: 'سيد OOP',
    description: 'أكمل فصل OOP بالكامل',
    icon: '🏆',
    requirement: 'complete-oop-chapter',
    xpBonus: 300,
    isUnlocked: false
  },
  {
    id: 'badge-5',
    name: 'صائد الأخطاء',
    description: 'حل 5 اختبارات بدرجة كاملة',
    icon: '🐛',
    requirement: 'perfect-quiz-5',
    xpBonus: 150,
    isUnlocked: false
  },
  {
    id: 'badge-6',
    name: 'المبرمج المحترف',
    description: 'أكمل كل الدروس',
    icon: '👑',
    requirement: 'complete-all-lessons',
    xpBonus: 500,
    isUnlocked: false
  },
  {
    id: 'badge-7',
    name: 'المتسلسل',
    description: 'تابع التعلم 7 أيام متتالية',
    icon: '🔥',
    requirement: 'streak-7',
    xpBonus: 200,
    isUnlocked: false
  },
  {
    id: 'badge-8',
    name: 'بطل الكود',
    description: 'اجمع 1000 نقطة XP',
    icon: '⚔️',
    requirement: 'xp-1000',
    xpBonus: 100,
    isUnlocked: false
  }
];

export const quizzes: Quiz[] = [
  {
    id: 'quiz-1-1',
    lessonId: 'lesson-1-1',
    title: 'اختبار: مقدمة في C#',
    xpReward: 25,
    questions: [
      {
        id: 'q1-1-1',
        type: 'mcq',
        question: 'إيه هي النقطة اللي بيبدأ منها البرنامج في C#؟',
        options: ['Start()', 'Main()', 'Begin()', 'Run()'],
        correctAnswer: 1,
        explanation: 'الـ Main method هي نقطة البداية في أي برنامج C#.',
        points: 10
      },
      {
        id: 'q1-1-2',
        type: 'mcq',
        question: 'أي method بنستخدمها عشان نطبع على الشاشة؟',
        options: ['Console.Print()', 'Console.WriteLine()', 'System.Out()', 'Display.Write()'],
        correctAnswer: 1,
        explanation: 'Console.WriteLine() بتستخدم لطباعة نص على الشاشة.',
        points: 10
      },
      {
        id: 'q1-1-3',
        type: 'code-completion',
        question: 'أكمل الكود: Console._____("Hello");',
        code: 'using System;\n\nclass Program {\n    static void Main() {\n        Console._____("Hello");\n    }\n}',
        options: ['Print', 'WriteLine', 'Output', 'Display'],
        correctAnswer: 1,
        explanation: 'Console.WriteLine() هي الـ method الصحيحة.',
        points: 15
      }
    ]
  },
  {
    id: 'quiz-1-2',
    lessonId: 'lesson-1-2',
    title: 'اختبار: المتغيرات وأنواع البيانات',
    xpReward: 35,
    questions: [
      {
        id: 'q1-2-1',
        type: 'mcq',
        question: 'أي نوع بنستخدمه لتخزين نص؟',
        options: ['int', 'double', 'string', 'bool'],
        correctAnswer: 2,
        explanation: 'string بيستخدم لتخزين النصوص.',
        points: 10
      },
      {
        id: 'q1-2-2',
        type: 'mcq',
        question: 'أي نوع بيخزن true أو false؟',
        options: ['bit', 'boolean', 'bool', 'binary'],
        correctAnswer: 2,
        explanation: 'bool هو النوع اللي بيخزن قيم true أو false.',
        points: 10
      },
      {
        id: 'q1-2-3',
        type: 'error-detection',
        question: 'أي سطر في الكود فيه خطأ؟',
        code: 'int age = 25;\nstring name = "أحمد";\ndouble price = "100.5";\nbool active = true;',
        options: ['سطر 1', 'سطر 2', 'سطر 3', 'سطر 4'],
        correctAnswer: 2,
        explanation: 'double مينفعش ياخد قيمة string. لازم يكون double price = 100.5;',
        points: 15
      }
    ]
  },
  {
    id: 'quiz-2-1',
    lessonId: 'lesson-2-1',
    title: 'اختبار: الحلقات',
    xpReward: 50,
    questions: [
      {
        id: 'q2-1-1',
        type: 'mcq',
        question: 'أي loop بنستخدمه لما نعرف عدد المرات؟',
        options: ['while', 'do-while', 'for', 'foreach'],
        correctAnswer: 2,
        explanation: 'for loop بيستخدم لما نكون عارفين عدد التكرارات.',
        points: 10
      },
      {
        id: 'q2-1-2',
        type: 'code-completion',
        question: 'أكمل الـ for loop:',
        code: 'for (int i = 0; i ___ 10; i++) {\n    Console.WriteLine(i);\n}',
        options: ['=', '==', '<', '>'],
        correctAnswer: 2,
        explanation: 'نستخدم < عشان نعد من 0 لـ 9.',
        points: 15
      },
      {
        id: 'q2-1-3',
        type: 'mcq',
        question: 'إيه الفرق بين while و do-while؟',
        options: [
          'مفيش فرق',
          'do-while بتتنفذ مرة على الأقل',
          'while أسرع',
          'do-while بتستخدم للأرقام بس'
        ],
        correctAnswer: 1,
        explanation: 'do-while بتتنفذ مرة على الأقل قبل ما تcheck الشرط.',
        points: 15
      }
    ]
  },
  {
    id: 'quiz-3-1',
    lessonId: 'lesson-3-1',
    title: 'اختبار: Classes و Objects',
    xpReward: 60,
    questions: [
      {
        id: 'q3-1-1',
        type: 'mcq',
        question: 'إيه الفرق بين Class و Object؟',
        options: [
          'مفيش فرق',
          'Class هو القالب وObject هو النسخة',
          'Object هو القالب وClass هو النسخة',
          'Class للمتغيرات وObject للدوال'
        ],
        correctAnswer: 1,
        explanation: 'Class هو القالب (Blueprint) والObject هو النسخة اللي بننشئها منه.',
        points: 15
      },
      {
        id: 'q3-1-2',
        type: 'mcq',
        question: 'إزاي بننشئ Object من Class؟',
        options: [
          'Person p = Person();',
          'Person p = new Person();',
          'new Person p;',
          'create Person p;'
        ],
        correctAnswer: 1,
        explanation: 'نستخدم الكلمة new عشان ننشئ Object جديد.',
        points: 15
      },
      {
        id: 'q3-1-3',
        type: 'error-detection',
        question: 'أي سطر فيه خطأ؟',
        code: 'public class Car {\n    public string Brand;\n    \n    public Car(string brand) {\n        Brand = brand;\n    }\n}\n\nCar car = new Car();',
        options: ['تعريف الـ class', 'الـ Constructor', 'إنشاء الـ Object', 'مفيش خطأ'],
        correctAnswer: 2,
        explanation: 'لازم نمرر parameter للـ Constructor: new Car("Toyota")',
        points: 20
      }
    ]
  },
  {
    id: 'quiz-3-3',
    lessonId: 'lesson-3-3',
    title: 'اختبار: الـ Inheritance',
    xpReward: 75,
    questions: [
      {
        id: 'q3-3-1',
        type: 'mcq',
        question: 'إزاي class بيرث من class تاني؟',
        options: [
          'class A extends B',
          'class A : B',
          'class A inherits B',
          'class A from B'
        ],
        correctAnswer: 1,
        explanation: 'في C# بنستخدم : عشان نعمل inheritance.',
        points: 15
      },
      {
        id: 'q3-3-2',
        type: 'mcq',
        question: 'إيه keyword اللي بنستخدمها عشان نمنع الوراثة؟',
        options: ['private', 'protected', 'sealed', 'final'],
        correctAnswer: 2,
        explanation: 'sealed بيمنع أي class تاني يرث من الـ class ده.',
        points: 15
      },
      {
        id: 'q3-3-3',
        type: 'code-completion',
        question: 'أكمل الكود:',
        code: 'public class Animal {\n    public ___ void MakeSound() { }\n}\n\npublic class Dog : Animal {\n    public override void MakeSound() {\n        Console.WriteLine("Woof!");\n    }\n}',
        options: ['override', 'virtual', 'abstract', 'new'],
        correctAnswer: 1,
        explanation: 'virtual بتخلي الـ method تقدر تتoverride في الـ derived classes.',
        points: 20
      }
    ]
  }
];

export const leaderboardData = [
  { rank: 1, userId: 'u1', name: 'أحمد محمد', level: 15, xp: 3500, badges: 6, streak: 12 },
  { rank: 2, userId: 'u2', name: 'سارة أحمد', level: 14, xp: 3200, badges: 5, streak: 8 },
  { rank: 3, userId: 'u3', name: 'محمد علي', level: 13, xp: 2900, badges: 5, streak: 15 },
  { rank: 4, userId: 'u4', name: 'فاطمة حسن', level: 12, xp: 2600, badges: 4, streak: 5 },
  { rank: 5, userId: 'u5', name: 'عمر خالد', level: 11, xp: 2400, badges: 4, streak: 7 },
  { rank: 6, userId: 'u6', name: 'نورا سامي', level: 10, xp: 2100, badges: 3, streak: 3 },
  { rank: 7, userId: 'u7', name: 'يوسف إبراهيم', level: 9, xp: 1800, badges: 3, streak: 4 },
  { rank: 8, userId: 'u8', name: 'ليلى محمود', level: 8, xp: 1500, badges: 2, streak: 6 },
  { rank: 9, userId: 'u9', name: 'كريم عادل', level: 7, xp: 1200, badges: 2, streak: 2 },
  { rank: 10, userId: 'u10', name: 'مريم سعيد', level: 6, xp: 950, badges: 1, streak: 1 }
];
