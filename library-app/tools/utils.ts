import fs from 'fs';
import path from 'path';

/**
  * @description 文字列の先頭を大文字に変換する関数
  * @param { string } s 変換対象の文字列
  * @returns { string } 先頭が大文字に変換された文字
  */
export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
  * @description 文字列の先頭を小文字に変換する関数
  * @param { string } s 変換対象の文字列
  * @returns { string } 先頭が小文字に変換された文字
  */
export function lowerCaseFirst(s: string): string {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

/**
 * @description ファイルを書き込む関数
 * @param { string } filePath ファイルのパス
 * @param { string } content 書き込む内容
 */
export function writeFile(filePath: string, content: string): void {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content, 'utf8');

  console.log(`Created: ${filePath}`);
}
