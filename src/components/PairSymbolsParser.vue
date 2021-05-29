<template lang="pug">
.container
  .row
    .input-group.input-group-lg
      input.form-control(
        type='text',
        aria-label='Sizing example input',
        aria-describedby='inputGroup-sizing-lg',
        v-model='str'
      )
      span.badge.bg-primary(:class='classes') Large
</template>

<script>
import commonMixin from '@/mixins/commonMixin.js';

export default {
  name: 'PairSymbolsParser',
  mixins: [commonMixin],
  data() {
    return {
      str: '[](([ghjghjg]"hjghjdfg"))',
      // brackets: {
      //   '<': '>',
      //   '(': ')',
      //   '[': ']',
      //   '{': '}',
      // },
      brackets: new Map([
        ['<', '>'],
        ['(', ')'],
        ['[', ']'],
        ['{', '}'],
      ]),
      quotes: '"`\'',
      stack: [],
      bracketSymbol: null,
      quoteSymbolIndex: -1,
      isOpening: false,
    };
  },
  computed: {
    isPairBracket() {
      return this.bracketSymbol;
    },
    isPairQuote() {
      return this.quoteSymbolIndex >= 0;
    },
    isPairSymbol() {
      return this.isPairBracket || this.isPairQuote;
    },
    isComparedSymbol() {
      const lastStackElem = this.stack[this.stack.length - 1];

      if (!lastStackElem) {
        return false;
      }

      return (
        // this.brackets[lastStackElem] == this.bracketSymbol ||
        this.brackets.get(lastStackElem) == this.bracketSymbol ||
        lastStackElem == this.quotes[this.quoteSymbolIndex]
      );
    },
    classes() {
      const result = this.parsePairSymbols();
      return {
        'bg-success': result,
        'bg-danger': !result,
      };
    },
  },
  methods: {
    setVars(isOpening, isBracket = true) {
      const cond = isBracket ? this.isPairBracket : this.isPairQuote;

      if (cond) {
        if (isBracket) {
          this.quoteSymbolIndex = -1;
        } else {
          this.bracketSymbol = null;
        }

        this.isOpening = isOpening;
      }

      return cond;
    },
    isOpeningBracket(symbol) {
      // this.bracketSymbol = this.isExisted(this.brackets, symbol);
      this.bracketSymbol = this.brackets.has(symbol);

      return this.setVars(true);
    },
    isClosingBracket(symbol) {
      // for (const key in this.brackets) {
      //   if (this.brackets[key] == symbol) {
      //     this.bracketSymbol = symbol;
      //     break;
      //   }
      // }
      for (const value of this.brackets.values()) {
        if (value == symbol) {
          this.bracketSymbol = symbol;
          break;
        }
      }

      return this.setVars(false);
    },
    findPairSymbolIndex(symbol) {
      if (this.isOpeningBracket(symbol)) {
        return;
      }

      if (this.isClosingBracket(symbol)) {
        return;
      }

      this.quoteSymbolIndex = this.quotes.indexOf(symbol);

      if (this.isPairQuote) {
        if (!this.isComparedSymbol) {
          this.setVars(true, false);
        } else {
          this.setVars(false, false);
        }
      }
    },
    parsePairSymbols() {
      let curSymbol;

      this.stack.length = 0;

      for (let i = 0; i < this.str.length; i++) {
        curSymbol = this.str[i];

        this.findPairSymbolIndex(curSymbol);

        if (this.isPairSymbol) {
          if (this.isOpening) {
            this.stack.push(curSymbol);
          } else if (this.isComparedSymbol) {
            if (!this.stack.pop(curSymbol)) {
              return false;
            }
          } else {
            return false;
          }
        }
      }

      if (this.stack.length) {
        return false;
      }

      return true;
    },
  },
};
</script>
