import { useState, useRef, useEffect } from 'react';

// ─── MODULES DATA ───────────────────────────────────────────────────────────
const MODULES = [
  {
    id: 1, title: 'Say Hello!', icon: '👋', color: '#7F77DD', light: 'rgba(127,119,221,0.15)',
    tasks: [
      { title: 'Make Python Talk', concept: 'The print() function displays text on the screen. Anything inside the quotes gets shown as output!', example: 'print("Hello, World!")', prompt: 'Write a print() statement that displays your own name.', hint: 'Try: print("Your Name Here")', check: (o) => o.trim().length > 0 },
      { title: 'Print a Number', concept: 'print() can also show numbers — no quotes needed!', example: 'print(42)', prompt: 'Print your favorite number.', hint: 'Just type: print(7)', check: (o) => /\d/.test(o) },
      { title: 'Print Two Lines', concept: 'You can use print() multiple times to show multiple lines.', example: 'print("Line one")\nprint("Line two")', prompt: 'Print two sentences — your name and your age.', hint: 'print("My name is ...")\nprint("I am ... years old")', check: (o) => o.split('\n').filter(l => l.trim()).length >= 2 },
    ],
  },
  {
    id: 2, title: 'Variables', icon: '📦', color: '#1D9E75', light: 'rgba(29,158,117,0.15)',
    tasks: [
      { title: 'Store a Name', concept: 'A variable is like a labeled box. Use = to put something inside.', example: 'name = "Alex"\nprint(name)', prompt: 'Create a variable called name and print it.', hint: 'name = "YourName"\nprint(name)', check: (o) => o.trim().length > 0 },
      { title: 'Store Numbers', concept: 'Variables can hold numbers too!', example: 'age = 12\nyear = 2024\nprint(age)\nprint(year)', prompt: 'Create two number variables and print them both.', hint: 'x = 5\ny = 10\nprint(x)\nprint(y)', check: (o) => o.split('\n').filter(l => l.trim()).length >= 2 },
      { title: 'Math with Variables', concept: 'You can add (+), subtract (-), multiply (*) and divide (/) variables.', example: 'a = 10\nb = 3\nprint(a + b)\nprint(a * b)', prompt: 'Create two number variables and print their sum and product.', hint: 'print(a + b)\nprint(a * b)', check: (o) => o.split('\n').filter(l => l.trim()).length >= 2 },
    ],
  },
  {
    id: 3, title: 'If / Else', icon: '🤔', color: '#D85A30', light: 'rgba(216,90,48,0.15)',
    tasks: [
      { title: 'Make a Decision', concept: 'if/else lets your program choose what to do based on a condition.', example: 'age = 13\nif age >= 13:\n    print("Teen!")\nelse:\n    print("Kid!")', prompt: 'Create an age variable and print whether the person is a teen (13+) or a kid.', hint: 'Copy the example and change the age value!', check: (o) => o.trim().length > 0 },
      { title: 'Compare Numbers', concept: 'Compare numbers with > (greater), < (less), == (equal), != (not equal).', example: 'x = 5\ny = 10\nif x < y:\n    print("x is smaller")\nelse:\n    print("x is bigger")', prompt: 'Create two number variables and print which one is larger.', hint: 'if a > b: tells you which is bigger.', check: (o) => o.trim().length > 0 },
    ],
  },
  {
    id: 4, title: 'For Loops', icon: '🔁', color: '#378ADD', light: 'rgba(55,138,221,0.15)',
    tasks: [
      { title: 'Count with a Loop', concept: 'A for loop repeats code. range(5) gives numbers 0 through 4.', example: 'for i in range(5):\n    print(i)', prompt: 'Write a loop that prints numbers 1 through 5 using range(1, 6).', hint: 'for i in range(1, 6):\n    print(i)', check: (o) => o.includes('5') },
      { title: 'Loop Over a List', concept: 'Loop over a list to visit each item one by one!', example: 'fruits = ["apple", "banana", "cherry"]\nfor fruit in fruits:\n    print(fruit)', prompt: 'Create a list of 3 animals and print each one using a loop.', hint: 'animals = ["cat", "dog", "bird"]\nfor a in animals:\n    print(a)', check: (o) => o.split('\n').filter(l => l.trim()).length >= 3 },
    ],
  },
  {
    id: 5, title: 'Strings', icon: '🔤', color: '#9333ea', light: 'rgba(147,51,234,0.15)',
    tasks: [
      { title: 'Upper & Lower', concept: '.upper() makes all letters BIG, .lower() makes them small.', example: 'name = "PyKids"\nprint(name.upper())\nprint(name.lower())', prompt: 'Create a string and print it in uppercase and lowercase.', hint: 'word = "Hello"\nprint(word.upper())\nprint(word.lower())', check: (o) => o.split('\n').filter(l => l.trim()).length >= 2 },
      { title: 'Length & Strip', concept: 'len() counts characters. .strip() removes spaces from both ends.', example: 'msg = "  hello  "\nprint(len(msg))\nprint(msg.strip())', prompt: 'Create a string with extra spaces, then print its length before and after stripping.', hint: 'txt = "  python  "\nprint(len(txt))\nprint(txt.strip())', check: (o) => o.split('\n').filter(l => l.trim()).length >= 2 },
      { title: 'Replace & Find', concept: '.replace() swaps text. .find() tells you where a word is.', example: 'sentence = "I love cats"\nprint(sentence.replace("cats", "dogs"))\nprint(sentence.find("love"))', prompt: 'Create a sentence, replace one word and find another.', hint: 'txt = "The sky is gray"\nprint(txt.replace("gray","blue"))\nprint(txt.find("sky"))', check: (o) => o.split('\n').filter(l => l.trim()).length >= 2 },
      { title: 'Split & Join', concept: '.split() breaks a string into a list. .join() glues a list back together.', example: 'sentence = "apple banana cherry"\nwords = sentence.split()\nprint(words)\nprint("-".join(words))', prompt: 'Split a sentence into words then join them with a dash.', hint: 'txt = "one two three"\nw = txt.split()\nprint("-".join(w))', check: (o) => o.split('\n').filter(l => l.trim()).length >= 2 },
      { title: 'Starts & Ends With', concept: '.startswith() and .endswith() check the beginning or end of a string.', example: 'word = "Python"\nprint(word.startswith("Py"))\nprint(word.endswith("on"))', prompt: 'Create a word and check what it starts and ends with.', hint: 'w = "coding"\nprint(w.startswith("co"))\nprint(w.endswith("ng"))', check: (o) => o.toLowerCase().includes('true') },
    ],
  },
  {
    id: 6, title: 'Lists', icon: '📝', color: '#D4537E', light: 'rgba(212,83,126,0.15)',
    tasks: [
      { title: 'Create a List', concept: 'A list holds multiple items in [ ] separated by commas.', example: 'fruits = ["apple", "banana", "cherry"]\nprint(fruits)', prompt: 'Create a list of 3 favorite foods and print it.', hint: 'foods = ["pizza", "tacos", "sushi"]\nprint(foods)', check: (o) => o.includes('[') },
      { title: 'Access Items', concept: 'Get an item using its index. Lists start at index 0!', example: 'colors = ["red", "green", "blue"]\nprint(colors[0])\nprint(colors[2])', prompt: 'Create a list of 3 colors and print the first and last item.', hint: 'mylist[0] is first, mylist[2] is third.', check: (o) => o.split('\n').filter(l => l.trim()).length >= 2 },
      { title: 'Add & Count', concept: 'Use .append() to add an item and len() to count items.', example: 'nums = [1, 2, 3]\nnums.append(4)\nprint(nums)\nprint(len(nums))', prompt: 'Create a list of 2 animals, append a third, then print the list and its length.', hint: 'animals = ["cat","dog"]\nanimals.append("fish")\nprint(animals)\nprint(len(animals))', check: (o) => o.split('\n').filter(l => l.trim()).length >= 2 },
      { title: 'Loop a List', concept: 'Use a for loop to go through every item in a list!', example: 'planets = ["Mars", "Venus", "Saturn"]\nfor planet in planets:\n    print(planet)', prompt: 'Create a list of 3 sports and print each one using a loop.', hint: 'sports = ["soccer","tennis","basketball"]\nfor s in sports:\n    print(s)', check: (o) => o.split('\n').filter(l => l.trim()).length >= 3 },
    ],
  },
  {
    id: 7, title: 'Sets', icon: '🔷', color: '#0F6E56', light: 'rgba(15,110,86,0.15)',
    tasks: [
      { title: 'Create a Set', concept: 'A set only keeps unique items — no duplicates! Sets use { }.', example: 'my_set = {1, 2, 3, 3, 2}\nprint(my_set)', prompt: 'Create a set with duplicate numbers and print it — duplicates disappear!', hint: 'nums = {5, 3, 5, 1, 3}\nprint(nums)', check: (o) => o.trim().length > 0 },
      { title: 'Add to a Set', concept: 'Use .add() to add items. Duplicates are ignored automatically!', example: 'animals = {"cat", "dog"}\nanimals.add("fish")\nanimals.add("cat")\nprint(animals)', prompt: 'Create a set of 2 colors, add a new one and a duplicate, then print it.', hint: 'colors = {"red","blue"}\ncolors.add("green")\ncolors.add("red")\nprint(colors)', check: (o) => o.trim().length > 0 },
      { title: 'Set Operations', concept: '& finds shared items (intersection). | combines both sets (union).', example: 'a = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\nprint(a & b)\nprint(a | b)', prompt: 'Create two sets of numbers and print their intersection and union.', hint: 'x = {1,2,3}\ny = {2,3,4}\nprint(x & y)\nprint(x | y)', check: (o) => o.split('\n').filter(l => l.trim()).length >= 2 },
    ],
  },
  {
    id: 8, title: 'Dicts', icon: '📖', color: '#5DCAA5', light: 'rgba(93,202,165,0.15)',
    tasks: [
      { title: 'Create a Dictionary', concept: 'A dictionary stores key-value pairs using { } and colons.', example: 'person = {"name": "Alex", "age": 12}\nprint(person)', prompt: 'Create a dictionary with "name" and "age" keys and print it.', hint: 'me = {"name": "Sam", "age": 13}\nprint(me)', check: (o) => o.trim().length > 0 },
      { title: 'Access Values', concept: 'Use square brackets with a key to get its value.', example: 'pet = {"name": "Buddy", "animal": "dog"}\nprint(pet["name"])\nprint(pet["animal"])', prompt: 'Create a dictionary with "name" and "color" keys and print each value.', hint: 'car = {"name":"Zoom","color":"red"}\nprint(car["name"])\nprint(car["color"])', check: (o) => o.split('\n').filter(l => l.trim()).length >= 2 },
      { title: 'Add & Update', concept: 'Add or update a key by assigning it with square brackets.', example: 'scores = {"math": 90}\nscores["science"] = 85\nscores["math"] = 95\nprint(scores)', prompt: 'Create a dictionary with one score, add another subject, update the first, then print.', hint: 'grades = {"english":80}\ngrades["art"] = 92\ngrades["english"] = 88\nprint(grades)', check: (o) => o.trim().length > 0 },
      { title: 'Loop a Dictionary', concept: 'Loop through keys and use them to get values!', example: 'colors = {"sky": "blue", "grass": "green"}\nfor key in colors:\n    print(key, colors[key])', prompt: 'Create a dictionary of 3 things and their colors, then loop through and print each.', hint: 'things = {"apple":"red","banana":"yellow"}\nfor k in things:\n    print(k, things[k])', check: (o) => o.split('\n').filter(l => l.trim()).length >= 3 },
    ],
  },
  {
    id: 9, title: 'Functions', icon: '⚙️', color: '#BA7517', light: 'rgba(186,117,23,0.15)',
    tasks: [
      { title: 'Build a Greeting', concept: 'A function is reusable code. Define it with def, call it by name.', example: 'def greet():\n    print("Hello there!")\n\ngreet()', prompt: 'Write a greet() function that prints a friendly message, then call it.', hint: 'def greet():\n    print("Hi!")\n\ngreet()', check: (o) => o.trim().length > 0 },
      { title: 'Function with Parameter', concept: 'Functions can accept inputs called parameters.', example: 'def greet(name):\n    print("Hello, " + name)\n\ngreet("Sam")', prompt: 'Write a greet(name) function and call it with your name.', hint: 'def greet(name):\n    print("Hi " + name)\n\ngreet("Alex")', check: (o) => o.trim().length > 0 },
      { title: 'Return a Value', concept: 'Use return to send a result back from a function.', example: 'def add(a, b):\n    return a + b\n\nresult = add(3, 4)\nprint(result)', prompt: 'Write an add(a, b) function that returns the sum and print the result.', hint: 'def add(a, b):\n    return a + b\nprint(add(5, 7))', check: (o) => /\d/.test(o) },
    ],
  },
  {
    id: 10, title: 'Projects', icon: '🚀', color: '#f472b6', light: 'rgba(244,114,182,0.15)',
    tasks: [
      { title: 'Number Guessing Game', concept: 'Put it all together! Use variables, if/elif/else to check a guess.', example: 'secret = 7\nguess = 5\nif guess == secret:\n    print("You got it!")\nelif guess < secret:\n    print("Too low!")\nelse:\n    print("Too high!")', prompt: 'Set a secret number, make a guess, and print if it\'s correct, too low, or too high.', hint: 'Change guess to test all three outcomes!', check: (o) => o.trim().length > 0 },
      { title: 'Build a Quiz', concept: 'Use a dictionary for questions and answers, loop through and show them.', example: 'quiz = {"What color is the sky?": "blue", "What is 2+2?": "4"}\nfor question in quiz:\n    print(question)\n    print("Answer:", quiz[question])', prompt: 'Create a quiz with 3 questions and answers, loop through and print each.', hint: 'quiz = {"Capital of France?":"Paris"}\nfor q in quiz:\n    print(q, "->", quiz[q])', check: (o) => o.split('\n').filter(l => l.trim()).length >= 3 },
      { title: 'Word Analyzer', concept: 'Use string methods to analyze a word — length, uppercase, replace and more!', example: 'word = "Python"\nprint("Length:", len(word))\nprint("Upper:", word.upper())\nprint("Starts with P:", word.startswith("P"))', prompt: 'Pick any word and print its length, uppercase version, and whether it starts with a vowel.', hint: 'w = "banana"\nprint(len(w))\nprint(w.upper())\nprint(w.startswith("a"))', check: (o) => o.split('\n').filter(l => l.trim()).length >= 3 },
      { title: 'Mini Calculator', concept: 'Use functions to build a calculator with add, subtract, multiply, and divide.', example: 'def add(a, b):\n    return a + b\ndef subtract(a, b):\n    return a - b\nprint("5 + 3 =", add(5, 3))\nprint("9 - 4 =", subtract(9, 4))', prompt: 'Build all 4 calculator functions and call each one with two numbers.', hint: 'def multiply(a,b):\n    return a*b\ndef divide(a,b):\n    return a/b', check: (o) => o.split('\n').filter(l => l.trim()).length >= 4 },
      { title: 'Student Gradebook', concept: 'Combine dictionaries, loops, and math to store and average student scores!', example: 'grades = {"Alice": 90, "Bob": 85, "Clara": 92}\nfor name in grades:\n    print(name, "->", grades[name])', prompt: 'Create a gradebook with 4 students, print each grade, then calculate the class average.', hint: 'gb = {"Sam":88,"Lee":76,"Mia":95,"Tom":82}\nfor n in gb:\n    print(n, gb[n])', check: (o) => o.split('\n').filter(l => l.trim()).length >= 4 },
    ],
  },
];

