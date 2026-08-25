// ─── TODO: paste real 11-char YouTube IDs over every 'REPLACE_ME' below.
// From https://www.youtube.com/watch?v=dQw4w9WgXcQ the ID is dQw4w9WgXcQ
// All data is mocked. Swap these arrays for API calls later — the shapes are stable.

export const user = {
  name: 'Nirbhay',
  codename: 'NIRBHAY',
  email: 'nirbhay@spidystudy.io',
  initial: 'N',
  rank: 'Web-Slinger',
  status: 'Active Multiverse User',
  network: 'Multiverse Network One',
  streak: 10,
  enrolled: 4,
  completed: 2,
  trophies: 3,
};

export const navItems = [
  { label: 'Dashboard', to: '/', icon: 'LayoutDashboard', color: 'red' },
  { label: 'Courses', to: '/courses', icon: 'BookOpen', color: 'blue' },
  { label: 'My Learning', to: '/my-learning', icon: 'GraduationCap', color: 'yellow' },
  { label: 'Revision', to: '/revision', icon: 'RotateCcw', color: 'pink' },
  { label: 'Projects', to: '/projects', icon: 'FlaskConical', color: 'sky' },
  { label: 'Interview Prep', to: '/interview-prep', icon: 'Mic', color: 'lime' },
  { label: 'Analytics', to: '/analytics', icon: 'BarChart3', color: 'red' },
  { label: 'Profile', to: '/profile', icon: 'UserCircle', color: 'blue' },
];

// IMPORTANT: The stats below (views, likes, comments) are STATIC MOCK VALUES.
// Fetching real counts requires the YouTube Data API and a valid API key.
export const categories = ['All', 'AI/ML', 'Full Stack', 'System Design', 'Frontend', 'Backend', 'DevOps', 'Cybersecurity', 'Systems', 'Design'];

