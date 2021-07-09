/* 推導南京音
 *
 * 中古音與南京音的對映表：
 * https://github.com/uliloewi/lang2jin1/blob/master/Guangyun_Langjin_pulish_Alphabetic.2.0.csv 
 * 南京音本是清末以前標準官話的基礎音系，和中古音有嚴格的對映關系。故有上表。本程序展示此對映關系。
 * @author uliloewi
 * 
 */

const is = (x) => 音韻地位.屬於(x);

function 聲母規則() {
  if (is('幫母')) return is('東韻 三等 或 鍾微虞廢文元陽尤凡韻') ? 'f' : 'b';
  if (is('滂母')) return is('東韻 三等 或 鍾微虞廢文元陽尤凡韻') ? 'f' : 'p';
  if (is('並母')) {
    if (is('東韻 三等 或 鍾微虞廢文元陽尤凡韻')) return 'f';
    return is('平聲') ?  'p' : 'b';
  }
  if (is('明母')) return is('合口 三等') ? '' : 'm';
  if (is('端母')) return is('二等') ? 'z' : 'd';
  if (is('透母')) return 't';
  if (is('定母')) {
    if (is('二等 平聲')) return 'ch';
    return is('平聲') ? 't' : 'd';
  }
  if (is('泥母 或 來母 或 孃母')) return 'l';
  if (is('知母')){ 
    if (is('麻韻 三等 或 灰韻')) return 'd';
    return (is('庚耕韻')) ? 'z' : 'zh';
  }
  if (is('徹母')) return  (is('庚耕韻')) ? 'c' : 'ch';
  if (is('澄母')){ 
      if (is('庚耕韻')) return is('平聲') ? 'c' : 'z';
      return is('平聲') ? 'ch' : 'zh';
  }
  if (is('精母')) return 'z';
  if (is('清母')) return 'c';
  if (is('從母')){ 
    if (is('二等')) return 'ch';
    return is('平聲') ? 'c' : 'z';
  }
  if (is('心母')) return 's';
  if (is('邪母')) return is('平聲 尤之韻') ? 'c' : 's';
  if (is('莊母')) return is('宕假效江攝 或 止攝 合口 或 蟹咸山攝 二等')) ? 'zh' : 'z';
  if (is('初母')) return is('宕假效江攝 或 止攝 合口 或 蟹咸山攝 二等')) ? 'ch' : 'c';
  if (is('崇母')) {
    if (is('宕假效江攝 或 止攝 合口 或 蟹咸山攝 二等')) return is('平聲') ? 'ch' : 'zh';
    if (is('之韻')) return 's';
    return is('平聲') ? 'c' : 'z';
  }
  if (is('生母')) return is('宕假效江攝 或 止攝 合口 或 蟹咸山攝 二等')) ? 'sh' : 's';
  if (is('俟母')) return is('平聲') ? 'c' : 's';
  if (is('章母')) return is('清韻 合口') ? 'z' : 'zh';
  if (is('昌母')) return 'ch';
  if (is('常母')) {
     if(is('之脂韻 平聲')) return 'sh'; 
     return is('鍾韻 上聲 或 平聲 或 一等') ? 'ch' : 'sh';
  }
  if (is('書母')) return is('鍾韻 平聲') ? 'ch' : 'sh';
  if (is('船母')) return is('合口 平聲') ? 'ch' : 'sh';
  if (is('日母')) {    
    if(is('四等')) return 'l'; 
    return is('支之脂韻 或 眞侵韻 入聲') ?  '' : 'r';
  } 
  if (is('見母')) return is('一等 或 四等 齊韻 或 二等 合口 或 二等 庚耕韻 或 三等 合口 祭微陽支脂韻 或 三等 開口 通攝 舒聲') ? 'g' : 'j';
  if (is('溪母')) return is('一等 或 四等 齊韻 或 二等 合口 或 二等 庚耕皆韻 或 二等 開口 江韻 入聲 或 三等 合口 祭微陽支脂凡廢韻 舒聲 或 三等 鍾韻 上去聲')) ? 'k' : 'q';
  if (is('羣母')) {    
    if(is('宵韻 重紐A類')) return 'q';
    if (is('平聲')) { 
      return is('三等 合口 山陽脂韻') ? 'k' : 'q';
    };
    return is('一等 或 四等 齊韻 或 二等 合口 或 二等 庚耕韻 或 三等 合口 祭微陽支脂凡廢韻 舒聲 或 三等 開口 通攝 舒聲')) ? 'g' : 'j';
  }
  if (is('疑母')) return is('四等 齊韻 平聲 或 四等 先韻 入聲 或 三等 尤蒸韻 平聲 或 三等 庚仙蒸陽韻 入聲 或 三等 之韻 上聲')) ? 'l' : '';
  if (is('曉母')) return is('一等 或 四等 合口 齊韻 或 二等 合口 或 二等 庚耕皆韻 或 三等 合口 祭微陽支脂凡廢韻 舒聲') ? 'h' : 'x';
  if (is('匣母')) return is('一等 或 四等 合口 齊韻 或 二等 合口 或 二等 庚耕韻 或 二等 皆韻 上聲') ? 'h' : 'x';
  if (is('以母')) return is('合口 祭韻') ? 'r' : '';
  if (is('影云母')) return '';
  throw new Error('無聲母規則');
}

