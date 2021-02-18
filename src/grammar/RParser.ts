// Generated from R.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { RListener } from "./RListener";
import { RVisitor } from "./RVisitor";


export class RParser extends Parser {
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
	public static readonly T__41 = 42;
	public static readonly LBRACE = 43;
	public static readonly RBRACE = 44;
	public static readonly NULL = 45;
	public static readonly NA = 46;
	public static readonly NAN = 47;
	public static readonly INF = 48;
	public static readonly BOOL = 49;
	public static readonly DOTS = 50;
	public static readonly HEX = 51;
	public static readonly INT = 52;
	public static readonly FLOAT = 53;
	public static readonly STRING = 54;
	public static readonly ID = 55;
	public static readonly USER_OP = 56;
	public static readonly COMMENT = 57;
	public static readonly NL = 58;
	public static readonly WS = 59;
	public static readonly RULE_prog = 0;
	public static readonly RULE_expr = 1;
	public static readonly RULE_exprlist = 2;
	public static readonly RULE_eoe = 3;
	public static readonly RULE_literal = 4;
	public static readonly RULE_name = 5;
	public static readonly RULE_formallist = 6;
	public static readonly RULE_formal = 7;
	public static readonly RULE_arglist = 8;
	public static readonly RULE_arg = 9;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"prog", "expr", "exprlist", "eoe", "literal", "name", "formallist", "formal", 
		"arglist", "arg",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'('", "')'", "'function'", "'::'", "'$'", "'['", "']'", "'[['", 
		"']]'", "'^'", "'-'", "'+'", "':'", "'*'", "'/'", "'>'", "'>='", "'<'", 
		"'<='", "'=='", "'!='", "'!'", "'&'", "'&&'", "'|'", "'||'", "'->'", "'->>'", 
		"'<-'", "'<<-'", "'if'", "'else'", "'for'", "'in'", "'while'", "'repeat'", 
		"'break'", "'next'", "';'", "','", "'='", "'...'", "'{'", "'}'", "'NULL'", 
		"'NA'", "'NaN'", "'Inf'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, "LBRACE", "RBRACE", "NULL", "NA", "NAN", "INF", "BOOL", "DOTS", 
		"HEX", "INT", "FLOAT", "STRING", "ID", "USER_OP", "COMMENT", "NL", "WS",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(RParser._LITERAL_NAMES, RParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return RParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "R.g4"; }

	// @Override
	public get ruleNames(): string[] { return RParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return RParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}



