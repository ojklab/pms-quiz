PetiteVue.createApp({
  onQuiz: true, // クイズと結果の画面切り替え
  fewAnswers: false, // 全問回答されたかチェック
  errorFlag: false, // 判定処理で何も選ばれていない
  answers: [], // 回答のリスト
  judgedNum: 0, // 結果

  // 配列をシャッフルするユーティリティ関数
  // https://www.nxworld.net/js-array-shuffle.html
  shuffle([...array]) {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  },

  /** 結果判定の処理 */
  showResult() {
    if (this.answers.length != this.quizList.length) {
      this.fewAnswers = true;
      return;
    }
    this.fewAnswers = false;
    this.errorFlag = false;
    this.onQuiz = false;

    const n = this.judge();
    if (n == undefined) {
      this.errorFlag = true;
      this.onQuiz = true;
      return;
    } else {
      this.judgedNum = n;
    }
  },

  /** ★クイズリスト★ */
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
    // 続きは自分で書く
  ],

  /** ★判定結果リスト★ */
  judgmentList: [
    // 判定結果 0
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
    // 判定結果 1
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
    },
    // 判定結果 2
    {
      statement: 'あなたはパートナーを考え直したほうがいい',
      links: [
        {
          title: 'まともなパートナーの選び方',
          url: 'https://www.google.co.jp'
        },
        {
          title: 'パートナーの再教育',
          url: 'https://zenn.dev/ojk'
        }
      ]
    }
    // 続きは自分で書く
  ],

  /** ★判定処理★ */
  judge() {
    const ans = this.answers; // 回答結果のリスト
    let num; // 判定結果の番号を入れる

    /* ここから  */
    if (ans[0] == '鬼' && ans[1] == 'きびだんご') {
      num = 0;
    } else if (ans[0] == '猿' && ans[1] == 'きびだんご') {
      num = 1;
    } else {
      num = 2;
    }
    /* ここまで */

    return num;
  }
}).mount();