function 韻母規則() {
  // 通攝
  if (is('通攝')) {
    if (is('入聲')){
      return is('三等 見疑以影云母') ? 'ü' : 'u'; 
    }
    return is('幫組') ? 'en' : 'ong';
  }
  // 江攝
  if (is('江攝')) {
    if (is('入聲')){
          return is('疑母') ? 'io' : 'o'; 
    }
    if (is('徹澄崇初生知母')){
      return 'uang';
    }
    return is('疑母') ? 'iang' : 'ang'; 
  }
  // 止攝
  if (is('止攝')){
    if (is('日母 開口')){
      return 'er'; 
    }
    if (is('崇初從精清生俟邪心莊母 開口')){
      return 'y'; 
    }
    if (is('昌常徹澄船書章知母 開口')){
      return 'r'; 
    }
    if (is('生初母 合口 重紐B類')){
      return 'uä'; 
    }
    if (is('明母 脂韻 或 並滂母 合口 或 並滂母 脂韻 重紐B類')){
      return 'ei'; 
    }
    return is('開口') ? 'i' : 'uei';
  }
  // 遇攝
  if (is('遇攝')) {
    if (is('一等')){
      return  is('明母') ? 'o' : 'u'; 
    }
    return is('從見精來娘清羣溪曉邪心疑以影云母') ? 'ü' : 'u';
  }
  // 蟹攝
  if (is('蟹攝')) {
    if (is('四等')){
      if (is('合口'))  return 'uei'; 
      if (is('常母')) return 'uei';
      if (is('徹母')) return 'ä';//𥱻
      return 'i';    
    }
    if (is('三等')){
      if (is('合口'))  return  is('幫組') ? 'ei' : 'uei'; 
      if (is('章知組')) return 'r'; 
      if (is('明母')) return 'ei';
      return 'i';   
    }
    if (is('二等')){
      if (is('合口'))  return  is('佳韻 見溪匣曉影母') ? 'ua' : 'uä'; 
      if (is('疑母')) return 'iä';
      return 'ä';   
    }
    if (is('一等')){
      if (is('合口'))  
      {
         if (is('泰韻 見溪疑母')) return 'uä'; 
         if (is('幫組')) return 'ei';
         return 'uei'; 
      }
      if (is('泰韻 幫組')) return 'ei';
      return is('以母') ? 'iä' : 'ä';   
    }
  }
  // 臻攝
  if (is('臻攝')) {
    if (is('入聲')) {    
      if (is('三等')){
        if (is('合口'))  return  is('幫知莊章組') ? 'u' : 'ü'; 
        if (is('章組 或 知徹澄日母')) return 'r';
        if (is('莊組')) return 'ä';
        return 'i';   
      }      
      return is('幫組 或 開口') ? 'o' : 'u';
    }
    if (is('開口'))  
    {
      if (is('一等')) return is('端組') ? 'uen' : 'en';
      return  is('莊章組 或 日知徹澄母') ? 'en' : 'in';
    }
    if (is('三等')) {
      if (is('滂幫並母')) return 'en';
      return is('來明日書章知昌常徹澄船母') ? 'uen' : 'üin';
    }
    return is('幫組') ? 'en' : 'uen';
  }  
  // 山攝
  if (is('山攝')) {
    if (is('入聲')) {    
      if (is('一等')){
        if (is('開口')) return 'a';
        return is('見組') ? 'uä' : 'o';
      }
      if (is('二等')){
        if (is('合口')) return 'ua';
        return is('疑影母') ? 'ia' : 'a';
      }
      if (is('合口'))
      {
        if (is('幫並滂母')) return 'a';
        if (is('明母')) return 'ua';
        return is('日母 或 知莊章組') ? 'o' : 'üe'; 
      }
      if (is('以母')) return 'io';
      if (is('日母 或 知莊章組')) return 'ä';
      return is('匣溪曉羣見母') ? 'e' : 'ie';
    }
    if (is('一等')){     
      return is('開口 或 幫組') ? 'ang' : 'uang';
    }
    if (is('二等')){     
      if (is('開口')){
        if (is('影疑母')) return 'iän';
        if (is('匣溪曉羣見母')) return 'än';
        return 'ang';
      }
      return 'uang';
    }
    if (is('三等')){     
      if (is('合口'))
      {
        if (is('日來明母 或 知莊章組')) return 'uang';        
        return is('滂幫並母') ? 'ang' : 'üän';
      }      
      if (is('日知徹澄母 或 莊章組')) return 'ang';  
      return is('匣溪曉羣見母') ? 'än' : 'iän';
    }
    if (is('合口')) return 'üän';
    if (is('崇母')) return 'uang';    
    return is('匣溪曉羣見母') ? 'än' : 'iän';
  }
  // 效攝
  if (is('效攝')) {
    if (is('二等 疑母')) return 'iao';
    if (is('二等 或 一等')) return 'ao';
    return is('匣溪曉羣見日母 或 知章組') ? 'ao' : 'iao';
  }
  // 果攝
  if (is('果攝')) {
    if (is('三等')) return is('開口') ? 'e' : 'üe';
    return 'o';
  }
  // 假攝
  if (is('假攝')) {
    if (is('二等'))
    {
      if (is('合口')) return 'ua';
      return is('疑影母') ? 'ia' : 'a';
    } 
    return is('日母 或 章組') ? 'e' : 'ie';
  }
  // 宕攝
  if (is('宕攝')) {
    if (is('入聲')) {    
      if (is('一等 合口 見組')) return 'uä';
      return is('心疑以影云來娘母 或 精組') ? 'io' : 'o';
    }
    //剩下舒聲
    if (is('合口')){     
      return is('滂幫並母') ? 'ang' : 'uang';
    }
    //剩下舒聲開口
    if (is('三等')) {    
      if (is('來孃疑以影母 或 精組')) return 'iang';
      return is('莊組') ? 'uang' : 'ang';
    } 
    //剩下舒聲開口一等
    return 'ang';
  }
  // 梗攝
  if (is('梗攝')){
    if (is('入聲')) {    
      if (is('合口'))
      { 
        if (is('二等')) return 'uä';
        //剩下三四等
        return is('幫組') ? 'i' : 'ü';
      }
      //剩下開口
      if (is('二等')) return 'ä';
      //剩下開口三四等
      if (is('莊組')) return 'y';
      return is('知章組') ? 'r' : 'i';
    }
    //剩下舒聲
    if (is('二等')){     
      if (is('合口'))
      {         
        return is('耕韻') ? 'ong' : 'uen';//後者庚韻
      }
      //剩下開口
      return is('匣影母 耕韻') ? 'in' : 'en';
    }
    //剩下舒聲三四等
    if (is('合口'))
    {         
      if  (is('心以影母 三等')) return 'in';
      return is('云影母') ? 'iong' : 'ong';
    }
    //剩下舒聲三四等開口
    if  (is('四等')) return 'in';
    //剩下舒聲三等開口
    return is('知莊章組') ? 'en' : 'in';
  } 
  // 曾攝
  if (is('曾攝')){
    if (is('入聲')) {    
      if (is('一等'))
      { 
        return is('合口') ? 'uä' : 'ä';
      }
      //剩下三等
      if (is('合口'))  return 'ü';
      //剩下三等開口
      if (is('莊組'))  return 'ä';
      return is('知章組') ? 'r' : 'i';
    }
     //剩下舒聲
     if (is('合口'))  return 'ong';
     return is('三等 幫見組 或 三等 來曉以影母') ? 'in' : 'en';
  }
  // 流攝
  if (is('幽韻')) is('見溪羣曉生母') ? 'ou' : 'iou';
  if (is('尤韻')) {
    if (is('滂幫並母')) return 'u';
    return is('精組 或 疑以影云孃來母') ? 'iou' : 'ou';
  }
  if (is('侯韻')) 'ou';
  // 深攝
  if (is('深攝')) {
    if (is('入聲')) {    
      if (is('莊組')) return 'ä';
      return is('章組 或 日知徹澄母') ? 'r' : 'i';
    }
    //剩下舒聲
    return is('章莊組 或 日知徹澄母') ? 'en' : 'in';
  }
  // 咸攝
  if (is('咸攝')) {
    if (is('入聲')) {    
      if (is('一等')){
        return is('見組 或 匣曉影母') ? 'o' : 'a';
      }
      if (is('二等')){
        return is('疑影母') ? 'io' : 'a';
      }
      if (is('三等')){
        if (is('合口')) return is('徹孃母') ? 'ua' : 'a';
        if (is('章組 或 日知徹澄母')) return 'ä';
      }      
      return is('見溪羣曉匣母') ? 'e' : 'ie';
    }
    //剩下舒聲
    if (is('一等')){     
      return is('開口 或 幫組') ? 'ang' : 'uang';
    }
    if (is('二等')){     
        if (is('影疑母')) return 'iän';
        if (is('匣溪曉羣見母')) return 'än';
        return 'ang';//只剩知莊幫組
    }
    if (is('三等')){     
      if (is('合口'))
      {
        return is('滂幫並母') ? 'ang' : 'uang';
      }      
      if (is('日知徹澄母 或 莊章組')) return 'ang';  
      return is('匣溪曉羣見母') ? 'än' : 'iän';
    }
    return is('匣溪曉羣見母') ? 'än' : 'iän';
  }
  throw new Error('無韻母規則');
}

function 聲調規則() {
  if (is('平聲')) return is('全清 或 次清') ? '1' : '2';
  if (is('上聲')) return is('全濁') ? '4' : '3';      
  if (is('去聲')) return '4';     
  if (is('入聲')) return '5';
  throw new Error('無聲調規則');
}

let 聲母 = 聲母規則();
let 韻母 = 韻母規則();
let 聲調 = 聲調規則();
return 聲母 + 韻母 + 聲調;
