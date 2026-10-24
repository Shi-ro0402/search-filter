# 学習ノート｜Search Filter

## 1. 学習の目的

検索・フィルタ機能を持つWebアプリの開発を通して、ソースコードの役割、データの流れ、画面表示の仕組みを理解する。

## 2. 開発環境

- エディター：VS Code
- フレームワーク：Next.js 16.4.3
- 言語：TypeScript
- スタイリング：Tailwind CSS
- 開発サーバー：npm run dev
- ローカルURL：http://localhost:3001 （今回の起動時）

## 3. 学んだ技術用語

### JSON
データを項目名と値の組み合わせで整理する形式。今回の商品データ30件の管理に利用する予定。

### fetch
指定したURLからデータを取得するためのJavaScriptの機能。

### page.tsx
Next.jsのApp Routerで、該当するURLの画面を定義するファイル。

### npm run dev
開発用サーバーを起動するコマンド。

### localhost
自分のPCで動いているサーバーへアクセスするためのホスト名。

### Lint（ESLint）
コードの書き方の問題を自動で見つける道具。文法は正しくても、バグや無駄な処理につながりやすい書き方を指摘する。`npm run lint` で実行する。

### useEffect
画面を描いた「後」に実行したい処理（データ取得など）を書く場所。第2引数の依存配列（例：`[reloadCount]`）の値が変わると、もう一度実行される。

### cleanup（後片付け）
useEffectから返す関数。effectが再実行される前や、コンポーネントが画面から消えるときに実行される。古い処理の結果を無視するために使える。

### Promise と .then / .catch / .finally
時間がかかる処理（非同期処理）の結果を扱う仕組み。`.then` は成功時、`.catch` は失敗時、`.finally` は成功・失敗どちらでも最後に実行される。

## 4. ソースコードの理解

今後、各ファイルについて以下を記録する。

- ファイル名と役割
- 重要な関数や処理の意味
- データの入力元と出力先
- 他のファイルとのつながり

## 5. エラー・解決履歴

### 記録テンプレート
- 発生した問題：
- 原因：
- 対応内容：
- 解決結果：
- 次回への学び：

### 2026-10-24：lintエラー `react-hooks/set-state-in-effect`

- 発生した問題：
  - `npm run lint` で `components/ProductSearch.tsx` 101行目（`useEffect` 内の `void loadProducts();`）がエラーになった。
  - メッセージ：「effectの中でsetStateを同期的に呼ぶと、連鎖的な再描画が起きる可能性がある」
- 原因：
  - `useEffect` から呼んだ `loadProducts()` が、最初に `setLoading(true)` と `setError(false)` をすぐ実行していた。
  - 画面を描いた直後に状態を変えるため、Reactがもう一度描き直す（無駄な再描画）。
  - `loading` の初期値はもともと `true` なので、初回の `setLoading(true)` は不要だった。
- 対応内容：
  1. データ取得だけを行う `fetchProducts()` をコンポーネントの外に定義した（setStateを含まない）。
  2. `useEffect` の中では、`.then` / `.catch` / `.finally`（データが届いた後）でだけsetStateする形にした。
  3. 再試行は `reloadCount` という状態を +1 して、useEffectを再実行させる方式にした（`handleRetry`）。
  4. cleanupで `ignore = true` にし、古い取得結果が画面に反映されないようにした。
  5. 不要になった `useCallback` と `loadProducts` を削除した。
  - 検索・カテゴリ絞り込み・URL同期の処理は変更していない。
- 解決結果：
  - `npm run lint`：エラー0件
  - `npx tsc --noEmit`：型エラー0件
  - `npx tsx scripts/test-filter.ts`：3件すべてPASS
  - `npm run build`：成功
- 次回への学び：
  - 最初は「`setLoading(true)` を消すだけ」で直ると考えたが、同じエラーが出た。このルールは「effectの中で、setStateを含む関数を呼ぶこと」自体をチェックしている。
  - 「データを取る処理」と「状態を変える処理」を分けると、ルールに沿ったわかりやすいコードになる。
  - 非同期処理をuseEffectで行うときは、cleanup（`ignore` フラグ）を付けると、古い結果で画面が上書きされるのを防げる。開発モード（Strict Mode）ではeffectが2回実行されるが、1回目の結果は無視される。

## 6. 疑問点・振り返り

学習中に疑問に思ったことや、自分の言葉で説明できるようになったことを記録する。

学習ノートに追加する内容
docs/learning-notes.md には、次の違いを記録しておくとよいでしょう。
- 識別子（ID・コード）：プログラムがデータを区別するための値。今回の pc や accessories など。
- 表示名（ラベル）：ユーザーにわかりやすく見せるための文字。「パソコン」「PC周辺機器」など。
- カテゴリ対応表：識別子を表示名に変換するための定義。
まだVS Codeでコードを編集する必要はありません。
商品名の方向性が決まったら、次は具体的な30件の商品を設計し、READMEの第7章へ反映していきましょう。