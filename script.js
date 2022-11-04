PetiteVue.createApp({
  onQuiz: true, // クイズと結果の画面切り替え
  fewAnswers: false, // 全問回答されたかチェック

  answers: [], // 回答のリスト

  /** クイズリスト */
  quizList: [
    // 1問目
    {
      statement: '桃太郎の家来じゃないのは誰？', // クイズの文章
      options: [
        {
          statement: '鬼だよ', // 選択肢の文章
          value: '鬼' // 選択肢の文章が長いときには回答は短くできる
        },
        {
          statement: '犬だよ',
          value: '犬'
        },
        {
          statement: '猿だよ',
          value: '猿'
        },
        {
          statement: '雉だよ',
          value: '雉'
        }
      ]
    },
    // 2問目
    {
      statement: '桃太郎が家来たちにあげたのは何？',
      options: [
        {
          statement: 'きびだんご',
          value: 'きびだんご'
        },
        {
          statement: 'どろだんご',
          value: 'どろだんご'
        },
        {
          statement: 'みたらしだんご',
          value: 'みたらしだんご'
        },
        {
          statement: 'つみれだんご',
          value: 'つみれだんご'
        }
      ]
    }
  ],

  /** 結果判定の処理 */
  showResult() {
    if (this.answers.length != this.quizList.length) {
      this.fewAnswers = true;
      return;
    }
    this.fewAnswers = false;
    this.onQuiz = false;

    // どの結果を表示するか選ぶ処理をがんばって書く
    this.judge = 1;
  },

  judge: 0, // 結果

  /** 判定結果として表示する内容 */
  judgmentList: [
    {
      statement: 'あなたのパートナーは桃太郎タイプ',
      links: [
        {
          title: '桃太郎のための食事計画',
          url: 'https://www.google.co.jp'
        },
        {
          title: '桃太郎との付き合い方',
          url: 'https://zenn.dev/ojk'
        }
      ]
    },
    {
      statement: 'あなたのパートナーは猿タイプ',
      links: [
        {
          title: '本当は一番猿がいい',
          url: 'https://www.google.co.jp'
        },
        {
          title: '猿の餌付け',
          url: 'https://zenn.dev/ojk'
        }
      ]
    }
  ],

  // 配列をシャッフル
  // https://www.nxworld.net/js-array-shuffle.html
  shuffle([...array]) {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}).mount();
