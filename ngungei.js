/* 推導標準吳語
 * 標準吳語爲一種標準化之吳語方言
 * https://wuu.wikipedia.org/wiki/%E6%A0%87%E5%87%86%E5%90%B4%E8%AF%AD
 * https://github.com/DINISHING/vocabulary/
 * @author saeziae
 */

if (!音韻地位) return [];

const is = (x) => 音韻地位.屬於(x);

function 聲母規則() {
  if (is("幫滂母 東鍾微虞廢文元陽尤凡韻 三等")) return "f";
  if (is("並母 東鍾微虞廢文元陽尤凡韻 三等")) return "v";
  if (is("明母 微虞廢文韻 三等")) return "v"; // m v 兩讀，按常見程度定 ung, ong, ae 前爲 m; i, en 前爲 v.
  if (is("幫母")) return "p";
  if (is("滂母")) return "ph";
  if (is("並母")) return "b";
  if (is("明母")) return "m";

  if (is("端母")) return "t";
  if (is("透母")) return "th";
  if (is("定母")) return "d";
  if (is("泥孃日母")) return "n";
  if (is("來母")) return "l";

  //魚韻分韻
  if (is("知章母 魚韻")) return "tz";
  if (is("徹昌母 魚韻")) return "ts";
  if (is("澄母 魚韻")) return "dz";
  if (is("書母 魚韻")) return "s";
  if (is("常船母 魚韻")) return "z";

  if (is("知母")) return is("三等") ? "c" : "tz";
  if (is("徹母")) return is("三等") ? "ch" : "ts";
  if (is("澄母")) return is("三等") ? "j" : "dz";

  if (is("精莊母")) return "tz";
  if (is("清初母")) return "ts";
  if (is("心生母")) return "s";
  if (is("從邪崇俟母")) return "z";

  if (is("章母")) return "c";
  if (is("昌母")) return "ch";
  if (is("書母")) return "sh";
  if (is("常船母")) return "zh";

  if (is("見母")) return "k";
  if (is("溪母")) return "kh";
  if (is("曉母")) return "h";
  if (is("羣母")) return "g";
  if (is("疑母")) return "ng";

  if (is("匣云以母")) return "gh";
  if (is("影母")) return "";
  throw new Error("無聲母規則");
}

