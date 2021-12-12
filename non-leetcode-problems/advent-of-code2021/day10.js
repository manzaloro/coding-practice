/*
  for each line
    for each char of line
      if char is open char, add to stack
      else if top of stack matches closing char, pop from stack
      else, there is an illegal char. increment illegal char map at char by 1

  for each key in map
    add (numTimes * score) to total score

  return total score
*/
const sample = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`;

const calculateSyntaxErrorScore = (input) => {
  const scoreMap = new Map()
    .set(')', 3)
    .set(']', 57)
    .set('}', 1197)
    .set('>', 25137);

  const matches = new Map()
    .set('(', ')')
    .set('[', ']')
    .set('{', '}')
    .set('<', '>');

  return input
    .split(/\n/)
    .reduce((total, line) => {
      const stack = [];
      let isLegal = true;

      line
        .trim()
        .split('')
        .forEach((char) => {
          if (isLegal) {
            if (matches.has(char)) stack.push(char);
            else if (matches.get(stack[stack.length - 1]) === char) stack.pop();
            else {
              total += scoreMap.get(char);
              isLegal = false;
            }
          }
        });

      return total;
    }, 0);
};

const calculateCompletionScores = (input) => {
  const scoreMap = new Map()
    .set(')', 1)
    .set(']', 2)
    .set('}', 3)
    .set('>', 4);

  const matches = new Map()
    .set('(', ')')
    .set('[', ']')
    .set('{', '}')
    .set('<', '>');

  return input
    .split(/\n/)
    .reduce((scores, line, i, { length: n }) => {
      const stack = [];
      let isLegal = true;

      line
        .trim()
        .split('')
        .forEach((char) => {
          if (isLegal) {
            if (matches.has(char)) stack.push(char);
            else if (matches.get(stack[stack.length - 1]) === char) stack.pop();
            else isLegal = false;
          }
        });

      if (isLegal) {
        const totalScore = stack
          .reverse()
          .reduce((score, char) => {
            const opposite = matches.get(char);
            return score * 5 + scoreMap.get(opposite);
          }, 0);

        scores.push(totalScore);
      }

      return i === n - 1
        ? scores.sort((a, b) => (a < b ? -1 : 1))[Math.floor(scores.length / 2)]
        : scores;
    }, []);
};

const puzzleInput = `{<<<[<(<{[[[[<<><>>({}())]<<[]{}>{<><>}>]]<({<[]{}>}<[[]{}]{[]<>}>){({{}<>}[<>[]))<({}())<{}<>>>}>]([{[<{}<>
  {{{<(<<{<([[<{[][]}<<><>>>{{(){}}}]<{[{}{}][<><>]}[[[]()][()[]]]>])(<{([[]][<>{}])[([]<>){[][]}]}(([[]()]
  (([{<{<<{((({[()[]]([][])}[{()}(<>)])[<(()<>)>(([])[{}[]])]){{([()()){[]()})}})}({<<[(()<>){()}
  {[[{[[[{[[<(({{}}{{}()}){{()<>}{<>()}})>({<{(){}}>{(<>{})(())}}((({}()))({[]()}<()()>)))]<(
  <<[({({(((<<[[<>{}]{<>()}]{[<>{}][[]()]}>([[<>]]{{<><>}[<>[]]})>)){[<[[<<>()>{<>{}}][(()<>){[]{}}]]>}<[[<
  ({<([{({{<{{<{(){}}<()[]>><{()<>}(()())>}[([{}[]]<<>{}>){<[][]>({})}]}<{({{}[]}<[][]>)((<>{})(()<>))}<{<{}(
  {([{{[({[<<(([[]()])<(<>())[<>[]]>]{([[]{}]([]()))}>([{{[][]}({}{})}(([]{})[[]<>])])>[<<[{<><>}[
  <[<([<(<<{{<(<[]<>>)><(<{}[]>[[][]]){{{}()}[[]()])>}}><[<(({<><>}{(){}})([<>[]]))>]>>{[<<[{([]{})[<>{}]}[
  {{{{({((((<{[([]{})<<>{}>]({<>})}<(<()<>><[]{}>)<(()())({}<>)>>>)<{[{{<>{}}}]}([[{()()}{[]()}
  [<(({((<{{<({(()())((){})}[[()<>]{{}[]}])<<[()<>]><{<>{}}{<>{}}>>>}{(((<<>{}>{()[]})([[][]][(){}]))[(<
  <<[({{<{{<({<{<><>}(<>[])>{[[]{}][()]}}){<<([]())(()<>)>[{()[]}]><[[<>{}]({}())](<[]<>>{<>()})>}>{[
  {{(({<[[<<{{{<[]{}>({}())}}{{[{}()]<()()>}((<>{}})}}<{<[()()]{[][]}>(((){}){{}[]})}>>[{<[[<>[]](())]
  [((({{{({[<(<({}<>)<{}[]>>)[[[[][]](()[])]({{}{}}{()[]})]>[(<[<>()][<>()]>[[[]()]((){})])]
  {<<<{[<{<{<[{[<>]<[]()>}{<<>[]><()<>>}]>{[[<(){}>({}())][{()[]}{{}<>}]](<[[]<>]{()<>}>[{[]{}}[
  {<[<[{({[<{{{{<><>}{{}()}}{<<><>>(<>{})}}{[{{}{}}<()<>>]{[<>{}]}}}({[[{}()]<{}[]>][<{}<>><[]{}>]}{<<<>
  (<[<([<[{(<(({[][]}(()[]})[<{}()><{}()>]){[[{}[]]{{}<>}]}>{[{<{}()>{{}()}}<<<>{}>{[]<>}>]})(<{{(<><>
  [[{{[[({[[[<{(<><>)<{}()>}({<>{}}(()<>))>]<<[{()()}[<>]]<{[]()}[<><>]>>>][<{(({}<>)){<{}{}}[[]{}]}
  (((<[({[([({[([]{})[<>()]]<{(){}}(()())>}[{(()<>]<{}{}>}[{{}<>}<{}()>]]){<<[<>()]<[]>><[[]()](<>(
  [(({{<[([{<<[{[]{}}<[]{}>]({()[]}[()])>>}])<{{{[({<>[]}(<>[]))([{}()]({}[]))]<{[{}()]{{}<>}}{<{
  <[(<[<[{<<{(<[<>{}]<[]()>>{((){}){()<>}})}<<<[{}{}][<><>]>>(([()()][<>]){<{}()><<><>>})>>[{({<{}
  {(<{<{[<{<({<{[]<>}[<>()]]<[[][]][()()]>}({({}<>){<><>}}[<<>()>{[][]}])){[[{<>()}({}[])](({}[])<{}>)]([
  {([<{<(([<{[[<<>><[]()>]{(<>{})[{}{}]}}[((()()){<>[]})[(<>[]){()<>}]]}>])([{([<(<>())[{}<>]>][[(()<>)<{}[]>
  [(((<[<{{<[<{{{}[]}}><<<()[]>({}<>)>{{{}[]}[<>()]}}]{{{({})[{}()]}({(){}}<{}[]>)}({({}[])(())}{(<><>)[<>{}]}
  {{[(<{(<[<[<<{{}}[()()]>><[({}{})][<{}()><{}>]>]{[{[{}][<><>]}[[()()]([]{})]]{{({}()){(){}}}<{[]{}}<
  [{{<{<([(<[<[{()[]}]{<(){}>}>[([()<>][<>()])[{()<>}[<>[]]]]]>)])>}{([[<{<{{[()<>]{()()}}<[<><>]<<>[]>>)[{[()(
  <(({<[[[[(({({<>[]}[{}])<<{}()>{(){}}>}{({{}[]}{()[]}){{<><>}[<>{}]}})<[{{()()}[()()]}]({{<><>}<()()>}[<(
  ({{{([{<{[[[[<[]()>{(){}}]{([]{})[{}[]]}][[{[]()}]<[()[]](<>[])>]]((<[<><>]{(){}}><<{}{}>>))]}(
  ([<[({[[([{<(<<>()><{}[]>){[()[]][(){}]}>}({((<>()){()()})}{({{}()}<<>()>){[{}]<[]()>}})])([<(
  {<<[[<(([({[<[[]]((){})><{[]()}{()<>}>]}<<(<<><>>(()())){{<>{}}}>>)]])<(<<<<[{{}()}[[]()]]((()))>(
  [[{{{[[[[(<{[(()[])[[]]][(()[])((){})]}[{{<><>}{{}()}}([[]()])]><([<<>()>{{}()}])>)({([[[]]>{<()<>>[{}<>]}
  {{({[{<<<[(({[<>[]>{<>()}}){<{[]<>}>({{}<>}<()>)})(<{(()())<()()>}({[][]}[(){}])>(<[()[]][<>[]]>[{()<>}
  ({[[[<[<[{[({<<>()><<><>>}{{<>()}<()<>>})]<<[[<><>]<[]()>][[()][{}{}]]>{[{[]{}}([]<>)]<({}{})(<>{})>}>}]>[[{[
  <<<(({{{[{([(({}{})([]<>))<[<><>]{<>{}}>]<(<<>[]>(<>[]))[([]<>)[()[]]]>)(<[[()()]{[]{}}][{()[]}{(){}}]>[<({
  {[[((([[<{{{(<(){}>{<>()})}}}[((<([]<>)[[][]]>{<{}[]>[<>]})[{[(){}]}{<(){}><<>()>}])<{([[]<>])[((){}
  {[[(({{{<<<<[<[]<>>]><[{<>{}}]([{}<>]<()()>)>>>{[[<<[]{}>>[{<>()}]]{[{[][]}{[]()}][{(){}}[()]]
  <[([([[[[(([((<><>)[<>]){([][]){[][]}}]({[()[]>{()[]}}{{<>{}}(()[])}))){<<{<{}[]>{{}()}}><[[<>[]]<<><>>]
  {(([{([(<[((<<[][]>((){})>)<((<>{}){[][]})(<<>[]>)})]><[((((()){<>()})[{[]()}{<>{}}]))]>)[[<<<{[<
  {([([(({[{{<([<>[]][<>{}])>([<{}()>(<>)]{[()[]]<[]<>>})}<[[[[]()][{}{}]]([()()])][(<()()>[()[]
  {<(<({({<(<[{<{}()>[<><>]}[{()[]}{{}<>}]]{[{[]()}<<>{}>]([[]<>](<>()))}>(([[[][]](<>())})[({<><>}[()<>])]))>}
  <((<(<<<{{{<[<[][]>([]{})]><(<(){}>[()<>])>}<[{<[][]>{<><>}}](({{}<>}))>}[<{{(<><>)<<><>>}(<[]{}>[[]()])}>
  [<<{{(<[{<([[[(){}]<{}{}>]<[{}()]>][[{{}()}[()<>]](<<><>>[{}<>])])([<({}{})[{}<>]>{{()()}}]{[{[
  [[[<[<<{{{[[[[[]{}](()())]]{{{<><>}((){})}[({}<>)([][])]}]({[[<><>]([][])][{<>{}}(()())]}{[[<>[]]
  {(<[[[<{<<[[{{{}[]}[{}{}]}<<<>()>[{}{}]>]({{[]{}}{[]<>}}<<(){}>[()]})]<[{({}[])[()()]}<[<><
  [<[<([{({[{<(<<><>>[()<>])[[{}<>][<>[]]]><[<()<>>]<([][])>>}<({{<>{}}{{}{}}}([()()][(){}]))[<({}<>)([]())>({[
  [{[[<[{{{{[{(({}[])(()()))([(){}]{[]{}})}][{<(<>())<{}()>><({}[])[()<>]]}<<[[]{}][[]()]>{{
  {<{<[<<{[{<[[[(){}]][({}{}){()<>}]]({[<><>](<>{})})>[{{[{}[]]<<>{}>}[[(){}]([][])]}{(({}[]){[]
  [<((<<{((([<{<()()>[{}[]]}[<[][]}<()()>]>]<[<[<><>]{()<>}><{(){}}<(){}>>]>){{[([{}<>][(){}]){{[
  <[{(<<<<<{[<[<()<>><(){}>]>{[{()()}[()[]]]}}}{[<{[{}{}]([][])}(([]{})[(){}])>]{<[{(){}}[()<>]][({}[]){()()}]>
  {<{{[({{<{[<{(<>()]{<>{}}}<<<><>>{()<>}>>[{([]{})}<{[]()}{<>[]}>]][([<()[]>{<>{}}]([{}{}]{(){}})
  <({([({[(<[(({[]()}{{}()}){[(){}]})][{<<<>[]>{()()}>}(<{{}<>}{[][]}>{[<><>](<>())})]>[[[{({}{})<(){}>}
  [(<[[[<[{(([{{<>{}}([]{})}[{<>()}{<><>}]]<{(()())<{}[]>}{(<>)[<>[]]}>){{({<><>}(()))}({<[]{}>{<>[]}})})
  <[{([([[([<[([()()]((){})){([]())(()[])}]<<{()[]}<{}[]>>{{[]()}<<>[]>}>>(<[<[]{}>[{}]]>)][(
  (([<<(<[<<[<[[()()]{[]()}}{<{}{}>{{}<>}}>[<<<>()>[[]{}]>[({})[<>()]]]](<{{<>[]}[{}{}]}[(()())]>[[{{
  [{<[<((((([{(<[]()>([]{}))<[<><>]>}[(([]{})[{}{}])<({}())<[]<>>>]])))))([<<({<<[{}{}]><{()<>}{[]()
  <<[<<[[[<{<[{{<>()}(<>{})}([[][]])]{[(<><>)(<><>)]((()<>)[()[]])}>[<[<()[]>[(){}]]((<>())[()<>])>]}>]]
  <<{<[([[((<[[{<>{}}]<[()<>]([]{})>]{<({}<>){()()}><<()()>>}>[<<<<>()>{[]()}><<()()><<>()}>>])
  {(<[{{([{<(<{[{}{}]<<><>>}([<>{}][[]()])>(([<>[]])[{{}[]}{{}{}}]))[(({<>()}<()()>){([]{}){[]
  {<[<<[<[<<{[(<{}{}>)<[<>[]](<><>)>]{(({}<>)[<>[]]){<{}<>>([]{})}}}>[[<[[{}()]{[]()}]>]{[{{{}()
  (<<<<<<<([{(<[<>{}]([][])>{{[]<>}])}{<<<()<>><()()>>[{{}()}[{}{}]]>[[[{}()][[]<>]]{<{}[]>[(){}]}]}])
  ([<[<[[{[(<<{([][]){<>()}}[<()<>>(()[])]>{{(())(()())}{({}[]){[]()}}}><[([(){}])({{}{}})]>)(({[[[][]
  <(<[[<([{<([<[[][]]({}())>>){{(([])[<><>])<{<>[]}[{}()]>}{[<()>[{}{}]]((()[]){<>})}}>}[<<{[[()
  ({<<{[{[(({{<{()()}>[(<>[])]}[([{}<>]{[]{}}){{{}()}<{}<>>}]}{<({[]}[{}()]){{(){}}[<>{}]}><{[<><>
  ({<[([[(<{<{{[[]<>](()[])}{<[]<>>(<>[])]}>{[[{{}{}}][{<>[]}(<>)]]<<<()()>({}<>)><<{}()>{{}()}>>}}>[(<[(<{}<>>
  [[((<{<<[{{<<<[][]><[]{}>>>{[<()()>]<<[]<>>((){})>}}}{<(<((){}){{}<>}>[([]<>)<{}[]>])<[[{}{}](<><>)]{([
  <{{({([([{{((({}<>)(()()))[(<>{})<[][]>])(<{<><>}([]<>)>{(()[])[[]{}]})}{<{{{}()}({}())}[([]{
  {<[(<{[<{[[(<<{}<>>[[]<>]>}{[<[]<>>[{}()]]{[{}](<>)}}]]}{{({(<{}{}>[()[]])[[{}{}][{}]]}<<<<>{}>>[([][
  ({<{<<[([<[[<<{}[]>(()[])>][[([][]>[<><>]]{{()}}]](<((<>[])<<><>>)[({}()){{}[]}]><([[]<>]{<>[]})
  <{({[{{{<[<[{<()()><{}[]]}{[[]{}]([]<>)}]{{([]()){<>()}}{{{}<>}({}<>)}}>[<<<[]()>[{}[]]><(()())[<>[]]>>(
  {(([((<[<({{{<()()>[()<>]}<[{}{}]<<>[]>>}(<{[]()}{()[]}>([{}[]]({}())))}({{<{}{}>[<>{}]){{[]()}{[]<>}
  (([({{[[(<[<(<<><>>[[]()]){([]())({}<>)}>[((()()){()()})[({}())<[]()>]]]>[{{<[{}{}][{}()]>}{([<><>]<
  [[{<{([<[{(((<()()>{{}[]}}<<{}{}>[{}[]]>){(((){})[{}<>])<<(){}>(<>{})>})}(([<(<><>)<[]<>>>([<>()])]<[({}{
  <[{(<[(<<{<{<({}{})<(){}>>([[]{}]{()<>})}[{{[][]}[[]]}([()](<>()))]>[{(({}[])(()())>([{}])}{(<[]()>{
  <{({{<{{{{{{<[()()]([]{})>{([]{})[()()]}}}}}}({(<[{([]{})({}{})}{(<>())<{}<>>}]({{<><>}}[{()<>}[[
  {{[({(<{[([[<<()()>{()[]}><{()<>}{{}{}}>]]<{[{()<>}(()<>)][<{}{}>([][])]}<{<[][]>[()()]}<{()<>}[[][]]>>>)]
  (<({{({{{([({{{}()}{(){}}}<{(){}}<<>[]>>)(<[[]<>][<>{}]><[<>{}]>)]{[{(()[])}{[[]<>]{{}}}]((((){}){<>
  <(([(((((((({([]<>)}<(()<>)<<>[]>>)[{[[]{}][()<>]}<{()<>}>])<<<{(){}}[<>()]>{(()()){[]<>}}>
  <<<<{{{[[([<{{<>()}[{}<>]}<<(){}><[]{}>>>([[[]()]<{}()>})]({[[{}()]{<>()}][{[]<>}[(){}]]}))((
  {[(<<<<({(<[[{{}}]<(()<>)<{}<>>>]<([[][]]({}<>)){[()[]]<(){}>}}>)}[[[([[[]<>]<()()>][{[]{}}])[[
  (<((<((<<([((<<>()>(<>()))<{<>()}([][])>)[[({})<{}<>>]]])>(<{(({()[]}(<><>)){{()[]}{()()}])}<({<()<>>({}
  [(<<<(<<{{({<[<>[]]([]()]><<<>()><<><>>>}[<[<>{}]((){})>(([]{}){(){}})])<<[{<>()}<{}()>]({
  ([[{<[[<[{(<<(<><>)>({<><>}{<>[]})>[{[[]{}]({}{}))])}{(<((<><>)(()[]))><([<><>]{()[]})[{<>
  <<[[<{<<<[{[<(<>[])>{{{}<>}(()[])}][({[]{}}(<>()))<(<><>){{}()}>]}{{{(()<>)<<>{}>}<<[][]>>}[([[][]]{()()}))}]
  (([({{{<<{{{<[(){}]{[]()}>({{}()}({}{}))}}{([{()<>}<()>](([][])<<>[]>)){{<<><>>{()}}{<{}<>><[]<>>}}}}{[<[[[][
  [([{<{{[([<((({}{})[<><>])<{{}{}}<()()>>)>{(<[()[]][<>{}]>(<()[]>[()<>]))([(<>[])<{}{}>]{<{}()>[<>[]]})}
  [<<<[(<((<(<{(<>[]){<>{}}}{{<>{}}}><[(()[])(()())][<[]{}><<>{}>]>)>[({<[()<>]({})>})])(<[[({<><>}{(){
  {{(<({<<{([{[<<>()}<{}[]>][{<>{}}[{}{}]]}{{[[]<>]{{}()}}}][({([]{})<()()>}){{({}[]){()}}{{()}
  {({((({[([<(({()<>}[{}<>])[<<><>><()()>])<[(()[])<{}()>]{[[]()]({}<>)}>>[({<()<>)})]]<{<<{{
  <<({[([{[{<<<[()<>]{()<>}>{([][])[<>[]]}>{({<><>})[{[][]}<{}{}>}}><<({{}()}<{}()>)><[(()[]){()()}][<()<>>{[](
  [([<({<{[<[<<<(){}><{}[]>>([{}[]])><{<[]<>>[{}()]}[<{}<>>{(){}}]>][(({{}()}[{}<>]))(<{[]()}(())>{
  <<([(<(({{{[{(<>()>[{}()]}[<[]{}>({}())]]}<{({{}()}[<>{}])}{<(<>[])({}<>)>{<[]()><[]<>>}}>}{{[{[
  {<([<{{<(<({<({}<>){()<>}>(<(){}>([]{}))})>({{[([]())([]())]}<[[{}{}>[<><>]]{([]())<{}()>}>
  [[{({[<{<({[{{<>[]}[(){}]}<[<><>]{[][]}>][{{(){}}<<>[]>}[{(){}}[()[]]}]}{{(<<>{}>[{}[]])<{()[]}[<>{}]>}
  {(({{[[{{[([({<>[]}[[]<>])[{()()}<()[]>]]){(<{[]{}}{[]{}}>(<(){}>{[]<>}))((<{}<>>{(){}})<[<>()
  <{[<([[<{<[{{{()<>}<[]()>}{[()]([]())}}<<[(){}]([][])>{{[]{}}<[][]>}>]<([{{}()}[<>{}]])<[<[]<>><()
  ({[<<[<{([{[({(){}}{()[]})<<[]()>>]<[{()[]>{()<>}][<{}>{[]()}]>}[([<(){}>(())])({[()()]<<>{}>}<{{}{}}
  [[<{[{{[{[[{({{}[]})}]](<<<(()<>)><({}{})<{}{}>>>([<{}<>>(()[])][<<>()>])>)}<(<<([()[]][()[]])<{()
  [{([(({<{<([(({}<>)[{}()])])><{[[{[]<>}<<><>>]<<[]<>><(){}>>]}{{<<(){}>{<>()}>[<{}{}>{<>[]}]}[<[()()]
  <[[[<({[[<{{<(<>())(<><>)>{[(){}][{}<>]}}({({}<>){{}[]}])}[[(<{}{}>[()[]])]{(([][])<()>)[({}())<{}()>
  {[[(<(<{<([[(([]{})[<>()])<<[]>[()[]]>](<{()[]}[[]<>]>{[()<>]([]())})][([<{}<>>[{}[]]]{<[]>(<>)
  <[<[[<<(({[(<[[]]{<>[]}>{(<>())(()())})<({(){}}{[][]})>]([{<()()><[]()>}[{[]()}[[][]>]]{{(())}(({}{})<<>[
  (({<{{[{(<[[[<<>()>][{<>()}[[]<>]]]]{{{{<><>}({}{})}{{[][]}({}[])}}{[{{}<>}{[]()}]}}>{<([[
  <([<{([([[{{[{{}{}}<{}()>]<{{}{}}>}({{(){}}{<>()}}[<(){}>[()()]])}[<{{<>[]}[()()]}{{{}[]}{[]<>}}>]]{[{<
  <{({{[<{<(({[({}<>)[[]<>]]<<[]{}>(()<>)>}))[<{((<>[])[<><>])<((){}][()()]>}{<([]{})(<><>)>}>{(
  {<<<<([{[<[{<<(){}>({}{})>}<<{[][]}{<>()}>({{}()}([]{})))]((({<><>}<{}[]>)({[]()}{<>()}))[[<{}{}>][{[]()
  [(<(<[(<{({[<(<>{})[()()]>[([]{}){[]<>}]]{{<{}{}>(<><>)}<{{}()}((){})>}}<<{{()[]}((){}}}{{
  {<<<[(<([{<<([()()][()])<{[]<>}[<>()]>>[<(()())<<>{}>>({[]{}}([]<>))]>}])>)([([{{{[[[]()](()
  <<({<{<([([[<[(){}]<<><>>><{()[]}[(){}]>]<(<{}[]>){[[]<>](()[])}>][<[<(){}>[{}[]]]({[][]}((){}))>
  {([{{[(<({{<(<[][]>{()()}){[{}()]}><(<<>())<[]{}>){<{}{}>((){})}>}}((<(<<>[]><()()>)><{[[][]]}<[<>
  [(<{{[{[{<([[[{}[]]<<>>]][[(()[])[(){}]]])({([<>[]]({}<>)){([]{})({}[])}}({(())({}[])}<{<>[]}(()[])>))
  ({[([(<{<(<<(([][])(()()))({[]()}(<>[]))><({{}()}[[]()])>>)>[<[([{()<>}<[]<>>]([{}<>]{()()}})<[<{}`;

// console.log(calculateSyntaxErrorScore(sample));
console.log(calculateCompletionScores(puzzleInput));