// ─── ERROR HELPER ────────────────────────────────────────────────────────────
function simplifyError(msg) {
  if (msg.includes('is not defined')) return 'Oops! You used a variable or function that has not been created yet.';
  if (msg.includes('SyntaxError') || msg.includes('Unexpected')) return 'Hmm, something looks off with your code structure. Check your colons and quotes!';
  if (msg.includes('Cannot read')) return 'Looks like something is missing — double-check your variable names!';
  return 'Something went wrong: ' + msg;
}

// ─── PYTHON → JS TRANSPILER ──────────────────────────────────────────────────
function pyToJs(code) {
  const expandInline = (src) => src.split('\n').map(line => {
    const m = line.match(/^(\s*)((?:for|if|elif|else|while|def)\b[^:]*):[ \t]+(\S.*)$/);
    if (m) return m[1] + m[2] + ':\n' + m[1] + '    ' + m[3];
    return line;
  }).join('\n');

  let src = expandInline(code);
  src = src.replace(/\bTrue\b/g, 'true').replace(/\bFalse\b/g, 'false').replace(/\bNone\b/g, 'null');
  src = src.replace(/\belif\b/g, 'ELIF_PH');
  src = src.replace(/\band\b/g, '&&').replace(/\bor\b/g, '||').replace(/\bnot\b/g, '!');
  src = src.replace(/ELIF_PH/g, 'elif');
  src = src.replace(/(\w+)\.append\(([^)]+)\)/g, '$1.push($2)');
  src = src.replace(/(\w+)\.keys\(\)/g, 'Object.keys($1)');
  src = src.replace(/(\w+)\.values\(\)/g, 'Object.values($1)');
  src = src.replace(/(\w+)\.items\(\)/g, 'Object.entries($1)');
  src = src.replace(/(\w+)\s*&\s*(\w+)/g, '$1.intersection($2)');
  src = src.replace(/(\w+)\s*\|\s*(\w+)/g, '$1.union($2)');
  src = src.replace(/(\w+)\[::-1\]/g, "$1.split('').reverse().join('')");
  src = src.replace(/=\s*\{([^{}:]+)\}/g, (_, inner) => '= new PySet([' + inner + '])');

  const lines = src.split('\n');
  const out = [];
  const stack = [{ indent: -1, isBlock: false }];
  const getInd = (s) => s.match(/^(\s*)/)[1].length;

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    if (!raw.trim()) { out.push(''); continue; }
    const indent = getInd(raw);
    const line = raw.trim();
    const isElseLike = line === 'else:' || /^(elif|else\s+if)\b/.test(line);

    while (stack.length > 1 && (
      indent < stack[stack.length - 1].indent ||
      (isElseLike && indent === stack[stack.length - 1].indent && stack[stack.length - 1].isBlock)
    )) {
      const top = stack.pop();
      if (top.isBlock) out.push('}');
    }

    let bodyIndent = indent + 4;
    for (let j = i + 1; j < lines.length; j++) {
      if (lines[j].trim()) { bodyIndent = getInd(lines[j]); break; }
    }

    const push = (js) => { out.push(js); stack.push({ indent: bodyIndent, isBlock: true }); };
    let m;

    if ((m = line.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:/))) {
      push('function ' + m[1] + '(' + m[2] + ') {');
    } else if ((m = line.match(/^for\s+(\w+),\s*(\w+)\s+in\s+(.+)\s*:/))) {
      push('for (var _e' + i + ' of ' + m[3] + ') { var ' + m[1] + '=_e' + i + '[0], ' + m[2] + '=_e' + i + '[1];');
    } else if ((m = line.match(/^for\s+(\w+)\s+in\s+(.+)\s*:/))) {
      push('for (var ' + m[1] + ' of __iterify(' + m[2].trim() + ')) {');
    } else if ((m = line.match(/^while\s+(.+)\s*:/))) {
      push('while (' + m[1] + ') {');
    } else if ((m = line.match(/^if\s+(.+)\s*:/))) {
      push('if (' + m[1] + ') {');
    } else if ((m = line.match(/^(?:elif|else\s+if)\s+(.+)\s*:/))) {
      push('else if (' + m[1] + ') {');
    } else if (line === 'else:') {
      push('else {');
    } else if (line.startsWith('return ')) {
      out.push(line);
    } else if (line.startsWith('print(')) {
      out.push(line.replace(/^print\(/, '__p('));
    } else {
      out.push(line);
    }
  }
  while (stack.length > 1) { const t = stack.pop(); if (t.isBlock) out.push('}'); }
  return out.join('\n');
}