function 韻母規則() {
  // 通攝
  if (is("東冬鍾韻 三等 脣音")) return "ung";
  if (is("東冬鍾韻 三等 莊精組")) return "ung";
  if (is("東冬鍾韻 三等 來母")) return "ung";
  if (is("東冬鍾韻 三等")) return "iung";
  if (is("東冬鍾韻")) return "ung";

  // 江攝
  if (is("江韻")) return "ong";

  // 止攝
  if (is("支脂之微韻 脣音")) return "i";
  if (is("支韻 開口 知章組")) return "i"; //知章+支 分韻
  if (is("支脂之微韻 開口 來孃日母")) return "i";
  if (is("支脂之微韻 開口 知組")) return "y";
  if (is("支脂之微韻 開口 齒音")) return "y";
  if (is("支脂之微韻 開口")) return "i";

  if (is("支脂之微韻 合口 來孃母")) return "i";
  if (is("支脂之微韻 合口 端組")) return "ei";
  if (is("支脂之微韻 合口 莊組")) return "ei";
  if (is("支脂之微韻 合口")) return "iu";

  // 遇攝
  //讀u
  if (is("魚虞韻 脣音")) return "u";
  if (is("魚虞韻 莊組")) return "u";
  if (is("魚虞韻 孃母")) return "iu";
  //魚韻分離
  if (is("魚韻 來日母")) return "i";
  if (is("魚韻 精組")) return "i";
  if (is("魚韻 知章組")) return "y";
  if (is("魚韻 牙音")) return "ei";
  if (is("魚韻 曉母")) return "ei";
  if (is("魚韻 喉音")) return "i";
  //其他
  if (is("魚虞韻")) return "iu";
  if (is("模韻")) return "u";

  // 蟹攝
  if (is("齊韻 合口")) return "iu";
  if (is("齊韻")) return "i";

  if (is("祭韻 脣音")) return "i";
  if (is("祭韻 開口")) return "i";
  if (is("祭韻 合口")) return "iu";

  if (is("泰韻 脣音")) return "ei";
  if (is("泰韻 開口 舌齒音")) return "a";
  if (is("泰韻 開口 牙喉音")) return "ai";
  if (is("泰韻 合口 舌齒音")) return "ei";
  if (is("泰韻 合口 牙喉音 疑母")) return "a";
  if (is("泰韻 合口 牙喉音")) return "uei";

  if (is("佳皆夬韻 脣音")) return "a";
  if (is("佳皆夬韻 開口")) return "a";

  if (is("佳皆夬韻 合口 疑母")) return "a";
  if (is("夬韻 合口 喉音")) return "uo";
  if (is("佳韻 合口 牙喉音")) return "uo";
  if (is("佳皆夬韻")) return "ua";

  if (is("灰韻 脣音")) return "ei";
  if (is("灰韻 舌齒音")) return "ei";
  if (is("灰韻 牙喉音")) return "uei";
  if (is("咍韻")) return "ai";
  if (is("廢韻 牙喉音")) return "uei";
  if (is("廢韻")) return "i";

  // 臻攝
  if (is("眞韻 脣音")) return "in";
  if (is("眞韻 開口 莊組")) return "eng";
  if (is("眞韻 開口")) return "in";
  if (is("眞韻 合口")) return "iun";

  if (is("臻文欣韻 脣音")) return "eng";
  if (is("臻文欣韻 開口")) return "in";
  if (is("臻文欣韻 合口")) return "iun";

  if (is("元韻 脣音")) return "ae";
  if (is("元韻 開口")) return "iee";
  if (is("元韻 合口")) return "ioe";

  if (is("魂韻 牙喉音 疑母")) return "eng";
  if (is("魂韻 牙喉音")) return "ueng";
  if (is("魂韻")) return "eng";
  if (is("痕韻")) return "eng";

  // 山攝
  if (is("寒韻 脣音")) return "oe";
  if (is("寒韻 開口 舌齒音")) return "ae";
  if (is("寒韻 開口 牙喉音")) return "oe";
  if (is("寒韻 合口 舌齒音")) return "oe";
  if (is("寒韻 合口 牙喉音")) return "uoe";

  if (is("刪山韻 脣音")) return "ae";
  if (is("刪山韻 開口")) return "ae";
  if (is("刪山韻 合口 舌齒音")) return "oe";
  if (is("刪山韻 合口 牙喉音")) return "uae";

  if (is("仙韻 脣音")) return "iee";
  if (is("仙韻 開口")) return "iee";
  if (is("仙韻 合口 來母")) return "iee";

  //四等
  if (is("先韻 脣音")) return "iae";
  if (is("先韻 開口")) return "iae";
  if (is("先韻 合口 來母")) return "iae";

  if (is("仙先韻 合口 日母")) return "ioe";
  if (is("仙先韻 合口")) return "ioe";

  // 效攝
  if (is("蕭宵韻")) return "iau";
  if (is("肴豪韻")) return "au";

  // 果攝
  if (is("歌韻 一等")) return "ou";
  if (is("歌韻 三等 脣音")) return "ia";
  if (is("歌韻 三等 開口")) return "ia";
  if (is("歌韻 三等 合口")) return "io";

  // 假攝
  if (is("麻韻 二等 合口")) return "uo";
  if (is("麻韻 二等")) return "o";
  if (is("麻韻 三等")) return "ia";

  // 宕攝
  if (is("陽韻 脣音")) return "ong";
  if (is("陽韻 開口 莊組")) return "ong";
  if (is("陽韻 開口")) return "iang";
  if (is("陽韻 合口")) return "iong";
  if (is("唐韻 合口")) return "uong";
  if (is("唐韻")) return "ong";

  // 梗攝
  if (is("庚韻 二等 脣音")) return "ang";
  if (is("庚韻 二等 舌齒音")) return "ang";
  if (is("庚韻 二等 開口 牙喉音")) return "ang";
  if (is("庚韻 二等 合口 牙喉音")) return "uang";
  if (is("庚韻 三等 莊組")) return "ang";
  if (is("庚韻 三等 合口")) return "iung";
  if (is("庚韻 三等")) return "ing";

  if (is("耕韻 脣音")) return "ang";
  if (is("耕韻 開口")) return "ang";
  if (is("耕韻 合口")) return "uang";

  if (is("清青韻 合口 牙喉音")) return "iung";
  if (is("清青韻")) return "ing";

  // 曾攝
  if (is("蒸韻 莊組")) return "eng";
  if (is("蒸韻 合口")) return "iung";
  if (is("蒸韻")) return "ing";

  if (is("登韻 舒聲 脣音 明母")) return "ung";
  if (is("登韻 入聲 脣音 明母")) return "ek";
  if (is("登韻 舒聲 脣音")) return "ang";
  if (is("登韻 入聲 脣音")) return "uk";
  if (is("登韻 開口")) return "eng";
  if (is("登韻 舒聲 合口")) return "ung";
  if (is("登韻 入聲 合口")) return "uek";

  // 流攝
  if (is("尤韻 脣音")) return "eu";
  if (is("尤韻 莊組")) return "eu";
  if (is("尤韻")) return "ieu";
  if (is("侯韻")) return "eu";

  if (is("幽韻 脣音")) return "iau";
  if (is("幽韻")) return "ieu";

  // 深攝
  if (is("侵韻 莊組")) return "eng";
  if (is("侵韻")) return "in";

  // 咸攝
  if (is("覃韻")) return "ee";
  if (is("談韻 牙喉音")) return "ee";
  if (is("談韻")) return "ae";

  if (is("鹽嚴韻")) return "iee";
  if (is("添韻")) return "iae"; //四等

  if (is("咸銜凡韻")) return "ae";

  throw new Error("無韻母規則");
}

function 聲調規則() {
  if (is("平聲")) return "1";
  if (is("上聲")) return "2";
  if (is("去聲")) return "3";
  if (is("入聲")) return "";
  throw new Error("無聲調規則");
}

let 聲母 = 聲母規則();
let 韻母 = 韻母規則();
let 聲調 = 聲調規則();

if (is("入聲")) {
  if (韻母.endsWith("e")) 韻母 = 韻母.slice(0, -1) + "h";
  else if (韻母.endsWith("n")) 韻母 = 韻母.slice(0, -1) + "h";
  else if (韻母.endsWith("ng")) 韻母 = 韻母.slice(0, -2) + "k";
}

if (韻母 === "ee") {
  韻母 = "e";
} else if (韻母 === "iee") {
  韻母 = "ie";
}

//y w 簡拼
if (聲母 === "gh" && 韻母 !== "ung" && 韻母 !== "uk") {
  if (韻母[0] === "i") 聲母 = "y";
  if (韻母[0] === "u") 聲母 = "w";
  if (
    聲母 !== "gh" &&
    韻母[1] &&
    (韻母[1] === "a" || 韻母[1] === "e" || 韻母[1] === "o" || 韻母[1] === "u")
  )
    韻母 = 韻母.slice(1);
}

return 聲母 + 韻母 + 聲調;
