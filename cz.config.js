module.exports = {
  types: [
    { value: 'feat',     name: '✨ feat:     Nova funcionalidade' },
    { value: 'fix',      name: '🐛 fix:      Correção de bug' },
    { value: 'chore',    name: '🔧 chore:    Manutenção' },
    { value: 'docs',     name: '📝 docs:     Documentação' },
    { value: 'refactor', name: '♻️ refactor: Refatoração' },
    { value: 'test',     name: '🧪 test:     Testes' },
    { value: 'style',    name: '🎨 style:    Estilo/formatação' },
    { value: 'perf',     name: '⚡ perf:     Performance' }
  ],

  useEmoji: true,
  emojiAlign: 'center',
  maxSubjectLength: 72,
  skipQuestions: ['scope'],
};