// ─── PYTHON RUNNER ───────────────────────────────────────────────────────────
function runPython(code) {
  let jsCode;
  try { jsCode = pyToJs(code); } catch (e) { return { output: '', error: simplifyError(e.message) }; }

  const script = [
    'var __lines = [];',
    'function __p() { var a = Array.prototype.slice.call(arguments); __lines.push(a.map(function(x){ return x===null?"None":x===true?"True":x===false?"False":(x instanceof PySet)?x.toString():String(x); }).join(" ")); }',
    'function __iterify(x) { if (Array.isArray(x)) return x; if (typeof x === "string") return x.split(""); if (x && typeof x === "object" && !(x instanceof PySet)) return Object.keys(x); return Array.from(x); }',
    'function range(s,e,step){ if(step===undefined)step=1; if(e===undefined){e=s;s=0;} var arr=[]; for(var i=s;i<e;i+=step)arr.push(i); return arr; }',
    'function len(x){ if(x instanceof PySet)return x.data.size; return x.length; }',
    'function str(x){return String(x);} function int(x){return parseInt(x);} function float(x){return parseFloat(x);}',
    'function abs(x){return Math.abs(x);} function max(){return Math.max.apply(null,arguments);} function min(){return Math.min.apply(null,arguments);} function round(x){return Math.round(x);}',
    'function sum(x){ if(x instanceof PySet)x=Array.from(x.data); if(x&&typeof x==="object"&&!Array.isArray(x))x=Object.values(x); return x.reduce(function(a,b){return a+b;},0); }',
    'function sorted(x){ var a=Array.isArray(x)?x.slice():Object.keys(x); return a.sort(); }',
    'function PySet(items){ this.data = new Set(items); }',
    'PySet.prototype.add = function(v){ this.data.add(v); };',
    'PySet.prototype.toString = function(){ return "{" + Array.from(this.data).join(", ") + "}"; };',
    'PySet.prototype.intersection = function(o){ var r=new PySet([]); this.data.forEach(function(v){ if(o.data.has(v)) r.data.add(v); }); return r; };',
    'PySet.prototype.union = function(o){ var r=new PySet(Array.from(this.data)); o.data.forEach(function(v){ r.data.add(v); }); return r; };',
    jsCode,
    'return __lines;'
  ].join('\n');

  try {
    const result = new Function(script)();
    return { output: result.join('\n'), error: null };
  } catch (e) {
    return { output: '', error: simplifyError(e.message) };
  }
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────
const MOODS = { idle: '😊', success: '🎉', error: '😅', hint: '💡' };

export default function PyKids() {
  const [moduleIdx, setModuleIdx] = useState(0);
  const [taskIdx, setTaskIdx] = useState(0);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [mood, setMood] = useState('idle');
  const [showHint, setShowHint] = useState(false);
  const [passed, setPassed] = useState(false);
  const [done, setDone] = useState({});
  const [showExample, setShowExample] = useState(false);
  const textareaRef = useRef(null);
  const canvasRef = useRef(null);

  const mod = MODULES[moduleIdx];
  const task = mod.tasks[taskIdx];
  const totalTasks = MODULES.reduce((s, m) => s + m.tasks.length, 0);
  const totalDone = Object.keys(done).length;

  // Animated background canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const symbols = ['🐍', '{}', 'print()', 'if:', 'for', 'def', '[ ]', '+=', '#', '→', '⚙', '★', '♦', '=='];
    const colors = ['#a78bfa','#34d399','#60a5fa','#f472b6','#fbbf24','#86efac','#f9a8d4','#7dd3fc'];
    const pts = Array.from({ length: 40 }, (_, i) => ({
      x: Math.random() * 900, y: Math.random() * 800,
      sym: symbols[i % symbols.length], size: 11 + Math.random() * 13,
      speed: 0.2 + Math.random() * 0.45, dx: (Math.random() - 0.5) * 0.35,
      color: colors[i % colors.length], alpha: 0.15 + Math.random() * 0.3,
    }));
    let raf;
    const draw = () => {
      canvas.width = canvas.offsetWidth || 900;
      canvas.height = canvas.offsetHeight || 800;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.y -= p.speed; p.x += p.dx;
        if (p.y < -30) { p.y = canvas.height + 20; p.x = Math.random() * canvas.width; }
        if (p.x < -40) p.x = canvas.width + 20;
        if (p.x > canvas.width + 40) p.x = -20;
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.font = p.size + 'px monospace';
        ctx.fillText(p.sym, p.x, p.y);
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  // Reset state on task change
  useEffect(() => {
    setCode(''); setOutput(''); setError(''); setMood('idle');
    setShowHint(false); setPassed(false); setShowExample(false);
  }, [moduleIdx, taskIdx]);

  function handleRun() {
    const res = runPython(code);
    if (res.error) {
      setOutput(''); setError(res.error); setMood('error'); setPassed(false);
    } else {
      setOutput(res.output); setError('');
      const ok = task.check(res.output);
      if (ok) {
        setMood('success'); setPassed(true);
        setDone(prev => ({ ...prev, [moduleIdx + '-' + taskIdx]: true }));
      } else {
        setMood('idle'); setPassed(false);
      }
    }
  }

  function handleNext() {
    if (taskIdx < mod.tasks.length - 1) setTaskIdx(taskIdx + 1);
    else if (moduleIdx < MODULES.length - 1) { setModuleIdx(moduleIdx + 1); setTaskIdx(0); }
  }

  function handleTab(e) {
    if (e.key !== 'Tab') return;
    e.preventDefault();
    const s = e.target.selectionStart;
    const en = e.target.selectionEnd;
    const nc = code.substring(0, s) + '    ' + code.substring(en);
    setCode(nc);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.selectionStart = textareaRef.current.selectionEnd = s + 4;
      }
    }, 0);
  }

  const isLast = moduleIdx === MODULES.length - 1 && taskIdx === mod.tasks.length - 1;
  const glass = {
    background: 'rgba(15,10,40,0.55)',
    border: '0.5px solid rgba(255,255,255,0.15)',
    borderRadius: '12px',
    backdropFilter: 'blur(12px)',
  };
  const glassBar = {
    padding: '6px 12px',
    background: 'rgba(255,255,255,0.07)',
    borderBottom: '0.5px solid rgba(255,255,255,0.1)',
  };

  return (
    <div style={{
      fontFamily: 'sans-serif', padding: '1rem', maxWidth: 900, margin: '0 auto', minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a0533 0%, #0a1a4a 40%, #0a2a1a 100%)',
      borderRadius: '12px', position: 'relative', overflow: 'hidden',
    }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', ...glass, padding: '10px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 26 }}>🐍</span>
            <span style={{ fontSize: 18, fontWeight: 500, color: '#a78bfa' }}>PyKids</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 13, color: 'rgba(200,200,255,0.7)' }}>{totalDone}/{totalTasks} tasks done</span>
            <div style={{ width: 120, height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{ width: ((totalDone / totalTasks) * 100) + '%', height: '100%', background: mod.color, borderRadius: 99, transition: 'width 0.4s' }} />
            </div>
          </div>
        </div>

        {/* Module tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          {MODULES.map((m, mi) => {
            const dc = m.tasks.filter((_, ti) => done[mi + '-' + ti]).length;
            const active = mi === moduleIdx;
            return (
              <button key={m.id} onClick={() => { setModuleIdx(mi); setTaskIdx(0); }} style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px',
                border: '1.5px solid ' + (active ? m.color : 'rgba(255,255,255,0.15)'),
                borderRadius: 99, background: active ? m.color + '33' : 'rgba(255,255,255,0.05)',
                color: active ? m.color : 'rgba(200,200,255,0.6)',
                fontWeight: active ? 500 : 400, fontSize: 13, cursor: 'pointer', transition: 'all 0.15s',
              }}>
                <span>{m.icon}</span><span>{m.title}</span>
                {dc === m.tasks.length && <span style={{ color: '#34d399', fontSize: 12 }}>✓</span>}
              </button>
            );
          })}
        </div>

        {/* Task dots */}
        <div style={{ display: 'flex', gap: 6, marginBottom: '1rem', alignItems: 'center' }}>
          {mod.tasks.map((_, ti) => {
            const isDone = done[moduleIdx + '-' + ti];
            const active = ti === taskIdx;
            return (
              <button key={ti} onClick={() => setTaskIdx(ti)} style={{
                width: active ? 24 : 10, height: 10, borderRadius: 99,
                background: (isDone || active) ? mod.color : 'rgba(255,255,255,0.2)',
                border: 'none', cursor: 'pointer', transition: 'all 0.2s', opacity: (isDone || active) ? 1 : 0.5,
              }} />
            );
          })}
          <span style={{ fontSize: 12, color: 'rgba(200,200,255,0.5)', marginLeft: 6 }}>
            Task {taskIdx + 1} of {mod.tasks.length}
          </span>
        </div>

        {/* Main panels */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          {/* Lesson panel */}
          <div style={{ ...glass, padding: '1rem 1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 18 }}>{mod.icon}</span>
              <span style={{ fontSize: 15, fontWeight: 500, color: '#f0f0ff' }}>{task.title}</span>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(200,200,255,0.7)', lineHeight: 1.6, margin: '0 0 14px' }}>{task.concept}</p>

            <button onClick={() => setShowExample(!showExample)} style={{
              fontSize: 13, border: '1px solid ' + mod.color, borderRadius: '8px',
              padding: '4px 10px', color: mod.color, background: 'transparent', cursor: 'pointer', marginBottom: 10,
            }}>
              {showExample ? '▲ Hide example' : '▼ Show example'}
            </button>

            {showExample && (
              <div style={{ position: 'relative', marginBottom: 12 }}>
                <pre style={{
                  background: 'rgba(0,0,0,0.4)', borderRadius: '8px', padding: '10px 12px',
                  fontSize: 13, fontFamily: 'monospace', color: '#86efac', margin: 0,
                  border: '0.5px solid rgba(255,255,255,0.1)', overflowX: 'auto',
                }}>{task.example}</pre>
                <button onClick={() => setCode(task.example)} style={{
                  position: 'absolute', top: 6, right: 6, fontSize: 11, padding: '3px 8px',
                  border: '0.5px solid rgba(255,255,255,0.2)', borderRadius: '6px',
                  background: 'rgba(255,255,255,0.1)', cursor: 'pointer', color: 'rgba(200,200,255,0.8)',
                }}>Copy</button>
              </div>
            )}

            <div style={{
              background: mod.color + '22', border: '0.5px solid ' + mod.color + '55',
              borderRadius: '8px', padding: '10px 12px',
            }}>
              <p style={{ fontSize: 13, fontWeight: 500, color: mod.color, margin: '0 0 4px' }}>Your task:</p>
              <p style={{ fontSize: 13, color: '#e0e0ff', margin: 0, lineHeight: 1.5 }}>{task.prompt}</p>
            </div>

            {showHint && (
              <div style={{
                marginTop: 10, background: 'rgba(186,117,23,0.2)', borderRadius: '8px',
                padding: '8px 12px', border: '0.5px solid rgba(186,117,23,0.4)',
              }}>
                <p style={{ fontSize: 12, color: '#fbbf24', margin: 0 }}>💡 Hint: {task.hint}</p>
              </div>
            )}
          </div>

          {/* Editor + Output */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ ...glass, overflow: 'hidden' }}>
              <div style={{ ...glassBar, display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: 'rgba(200,200,255,0.6)', fontFamily: 'monospace' }}>✏️ your_code.py</span>
              </div>
              <textarea
                ref={textareaRef}
                value={code}
                onChange={e => setCode(e.target.value)}
                onKeyDown={handleTab}
                placeholder={'# Write your Python code here...\n'}
                spellCheck={false}
                style={{
                  width: '100%', minHeight: 180, padding: '12px', resize: 'vertical',
                  fontFamily: 'monospace', fontSize: 13, lineHeight: 1.6,
                  border: 'none', outline: 'none', boxSizing: 'border-box',
                  background: 'transparent', color: '#86efac',
                }}
              />
            </div>

            <div style={{ ...glass, overflow: 'hidden', flex: 1 }}>
              <div style={{ ...glassBar, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 12, color: 'rgba(200,200,255,0.6)' }}>📤 output</span>
                <span style={{ fontSize: 18, marginLeft: 'auto' }}>{MOODS[mood]}</span>
              </div>
              <div style={{ padding: '10px 14px', minHeight: 70 }}>
                {error
                  ? <p style={{ fontFamily: 'monospace', fontSize: 13, color: '#f472b6', margin: 0, lineHeight: 1.6 }}>⚠️ {error}</p>
                  : output
                    ? <pre style={{ fontFamily: 'monospace', fontSize: 13, margin: 0, color: '#86efac', lineHeight: 1.6 }}>{output}</pre>
                    : <p style={{ fontSize: 13, color: 'rgba(200,200,255,0.3)', margin: 0, fontStyle: 'italic' }}>Output will appear here...</p>
                }
                {passed && (
                  <div style={{
                    marginTop: 10, background: 'rgba(52,211,153,0.15)', borderRadius: '8px',
                    padding: '8px 12px', border: '0.5px solid rgba(52,211,153,0.4)',
                  }}>
                    <p style={{ color: '#34d399', fontSize: 13, margin: 0, fontWeight: 500 }}>🎉 Great job! Task complete!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action bar */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={handleRun} style={{
            padding: '8px 20px', borderRadius: '8px',
            background: mod.color, color: '#fff', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500,
          }}>▶ Run code</button>
          <button onClick={() => { setShowHint(true); setMood('hint'); }} style={{
            padding: '8px 16px', borderRadius: '8px',
            border: '0.5px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)',
            cursor: 'pointer', fontSize: 14, color: 'rgba(200,200,255,0.7)',
          }}>💡 Hint</button>
          <button onClick={() => { setCode(''); setOutput(''); setError(''); setMood('idle'); setPassed(false); }} style={{
            padding: '8px 16px', borderRadius: '8px',
            border: '0.5px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)',
            cursor: 'pointer', fontSize: 14, color: 'rgba(200,200,255,0.7)',
          }}>🗑 Clear</button>
          {passed && !isLast && (
            <button onClick={handleNext} style={{
              marginLeft: 'auto', padding: '8px 20px', borderRadius: '8px',
              background: '#34d399', color: '#0a2a1a', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500,
            }}>Next task →</button>
          )}
          {passed && isLast && (
            <div style={{ marginLeft: 'auto', fontSize: 14, color: '#34d399', fontWeight: 500 }}>
              🏆 You finished all modules!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
