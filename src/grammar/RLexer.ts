// Generated from R.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { CharStream } from "antlr4ts/CharStream";
import { Lexer } from "antlr4ts/Lexer";
import { LexerATNSimulator } from "antlr4ts/atn/LexerATNSimulator";
import { NotNull } from "antlr4ts/Decorators";
import { Override } from "antlr4ts/Decorators";
import { RuleContext } from "antlr4ts/RuleContext";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";


export class RLexer extends Lexer {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly T__8 = 9;
	public static readonly T__9 = 10;
	public static readonly T__10 = 11;
	public static readonly T__11 = 12;
	public static readonly T__12 = 13;
	public static readonly T__13 = 14;
	public static readonly T__14 = 15;
	public static readonly T__15 = 16;
	public static readonly T__16 = 17;
	public static readonly T__17 = 18;
	public static readonly T__18 = 19;
	public static readonly T__19 = 20;
	public static readonly T__20 = 21;
	public static readonly T__21 = 22;
	public static readonly T__22 = 23;
	public static readonly T__23 = 24;
	public static readonly T__24 = 25;
	public static readonly T__25 = 26;
	public static readonly T__26 = 27;
	public static readonly T__27 = 28;
	public static readonly T__28 = 29;
	public static readonly T__29 = 30;
	public static readonly T__30 = 31;
	public static readonly T__31 = 32;
	public static readonly T__32 = 33;
	public static readonly T__33 = 34;
	public static readonly T__34 = 35;
	public static readonly T__35 = 36;
	public static readonly T__36 = 37;
	public static readonly T__37 = 38;
	public static readonly T__38 = 39;
	public static readonly T__39 = 40;
	public static readonly T__40 = 41;
	public static readonly LBRACE = 42;
	public static readonly RBRACE = 43;
	public static readonly NULL = 44;
	public static readonly NA = 45;
	public static readonly NAN = 46;
	public static readonly INF = 47;
	public static readonly BOOL = 48;
	public static readonly HEX = 49;
	public static readonly INT = 50;
	public static readonly FLOAT = 51;
	public static readonly STRING = 52;
	public static readonly ID = 53;
	public static readonly USER_OP = 54;
	public static readonly COMMENT = 55;
	public static readonly WS = 56;

	// tslint:disable:no-trailing-whitespace
	public static readonly channelNames: string[] = [
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN",
	];

	// tslint:disable:no-trailing-whitespace
	public static readonly modeNames: string[] = [
		"DEFAULT_MODE",
	];