export const courses = [
  {
    id: 'c1',
    title: 'Neural Networks & Deep Learning',
    thumbnail: '/thumbnails/c1.jpg',
    blurb: 'Build intuition for backprop, gradients and layered representation from first principles.',
    category: 'AI/ML',
    level: 'Intermediate',
    earthCode: 'EARTH-1610',
    channel: '3Blue1Brown',
    channelInitials: '3B',
    channelColor: 'blue',
    runtime: '1:15:30',
    stats: { views: '14.8M', likes: '540K', comments: '22.1K' },
    missions: [
      { id: 'c1m1', title: 'What a neuron actually computes', youtubeId: 'REPLACE_ME', minutes: 14, completed: false, summary: 'Understand the mathematical foundation of a single artificial neuron.', notes: ['Inputs, weights, and biases', 'Activation functions (ReLU, Sigmoid)', 'Linear separation'] },
      { id: 'c1m2', title: 'The mechanics of Gradient Descent', youtubeId: 'REPLACE_ME', minutes: 18, completed: false, summary: 'How models learn by finding the local minima of a cost function.', notes: ['Cost functions', 'Learning rate', 'Stochastic vs Batch'] },
      { id: 'c1m3', title: 'Backpropagation from scratch', youtubeId: 'REPLACE_ME', minutes: 25, completed: false, summary: 'The chain rule applied to neural networks to update weights.', notes: ['Chain rule', 'Forward pass', 'Backward pass calculation'] },
      { id: 'c1m4', title: 'Building layered representations', youtubeId: 'REPLACE_ME', minutes: 16, completed: false, summary: 'Why deep networks can represent complex non-linear functions.', notes: ['Hidden layers', 'Universal approximation theorem', 'Feature extraction'] },
      { id: 'c1m5', title: 'Introduction to CNNs', youtubeId: 'REPLACE_ME', minutes: 22, completed: false, summary: 'Applying convolutional filters for image processing.', notes: ['Filters and kernels', 'Stride and padding', 'Pooling layers'] }
    ],
    quiz: [
      { id: 'c1q1', prompt: 'During backpropagation, what does the chain rule let you compute?', options: ['The loss function directly', 'The global minimum', 'Partial derivatives of the loss with respect to each weight', 'The forward pass activations'], correct: 2, explanation: 'The chain rule allows us to compute gradients layer by layer by multiplying local derivatives.' },
      { id: 'c1q2', prompt: 'What is the primary purpose of an activation function?', options: ['To scale the inputs between 0 and 1', 'To introduce non-linearity into the network', 'To initialize the weights', 'To prevent overfitting'], correct: 1, explanation: 'Without non-linearity, a deep network is mathematically equivalent to a single-layer perceptron.' },
      { id: 'c1q3', prompt: 'Which issue does the ReLU activation function suffer from?', options: ['Vanishing gradients for positive inputs', 'Dying ReLU problem for negative inputs', 'High computational cost', 'It is not differentiable anywhere'], correct: 1, explanation: 'ReLU outputs zero for all negative inputs, which can cause neurons to stop learning entirely ("die").' },
      { id: 'c1q4', prompt: 'What happens if the learning rate is too high?', options: ['The model trains perfectly but takes longer', 'The loss may diverge and fail to converge', 'The model becomes a linear classifier', 'The network automatically adds more layers'], correct: 1, explanation: 'A learning rate that is too high causes the optimizer to overshoot the minimum, leading to divergence.' },
      { id: 'c1q5', prompt: 'In a CNN, what is the purpose of Max Pooling?', options: ['To increase the number of parameters', 'To make the network deeper', 'To reduce spatial dimensions and add translation invariance', 'To apply non-linearity'], correct: 2, explanation: 'Max pooling downsamples the feature map, reducing computation and making the detection robust to small shifts.' },
      { id: 'c1q6', prompt: 'What does a cost function measure?', options: ['The accuracy of the model on the test set', 'The difference between predicted and actual outputs', 'The speed of the forward pass', 'The number of layers in the network'], correct: 1, explanation: 'The cost (or loss) function quantifies how far off the model’s predictions are from the true labels.' },
      { id: 'c1q7', prompt: 'Why is Stochastic Gradient Descent (SGD) often preferred over Batch Gradient Descent?', options: ['It uses the entire dataset per step', 'It is deterministic and smooth', 'It can escape local minima and updates faster', 'It requires zero hyperparameters'], correct: 2, explanation: 'SGD updates weights per sample/mini-batch, making it faster and adding noise that helps escape shallow local minima.' },
      { id: 'c1q8', prompt: 'What is the vanishing gradient problem?', options: ['Gradients become too large and explode', 'Gradients approach zero in deep networks, halting learning', 'The loss function vanishes to zero immediately', 'The network forgets previous data'], correct: 1, explanation: 'In deep networks using sigmoid/tanh, gradients multiply through layers and can become vanishingly small, stopping early layers from updating.' },
      { id: 'c1q9', prompt: 'Which of these is a common regularization technique?', options: ['Increasing the learning rate', 'Adding Dropout layers', 'Removing the bias terms', 'Using Mean Squared Error'], correct: 1, explanation: 'Dropout randomly zeroes out neurons during training, forcing the network to learn robust, distributed representations and reducing overfitting.' },
      { id: 'c1q10', prompt: 'What shape of filter is commonly used in modern CNNs for image classification?', options: ['1x1 exclusively', '10x10', '3x3', 'Fully connected rows'], correct: 2, explanation: 'Small 3x3 filters stacked in deep layers are highly efficient and capture both local features and broader context.' }
    ],
    topics: ['Mathematical Foundations of Neurons', 'Gradient Descent Mechanics', 'Backpropagation and Chain Rule', 'Layered Representations', 'Convolutional Filters'],
    hours: 9.5, color: 'red', tags: ['Backprop', 'CNN', 'Optimizers'], enrolled: true, progress: 62,
  },
  {
    id: 'c2',
    title: 'Natural Language Processing',
    thumbnail: '/thumbnails/c2.jpg',
    blurb: 'From bag-of-words to attention. Tokenizers, embeddings and transformer internals.',
    category: 'AI/ML',
    level: 'Advanced',
    earthCode: 'EARTH-1204',
    channel: 'Andrej Karpathy',
    channelInitials: 'AK',
    channelColor: 'red',
    runtime: '2:40:15',
    stats: { views: '2.1M', likes: '80K', comments: '3.4K' },
    missions: [
      { id: 'c2m1', title: 'Bag-of-words and TF-IDF', youtubeId: 'REPLACE_ME', minutes: 12, completed: false, summary: 'Representing text as sparse frequency vectors.', notes: ['Count vectorizer', 'Term Frequency', 'Inverse Document Frequency'] },
      { id: 'c2m2', title: 'Word embeddings and Word2Vec', youtubeId: 'REPLACE_ME', minutes: 20, completed: false, summary: 'Learning dense semantic vectors for words.', notes: ['CBOW vs Skip-gram', 'Cosine similarity', 'Semantic arithmetic'] },
      { id: 'c2m3', title: 'Sequence models and RNNs', youtubeId: 'REPLACE_ME', minutes: 22, completed: false, summary: 'Handling temporal and sequential text data.', notes: ['Hidden states', 'Backpropagation through time', 'LSTMs and GRUs'] },
      { id: 'c2m4', title: 'The Attention Mechanism', youtubeId: 'REPLACE_ME', minutes: 28, completed: false, summary: 'Allowing models to focus on relevant context dynamically.', notes: ['Queries, Keys, Values', 'Scaled dot-product attention', 'Self-attention'] }
    ],
    quiz: [
      { id: 'c2q1', prompt: 'What is the main drawback of the Bag-of-Words representation?', options: ['It requires huge amounts of memory', 'It ignores word order and semantics', 'It only works for English', 'It cannot be used with Neural Networks'], correct: 1, explanation: 'Bag-of-Words treats documents as sets of words, completely losing sequence and context information.' },
      { id: 'c2q2', prompt: 'In TF-IDF, what does IDF achieve?', options: ['It boosts the weight of rare, informative words', 'It removes all stop words automatically', 'It converts words to dense vectors', 'It counts the total words in a document'], correct: 0, explanation: 'Inverse Document Frequency penalizes common words (like "the") and boosts rare words that carry more specific meaning.' },
      { id: 'c2q3', prompt: 'What classic relationship does Word2Vec capture in its vector space?', options: ['Syntax but not semantics', 'Alphabetical ordering', 'Vector("King") - Vector("Man") + Vector("Woman") ≈ Vector("Queen")', 'Only exact synonym matching'], correct: 2, explanation: 'Word embeddings capture relative semantic relationships geometrically, famously demonstrating analogies via vector arithmetic.' },
      { id: 'c2q4', prompt: 'Why did LSTMs replace vanilla RNNs for many tasks?', options: ['They are much faster to train', 'They solve the vanishing gradient problem over long sequences', 'They do not require backpropagation', 'They use less memory'], correct: 1, explanation: 'LSTMs use gating mechanisms to maintain a cell state, allowing gradients to flow unchanged over long distances.' },
      { id: 'c2q5', prompt: 'In the Attention mechanism, what role does the "Query" play?', options: ['It is the output of the layer', 'It represents the current token looking for relevant context', 'It stores the weights of the network', 'It acts as the positional encoding'], correct: 1, explanation: 'The Query is compared against all Keys to determine how much Attention (weight) to give to their corresponding Values.' },
      { id: 'c2q6', prompt: 'What does Scaled Dot-Product Attention scale by?', options: ['The batch size', 'The sequence length', 'The square root of the key dimension', 'The learning rate'], correct: 2, explanation: 'Scaling by the square root of the dimension (d_k) prevents the dot products from growing too large, which would push the softmax function into regions with tiny gradients.' },
      { id: 'c2q7', prompt: 'What is the purpose of Positional Encoding in Transformers?', options: ['To translate text to different languages', 'To inject sequence order information since attention has no notion of position', 'To compress the embeddings', 'To reduce training time'], correct: 1, explanation: 'Unlike RNNs, self-attention operates on sets, so we must add positional encodings to give the model a sense of order.' },
      { id: 'c2q8', prompt: 'What does a Tokenizer do in modern NLP?', options: ['Converts text into sub-word chunks or integers', 'Parses grammatical trees', 'Translates words into embeddings', 'Removes punctuation'], correct: 0, explanation: 'Tokenization breaks raw strings down into manageable chunks (like words, sub-words, or bytes) that are mapped to integers.' },
      { id: 'c2q9', prompt: 'What is the difference between CBOW and Skip-gram?', options: ['CBOW predicts a target word from context; Skip-gram predicts context from a target word', 'CBOW is for text, Skip-gram is for images', 'CBOW uses attention, Skip-gram uses RNNs', 'They are the exact same algorithm'], correct: 0, explanation: 'Continuous Bag of Words uses surrounding words to guess the middle word, while Skip-gram uses the middle word to guess the surrounding ones.' },
      { id: 'c2q10', prompt: 'Why is Self-Attention highly parallelizable?', options: ['It requires no matrix multiplication', 'Each token computation depends only on previous tokens sequentially', 'Computations for all tokens in a sequence can be performed simultaneously', 'It only runs on CPUs'], correct: 2, explanation: 'Because attention calculates interactions between all pairs directly without relying on sequential hidden states, it can be parallelized massively.' }
    ],
    topics: ['Sparse Text Vectors & TF-IDF', 'Dense Embeddings (Word2Vec)', 'Sequential Recurrent Networks', 'Queries, Keys, and Values', 'Scaled Dot-Product Attention'],
    hours: 12, color: 'blue', tags: ['Tokenizers', 'Attention', 'Embeddings'], enrolled: true, progress: 28,
  },
  {
    id: 'c3',
    title: 'Web Exploitation & Defence',
    thumbnail: '/thumbnails/c3.jpg',
    blurb: 'Break it, then fix it. XSS, CSRF, injection and the headers that stop them.',
    category: 'Cybersecurity',
    level: 'Intermediate',
    earthCode: 'EARTH-9021',
    channel: 'LiveOverflow',
    channelInitials: 'LO',
    channelColor: 'yellow',
    runtime: '45:20',
    stats: { views: '800K', likes: '45K', comments: '1.2K' },
    missions: [
      { id: 'c3m1', title: 'Cross-Site Scripting (XSS)', youtubeId: 'REPLACE_ME', minutes: 18, completed: false, summary: 'Injecting malicious scripts into web pages viewed by others.', notes: ['Reflected vs Stored', 'DOM-based XSS', 'Escaping HTML'] },
      { id: 'c3m2', title: 'Cross-Site Request Forgery (CSRF)', youtubeId: 'REPLACE_ME', minutes: 16, completed: false, summary: 'Forcing authenticated users to perform unwanted actions.', notes: ['SameSite cookies', 'Anti-CSRF tokens', 'Stateless APIs'] },
      { id: 'c3m3', title: 'SQL Injection Fundamentals', youtubeId: 'REPLACE_ME', minutes: 20, completed: false, summary: 'Manipulating backend database queries via user input.', notes: ['Union-based injection', 'Blind SQLi', 'Prepared statements'] },
      { id: 'c3m4', title: 'Securing the HTTP Headers', youtubeId: 'REPLACE_ME', minutes: 15, completed: false, summary: 'Using browser policies to mitigate attacks.', notes: ['Content Security Policy (CSP)', 'HSTS', 'X-Frame-Options'] }
    ],
    quiz: [
      { id: 'c3q1', prompt: 'What is the primary difference between Stored and Reflected XSS?', options: ['Stored XSS only affects the attacker; Reflected affects everyone', 'Stored XSS saves the payload in the database; Reflected bounces it off the web server directly to the victim', 'Stored XSS uses JavaScript; Reflected uses HTML', 'Reflected XSS is impossible in modern browsers'], correct: 1, explanation: 'Stored XSS is persisted on the server (e.g. in a comment), while Reflected XSS includes the payload in a URL parameter that the server echoes back.' },
      { id: 'c3q2', prompt: 'How does a prepared statement prevent SQL Injection?', options: ['By escaping all single quotes manually', 'By separating the SQL code structure from the user-supplied data', 'By encrypting the database', 'By blocking the DROP command'], correct: 1, explanation: 'Prepared statements send the query template and data separately, preventing the database from ever interpreting data as executable SQL commands.' },
      { id: 'c3q3', prompt: 'What does the SameSite=Strict cookie attribute achieve?', options: ['It encrypts the cookie data', 'It prevents the cookie from being sent on cross-site requests, mitigating CSRF', 'It stops JavaScript from reading the cookie', 'It restricts the cookie to a specific port'], correct: 1, explanation: 'SameSite=Strict ensures the browser only sends the cookie for first-party requests originating from the same domain.' },
      { id: 'c3q4', prompt: 'What attack does X-Frame-Options: DENY mitigate?', options: ['Clickjacking', 'SQL Injection', 'Man-in-the-Middle', 'XSS'], correct: 0, explanation: 'It prevents the page from being rendered in an iframe, stopping attackers from overlaying transparent layers to trick users into clicking.' },
      { id: 'c3q5', prompt: 'Which of the following is an effective mitigation for DOM-based XSS?', options: ['A Web Application Firewall (WAF)', 'HTML entity encoding on the server side', 'Using safe sinks like textContent instead of innerHTML', 'Disabling cookies'], correct: 2, explanation: 'DOM XSS happens entirely in the browser. Using safe DOM APIs prevents malicious strings from being parsed as executable HTML/JS.' },
      { id: 'c3q6', prompt: 'What is the purpose of an Anti-CSRF token?', options: ['To encrypt the user password', 'To ensure a state-changing request was intentionally submitted by the user from the application UI', 'To validate the user session on login', 'To prevent brute-force attacks'], correct: 1, explanation: 'The server verifies that the unique, unpredictable token submitted with the form matches the one generated for the user\'s session.' },
      { id: 'c3q7', prompt: 'What does a Content Security Policy (CSP) primarily do?', options: ['Dictates which sources of executable scripts and resources the browser is allowed to load', 'Encrypts all HTTP traffic', 'Blocks SQL injection at the edge', 'Authenticates users without passwords'], correct: 0, explanation: 'CSP is a defense-in-depth layer that mitigates XSS by restricting where scripts can be loaded from and executed.' },
      { id: 'c3q8', prompt: 'In a Blind SQL Injection, how does the attacker extract data?', options: ['By reading the database error messages displayed on screen', 'By observing differences in application response time or true/false page states', 'By downloading the entire database file', 'By executing a UNION SELECT statement'], correct: 1, explanation: 'Since errors aren\'t visible, the attacker asks True/False questions (e.g. IF condition WAITFOR DELAY) and measures the response.' },
      { id: 'c3q9', prompt: 'Which cookie attribute prevents JavaScript from accessing the cookie via document.cookie?', options: ['Secure', 'HttpOnly', 'SameSite', 'Path'], correct: 1, explanation: 'HttpOnly hides the cookie from client-side scripts, protecting session tokens from being stolen via XSS.' },
      { id: 'c3q10', prompt: 'What does HSTS enforce?', options: ['That the browser only connects to the site over HTTPS', 'That passwords must be complex', 'That sessions expire after 15 minutes', 'That CORS policies are respected'], correct: 0, explanation: 'HTTP Strict Transport Security forces the browser to upgrade all future requests to HTTPS, preventing downgrade attacks.' }
    ],
    topics: ['Reflected vs Stored XSS', 'SameSite and CSRF Mitigation', 'Blind SQL Injection Techniques', 'HTTP Header Security Policies', 'DOM-Based Vulnerabilities'],
    hours: 7, color: 'yellow', tags: ['XSS', 'CSRF', 'Headers'], enrolled: false, progress: 0,
  },
  {
    id: 'c4',
    title: 'React Rendering Internals',
    thumbnail: '/thumbnails/c4.jpg',
    blurb: 'Reconciliation, fibers, and why your component re-rendered twelve times.',
    category: 'Frontend',
    level: 'Intermediate',
    earthCode: 'EARTH-6160',
    channel: 'Jack Herrington',
    channelInitials: 'JH',
    channelColor: 'pink',
    runtime: '55:10',
    stats: { views: '1.2M', likes: '60K', comments: '2.5K' },
    missions: [
      { id: 'c4m1', title: 'The Virtual DOM and Reconciliation', youtubeId: 'REPLACE_ME', minutes: 14, completed: false, summary: 'How React diffs trees efficiently.', notes: ['Render phase vs Commit phase', 'Heuristic diffing', 'The importance of keys'] },
      { id: 'c4m2', title: 'Fiber Architecture deep dive', youtubeId: 'REPLACE_ME', minutes: 24, completed: false, summary: 'Interruptible rendering and the Fiber node structure.', notes: ['Work units', 'Time slicing', 'Concurrent mode basics'] },
      { id: 'c4m3', title: 'Demystifying useEffect and lifecycles', youtubeId: 'REPLACE_ME', minutes: 18, completed: false, summary: 'When and why effects fire.', notes: ['Dependency arrays', 'Cleanup functions', 'Stale closures'] },
      { id: 'c4m4', title: 'Profiling and React.memo', youtubeId: 'REPLACE_ME', minutes: 15, completed: false, summary: 'Measuring performance and avoiding wasted renders.', notes: ['React DevTools Profiler', 'Referential equality', 'useMemo and useCallback'] }
    ],
    quiz: [
      { id: 'c4q1', prompt: 'What is the primary benefit of the React Fiber architecture introduced in React 16?', options: ['It removed the need for the Virtual DOM', 'It allows rendering work to be paused, aborted, or reused', 'It made class components deprecated immediately', 'It forces all state to be global'], correct: 1, explanation: 'Fiber broke rendering down into interruptible units of work, enabling Concurrent React and smoother UI updates.' },
      { id: 'c4q2', prompt: 'When does a React component re-render by default?', options: ['Only when its state changes', 'When its state changes, or when its parent re-renders', 'Only when its props change', 'Every 60 frames per second'], correct: 1, explanation: 'By default, a re-render of a parent component recursively triggers a re-render of all its children, regardless of prop changes.' },
      { id: 'c4q3', prompt: 'What is the purpose of the "key" prop in a list?', options: ['To apply CSS styles dynamically', 'To give the element a unique DOM ID', 'To help React identify which items have changed, been added, or removed', 'To store data inside the element'], correct: 2, explanation: 'Keys provide a stable identity to elements inside an array, making the reconciliation algorithm highly efficient when items reorder.' },
      { id: 'c4q4', prompt: 'What happens if you omit the dependency array in a useEffect?', options: ['The effect never runs', 'The effect runs only once on mount', 'The effect runs after every single render', 'React throws a compilation error'], correct: 2, explanation: 'Without a dependency array, there are no conditions restricting the effect, so it runs after every render cycle.' },
      { id: 'c4q5', prompt: 'How does React.memo prevent unnecessary renders?', options: ['By caching the DOM nodes in localStorage', 'By performing a shallow comparison of the new and old props', 'By preventing the parent from rendering', 'By skipping the commit phase'], correct: 1, explanation: 'React.memo wraps a component and halts the render phase if the incoming props are shallowly equal to the previous props.' },
      { id: 'c4q6', prompt: 'What is a "stale closure" in the context of React hooks?', options: ['A function that fails to execute', 'A hook that captures outdated state variables because its dependencies weren\'t updated', 'A memory leak in the browser', 'When a component unmounts but its state remains'], correct: 1, explanation: 'If a callback or effect uses state but doesn\'t list it in dependencies, it "closes over" the old state value from a previous render.' },
      { id: 'c4q7', prompt: 'What does useCallback do?', options: ['It memoizes the result of a function', 'It memoizes the function definition itself between renders', 'It forces a component to re-render', 'It replaces useEffect for data fetching'], correct: 1, explanation: 'useCallback returns a memoized version of the callback that only changes if one of the dependencies has changed, preserving referential equality.' },
      { id: 'c4q8', prompt: 'During which phase does React actually mutate the DOM?', options: ['The Render Phase', 'The Reconciliation Phase', 'The Commit Phase', 'The Diffing Phase'], correct: 2, explanation: 'The Render phase is pure and computes changes; the Commit phase applies those changes to the actual DOM synchronously.' },
      { id: 'c4q9', prompt: 'Why is mutating state directly (e.g. state.count = 1) bad in React?', options: ['It causes an infinite loop', 'It violates strict mode', 'React\'s reconciliation relies on object identity (reference changes) to trigger renders', 'It is a syntax error in JavaScript'], correct: 2, explanation: 'If you mutate the object, the reference remains the same. React sees the same reference and bails out of re-rendering.' },
      { id: 'c4q10', prompt: 'What is the Virtual DOM?', options: ['A shadow root in the browser', 'A lightweight JavaScript object representation of the actual DOM', 'A separate thread running in Web Workers', 'An iframe hosting the app'], correct: 1, explanation: 'React keeps a JS tree in memory representing the UI, compares it to a new tree (diffing), and calculates the minimal DOM operations needed.' }
    ],
    topics: ['Virtual DOM and Heuristics', 'Fiber Nodes & Time Slicing', 'useEffect Lifecycle & Closures', 'Profiler & React.memo', 'Referential Equality'],
    hours: 5.5, color: 'pink', tags: ['Fiber', 'Hooks', 'Memo'], enrolled: true, progress: 81,
  },
  {
    id: 'c5',
    title: 'Systems Design for Scale',
    thumbnail: '/thumbnails/c5.jpg',
    blurb: 'Queues, caches, shards and the trade-offs interviewers actually probe.',
    category: 'System Design',
    level: 'Advanced',
    earthCode: 'EARTH-8380',
    channel: 'Hussein Nasser',
    channelInitials: 'HN',
    channelColor: 'sky',
    runtime: '1:30:45',
    stats: { views: '3.4M', likes: '120K', comments: '5.6K' },
    missions: [
      { id: 'c5m1', title: 'Load Balancing and Scaling out', youtubeId: 'REPLACE_ME', minutes: 16, completed: false, summary: 'Horizontal vs vertical scaling and distributing traffic.', notes: ['Round-robin', 'Consistent hashing', 'Layer 4 vs Layer 7'] },
      { id: 'c5m2', title: 'Caching strategies and Redis', youtubeId: 'REPLACE_ME', minutes: 22, completed: false, summary: 'Speeding up reads and avoiding database bottlenecks.', notes: ['Cache aside', 'Write-through', 'Eviction policies'] },
      { id: 'c5m3', title: 'Database Sharding and Replication', youtubeId: 'REPLACE_ME', minutes: 26, completed: false, summary: 'Scaling databases beyond a single machine.', notes: ['Partition keys', 'Read replicas', 'Eventual consistency'] },
      { id: 'c5m4', title: 'Message Queues and Async processing', youtubeId: 'REPLACE_ME', minutes: 19, completed: false, summary: 'Decoupling services using pub/sub and queues.', notes: ['RabbitMQ vs Kafka', 'Idempotency', 'Dead letter queues'] },
      { id: 'c5m5', title: 'Understanding the CAP Theorem', youtubeId: 'REPLACE_ME', minutes: 15, completed: false, summary: 'The fundamental trade-offs in distributed systems.', notes: ['Consistency', 'Availability', 'Partition Tolerance'] }
    ],
    quiz: [
      { id: 'c5q1', prompt: 'In the context of scaling, what is Horizontal Scaling?', options: ['Upgrading the CPU and RAM of an existing server', 'Adding more servers to a pool of resources', 'Changing the database schema', 'Moving from a relational DB to NoSQL'], correct: 1, explanation: 'Horizontal scaling (scaling out) involves adding more machines to the network to distribute the load.' },
      { id: 'c5q2', prompt: 'What problem does Consistent Hashing solve?', options: ['Password encryption', 'Minimizing key redistribution when adding or removing cache servers', 'Preventing SQL Injection', 'Load balancing CPU cycles'], correct: 1, explanation: 'Unlike modulo hashing, consistent hashing maps keys and servers to a ring, so adding/removing a server only affects a fraction of the keys.' },
      { id: 'c5q3', prompt: 'Which caching strategy guarantees the cache and database are always strictly in sync?', options: ['Cache-aside', 'Write-through', 'Write-behind', 'Read-through'], correct: 1, explanation: 'In write-through caching, data is written to the cache and the backing store simultaneously, ensuring absolute consistency at the cost of write latency.' },
      { id: 'c5q4', prompt: 'What does the CAP Theorem state about distributed data stores?', options: ['They can only guarantee two out of three: Consistency, Availability, and Partition Tolerance', 'They must be fully Consistent and Available at all times', 'Partition Tolerance is optional in modern networks', 'Caching solves all availability issues'], correct: 0, explanation: 'In the presence of a network partition (P), a system must choose between being Available (A) or Consistent (C).' },
      { id: 'c5q5', prompt: 'What is the primary purpose of a Read Replica?', options: ['To act as a warm backup', 'To scale out read-heavy database workloads by offloading SELECT queries', 'To handle high-volume INSERT operations', 'To automatically shard the database'], correct: 1, explanation: 'Read replicas duplicate the master database data, allowing you to route read-only queries to them and reduce load on the primary server.' },
      { id: 'c5q6', prompt: 'When using Message Queues, what does "Idempotency" mean?', options: ['Messages are delivered exactly once', 'Processing a message multiple times has the same effect as processing it once', 'Messages are encrypted at rest', 'The queue is ordered strictly by time'], correct: 1, explanation: 'Since queues often guarantee at-least-once delivery, consumers must be idempotent to safely handle duplicate messages without unintended side effects.' },
      { id: 'c5q7', prompt: 'What is a major disadvantage of Database Sharding?', options: ['It decreases storage capacity', 'It slows down single-row lookups', 'Complex queries like cross-shard JOINs become extremely difficult and slow', 'It forces you to use Graph databases'], correct: 2, explanation: 'When data is split across multiple machines, performing a JOIN requires pulling data from multiple nodes over the network.' },
      { id: 'c5q8', prompt: 'What is the difference between Layer 4 and Layer 7 load balancing?', options: ['Layer 4 relies on IP/TCP; Layer 7 can inspect HTTP headers and routes', 'Layer 4 is slower than Layer 7', 'Layer 4 is for databases; Layer 7 is for caches', 'There is no functional difference'], correct: 0, explanation: 'Layer 7 load balancers operate at the application layer, allowing intelligent routing based on URL paths or cookies, whereas Layer 4 routes blindly by IP/Port.' },
      { id: 'c5q9', prompt: 'What is an LRU cache eviction policy?', options: ['Least Randomly Used', 'Least Recently Used', 'Longest Running Unit', 'Late Response Update'], correct: 1, explanation: 'When the cache is full, LRU evicts the items that haven\'t been accessed for the longest time.' },
      { id: 'c5q10', prompt: 'Why is Apache Kafka often chosen over RabbitMQ for event sourcing?', options: ['Kafka is much easier to set up', 'Kafka persists messages to a log, allowing consumers to replay past events', 'RabbitMQ does not support multiple consumers', 'Kafka guarantees exactly-once delivery by default'], correct: 1, explanation: 'Kafka is a distributed append-only log, meaning messages aren\'t destroyed when read. New consumers can replay history from the beginning.' }
    ],
    topics: ['Horizontal vs Vertical Scaling', 'Cache Aside & Eviction', 'Sharding & Replication Strategies', 'Decoupling via Message Queues', 'CAP Theorem Trade-offs'],
    hours: 11, color: 'sky', tags: ['Caching', 'Sharding', 'CAP'], enrolled: false, progress: 0,
  },
  {
    id: 'c6',
    title: 'Statistics for Machine Learning',
    thumbnail: '/thumbnails/c6.jpg',
    blurb: 'Distributions, inference and the maths that stops your model lying to you.',
    category: 'AI/ML',
    level: 'Beginner',
    earthCode: 'EARTH-4200',
    channel: 'StatQuest',
    channelInitials: 'SQ',
    channelColor: 'lime',
    runtime: '2:10:00',
    stats: { views: '5.6M', likes: '200K', comments: '8.9K' },
    missions: [
      { id: 'c6m1', title: 'Probability Distributions', youtubeId: 'REPLACE_ME', minutes: 17, completed: false, summary: 'Normal, Binomial, and Poisson distributions.', notes: ['PDFs and PMFs', 'Expected value', 'Variance and Standard Deviation'] },
      { id: 'c6m2', title: 'Hypothesis Testing & P-values', youtubeId: 'REPLACE_ME', minutes: 21, completed: false, summary: 'Determining if a result is statistically significant.', notes: ['Null hypothesis', 'Type I and Type II errors', 'Confidence intervals'] },
      { id: 'c6m3', title: 'Bayesian Inference', youtubeId: 'REPLACE_ME', minutes: 24, completed: false, summary: 'Updating beliefs in the presence of new evidence.', notes: ['Bayes Theorem', 'Priors and Posteriors', 'Likelihood'] },
      { id: 'c6m4', title: 'Sampling and Bootstrapping', youtubeId: 'REPLACE_ME', minutes: 18, completed: false, summary: 'Estimating population statistics from small samples.', notes: ['Central Limit Theorem', 'Law of Large Numbers', 'Resampling techniques'] }
    ],
    quiz: [
      { id: 'c6q1', prompt: 'What does the Central Limit Theorem state?', options: ['All data follows a normal distribution', 'The sum or average of a large number of independent variables is approximately normally distributed, regardless of the underlying distribution', 'The median is always equal to the mean in large samples', 'Larger samples always have smaller variance'], correct: 1, explanation: 'The CLT is foundational because it allows us to use normal distribution statistics to estimate means, even if the population itself is skewed.' },
      { id: 'c6q2', prompt: 'What is a p-value?', options: ['The probability that the alternate hypothesis is true', 'The probability of observing the data, or something more extreme, assuming the null hypothesis is true', 'The probability that your experiment succeeded', 'The exact margin of error'], correct: 1, explanation: 'A p-value measures evidence against the null hypothesis; a lower p-value means the observed data is highly unlikely if the null was true.' },
      { id: 'c6q3', prompt: 'In hypothesis testing, what is a Type I error?', options: ['Failing to reject a false null hypothesis (False Negative)', 'Rejecting a true null hypothesis (False Positive)', 'Using the wrong statistical test', 'A calculation error in the mean'], correct: 1, explanation: 'Type I error is a False Positive: claiming there is an effect or difference when in reality there is none.' },
      { id: 'c6q4', prompt: 'Which of Bayes\' Theorem components represents your belief before seeing any data?', options: ['The Likelihood', 'The Posterior', 'The Prior', 'The Evidence'], correct: 2, explanation: 'The Prior probability encodes your initial belief or knowledge before the current evidence is considered.' },
      { id: 'c6q5', prompt: 'What is the purpose of bootstrapping in statistics?', options: ['To invent fake data to make the model perform better', 'To estimate the variance or confidence interval of a statistic by repeatedly resampling with replacement from the dataset', 'To increase the speed of algorithms', 'To initialize neural network weights'], correct: 1, explanation: 'Bootstrapping is a powerful non-parametric method to assess the accuracy of an estimate by simulating new samples from the one you have.' },
      { id: 'c6q6', prompt: 'If a dataset is heavily skewed to the right, how do the mean and median compare?', options: ['Mean < Median', 'Mean = Median', 'Mean > Median', 'They are completely unrelated'], correct: 2, explanation: 'A right-skewed distribution has a long tail of high values, which pulls the mean up higher than the median.' },
      { id: 'c6q7', prompt: 'What does the standard deviation measure?', options: ['The average value of the dataset', 'The total range of the dataset', 'The average squared distance from the mean', 'The average amount by which values deviate from the mean'], correct: 3, explanation: 'Standard deviation is the square root of the variance, providing a measure of spread in the same units as the original data.' },
      { id: 'c6q8', prompt: 'Which distribution models the number of events occurring in a fixed interval of time or space?', options: ['Normal Distribution', 'Binomial Distribution', 'Poisson Distribution', 'Exponential Distribution'], correct: 2, explanation: 'The Poisson distribution is discrete and expresses the probability of a given number of events happening in a fixed interval (e.g. emails per hour).' },
      { id: 'c6q9', prompt: 'What does a 95% Confidence Interval actually mean?', options: ['There is a 95% chance the true parameter falls in this specific interval', 'If we repeated the experiment many times, 95% of the calculated intervals would contain the true parameter', '95% of the data falls within this interval', 'The result is 95% accurate'], correct: 1, explanation: 'The interval itself doesn\'t have a 95% probability. The confidence is in the procedure: over infinite repetitions, 95% of intervals generated will capture the true mean.' },
      { id: 'c6q10', prompt: 'In a normal distribution, approximately what percentage of data falls within one standard deviation of the mean?', options: ['50%', '68%', '95%', '99.7%'], correct: 1, explanation: 'According to the empirical rule (68-95-99.7), about 68% of the area under a normal curve lies within one standard deviation.' }
    ],
    topics: ['Probability Distributions (Normal, Poisson)', 'P-values and Null Hypothesis', 'Type I and Type II Errors', 'Bayesian Priors and Likelihood', 'Bootstrapping & Resampling'],
    hours: 6, color: 'lime', tags: ['Bayes', 'Inference', 'Sampling'], enrolled: false, progress: 0,
  }
];


