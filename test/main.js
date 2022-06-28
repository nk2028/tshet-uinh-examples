import { 資料 } from "qieyun";
import {
  tupa,
  baxter,
  blankego,
  kyonh,
  zyepheng,
  sliark_peengqvim,
  panwuyun,
  unt,
  unt_j,
  msoeg_v8,
  mid_tang,
  chiangxhua,
  fanwan,
  putonghua,
  gwongzau,
  naamning,
  naamningdingzi,
  zaonhe,
  langjin,
  taibu,
  ayaka_v8,
} from "../index.js";

function assert_equal(a, b) {
  if (a !== b)
    throw new Error(
      `Expected ${JSON.stringify(b)}, but got ${JSON.stringify(a)}.`
    );
}

const 音韻地位 = 資料.query字頭("䒚")[0].音韻地位;

assert_equal(tupa(音韻地位), "sjiewq");
assert_equal(baxter(音韻地位), "syewX");
assert_equal(blankego(音韻地位), "sjev");
assert_equal(kyonh(音韻地位), "sjeux");
assert_equal(zyepheng(音韻地位), "shiéu");
assert_equal(sliark_peengqvim(音韻地位), "sjewx");
assert_equal(panwuyun(音韻地位), "ɕiɛu˧˥");
assert_equal(unt(音韻地位), "ɕjɛw˦˦˥");
assert_equal(unt_j(音韻地位), "ɕéw");
assert_equal(msoeg_v8(音韻地位), "çiɛuˀ");
assert_equal(mid_tang(音韻地位), "ɕjɛw˦˥");
assert_equal(chiangxhua(音韻地位), "ɕiɛ́w");
assert_equal(fanwan(音韻地位), "shiu2");
assert_equal(putonghua(音韻地位), "shǎo");
assert_equal(gwongzau(音韻地位), "siu2");
assert_equal(naamning(音韻地位), "siu2");
assert_equal(naamningdingzi(音韻地位), "siu2");
assert_equal(zaonhe(音韻地位), "sɔ̄");
assert_equal(langjin(音韻地位), "shao³");
assert_equal(taibu(音韻地位), "shau3");
assert_equal(ayaka_v8(音韻地位), "seu");
