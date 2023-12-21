import * as fs from "fs";
import { DesyncedStringToObject } from "../dsconvert";
import { Dissasembler } from "../decompile/disasm";
import { globSync } from "glob";
import { expect, test } from "@jest/globals";

for (const filename of globSync(`${__dirname}/*.txt`)) {
  const code = fs.readFileSync(filename, "utf8");
  const codeObj = DesyncedStringToObject(code);
  const asm = new Dissasembler(codeObj as any).code();
  test(filename, () => expect(asm).toMatchSnapshot());
}