export const featuredCourse = {
  id: 'f1',
  title: 'Transformers, End to End',
  thumbnail: '/thumbnails/c2.jpg',
  blurb:
    'One mission chain that takes you from raw text to a working attention block you wrote yourself. No hand-waving, no imported magic.',
  level: 'Advanced',
  missions: 22,
  hours: 15,
  tags: ['Attention', 'Positional Encoding', 'Fine-tuning'],
};

export const preLearningTopics = [
  'Linear Algebra',
  'Gradient Descent',
  'Backpropagation',
  'Convolutions',
  'Recurrent Networks',
  'Attention Mechanism',
  'Regularisation',
  'Batch Normalisation',
];

export const velocityData = [
  { day: 'S', velocity: 3 },
  { day: 'M', velocity: 5 },
  { day: 'T', velocity: 4 },
  { day: 'W', velocity: 8 },
  { day: 'T', velocity: 6 },
  { day: 'F', velocity: 11 },
  { day: 'S', velocity: 9 },
];

export const learningTimeData = [
  { day: 'Mon', hours: 2.1 },
  { day: 'Tue', hours: 3.4 },
  { day: 'Wed', hours: 1.2 },
  { day: 'Thu', hours: 4.0 },
  { day: 'Fri', hours: 2.8 },
  { day: 'Sat', hours: 5.2 },
  { day: 'Sun', hours: 3.1 },
];