	public lineTerminatorAhead() : boolean {
	    let possibleIndex = this.currentToken.tokenIndex - 1;
	    let ahead : Token = this._input.get(possibleIndex);
	    if (ahead.channel != Token.HIDDEN_CHANNEL) {
	        return false;
	    }
	    return (ahead.type == RParser.COMMENT) || (ahead.type == RParser.NL);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(RParser._ATN, this);
	}
	// @RuleVersion(0)
	public prog(): ProgContext {
		let _localctx: ProgContext = new ProgContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, RParser.RULE_prog);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 25;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << RParser.T__0) | (1 << RParser.T__2) | (1 << RParser.T__10) | (1 << RParser.T__11) | (1 << RParser.T__21) | (1 << RParser.T__30))) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & ((1 << (RParser.T__32 - 33)) | (1 << (RParser.T__34 - 33)) | (1 << (RParser.T__35 - 33)) | (1 << (RParser.T__36 - 33)) | (1 << (RParser.T__37 - 33)) | (1 << (RParser.LBRACE - 33)) | (1 << (RParser.NULL - 33)) | (1 << (RParser.NA - 33)) | (1 << (RParser.NAN - 33)) | (1 << (RParser.INF - 33)) | (1 << (RParser.BOOL - 33)) | (1 << (RParser.HEX - 33)) | (1 << (RParser.INT - 33)) | (1 << (RParser.FLOAT - 33)) | (1 << (RParser.STRING - 33)) | (1 << (RParser.ID - 33)))) !== 0)) {
				{
				{
				this.state = 20;
				this.expr(0);
				this.state = 21;
				this.eoe();
				}
				}
				this.state = 27;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 29;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 1, this._ctx) ) {
			case 1:
				{
				this.state = 28;
				this.match(RParser.EOF);
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public expr(): ExprContext;
	public expr(_p: number): ExprContext;
	// @RuleVersion(0)
	public expr(_p?: number): ExprContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ExprContext = new ExprContext(this._ctx, _parentState);
		let _prevctx: ExprContext = _localctx;
		let _startState: number = 2;
		this.enterRecursionRule(_localctx, 2, RParser.RULE_expr, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 86;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 3, this._ctx) ) {
			case 1:
				{
				_localctx = new LitContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 32;
				this.literal();
				}
				break;

			case 2:
				{
				_localctx = new SymbolContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 33;
				this.match(RParser.ID);
				}
				break;

			case 3:
				{
				_localctx = new CallContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 34;
				(_localctx as CallContext)._op = this.match(RParser.T__0);
				this.state = 35;
				this.expr(0);
				this.state = 36;
				this.match(RParser.T__1);
				}
				break;

			case 4:
				{
				_localctx = new FunctionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 38;
				this.match(RParser.T__2);
				this.state = 39;
				this.match(RParser.T__0);
				this.state = 40;
				this.formallist();
				this.state = 41;
				this.match(RParser.T__1);
				this.state = 42;
				this.expr(24);
				}
				break;

			case 5:
				{
				_localctx = new CallContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 44;
				(_localctx as CallContext)._op = this.match(RParser.LBRACE);
				this.state = 45;
				this.exprlist();
				this.state = 46;
				this.match(RParser.RBRACE);
				}
				break;

			case 6:
				{
				_localctx = new NamespaceContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 48;
				this.name();
				this.state = 49;
				this.match(RParser.T__3);
				this.state = 50;
				this.name();
				}
				break;

			case 7:
				{
				_localctx = new CallContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 52;
				(_localctx as CallContext)._op = this._input.LT(1);
				_la = this._input.LA(1);
				if (!(_la === RParser.T__10 || _la === RParser.T__11)) {
					(_localctx as CallContext)._op = this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 53;
				this.expr(17);
				}
				break;

			case 8:
				{
				_localctx = new CallContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 54;
				(_localctx as CallContext)._op = this.match(RParser.T__21);
				this.state = 55;
				this.expr(11);
				}
				break;

			case 9:
				{
				_localctx = new AssignContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 56;
				(_localctx as AssignContext)._sym = this._input.LT(1);
				_la = this._input.LA(1);
				if (!(_la === RParser.STRING || _la === RParser.ID)) {
					(_localctx as AssignContext)._sym = this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 57;
				(_localctx as AssignContext)._arrow = this._input.LT(1);
				_la = this._input.LA(1);
				if (!(_la === RParser.T__28 || _la === RParser.T__29)) {
					(_localctx as AssignContext)._arrow = this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 58;
				(_localctx as AssignContext)._val = this.expr(7);
				}
				break;

			case 10:
				{
				_localctx = new CallContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 59;
				(_localctx as CallContext)._op = this.match(RParser.T__30);
				this.state = 60;
				this.match(RParser.T__0);
				this.state = 61;
				this.expr(0);
				this.state = 62;
				this.match(RParser.T__1);
				this.state = 63;
				this.expr(0);
				this.state = 66;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 2, this._ctx) ) {
				case 1:
					{
					this.state = 64;
					this.match(RParser.T__31);
					this.state = 65;
					this.expr(0);
					}
					break;
				}
				}
				break;

			case 11:
				{
				_localctx = new ForContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 68;
				this.match(RParser.T__32);
				this.state = 69;
				this.match(RParser.T__0);
				this.state = 70;
				this.match(RParser.ID);
				this.state = 71;
				this.match(RParser.T__33);
				this.state = 72;
				(_localctx as ForContext)._seq = this.expr(0);
				this.state = 73;
				this.match(RParser.T__1);
				this.state = 74;
				(_localctx as ForContext)._body = this.expr(5);
				}
				break;

			case 12:
				{
				_localctx = new CallContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 76;
				(_localctx as CallContext)._op = this.match(RParser.T__34);
				this.state = 77;
				this.match(RParser.T__0);
				this.state = 78;
				this.expr(0);
				this.state = 79;
				this.match(RParser.T__1);
				this.state = 80;
				this.expr(4);
				}
				break;

			case 13:
				{
				_localctx = new CallContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 82;
				(_localctx as CallContext)._op = this.match(RParser.T__35);
				this.state = 83;
				this.expr(3);
				}
				break;

			case 14:
				{
				_localctx = new CallContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 84;
				(_localctx as CallContext)._op = this.match(RParser.T__36);
				}
				break;

			case 15:
				{
				_localctx = new CallContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 85;
				(_localctx as CallContext)._op = this.match(RParser.T__37);
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 135;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 5, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 133;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 4, this._ctx) ) {
					case 1:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 88;
						if (!(this.precpred(this._ctx, 18))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 18)");
						}
						this.state = 89;
						(_localctx as CallContext)._op = this.match(RParser.T__9);
						this.state = 90;
						this.expr(18);
						}
						break;

					case 2:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 91;
						if (!(this.precpred(this._ctx, 16))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 16)");
						}
						this.state = 92;
						(_localctx as CallContext)._op = this.match(RParser.T__12);
						this.state = 93;
						this.expr(17);
						}
						break;

					case 3:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 94;
						if (!(this.precpred(this._ctx, 15))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 15)");
						}
						this.state = 95;
						(_localctx as CallContext)._op = this.match(RParser.USER_OP);
						this.state = 96;
						this.expr(16);
						}
						break;

					case 4:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 97;
						if (!(this.precpred(this._ctx, 14))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 14)");
						}
						this.state = 98;
						(_localctx as CallContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(_la === RParser.T__13 || _la === RParser.T__14)) {
							(_localctx as CallContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 99;
						this.expr(15);
						}
						break;

					case 5:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 100;
						if (!(this.precpred(this._ctx, 13))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 13)");
						}
						this.state = 101;
						(_localctx as CallContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(_la === RParser.T__10 || _la === RParser.T__11)) {
							(_localctx as CallContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 102;
						this.expr(14);
						}
						break;

					case 6:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 103;
						if (!(this.precpred(this._ctx, 12))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 12)");
						}
						this.state = 104;
						(_localctx as CallContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << RParser.T__15) | (1 << RParser.T__16) | (1 << RParser.T__17) | (1 << RParser.T__18) | (1 << RParser.T__19) | (1 << RParser.T__20))) !== 0))) {
							(_localctx as CallContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 105;
						this.expr(13);
						}
						break;

					case 7:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 106;
						if (!(this.precpred(this._ctx, 10))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 10)");
						}
						this.state = 107;
						(_localctx as CallContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(_la === RParser.T__22 || _la === RParser.T__23)) {
							(_localctx as CallContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 108;
						this.expr(11);
						}
						break;

					case 8:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 109;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 110;
						(_localctx as CallContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(_la === RParser.T__24 || _la === RParser.T__25)) {
							(_localctx as CallContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 111;
						this.expr(10);
						}
						break;

					case 9:
						{
						_localctx = new FunCallContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 112;
						if (!(this.precpred(this._ctx, 25))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 25)");
						}
						this.state = 113;
						this.match(RParser.T__0);
						this.state = 114;
						this.arglist();
						this.state = 115;
						this.match(RParser.T__1);
						}
						break;

					case 10:
						{
						_localctx = new ComponentExtractionContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 117;
						if (!(this.precpred(this._ctx, 21))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 21)");
						}
						this.state = 118;
						this.match(RParser.T__4);
						this.state = 119;
						this.name();
						}
						break;

					case 11:
						{
						_localctx = new SubsetContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 120;
						if (!(this.precpred(this._ctx, 20))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 20)");
						}
						this.state = 121;
						this.match(RParser.T__5);
						this.state = 122;
						this.arglist();
						this.state = 123;
						this.match(RParser.T__6);
						}
						break;

					case 12:
						{
						_localctx = new IndexingContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 125;
						if (!(this.precpred(this._ctx, 19))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 19)");
						}
						this.state = 126;
						this.match(RParser.T__7);
						this.state = 127;
						this.arglist();
						this.state = 128;
						this.match(RParser.T__8);
						}
						break;

					case 13:
						{
						_localctx = new AssignContext(new ExprContext(_parentctx, _parentState));
						(_localctx as AssignContext)._val = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 130;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 131;
						(_localctx as AssignContext)._arrow = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(_la === RParser.T__26 || _la === RParser.T__27)) {
							(_localctx as AssignContext)._arrow = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 132;
						(_localctx as AssignContext)._sym = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(_la === RParser.STRING || _la === RParser.ID)) {
							(_localctx as AssignContext)._sym = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						}
						break;
					}
					}
				}
				this.state = 137;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 5, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public exprlist(): ExprlistContext {
		let _localctx: ExprlistContext = new ExprlistContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, RParser.RULE_exprlist);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 143;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << RParser.T__0) | (1 << RParser.T__2) | (1 << RParser.T__10) | (1 << RParser.T__11) | (1 << RParser.T__21) | (1 << RParser.T__30))) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & ((1 << (RParser.T__32 - 33)) | (1 << (RParser.T__34 - 33)) | (1 << (RParser.T__35 - 33)) | (1 << (RParser.T__36 - 33)) | (1 << (RParser.T__37 - 33)) | (1 << (RParser.LBRACE - 33)) | (1 << (RParser.NULL - 33)) | (1 << (RParser.NA - 33)) | (1 << (RParser.NAN - 33)) | (1 << (RParser.INF - 33)) | (1 << (RParser.BOOL - 33)) | (1 << (RParser.HEX - 33)) | (1 << (RParser.INT - 33)) | (1 << (RParser.FLOAT - 33)) | (1 << (RParser.STRING - 33)) | (1 << (RParser.ID - 33)))) !== 0)) {
				{
				{
				this.state = 138;
				this.expr(0);
				this.state = 139;
				this.eoe();
				}
				}
				this.state = 145;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public eoe(): EoeContext {
		let _localctx: EoeContext = new EoeContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, RParser.RULE_eoe);
		try {
			this.state = 149;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 7, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 146;
				this.match(RParser.T__38);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 147;
				if (!(this.lineTerminatorAhead())) {
					throw this.createFailedPredicateException("this.lineTerminatorAhead()");
				}
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 148;
				if (!(this._input.LT(1).type == RParser.RBRACE)) {
					throw this.createFailedPredicateException("this._input.LT(1).type == RParser.RBRACE");
				}
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public literal(): LiteralContext {
		let _localctx: LiteralContext = new LiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, RParser.RULE_literal);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 151;
			_la = this._input.LA(1);
			if (!(((((_la - 45)) & ~0x1F) === 0 && ((1 << (_la - 45)) & ((1 << (RParser.NULL - 45)) | (1 << (RParser.NA - 45)) | (1 << (RParser.NAN - 45)) | (1 << (RParser.INF - 45)) | (1 << (RParser.BOOL - 45)) | (1 << (RParser.HEX - 45)) | (1 << (RParser.INT - 45)) | (1 << (RParser.FLOAT - 45)) | (1 << (RParser.STRING - 45)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public name(): NameContext {
		let _localctx: NameContext = new NameContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, RParser.RULE_name);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 153;
			_la = this._input.LA(1);
			if (!(_la === RParser.STRING || _la === RParser.ID)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public formallist(): FormallistContext {
		let _localctx: FormallistContext = new FormallistContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, RParser.RULE_formallist);
		let _la: number;
		try {
			this.state = 164;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case RParser.T__41:
			case RParser.ID:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 155;
				this.formal();
				this.state = 160;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === RParser.T__39) {
					{
					{
					this.state = 156;
					this.match(RParser.T__39);
					this.state = 157;
					this.formal();
					}
					}
					this.state = 162;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			case RParser.T__1:
				this.enterOuterAlt(_localctx, 2);
				// tslint:disable-next-line:no-empty
				{
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public formal(): FormalContext {
		let _localctx: FormalContext = new FormalContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, RParser.RULE_formal);
		try {
			this.state = 171;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 10, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 166;
				this.match(RParser.ID);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 167;
				this.match(RParser.ID);
				this.state = 168;
				this.match(RParser.T__40);
				this.state = 169;
				this.expr(0);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 170;
				this.match(RParser.T__41);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public arglist(): ArglistContext {
		let _localctx: ArglistContext = new ArglistContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, RParser.RULE_arglist);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 173;
			this.arg();
			this.state = 178;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === RParser.T__39) {
				{
				{
				this.state = 174;
				this.match(RParser.T__39);
				this.state = 175;
				this.arg();
				}
				}
				this.state = 180;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public arg(): ArgContext {
		let _localctx: ArgContext = new ArgContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, RParser.RULE_arg);
		try {
			this.state = 199;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 12, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 181;
				this.expr(0);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 182;
				this.match(RParser.ID);
				this.state = 183;
				this.match(RParser.T__40);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 184;
				this.match(RParser.ID);
				this.state = 185;
				this.match(RParser.T__40);
				this.state = 186;
				this.expr(0);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 187;
				this.match(RParser.STRING);
				this.state = 188;
				this.match(RParser.T__40);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 189;
				this.match(RParser.STRING);
				this.state = 190;
				this.match(RParser.T__40);
				this.state = 191;
				this.expr(0);
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 192;
				this.match(RParser.NULL);
				this.state = 193;
				this.match(RParser.T__40);
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 194;
				this.match(RParser.NULL);
				this.state = 195;
				this.match(RParser.T__40);
				this.state = 196;
				this.expr(0);
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 197;
				this.match(RParser.DOTS);
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				// tslint:disable-next-line:no-empty
				{
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 1:
			return this.expr_sempred(_localctx as ExprContext, predIndex);

		case 3:
			return this.eoe_sempred(_localctx as EoeContext, predIndex);
		}
		return true;
	}
	private expr_sempred(_localctx: ExprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 18);

		case 1:
			return this.precpred(this._ctx, 16);

		case 2:
			return this.precpred(this._ctx, 15);

		case 3:
			return this.precpred(this._ctx, 14);

		case 4:
			return this.precpred(this._ctx, 13);

		case 5:
			return this.precpred(this._ctx, 12);

		case 6:
			return this.precpred(this._ctx, 10);

		case 7:
			return this.precpred(this._ctx, 9);

		case 8:
			return this.precpred(this._ctx, 25);

		case 9:
			return this.precpred(this._ctx, 21);

		case 10:
			return this.precpred(this._ctx, 20);

		case 11:
			return this.precpred(this._ctx, 19);

		case 12:
			return this.precpred(this._ctx, 8);
		}
		return true;
	}
	private eoe_sempred(_localctx: EoeContext, predIndex: number): boolean {
		switch (predIndex) {
		case 13:
			return this.lineTerminatorAhead();

		case 14:
			return this._input.LT(1).type == RParser.RBRACE;
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03=\xCC\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x03\x02\x03\x02\x03\x02" +
		"\x07\x02\x1A\n\x02\f\x02\x0E\x02\x1D\v\x02\x03\x02\x05\x02 \n\x02\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x05\x03E" +
		"\n\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x05\x03Y\n\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x07\x03\x88\n\x03\f\x03\x0E\x03\x8B\v\x03\x03" +
		"\x04\x03\x04\x03\x04\x07\x04\x90\n\x04\f\x04\x0E\x04\x93\v\x04\x03\x05" +
		"\x03\x05\x03\x05\x05\x05\x98\n\x05\x03\x06\x03\x06\x03\x07\x03\x07\x03" +
		"\b\x03\b\x03\b\x07\b\xA1\n\b\f\b\x0E\b\xA4\v\b\x03\b\x05\b\xA7\n\b\x03" +
		"\t\x03\t\x03\t\x03\t\x03\t\x05\t\xAE\n\t\x03\n\x03\n\x03\n\x07\n\xB3\n" +
		"\n\f\n\x0E\n\xB6\v\n\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03" +
		"\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x05\v\xCA\n\v" +
		"\x03\v\x02\x02\x03\x04\f\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E" +
		"\x02\x10\x02\x12\x02\x14\x02\x02\v\x03\x02\r\x0E\x03\x0289\x03\x02\x1F" +
		" \x03\x02\x10\x11\x03\x02\x12\x17\x03\x02\x19\x1A\x03\x02\x1B\x1C\x03" +
		"\x02\x1D\x1E\x04\x02/358\x02\xEF\x02\x1B\x03\x02\x02\x02\x04X\x03\x02" +
		"\x02\x02\x06\x91\x03\x02\x02\x02\b\x97\x03\x02\x02\x02\n\x99\x03\x02\x02" +
		"\x02\f\x9B\x03\x02\x02\x02\x0E\xA6\x03\x02\x02\x02\x10\xAD\x03\x02\x02" +
		"\x02\x12\xAF\x03\x02\x02\x02\x14\xC9\x03\x02\x02\x02\x16\x17\x05\x04\x03" +
		"\x02\x17\x18\x05\b\x05\x02\x18\x1A\x03\x02\x02\x02\x19\x16\x03\x02\x02" +
		"\x02\x1A\x1D\x03\x02\x02\x02\x1B\x19\x03\x02\x02\x02\x1B\x1C\x03\x02\x02" +
		"\x02\x1C\x1F\x03\x02\x02\x02\x1D\x1B\x03\x02\x02\x02\x1E \x07\x02\x02" +
		"\x03\x1F\x1E\x03\x02\x02\x02\x1F \x03\x02\x02\x02 \x03\x03\x02\x02\x02" +
		"!\"\b\x03\x01\x02\"Y\x05\n\x06\x02#Y\x079\x02\x02$%\x07\x03\x02\x02%&" +
		"\x05\x04\x03\x02&\'\x07\x04\x02\x02\'Y\x03\x02\x02\x02()\x07\x05\x02\x02" +
		")*\x07\x03\x02\x02*+\x05\x0E\b\x02+,\x07\x04\x02\x02,-\x05\x04\x03\x1A" +
		"-Y\x03\x02\x02\x02./\x07-\x02\x02/0\x05\x06\x04\x0201\x07.\x02\x021Y\x03" +
		"\x02\x02\x0223\x05\f\x07\x0234\x07\x06\x02\x0245\x05\f\x07\x025Y\x03\x02" +
		"\x02\x0267\t\x02\x02\x027Y\x05\x04\x03\x1389\x07\x18\x02\x029Y\x05\x04" +
		"\x03\r:;\t\x03\x02\x02;<\t\x04\x02\x02<Y\x05\x04\x03\t=>\x07!\x02\x02" +
		">?\x07\x03\x02\x02?@\x05\x04\x03\x02@A\x07\x04\x02\x02AD\x05\x04\x03\x02" +
		"BC\x07\"\x02\x02CE\x05\x04\x03\x02DB\x03\x02\x02\x02DE\x03\x02\x02\x02" +
		"EY\x03\x02\x02\x02FG\x07#\x02\x02GH\x07\x03\x02\x02HI\x079\x02\x02IJ\x07" +
		"$\x02\x02JK\x05\x04\x03\x02KL\x07\x04\x02\x02LM\x05\x04\x03\x07MY\x03" +
		"\x02\x02\x02NO\x07%\x02\x02OP\x07\x03\x02\x02PQ\x05\x04\x03\x02QR\x07" +
		"\x04\x02\x02RS\x05\x04\x03\x06SY\x03\x02\x02\x02TU\x07&\x02\x02UY\x05" +
		"\x04\x03\x05VY\x07\'\x02\x02WY\x07(\x02\x02X!\x03\x02\x02\x02X#\x03\x02" +
		"\x02\x02X$\x03\x02\x02\x02X(\x03\x02\x02\x02X.\x03\x02\x02\x02X2\x03\x02" +
		"\x02\x02X6\x03\x02\x02\x02X8\x03\x02\x02\x02X:\x03\x02\x02\x02X=\x03\x02" +
		"\x02\x02XF\x03\x02\x02\x02XN\x03\x02\x02\x02XT\x03\x02\x02\x02XV\x03\x02" +
		"\x02\x02XW\x03\x02\x02\x02Y\x89\x03\x02\x02\x02Z[\f\x14\x02\x02[\\\x07" +
		"\f\x02\x02\\\x88\x05\x04\x03\x14]^\f\x12\x02\x02^_\x07\x0F\x02\x02_\x88" +
		"\x05\x04\x03\x13`a\f\x11\x02\x02ab\x07:\x02\x02b\x88\x05\x04\x03\x12c" +
		"d\f\x10\x02\x02de\t\x05\x02\x02e\x88\x05\x04\x03\x11fg\f\x0F\x02\x02g" +
		"h\t\x02\x02\x02h\x88\x05\x04\x03\x10ij\f\x0E\x02\x02jk\t\x06\x02\x02k" +
		"\x88\x05\x04\x03\x0Flm\f\f\x02\x02mn\t\x07\x02\x02n\x88\x05\x04\x03\r" +
		"op\f\v\x02\x02pq\t\b\x02\x02q\x88\x05\x04\x03\frs\f\x1B\x02\x02st\x07" +
		"\x03\x02\x02tu\x05\x12\n\x02uv\x07\x04\x02\x02v\x88\x03\x02\x02\x02wx" +
		"\f\x17\x02\x02xy\x07\x07\x02\x02y\x88\x05\f\x07\x02z{\f\x16\x02\x02{|" +
		"\x07\b\x02\x02|}\x05\x12\n\x02}~\x07\t\x02\x02~\x88\x03\x02\x02\x02\x7F" +
		"\x80\f\x15\x02\x02\x80\x81\x07\n\x02\x02\x81\x82\x05\x12\n\x02\x82\x83" +
		"\x07\v\x02\x02\x83\x88\x03\x02\x02\x02\x84\x85\f\n\x02\x02\x85\x86\t\t" +
		"\x02\x02\x86\x88\t\x03\x02\x02\x87Z\x03\x02\x02\x02\x87]\x03\x02\x02\x02" +
		"\x87`\x03\x02\x02\x02\x87c\x03\x02\x02\x02\x87f\x03\x02\x02\x02\x87i\x03" +
		"\x02\x02\x02\x87l\x03\x02\x02\x02\x87o\x03\x02\x02\x02\x87r\x03\x02\x02" +
		"\x02\x87w\x03\x02\x02\x02\x87z\x03\x02\x02\x02\x87\x7F\x03\x02\x02\x02" +
		"\x87\x84\x03\x02\x02\x02\x88\x8B\x03\x02\x02\x02\x89\x87\x03\x02\x02\x02" +
		"\x89\x8A\x03\x02\x02\x02\x8A\x05\x03\x02\x02\x02\x8B\x89\x03\x02\x02\x02" +
		"\x8C\x8D\x05\x04\x03\x02\x8D\x8E\x05\b\x05\x02\x8E\x90\x03\x02\x02\x02" +
		"\x8F\x8C\x03\x02\x02\x02\x90\x93\x03\x02\x02\x02\x91\x8F\x03\x02\x02\x02" +
		"\x91\x92\x03\x02\x02\x02\x92\x07\x03\x02\x02\x02\x93\x91\x03\x02\x02\x02" +
		"\x94\x98\x07)\x02\x02\x95\x98\x06\x05\x0F\x02\x96\x98\x06\x05\x10\x02" +
		"\x97\x94\x03\x02\x02\x02\x97\x95\x03\x02\x02\x02\x97\x96\x03\x02\x02\x02" +
		"\x98\t\x03\x02\x02\x02\x99\x9A\t\n\x02\x02\x9A\v\x03\x02\x02\x02\x9B\x9C" +
		"\t\x03\x02\x02\x9C\r\x03\x02\x02\x02\x9D\xA2\x05\x10\t\x02\x9E\x9F\x07" +
		"*\x02\x02\x9F\xA1\x05\x10\t\x02\xA0\x9E\x03\x02\x02\x02\xA1\xA4\x03\x02" +
		"\x02\x02\xA2\xA0\x03\x02\x02\x02\xA2\xA3\x03\x02\x02\x02\xA3\xA7\x03\x02" +
		"\x02\x02\xA4\xA2\x03\x02\x02\x02\xA5\xA7\x03\x02\x02\x02\xA6\x9D\x03\x02" +
		"\x02\x02\xA6\xA5\x03\x02\x02\x02\xA7\x0F\x03\x02\x02\x02\xA8\xAE\x079" +
		"\x02\x02\xA9\xAA\x079\x02\x02\xAA\xAB\x07+\x02\x02\xAB\xAE\x05\x04\x03" +
		"\x02\xAC\xAE\x07,\x02\x02\xAD\xA8\x03\x02\x02\x02\xAD\xA9\x03\x02\x02" +
		"\x02\xAD\xAC\x03\x02\x02\x02\xAE\x11\x03\x02\x02\x02\xAF\xB4\x05\x14\v" +
		"\x02\xB0\xB1\x07*\x02\x02\xB1\xB3\x05\x14\v\x02\xB2\xB0\x03\x02\x02\x02" +
		"\xB3\xB6\x03\x02\x02\x02\xB4\xB2\x03\x02\x02\x02\xB4\xB5\x03\x02\x02\x02" +
		"\xB5\x13\x03\x02\x02\x02\xB6\xB4\x03\x02\x02\x02\xB7\xCA\x05\x04\x03\x02" +
		"\xB8\xB9\x079\x02\x02\xB9\xCA\x07+\x02\x02\xBA\xBB\x079\x02\x02\xBB\xBC" +
		"\x07+\x02\x02\xBC\xCA\x05\x04\x03\x02\xBD\xBE\x078\x02\x02\xBE\xCA\x07" +
		"+\x02\x02\xBF\xC0\x078\x02\x02\xC0\xC1\x07+\x02\x02\xC1\xCA\x05\x04\x03" +
		"\x02\xC2\xC3\x07/\x02\x02\xC3\xCA\x07+\x02\x02\xC4\xC5\x07/\x02\x02\xC5" +
		"\xC6\x07+\x02\x02\xC6\xCA\x05\x04\x03\x02\xC7\xCA\x074\x02\x02\xC8\xCA" +
		"\x03\x02\x02\x02\xC9\xB7\x03\x02\x02\x02\xC9\xB8\x03\x02\x02\x02\xC9\xBA" +
		"\x03\x02\x02\x02\xC9\xBD\x03\x02\x02\x02\xC9\xBF\x03\x02\x02\x02\xC9\xC2" +
		"\x03\x02\x02\x02\xC9\xC4\x03\x02\x02\x02\xC9\xC7\x03\x02\x02\x02\xC9\xC8" +
		"\x03\x02\x02\x02\xCA\x15\x03\x02\x02\x02\x0F\x1B\x1FDX\x87\x89\x91\x97" +
		"\xA2\xA6\xAD\xB4\xC9";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!RParser.__ATN) {
			RParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(RParser._serializedATN));
		}

		return RParser.__ATN;
	}

}

export class ProgContext extends ParserRuleContext {
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public eoe(): EoeContext[];
	public eoe(i: number): EoeContext;
	public eoe(i?: number): EoeContext | EoeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(EoeContext);
		} else {
			return this.getRuleContext(i, EoeContext);
		}
	}
	public EOF(): TerminalNode | undefined { return this.tryGetToken(RParser.EOF, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RParser.RULE_prog; }
	// @Override
	public enterRule(listener: RListener): void {
		if (listener.enterProg) {
			listener.enterProg(this);
		}
	}
	// @Override
	public exitRule(listener: RListener): void {
		if (listener.exitProg) {
			listener.exitProg(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RVisitor<Result>): Result {
		if (visitor.visitProg) {
			return visitor.visitProg(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExprContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RParser.RULE_expr; }
	public copyFrom(ctx: ExprContext): void {
		super.copyFrom(ctx);
	}
}
export class LitContext extends ExprContext {
	public literal(): LiteralContext {
		return this.getRuleContext(0, LiteralContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RListener): void {
		if (listener.enterLit) {
			listener.enterLit(this);
		}
	}
	// @Override
	public exitRule(listener: RListener): void {
		if (listener.exitLit) {
			listener.exitLit(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RVisitor<Result>): Result {
		if (visitor.visitLit) {
			return visitor.visitLit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SymbolContext extends ExprContext {
	public ID(): TerminalNode { return this.getToken(RParser.ID, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RListener): void {
		if (listener.enterSymbol) {
			listener.enterSymbol(this);
		}
	}
	// @Override
	public exitRule(listener: RListener): void {
		if (listener.exitSymbol) {
			listener.exitSymbol(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RVisitor<Result>): Result {
		if (visitor.visitSymbol) {
			return visitor.visitSymbol(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class CallContext extends ExprContext {
	public _op!: Token;
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public exprlist(): ExprlistContext | undefined {
		return this.tryGetRuleContext(0, ExprlistContext);
	}
	public RBRACE(): TerminalNode | undefined { return this.tryGetToken(RParser.RBRACE, 0); }
	public LBRACE(): TerminalNode | undefined { return this.tryGetToken(RParser.LBRACE, 0); }
	public USER_OP(): TerminalNode | undefined { return this.tryGetToken(RParser.USER_OP, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RListener): void {
		if (listener.enterCall) {
			listener.enterCall(this);
		}
	}
	// @Override
	public exitRule(listener: RListener): void {
		if (listener.exitCall) {
			listener.exitCall(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RVisitor<Result>): Result {
		if (visitor.visitCall) {
			return visitor.visitCall(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class FunCallContext extends ExprContext {
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public arglist(): ArglistContext {
		return this.getRuleContext(0, ArglistContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RListener): void {
		if (listener.enterFunCall) {
			listener.enterFunCall(this);
		}
	}
	// @Override
	public exitRule(listener: RListener): void {
		if (listener.exitFunCall) {
			listener.exitFunCall(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RVisitor<Result>): Result {
		if (visitor.visitFunCall) {
			return visitor.visitFunCall(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class FunctionContext extends ExprContext {
	public formallist(): FormallistContext {
		return this.getRuleContext(0, FormallistContext);
	}
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RListener): void {
		if (listener.enterFunction) {
			listener.enterFunction(this);
		}
	}
	// @Override
	public exitRule(listener: RListener): void {
		if (listener.exitFunction) {
			listener.exitFunction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RVisitor<Result>): Result {
		if (visitor.visitFunction) {
			return visitor.visitFunction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NamespaceContext extends ExprContext {
	public name(): NameContext[];
	public name(i: number): NameContext;
	public name(i?: number): NameContext | NameContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NameContext);
		} else {
			return this.getRuleContext(i, NameContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RListener): void {
		if (listener.enterNamespace) {
			listener.enterNamespace(this);
		}
	}
	// @Override
	public exitRule(listener: RListener): void {
		if (listener.exitNamespace) {
			listener.exitNamespace(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RVisitor<Result>): Result {
		if (visitor.visitNamespace) {
			return visitor.visitNamespace(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ComponentExtractionContext extends ExprContext {
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public name(): NameContext {
		return this.getRuleContext(0, NameContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RListener): void {
		if (listener.enterComponentExtraction) {
			listener.enterComponentExtraction(this);
		}
	}
	// @Override
	public exitRule(listener: RListener): void {
		if (listener.exitComponentExtraction) {
			listener.exitComponentExtraction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RVisitor<Result>): Result {
		if (visitor.visitComponentExtraction) {
			return visitor.visitComponentExtraction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SubsetContext extends ExprContext {
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public arglist(): ArglistContext {
		return this.getRuleContext(0, ArglistContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RListener): void {
		if (listener.enterSubset) {
			listener.enterSubset(this);
		}
	}
	// @Override
	public exitRule(listener: RListener): void {
		if (listener.exitSubset) {
			listener.exitSubset(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RVisitor<Result>): Result {
		if (visitor.visitSubset) {
			return visitor.visitSubset(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IndexingContext extends ExprContext {
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public arglist(): ArglistContext {
		return this.getRuleContext(0, ArglistContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RListener): void {
		if (listener.enterIndexing) {
			listener.enterIndexing(this);
		}
	}
	// @Override
	public exitRule(listener: RListener): void {
		if (listener.exitIndexing) {
			listener.exitIndexing(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RVisitor<Result>): Result {
		if (visitor.visitIndexing) {
			return visitor.visitIndexing(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AssignContext extends ExprContext {
	public _val!: ExprContext;
	public _sym!: Token;
	public _arrow!: Token;
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	public ID(): TerminalNode | undefined { return this.tryGetToken(RParser.ID, 0); }
	public STRING(): TerminalNode | undefined { return this.tryGetToken(RParser.STRING, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RListener): void {
		if (listener.enterAssign) {
			listener.enterAssign(this);
		}
	}
	// @Override
	public exitRule(listener: RListener): void {
		if (listener.exitAssign) {
			listener.exitAssign(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RVisitor<Result>): Result {
		if (visitor.visitAssign) {
			return visitor.visitAssign(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ForContext extends ExprContext {
	public _seq!: ExprContext;
	public _body!: ExprContext;
	public ID(): TerminalNode { return this.getToken(RParser.ID, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RListener): void {
		if (listener.enterFor) {
			listener.enterFor(this);
		}
	}
	// @Override
	public exitRule(listener: RListener): void {
		if (listener.exitFor) {
			listener.exitFor(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RVisitor<Result>): Result {
		if (visitor.visitFor) {
			return visitor.visitFor(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExprlistContext extends ParserRuleContext {
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public eoe(): EoeContext[];
	public eoe(i: number): EoeContext;
	public eoe(i?: number): EoeContext | EoeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(EoeContext);
		} else {
			return this.getRuleContext(i, EoeContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RParser.RULE_exprlist; }
	// @Override
	public enterRule(listener: RListener): void {
		if (listener.enterExprlist) {
			listener.enterExprlist(this);
		}
	}
	// @Override
	public exitRule(listener: RListener): void {
		if (listener.exitExprlist) {
			listener.exitExprlist(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RVisitor<Result>): Result {
		if (visitor.visitExprlist) {
			return visitor.visitExprlist(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EoeContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RParser.RULE_eoe; }
	// @Override
	public enterRule(listener: RListener): void {
		if (listener.enterEoe) {
			listener.enterEoe(this);
		}
	}
	// @Override
	public exitRule(listener: RListener): void {
		if (listener.exitEoe) {
			listener.exitEoe(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RVisitor<Result>): Result {
		if (visitor.visitEoe) {
			return visitor.visitEoe(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LiteralContext extends ParserRuleContext {
	public INT(): TerminalNode | undefined { return this.tryGetToken(RParser.INT, 0); }
	public FLOAT(): TerminalNode | undefined { return this.tryGetToken(RParser.FLOAT, 0); }
	public HEX(): TerminalNode | undefined { return this.tryGetToken(RParser.HEX, 0); }
	public STRING(): TerminalNode | undefined { return this.tryGetToken(RParser.STRING, 0); }
	public NULL(): TerminalNode | undefined { return this.tryGetToken(RParser.NULL, 0); }
	public NA(): TerminalNode | undefined { return this.tryGetToken(RParser.NA, 0); }
	public NAN(): TerminalNode | undefined { return this.tryGetToken(RParser.NAN, 0); }
	public INF(): TerminalNode | undefined { return this.tryGetToken(RParser.INF, 0); }
	public BOOL(): TerminalNode | undefined { return this.tryGetToken(RParser.BOOL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RParser.RULE_literal; }
	// @Override
	public enterRule(listener: RListener): void {
		if (listener.enterLiteral) {
			listener.enterLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: RListener): void {
		if (listener.exitLiteral) {
			listener.exitLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RVisitor<Result>): Result {
		if (visitor.visitLiteral) {
			return visitor.visitLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NameContext extends ParserRuleContext {
	public ID(): TerminalNode | undefined { return this.tryGetToken(RParser.ID, 0); }
	public STRING(): TerminalNode | undefined { return this.tryGetToken(RParser.STRING, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RParser.RULE_name; }
	// @Override
	public enterRule(listener: RListener): void {
		if (listener.enterName) {
			listener.enterName(this);
		}
	}
	// @Override
	public exitRule(listener: RListener): void {
		if (listener.exitName) {
			listener.exitName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RVisitor<Result>): Result {
		if (visitor.visitName) {
			return visitor.visitName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FormallistContext extends ParserRuleContext {
	public formal(): FormalContext[];
	public formal(i: number): FormalContext;
	public formal(i?: number): FormalContext | FormalContext[] {
		if (i === undefined) {
			return this.getRuleContexts(FormalContext);
		} else {
			return this.getRuleContext(i, FormalContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RParser.RULE_formallist; }
	// @Override
	public enterRule(listener: RListener): void {
		if (listener.enterFormallist) {
			listener.enterFormallist(this);
		}
	}
	// @Override
	public exitRule(listener: RListener): void {
		if (listener.exitFormallist) {
			listener.exitFormallist(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RVisitor<Result>): Result {
		if (visitor.visitFormallist) {
			return visitor.visitFormallist(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FormalContext extends ParserRuleContext {
	public ID(): TerminalNode | undefined { return this.tryGetToken(RParser.ID, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RParser.RULE_formal; }
	// @Override
	public enterRule(listener: RListener): void {
		if (listener.enterFormal) {
			listener.enterFormal(this);
		}
	}
	// @Override
	public exitRule(listener: RListener): void {
		if (listener.exitFormal) {
			listener.exitFormal(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RVisitor<Result>): Result {
		if (visitor.visitFormal) {
			return visitor.visitFormal(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArglistContext extends ParserRuleContext {
	public arg(): ArgContext[];
	public arg(i: number): ArgContext;
	public arg(i?: number): ArgContext | ArgContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ArgContext);
		} else {
			return this.getRuleContext(i, ArgContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RParser.RULE_arglist; }
	// @Override
	public enterRule(listener: RListener): void {
		if (listener.enterArglist) {
			listener.enterArglist(this);
		}
	}
	// @Override
	public exitRule(listener: RListener): void {
		if (listener.exitArglist) {
			listener.exitArglist(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RVisitor<Result>): Result {
		if (visitor.visitArglist) {
			return visitor.visitArglist(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArgContext extends ParserRuleContext {
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	public ID(): TerminalNode | undefined { return this.tryGetToken(RParser.ID, 0); }
	public STRING(): TerminalNode | undefined { return this.tryGetToken(RParser.STRING, 0); }
	public NULL(): TerminalNode | undefined { return this.tryGetToken(RParser.NULL, 0); }
	public DOTS(): TerminalNode | undefined { return this.tryGetToken(RParser.DOTS, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RParser.RULE_arg; }
	// @Override
	public enterRule(listener: RListener): void {
		if (listener.enterArg) {
			listener.enterArg(this);
		}
	}
	// @Override
	public exitRule(listener: RListener): void {
		if (listener.exitArg) {
			listener.exitArg(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RVisitor<Result>): Result {
		if (visitor.visitArg) {
			return visitor.visitArg(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


