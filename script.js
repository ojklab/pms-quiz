PetiteVue.createApp({
  mode: 'top',
  isFemale: true,
  noData: false,
  onQuiz: true, // クイズと結果の画面切り替え
  fewAnswers: false, // 全問回答されたかチェック
  errorFlag: false, // 判定処理で何も選ばれていない
  answers: { f: [], m: [] }, // 回答のリスト
  coinDeg: 0, // 一致度

  // 配列をシャッフルするユーティリティ関数（今回は使わない）
  // https://www.nxworld.net/js-array-shuffle.html
  shuffle([...array]) {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  },

  get fm() {
    return this.isFemale ? 'f' : 'm';
  },

  beginQuiz() {
    if (!localStorage.pms_quiz) {
      this.noData = true;
      return;
    }
    this.mode = 'quiz';
    this.isFemale = false;
  },

  /** 結果をローカルストレージに記録 */
  recordAnswers() {
    if (this.answers.f.length != this.quizList.length) {
      this.fewAnswers = true;
      return;
    }
    this.fewAnswers = false;

    localStorage.pms_quiz = JSON.stringify(this.answers.f);

    window.confirm(
      '回答をあなたのブラウザーに記録しました。このあとすぐに男性が回答しない場合は、トップページをブックマークしておくと便利です。'
    );

    this.noData = false;
    this.mode = 'top';
  },

  /** ローカルストレージを削除 */
  deleteData() {
    delete localStorage.pms_quiz;
    window.confirm('ブラウザーに記録していたデータを削除しました。');
  },

  /** 一致度を示すために背景色をつける */
  addColor(n_quiz, n_opt) {
    const ans_m = this.answers.m;
    const ans_f = this.answers.f;

    if (ans_f[n_quiz] == n_opt) {
      if (ans_m[n_quiz] == n_opt) {
        return { backgroundColor: 'plum' };
      } else {
        return { backgroundColor: 'palevioletred' };
      }
    } else if (ans_m[n_quiz] == n_opt) {
      return { backgroundColor: 'cornflowerblue' };
    } else {
      return { backgroundColor: 'transparent' };
    }
  },

  /** 結果判定の処理 */
  showResult() {
    if (this.answers.m.length != this.quizList.length) {
      this.fewAnswers = true;
      return;
    }
    this.fewAnswers = false;

    this.answers.f = JSON.parse(localStorage.pms_quiz);
    const ans_m = this.answers.m;
    const ans_f = this.answers.f;

    let sum = 0;
    for (let i = 0; i < this.quizList.length; i += 1) {
      if (ans_m[i] == ans_f[i]) {
        sum += 1;
      }
    }
    this.coinDeg = (sum / this.quizList.length) * 100;

    this.mode = 'result';
    window.scroll({ top: 0, behavior: 'smooth' });
  },

  /** ★クイズリスト★ */
  quizList: [
    // 1問目
    {
      statement: '桃太郎の家来じゃないのは誰？', // クイズの文章
      options: ['鬼だよ', '犬だよ', '猿だよ', '雉だよ'] // 選択肢
    },
    // 2問目
    {
      statement: '桃太郎が家来たちにあげたのは何？',
      options: ['きびだんご', 'どろだんご', 'みたらしだんご', 'つみれだんご']
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
  ]
}).mount();