export const accuracyTrend = [
  { week: 'W1', accuracy: 54 },
  { week: 'W2', accuracy: 61 },
  { week: 'W3', accuracy: 58 },
  { week: 'W4', accuracy: 72 },
  { week: 'W5', accuracy: 79 },
  { week: 'W6', accuracy: 88 },
];

export const telemetryStats = [
  { label: 'Avg Daily Time', value: '2.7 hr', delta: '+12%', color: 'sky', icon: 'Clock' },
  { label: 'Quiz Accuracy', value: '88%', delta: '+6%', color: 'red', icon: 'Target' },
  { label: 'Concepts Mastered', value: '34', delta: '+4', color: 'yellow', icon: 'Brain' },
  { label: 'Weekly Progress', value: '76%', delta: '+18%', color: 'pink', icon: 'TrendingUp' },
];

export const projects = [
  {
    id: 'p1',
    title: 'Modern Portfolio Builder',
    blurb: 'Ship a responsive personal site with a component system you can defend in a review.',
    level: 'Beginner',
    color: 'red',
    stack: ['React', 'Tailwind', 'Vite', 'Netlify'],
    flow: ['Wireframe UI', 'Build component system', 'Add content pass', 'Deploy to production'],
  },
  {
    id: 'p2',
    title: 'REST Task API',
    blurb: 'CRUD with auth, validation and pagination. The one every backend interview asks about.',
    level: 'Intermediate',
    color: 'blue',
    stack: ['Node', 'Express', 'MongoDB', 'JWT'],
    flow: ['Design schema', 'Build routes and auth', 'Add validation', 'Write docs and tests'],
  },
  {
    id: 'p3',
    title: 'Sentiment Analyzer',
    blurb: 'Classify text end to end — preprocessing, training loop, and an honest confusion matrix.',
    level: 'Intermediate',
    color: 'yellow',
    stack: ['Python', 'scikit-learn', 'pandas', 'Streamlit'],
    flow: ['Prepare corpus', 'Vectorise text', 'Train and tune model', 'Serve via UI'],
  },
  {
    id: 'p4',
    title: 'Realtime Chat Grid',
    blurb: 'Sockets, presence and optimistic updates without the state turning to soup.',
    level: 'Advanced',
    color: 'pink',
    stack: ['React', 'Socket.io', 'Redis', 'Docker'],
    flow: ['Setup socket layer', 'Handle user presence', 'Build optimistic UI', 'Run load tests'],
  },
];