	public static readonly ruleNames: string[] = [
		"T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "T__6", "T__7", "T__8", 
		"T__9", "T__10", "T__11", "T__12", "T__13", "T__14", "T__15", "T__16", 
		"T__17", "T__18", "T__19", "T__20", "T__21", "T__22", "T__23", "T__24", 
		"T__25", "T__26", "T__27", "T__28", "T__29", "T__30", "T__31", "T__32", 
		"T__33", "T__34", "T__35", "T__36", "T__37", "T__38", "T__39", "T__40", 
		"LBRACE", "RBRACE", "NULL", "NA", "NAN", "INF", "BOOL", "HEX", "INT", 
		"HEXDIGIT", "FLOAT", "DIGIT", "EXP", "STRING", "ESC", "UNICODE_ESCAPE", 
		"OCTAL_ESCAPE", "HEX_ESCAPE", "ID", "LETTER", "USER_OP", "COMMENT", "WS",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'('", "')'", "'function'", "'::'", "'$'", "'['", "']'", "'[['", 
		"']]'", "'^'", "'-'", "'+'", "':'", "'*'", "'/'", "'>'", "'>='", "'<'", 
		"'<='", "'=='", "'!='", "'!'", "'&'", "'&&'", "'|'", "'||'", "'->'", "'->>'", 
		"'<-'", "'<<-'", "'if'", "'else'", "'for'", "'in'", "'while'", "'repeat'", 
		"'break'", "'next'", "';'", "','", "'='", "'{'", "'}'", "'NULL'", "'NA'", 
		"'NaN'", "'Inf'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		"LBRACE", "RBRACE", "NULL", "NA", "NAN", "INF", "BOOL", "HEX", "INT", 
		"FLOAT", "STRING", "ID", "USER_OP", "COMMENT", "WS",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(RLexer._LITERAL_NAMES, RLexer._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return RLexer.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(RLexer._ATN, this);
	}

	// @Override
	public get grammarFileName(): string { return "R.g4"; }

	// @Override
	public get ruleNames(): string[] { return RLexer.ruleNames; }

	// @Override
	public get serializedATN(): string { return RLexer._serializedATN; }

	// @Override
	public get channelNames(): string[] { return RLexer.channelNames; }

	// @Override
	public get modeNames(): string[] { return RLexer.modeNames; }

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x02:\u01D4\b\x01" +
		"\x04\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06" +
		"\x04\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r" +
		"\t\r\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t" +
		"\x12\x04\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t" +
		"\x17\x04\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t" +
		"\x1C\x04\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t" +
		"\"\x04#\t#\x04$\t$\x04%\t%\x04&\t&\x04\'\t\'\x04(\t(\x04)\t)\x04*\t*\x04" +
		"+\t+\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x041\t1\x042\t2\x043\t3\x04" +
		"4\t4\x045\t5\x046\t6\x047\t7\x048\t8\x049\t9\x04:\t:\x04;\t;\x04<\t<\x04" +
		"=\t=\x04>\t>\x04?\t?\x04@\t@\x04A\tA\x03\x02\x03\x02\x03\x03\x03\x03\x03" +
		"\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03" +
		"\x05\x03\x05\x03\x05\x03\x06\x03\x06\x03\x07\x03\x07\x03\b\x03\b\x03\t" +
		"\x03\t\x03\t\x03\n\x03\n\x03\n\x03\v\x03\v\x03\f\x03\f\x03\r\x03\r\x03" +
		"\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x11\x03\x11\x03\x12\x03" +
		"\x12\x03\x12\x03\x13\x03\x13\x03\x14\x03\x14\x03\x14\x03\x15\x03\x15\x03" +
		"\x15\x03\x16\x03\x16\x03\x16\x03\x17\x03\x17\x03\x18\x03\x18\x03\x19\x03" +
		"\x19\x03\x19\x03\x1A\x03\x1A\x03\x1B\x03\x1B\x03\x1B\x03\x1C\x03\x1C\x03" +
		"\x1C\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1E\x03\x1E\x03\x1E\x03\x1F\x03" +
		"\x1F\x03\x1F\x03\x1F\x03 \x03 \x03 \x03!\x03!\x03!\x03!\x03!\x03\"\x03" +
		"\"\x03\"\x03\"\x03#\x03#\x03#\x03$\x03$\x03$\x03$\x03$\x03$\x03%\x03%" +
		"\x03%\x03%\x03%\x03%\x03%\x03&\x03&\x03&\x03&\x03&\x03&\x03\'\x03\'\x03" +
		"\'\x03\'\x03\'\x03(\x03(\x03)\x03)\x03*\x03*\x03+\x03+\x03,\x03,\x03-" +
		"\x03-\x03-\x03-\x03-\x03.\x03.\x03.\x03/\x03/\x03/\x03/\x030\x030\x03" +
		"0\x030\x031\x031\x031\x031\x031\x031\x031\x031\x031\x031\x051\u0121\n" +
		"1\x032\x032\x032\x062\u0126\n2\r2\x0E2\u0127\x033\x033\x033\x033\x033" +
		"\x033\x053\u0130\n3\x034\x034\x035\x065\u0135\n5\r5\x0E5\u0136\x035\x03" +
		"5\x075\u013B\n5\f5\x0E5\u013E\v5\x035\x055\u0141\n5\x035\x065\u0144\n" +
		"5\r5\x0E5\u0145\x035\x055\u0149\n5\x035\x035\x065\u014D\n5\r5\x0E5\u014E" +
		"\x035\x055\u0152\n5\x055\u0154\n5\x036\x036\x037\x037\x057\u015A\n7\x03" +
		"7\x067\u015D\n7\r7\x0E7\u015E\x038\x038\x038\x078\u0164\n8\f8\x0E8\u0167" +
		"\v8\x038\x038\x039\x039\x039\x039\x039\x059\u0170\n9\x03:\x03:\x03:\x03" +
		":\x03:\x03:\x03:\x03:\x03:\x03:\x03:\x03:\x03:\x03:\x03:\x03:\x05:\u0182" +
		"\n:\x03;\x03;\x03;\x03;\x03;\x03;\x03;\x03;\x03;\x05;\u018D\n;\x03<\x03" +
		"<\x03<\x05<\u0192\n<\x03=\x03=\x03=\x05=\u0197\n=\x03=\x03=\x03=\x07=" +
		"\u019C\n=\f=\x0E=\u019F\v=\x03=\x03=\x03=\x03=\x07=\u01A5\n=\f=\x0E=\u01A8" +
		"\v=\x03=\x03=\x03=\x07=\u01AD\n=\f=\x0E=\u01B0\v=\x03=\x05=\u01B3\n=\x03" +
		">\x03>\x03?\x03?\x07?\u01B9\n?\f?\x0E?\u01BC\v?\x03?\x03?\x03@\x03@\x07" +
		"@\u01C2\n@\f@\x0E@\u01C5\v@\x03@\x05@\u01C8\n@\x03@\x03@\x03@\x03@\x03" +
		"A\x06A\u01CF\nA\rA\x0EA\u01D0\x03A\x03A\x06\u0165\u01AE\u01BA\u01C3\x02" +
		"\x02B\x03\x02\x03\x05\x02\x04\x07\x02\x05\t\x02\x06\v\x02\x07\r\x02\b" +
		"\x0F\x02\t\x11\x02\n\x13\x02\v\x15\x02\f\x17\x02\r\x19\x02\x0E\x1B\x02" +
		"\x0F\x1D\x02\x10\x1F\x02\x11!\x02\x12#\x02\x13%\x02\x14\'\x02\x15)\x02" +
		"\x16+\x02\x17-\x02\x18/\x02\x191\x02\x1A3\x02\x1B5\x02\x1C7\x02\x1D9\x02" +
		"\x1E;\x02\x1F=\x02 ?\x02!A\x02\"C\x02#E\x02$G\x02%I\x02&K\x02\'M\x02(" +
		"O\x02)Q\x02*S\x02+U\x02,W\x02-Y\x02.[\x02/]\x020_\x021a\x022c\x023e\x02" +
		"4g\x02\x02i\x025k\x02\x02m\x02\x02o\x026q\x02\x02s\x02\x02u\x02\x02w\x02" +
		"\x02y\x027{\x02\x02}\x028\x7F\x029\x81\x02:\x03\x02\x0F\x04\x02HHVV\x04" +
		"\x02ZZzz\x05\x022;CHch\x04\x02GGgg\x04\x02--//\x04\x02$$^^\v\x02$$))^" +
		"^cdhhppttvvxx\x03\x0225\x03\x0229\x04\x0200aa\x04\x02))^^\x04\x02C\\c" +
		"|\x05\x02\v\f\x0E\x0F\"\"\x02\u01F2\x02\x03\x03\x02\x02\x02\x02\x05\x03" +
		"\x02\x02\x02\x02\x07\x03\x02\x02\x02\x02\t\x03\x02\x02\x02\x02\v\x03\x02" +
		"\x02\x02\x02\r\x03\x02\x02\x02\x02\x0F\x03\x02\x02\x02\x02\x11\x03\x02" +
		"\x02\x02\x02\x13\x03\x02\x02\x02\x02\x15\x03\x02\x02\x02\x02\x17\x03\x02" +
		"\x02\x02\x02\x19\x03\x02\x02\x02\x02\x1B\x03\x02\x02\x02\x02\x1D\x03\x02" +
		"\x02\x02\x02\x1F\x03\x02\x02\x02\x02!\x03\x02\x02\x02\x02#\x03\x02\x02" +
		"\x02\x02%\x03\x02\x02\x02\x02\'\x03\x02\x02\x02\x02)\x03\x02\x02\x02\x02" +
		"+\x03\x02\x02\x02\x02-\x03\x02\x02\x02\x02/\x03\x02\x02\x02\x021\x03\x02" +
		"\x02\x02\x023\x03\x02\x02\x02\x025\x03\x02\x02\x02\x027\x03\x02\x02\x02" +
		"\x029\x03\x02\x02\x02\x02;\x03\x02\x02\x02\x02=\x03\x02\x02\x02\x02?\x03" +
		"\x02\x02\x02\x02A\x03\x02\x02\x02\x02C\x03\x02\x02\x02\x02E\x03\x02\x02" +
		"\x02\x02G\x03\x02\x02\x02\x02I\x03\x02\x02\x02\x02K\x03\x02\x02\x02\x02" +
		"M\x03\x02\x02\x02\x02O\x03\x02\x02\x02\x02Q\x03\x02\x02\x02\x02S\x03\x02" +
		"\x02\x02\x02U\x03\x02\x02\x02\x02W\x03\x02\x02\x02\x02Y\x03\x02\x02\x02" +
		"\x02[\x03\x02\x02\x02\x02]\x03\x02\x02\x02\x02_\x03\x02\x02\x02\x02a\x03" +
		"\x02\x02\x02\x02c\x03\x02\x02\x02\x02e\x03\x02\x02\x02\x02i\x03\x02\x02" +
		"\x02\x02o\x03\x02\x02\x02\x02y\x03\x02\x02\x02\x02}\x03\x02\x02\x02\x02" +
		"\x7F\x03\x02\x02\x02\x02\x81\x03\x02\x02\x02\x03\x83\x03\x02\x02\x02\x05" +
		"\x85\x03\x02\x02\x02\x07\x87\x03\x02\x02\x02\t\x90\x03\x02\x02\x02\v\x93" +
		"\x03\x02\x02\x02\r\x95\x03\x02\x02\x02\x0F\x97\x03\x02\x02\x02\x11\x99" +
		"\x03\x02\x02\x02\x13\x9C\x03\x02\x02\x02\x15\x9F\x03\x02\x02\x02\x17\xA1" +
		"\x03\x02\x02\x02\x19\xA3\x03\x02\x02\x02\x1B\xA5\x03\x02\x02\x02\x1D\xA7" +
		"\x03\x02\x02\x02\x1F\xA9\x03\x02\x02\x02!\xAB\x03\x02\x02\x02#\xAD\x03" +
		"\x02\x02\x02%\xB0\x03\x02\x02\x02\'\xB2\x03\x02\x02\x02)\xB5\x03\x02\x02" +
		"\x02+\xB8\x03\x02\x02\x02-\xBB\x03\x02\x02\x02/\xBD\x03\x02\x02\x021\xBF" +
		"\x03\x02\x02\x023\xC2\x03\x02\x02\x025\xC4\x03\x02\x02\x027\xC7\x03\x02" +
		"\x02\x029\xCA\x03\x02\x02\x02;\xCE\x03\x02\x02\x02=\xD1\x03\x02\x02\x02" +
		"?\xD5\x03\x02\x02\x02A\xD8\x03\x02\x02\x02C\xDD\x03\x02\x02\x02E\xE1\x03" +
		"\x02\x02\x02G\xE4\x03\x02\x02\x02I\xEA\x03\x02\x02\x02K\xF1\x03\x02\x02" +
		"\x02M\xF7\x03\x02\x02\x02O\xFC\x03\x02\x02\x02Q\xFE\x03\x02\x02\x02S\u0100" +
		"\x03\x02\x02\x02U\u0102\x03\x02\x02\x02W\u0104\x03\x02\x02\x02Y\u0106" +
		"\x03\x02\x02\x02[\u010B\x03\x02\x02\x02]\u010E\x03\x02\x02\x02_\u0112" +
		"\x03\x02\x02\x02a\u0120\x03\x02\x02\x02c\u0122\x03\x02\x02\x02e\u012F" +
		"\x03\x02\x02\x02g\u0131\x03\x02\x02\x02i\u0153\x03\x02\x02\x02k\u0155" +
		"\x03\x02\x02\x02m\u0157\x03\x02\x02\x02o\u0160\x03\x02\x02\x02q\u016F" +
		"\x03\x02\x02\x02s\u0181\x03\x02\x02\x02u\u018C\x03\x02\x02\x02w\u018E" +
		"\x03\x02\x02\x02y\u01B2\x03\x02\x02\x02{\u01B4\x03\x02\x02\x02}\u01B6" +
		"\x03\x02\x02\x02\x7F\u01BF\x03\x02\x02\x02\x81\u01CE\x03\x02\x02\x02\x83" +
		"\x84\x07*\x02\x02\x84\x04\x03\x02\x02\x02\x85\x86\x07+\x02\x02\x86\x06" +
		"\x03\x02\x02\x02\x87\x88\x07h\x02\x02\x88\x89\x07w\x02\x02\x89\x8A\x07" +
		"p\x02\x02\x8A\x8B\x07e\x02\x02\x8B\x8C\x07v\x02\x02\x8C\x8D\x07k\x02\x02" +
		"\x8D\x8E\x07q\x02\x02\x8E\x8F\x07p\x02\x02\x8F\b\x03\x02\x02\x02\x90\x91" +
		"\x07<\x02\x02\x91\x92\x07<\x02\x02\x92\n\x03\x02\x02\x02\x93\x94\x07&" +
		"\x02\x02\x94\f\x03\x02\x02\x02\x95\x96\x07]\x02\x02\x96\x0E\x03\x02\x02" +
		"\x02\x97\x98\x07_\x02\x02\x98\x10\x03\x02\x02\x02\x99\x9A\x07]\x02\x02" +
		"\x9A\x9B\x07]\x02\x02\x9B\x12\x03\x02\x02\x02\x9C\x9D\x07_\x02\x02\x9D" +
		"\x9E\x07_\x02\x02\x9E\x14\x03\x02\x02\x02\x9F\xA0\x07`\x02\x02\xA0\x16" +
		"\x03\x02\x02\x02\xA1\xA2\x07/\x02\x02\xA2\x18\x03\x02\x02\x02\xA3\xA4" +
		"\x07-\x02\x02\xA4\x1A\x03\x02\x02\x02\xA5\xA6\x07<\x02\x02\xA6\x1C\x03" +
		"\x02\x02\x02\xA7\xA8\x07,\x02\x02\xA8\x1E\x03\x02\x02\x02\xA9\xAA\x07" +
		"1\x02\x02\xAA \x03\x02\x02\x02\xAB\xAC\x07@\x02\x02\xAC\"\x03\x02\x02" +
		"\x02\xAD\xAE\x07@\x02\x02\xAE\xAF\x07?\x02\x02\xAF$\x03\x02\x02\x02\xB0" +
		"\xB1\x07>\x02\x02\xB1&\x03\x02\x02\x02\xB2\xB3\x07>\x02\x02\xB3\xB4\x07" +
		"?\x02\x02\xB4(\x03\x02\x02\x02\xB5\xB6\x07?\x02\x02\xB6\xB7\x07?\x02\x02" +
		"\xB7*\x03\x02\x02\x02\xB8\xB9\x07#\x02\x02\xB9\xBA\x07?\x02\x02\xBA,\x03" +
		"\x02\x02\x02\xBB\xBC\x07#\x02\x02\xBC.\x03\x02\x02\x02\xBD\xBE\x07(\x02" +
		"\x02\xBE0\x03\x02\x02\x02\xBF\xC0\x07(\x02\x02\xC0\xC1\x07(\x02\x02\xC1" +
		"2\x03\x02\x02\x02\xC2\xC3\x07~\x02\x02\xC34\x03\x02\x02\x02\xC4\xC5\x07" +
		"~\x02\x02\xC5\xC6\x07~\x02\x02\xC66\x03\x02\x02\x02\xC7\xC8\x07/\x02\x02" +
		"\xC8\xC9\x07@\x02\x02\xC98\x03\x02\x02\x02\xCA\xCB\x07/\x02\x02\xCB\xCC" +
		"\x07@\x02\x02\xCC\xCD\x07@\x02\x02\xCD:\x03\x02\x02\x02\xCE\xCF\x07>\x02" +
		"\x02\xCF\xD0\x07/\x02\x02\xD0<\x03\x02\x02\x02\xD1\xD2\x07>\x02\x02\xD2" +
		"\xD3\x07>\x02\x02\xD3\xD4\x07/\x02\x02\xD4>\x03\x02\x02\x02\xD5\xD6\x07" +
		"k\x02\x02\xD6\xD7\x07h\x02\x02\xD7@\x03\x02\x02\x02\xD8\xD9\x07g\x02\x02" +
		"\xD9\xDA\x07n\x02\x02\xDA\xDB\x07u\x02\x02\xDB\xDC\x07g\x02\x02\xDCB\x03" +
		"\x02\x02\x02\xDD\xDE\x07h\x02\x02\xDE\xDF\x07q\x02\x02\xDF\xE0\x07t\x02" +
		"\x02\xE0D\x03\x02\x02\x02\xE1\xE2\x07k\x02\x02\xE2\xE3\x07p\x02\x02\xE3" +
		"F\x03\x02\x02\x02\xE4\xE5\x07y\x02\x02\xE5\xE6\x07j\x02\x02\xE6\xE7\x07" +
		"k\x02\x02\xE7\xE8\x07n\x02\x02\xE8\xE9\x07g\x02\x02\xE9H\x03\x02\x02\x02" +
		"\xEA\xEB\x07t\x02\x02\xEB\xEC\x07g\x02\x02\xEC\xED\x07r\x02\x02\xED\xEE" +
		"\x07g\x02\x02\xEE\xEF\x07c\x02\x02\xEF\xF0\x07v\x02\x02\xF0J\x03\x02\x02" +
		"\x02\xF1\xF2\x07d\x02\x02\xF2\xF3\x07t\x02\x02\xF3\xF4\x07g\x02\x02\xF4" +
		"\xF5\x07c\x02\x02\xF5\xF6\x07m\x02\x02\xF6L\x03\x02\x02\x02\xF7\xF8\x07" +
		"p\x02\x02\xF8\xF9\x07g\x02\x02\xF9\xFA\x07z\x02\x02\xFA\xFB\x07v\x02\x02" +
		"\xFBN\x03\x02\x02\x02\xFC\xFD\x07=\x02\x02\xFDP\x03\x02\x02\x02\xFE\xFF" +
		"\x07.\x02\x02\xFFR\x03\x02\x02\x02\u0100\u0101\x07?\x02\x02\u0101T\x03" +
		"\x02\x02\x02\u0102\u0103\x07}\x02\x02\u0103V\x03\x02\x02\x02\u0104\u0105" +
		"\x07\x7F\x02\x02\u0105X\x03\x02\x02\x02\u0106\u0107\x07P\x02\x02\u0107" +
		"\u0108\x07W\x02\x02\u0108\u0109\x07N\x02\x02\u0109\u010A\x07N\x02\x02" +
		"\u010AZ\x03\x02\x02\x02\u010B\u010C\x07P\x02\x02\u010C\u010D\x07C\x02" +
		"\x02\u010D\\\x03\x02\x02\x02\u010E\u010F\x07P\x02\x02\u010F\u0110\x07" +
		"c\x02\x02\u0110\u0111\x07P\x02\x02\u0111^\x03\x02\x02\x02\u0112\u0113" +
		"\x07K\x02\x02\u0113\u0114\x07p\x02\x02\u0114\u0115\x07h\x02\x02\u0115" +
		"`\x03\x02\x02\x02\u0116\u0117\x07V\x02\x02\u0117\u0118\x07T\x02\x02\u0118" +
		"\u0119\x07W\x02\x02\u0119\u0121\x07G\x02\x02\u011A\u011B\x07H\x02\x02" +
		"\u011B\u011C\x07C\x02\x02\u011C\u011D\x07N\x02\x02\u011D\u011E\x07U\x02" +
		"\x02\u011E\u0121\x07G\x02\x02\u011F\u0121\t\x02\x02\x02\u0120\u0116\x03" +
		"\x02\x02\x02\u0120\u011A\x03\x02\x02\x02\u0120\u011F\x03\x02\x02\x02\u0121" +
		"b\x03\x02\x02\x02\u0122\u0123\x072\x02\x02\u0123\u0125\t\x03\x02\x02\u0124" +
		"\u0126\x05g4\x02\u0125\u0124\x03\x02\x02\x02\u0126\u0127\x03\x02\x02\x02" +
		"\u0127\u0125\x03\x02\x02\x02\u0127\u0128\x03\x02\x02\x02\u0128d\x03\x02" +
		"\x02\x02\u0129\u012A\x05i5\x02\u012A\u012B\x07N\x02\x02\u012B\u0130\x03" +
		"\x02\x02\x02\u012C\u012D\x05c2\x02\u012D\u012E\x07N\x02\x02\u012E\u0130" +
		"\x03\x02\x02\x02\u012F\u0129\x03\x02\x02\x02\u012F\u012C\x03\x02\x02\x02" +
		"\u0130f\x03\x02\x02\x02\u0131\u0132\t\x04\x02\x02\u0132h\x03\x02\x02\x02" +
		"\u0133\u0135\x05k6\x02\u0134\u0133\x03\x02\x02\x02\u0135\u0136\x03\x02" +
		"\x02\x02\u0136\u0134\x03\x02\x02\x02\u0136\u0137\x03\x02\x02\x02\u0137" +
		"\u0138\x03\x02\x02\x02\u0138\u013C\x070\x02\x02\u0139\u013B\x05k6\x02" +
		"\u013A\u0139\x03\x02\x02\x02\u013B\u013E\x03\x02\x02\x02\u013C\u013A\x03" +
		"\x02\x02\x02\u013C\u013D\x03\x02\x02\x02\u013D\u0140\x03\x02\x02\x02\u013E" +
		"\u013C\x03\x02\x02\x02\u013F\u0141\x05m7\x02\u0140\u013F\x03\x02\x02\x02" +
		"\u0140\u0141\x03\x02\x02\x02\u0141\u0154\x03\x02\x02\x02\u0142\u0144\x05" +
		"k6\x02\u0143\u0142\x03\x02\x02\x02\u0144\u0145\x03\x02\x02\x02\u0145\u0143" +
		"\x03\x02\x02\x02\u0145\u0146\x03\x02\x02\x02\u0146\u0148\x03\x02\x02\x02" +
		"\u0147\u0149\x05m7\x02\u0148\u0147\x03\x02\x02\x02\u0148\u0149\x03\x02" +
		"\x02\x02\u0149\u0154\x03\x02\x02\x02\u014A\u014C\x070\x02\x02\u014B\u014D" +
		"\x05k6\x02\u014C\u014B\x03\x02\x02\x02\u014D\u014E\x03\x02\x02\x02\u014E" +
		"\u014C\x03\x02\x02\x02\u014E\u014F\x03\x02\x02\x02\u014F\u0151\x03\x02" +
		"\x02\x02\u0150\u0152\x05m7\x02\u0151\u0150\x03\x02\x02\x02\u0151\u0152" +
		"\x03\x02\x02\x02\u0152\u0154\x03\x02\x02\x02\u0153\u0134\x03\x02\x02\x02" +
		"\u0153\u0143\x03\x02\x02\x02\u0153\u014A\x03\x02\x02\x02\u0154j\x03\x02" +
		"\x02\x02\u0155\u0156\x042;\x02\u0156l\x03\x02\x02\x02\u0157\u0159\t\x05" +
		"\x02\x02\u0158\u015A\t\x06\x02\x02\u0159\u0158\x03\x02\x02\x02\u0159\u015A" +
		"\x03\x02\x02\x02\u015A\u015C\x03\x02\x02\x02\u015B\u015D\x05k6\x02\u015C" +
		"\u015B\x03\x02\x02\x02\u015D\u015E\x03\x02\x02\x02\u015E\u015C\x03\x02" +
		"\x02\x02\u015E\u015F\x03\x02\x02\x02\u015Fn\x03\x02\x02\x02\u0160\u0165" +
		"\x07$\x02\x02\u0161\u0164\x05q9\x02\u0162\u0164\n\x07\x02\x02\u0163\u0161" +
		"\x03\x02\x02\x02\u0163\u0162\x03\x02\x02\x02\u0164\u0167\x03\x02\x02\x02" +
		"\u0165\u0166\x03\x02\x02\x02\u0165\u0163\x03\x02\x02\x02\u0166\u0168\x03" +
		"\x02\x02\x02\u0167\u0165\x03\x02\x02\x02\u0168\u0169\x07$\x02\x02\u0169" +
		"p\x03\x02\x02\x02\u016A\u016B\x07^\x02\x02\u016B\u0170\t\b\x02\x02\u016C" +
		"\u0170\x05s:\x02\u016D\u0170\x05w<\x02\u016E\u0170\x05u;\x02\u016F\u016A" +
		"\x03\x02\x02\x02\u016F\u016C\x03\x02\x02\x02\u016F\u016D\x03\x02\x02\x02" +
		"\u016F\u016E\x03\x02\x02\x02\u0170r\x03\x02\x02\x02\u0171\u0172\x07^\x02" +
		"\x02\u0172\u0173\x07w\x02\x02\u0173\u0174\x05g4\x02\u0174\u0175\x05g4" +
		"\x02\u0175\u0176\x05g4\x02\u0176\u0177\x05g4\x02\u0177\u0182\x03\x02\x02" +
		"\x02\u0178\u0179\x07^\x02\x02\u0179\u017A\x07w\x02\x02\u017A\u017B\x07" +
		"}\x02\x02\u017B\u017C\x05g4\x02\u017C\u017D\x05g4\x02\u017D\u017E\x05" +
		"g4\x02\u017E\u017F\x05g4\x02\u017F\u0180\x07\x7F\x02\x02\u0180\u0182\x03" +
		"\x02\x02\x02\u0181\u0171\x03\x02\x02\x02\u0181\u0178\x03\x02\x02\x02\u0182" +
		"t\x03\x02\x02\x02\u0183\u0184\x07^\x02\x02\u0184\u0185\t\t\x02\x02\u0185" +
		"\u0186\t\n\x02\x02\u0186\u018D\t\n\x02\x02\u0187\u0188\x07^\x02\x02\u0188" +
		"\u0189\t\n\x02\x02\u0189\u018D\t\n\x02\x02\u018A\u018B\x07^\x02\x02\u018B" +
		"\u018D\t\n\x02\x02\u018C\u0183\x03\x02\x02\x02\u018C\u0187\x03\x02\x02" +
		"\x02\u018C\u018A\x03\x02\x02\x02\u018Dv\x03\x02\x02\x02\u018E\u018F\x07" +
		"^\x02\x02\u018F\u0191\x05g4\x02\u0190\u0192\x05g4\x02\u0191\u0190\x03" +
		"\x02\x02\x02\u0191\u0192\x03\x02\x02\x02\u0192x\x03\x02\x02\x02\u0193" +
		"\u0196\x070\x02\x02\u0194\u0197\x05{>\x02\u0195\u0197\t\v\x02\x02\u0196" +
		"\u0194\x03\x02\x02\x02\u0196\u0195\x03\x02\x02\x02\u0197\u019D\x03\x02" +
		"\x02\x02\u0198\u019C\x05{>\x02\u0199\u019C\x05k6\x02\u019A\u019C\t\v\x02" +
		"\x02\u019B\u0198\x03\x02\x02\x02\u019B\u0199\x03\x02\x02\x02\u019B\u019A" +
		"\x03\x02\x02\x02\u019C\u019F\x03\x02\x02\x02\u019D\u019B\x03\x02\x02\x02" +
		"\u019D\u019E\x03\x02\x02\x02\u019E\u01B3\x03\x02\x02\x02\u019F\u019D\x03" +
		"\x02\x02\x02\u01A0\u01A6\x05{>\x02\u01A1\u01A5\x05{>\x02\u01A2\u01A5\x05" +
		"k6\x02\u01A3\u01A5\t\v\x02\x02\u01A4\u01A1\x03\x02\x02\x02\u01A4\u01A2" +
		"\x03\x02\x02\x02\u01A4\u01A3\x03\x02\x02\x02\u01A5\u01A8\x03\x02\x02\x02" +
		"\u01A6\u01A4\x03\x02\x02\x02\u01A6\u01A7\x03\x02\x02\x02\u01A7\u01B3\x03" +
		"\x02\x02\x02\u01A8\u01A6\x03\x02\x02\x02\u01A9\u01AE\x07b\x02\x02\u01AA" +
		"\u01AD\x05q9\x02\u01AB\u01AD\n\f\x02\x02\u01AC\u01AA\x03\x02\x02\x02\u01AC" +
		"\u01AB\x03\x02\x02\x02\u01AD\u01B0\x03\x02\x02\x02\u01AE\u01AF\x03\x02" +
		"\x02\x02\u01AE\u01AC\x03\x02\x02\x02\u01AF\u01B1\x03\x02\x02\x02\u01B0" +
		"\u01AE\x03\x02\x02\x02\u01B1\u01B3\x07b\x02\x02\u01B2\u0193\x03\x02\x02" +
		"\x02\u01B2\u01A0\x03\x02\x02\x02\u01B2\u01A9\x03\x02\x02\x02\u01B3z\x03" +
		"\x02\x02\x02\u01B4\u01B5\t\r\x02\x02\u01B5|\x03\x02\x02\x02\u01B6\u01BA" +
		"\x07\'\x02\x02\u01B7\u01B9\v\x02\x02\x02\u01B8\u01B7\x03\x02\x02\x02\u01B9" +
		"\u01BC\x03\x02\x02\x02\u01BA\u01BB\x03\x02\x02\x02\u01BA\u01B8\x03\x02" +
		"\x02\x02\u01BB\u01BD\x03\x02\x02\x02\u01BC\u01BA\x03\x02\x02\x02\u01BD" +
		"\u01BE\x07\'\x02\x02\u01BE~\x03\x02\x02\x02\u01BF\u01C3\x07%\x02\x02\u01C0" +
		"\u01C2\v\x02\x02\x02\u01C1\u01C0\x03\x02\x02\x02\u01C2\u01C5\x03\x02\x02" +
		"\x02\u01C3\u01C4\x03\x02\x02\x02\u01C3\u01C1\x03\x02\x02\x02\u01C4\u01C7" +
		"\x03\x02\x02\x02\u01C5\u01C3\x03\x02\x02\x02\u01C6\u01C8\x07\x0F\x02\x02" +
		"\u01C7\u01C6\x03\x02\x02\x02\u01C7\u01C8\x03\x02\x02\x02\u01C8\u01C9\x03" +
		"\x02\x02\x02\u01C9\u01CA\x07\f\x02\x02\u01CA\u01CB\x03\x02\x02\x02\u01CB" +
		"\u01CC\b@\x02\x02\u01CC\x80\x03\x02\x02\x02\u01CD\u01CF\t\x0E\x02\x02" +
		"\u01CE\u01CD\x03\x02\x02\x02\u01CF\u01D0\x03\x02\x02\x02\u01D0\u01CE\x03" +
		"\x02\x02\x02\u01D0\u01D1\x03\x02\x02\x02\u01D1\u01D2\x03\x02\x02\x02\u01D2" +
		"\u01D3\bA\x02\x02\u01D3\x82\x03\x02\x02\x02\"\x02\u0120\u0127\u012F\u0136" +
		"\u013C\u0140\u0145\u0148\u014E\u0151\u0153\u0159\u015E\u0163\u0165\u016F" +
		"\u0181\u018C\u0191\u0196\u019B\u019D\u01A4\u01A6\u01AC\u01AE\u01B2\u01BA" +
		"\u01C3\u01C7\u01D0\x03\x02\x03\x02";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!RLexer.__ATN) {
			RLexer.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(RLexer._serializedATN));
		}

		return RLexer.__ATN;
	}

}