export const badges = [
  { id: 'b1', name: 'Earth Crafter', note: 'Shipped a first project mission', color: 'red', unlocked: true, icon: 'Hammer' },
  { id: 'b2', name: 'Neural Explorer', note: 'Cleared 10 AI concept nodes', color: 'blue', unlocked: true, icon: 'Brain' },
  { id: 'b3', name: 'Quest Perfect', note: 'Score 100% on any mission quiz', color: 'yellow', unlocked: false, icon: 'Trophy' },
  { id: 'b4', name: 'Canon Keeper', note: 'Hold a 30-day streak', color: 'pink', unlocked: false, icon: 'Flame' },
  { id: 'b5', name: 'Spider-Sense', note: 'Answer 50 revision cards correctly', color: 'sky', unlocked: false, icon: 'Radar' },
  { id: 'b6', name: 'Multiverse Elite', note: 'Finish every mission in one track', color: 'lime', unlocked: false, icon: 'Star' },
];



// One year of daily activity for the profile heatmap. Deterministic so it never
// reshuffles between renders.
export function buildActivity() {
  const cells = [];
  let seed = 42;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 0; i < 371; i++) {
    const r = rand();
    cells.push(r > 0.82 ? 4 : r > 0.68 ? 3 : r > 0.5 ? 2 : r > 0.3 ? 1 : 0);
  }
  return cells;
}
