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
	public static readonly BOOL = 47;
	public static readonly DOTS = 48;
	public static readonly HEX = 49;
	public static readonly INT = 50;
	public static readonly FLOAT = 51;
	public static readonly STRING = 52;
	public static readonly ID = 53;
	public static readonly USER_OP = 54;
	public static readonly COMMENT = 55;
	public static readonly NL = 56;
	public static readonly WS = 57;
	public static readonly RULE_prog = 0;
	public static readonly RULE_expr = 1;
	public static readonly RULE_exprlist = 2;
	public static readonly RULE_eoe = 3;
	public static readonly RULE_literal = 4;
	public static readonly RULE_formallist = 5;
	public static readonly RULE_formal = 6;
	public static readonly RULE_arglist = 7;
	public static readonly RULE_arg = 8;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"prog", "expr", "exprlist", "eoe", "literal", "formallist", "formal", 
		"arglist", "arg",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'('", "')'", "'function'", "'::'", "'$'", "'['", "']'", "'[['", 
		"']]'", "'^'", "'-'", "'+'", "':'", "'*'", "'/'", "'>'", "'>='", "'<'", 
		"'<='", "'=='", "'!='", "'!'", "'&'", "'&&'", "'|'", "'||'", "'->'", "'->>'", 
		"'<-'", "'<<-'", "'if'", "'else'", "'for'", "'in'", "'while'", "'repeat'", 
		"'break'", "'next'", "';'", "','", "'='", "'...'", "'{'", "'}'", "'NULL'", 
		"'NA'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, "LBRACE", "RBRACE", "NULL", "NA", "BOOL", "DOTS", "HEX", "INT", 
		"FLOAT", "STRING", "ID", "USER_OP", "COMMENT", "NL", "WS",
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
			this.state = 23;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << RParser.T__0) | (1 << RParser.T__2) | (1 << RParser.T__10) | (1 << RParser.T__11) | (1 << RParser.T__21) | (1 << RParser.T__30))) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & ((1 << (RParser.T__32 - 33)) | (1 << (RParser.T__34 - 33)) | (1 << (RParser.T__35 - 33)) | (1 << (RParser.T__36 - 33)) | (1 << (RParser.T__37 - 33)) | (1 << (RParser.LBRACE - 33)) | (1 << (RParser.NULL - 33)) | (1 << (RParser.NA - 33)) | (1 << (RParser.BOOL - 33)) | (1 << (RParser.INT - 33)) | (1 << (RParser.FLOAT - 33)) | (1 << (RParser.STRING - 33)) | (1 << (RParser.ID - 33)))) !== 0)) {
				{
				{
				this.state = 18;
				this.expr(0);
				this.state = 19;
				this.eoe();
				}
				}
				this.state = 25;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 26;
			this.match(RParser.EOF);
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
			this.state = 82;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 2, this._ctx) ) {
			case 1:
				{
				_localctx = new LitContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 29;
				this.literal();
				}
				break;

			case 2:
				{
				_localctx = new SymbolContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 30;
				this.match(RParser.ID);
				}
				break;

			case 3:
				{
				_localctx = new ParensContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 31;
				this.match(RParser.T__0);
				this.state = 32;
				this.expr(0);
				this.state = 33;
				this.match(RParser.T__1);
				}
				break;

			case 4:
				{
				_localctx = new FunctionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 35;
				this.match(RParser.T__2);
				this.state = 36;
				this.match(RParser.T__0);
				this.state = 37;
				this.formallist();
				this.state = 38;
				this.match(RParser.T__1);
				this.state = 39;
				this.expr(24);
				}
				break;

			case 5:
				{
				_localctx = new BraceContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 41;
				this.match(RParser.LBRACE);
				this.state = 42;
				this.exprlist();
				this.state = 43;
				this.match(RParser.RBRACE);
				}
				break;

			case 6:
				{
				_localctx = new NamespaceContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 45;
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
				this.state = 46;
				this.match(RParser.T__3);
				this.state = 47;
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
				break;

			case 7:
				{
				_localctx = new CallContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 48;
				_la = this._input.LA(1);
				if (!(_la === RParser.T__10 || _la === RParser.T__11)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 49;
				this.expr(17);
				}
				break;

			case 8:
				{
				_localctx = new CallContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 50;
				this.match(RParser.T__21);
				this.state = 51;
				this.expr(11);
				}
				break;

			case 9:
				{
				_localctx = new AssignContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 52;
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
				this.state = 53;
				_la = this._input.LA(1);
				if (!(_la === RParser.T__28 || _la === RParser.T__29)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 54;
				(_localctx as AssignContext)._val = this.expr(7);
				}
				break;

			case 10:
				{
				_localctx = new IfContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 55;
				this.match(RParser.T__30);
				this.state = 56;
				this.match(RParser.T__0);
				this.state = 57;
				(_localctx as IfContext)._cond = this.expr(0);
				this.state = 58;
				this.match(RParser.T__1);
				this.state = 59;
				(_localctx as IfContext)._conseq = this.expr(0);
				this.state = 62;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 1, this._ctx) ) {
				case 1:
					{
					this.state = 60;
					this.match(RParser.T__31);
					this.state = 61;
					(_localctx as IfContext)._alt = this.expr(0);
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
				this.state = 64;
				this.match(RParser.T__32);
				this.state = 65;
				this.match(RParser.T__0);
				this.state = 66;
				this.match(RParser.ID);
				this.state = 67;
				this.match(RParser.T__33);
				this.state = 68;
				(_localctx as ForContext)._seq = this.expr(0);
				this.state = 69;
				this.match(RParser.T__1);
				this.state = 70;
				(_localctx as ForContext)._body = this.expr(5);
				}
				break;

			case 12:
				{
				_localctx = new WhileContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 72;
				this.match(RParser.T__34);
				this.state = 73;
				this.match(RParser.T__0);
				this.state = 74;
				(_localctx as WhileContext)._cond = this.expr(0);
				this.state = 75;
				this.match(RParser.T__1);
				this.state = 76;
				(_localctx as WhileContext)._body = this.expr(4);
				}
				break;

			case 13:
				{
				_localctx = new RepeatContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 78;
				this.match(RParser.T__35);
				this.state = 79;
				(_localctx as RepeatContext)._body = this.expr(3);
				}
				break;

			case 14:
				{
				_localctx = new BreakContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 80;
				this.match(RParser.T__36);
				}
				break;

			case 15:
				{
				_localctx = new NextContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 81;
				this.match(RParser.T__37);
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 131;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 4, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 129;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 3, this._ctx) ) {
					case 1:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 84;
						if (!(this.precpred(this._ctx, 18))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 18)");
						}
						this.state = 85;
						this.match(RParser.T__9);
						this.state = 86;
						this.expr(18);
						}
						break;

					case 2:
						{
						_localctx = new SeqContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 87;
						if (!(this.precpred(this._ctx, 16))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 16)");
						}
						this.state = 88;
						this.match(RParser.T__12);
						this.state = 89;
						this.expr(17);
						}
						break;

					case 3:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 90;
						if (!(this.precpred(this._ctx, 15))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 15)");
						}
						this.state = 91;
						this.match(RParser.USER_OP);
						this.state = 92;
						this.expr(16);
						}
						break;

					case 4:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 93;
						if (!(this.precpred(this._ctx, 14))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 14)");
						}
						this.state = 94;
						_la = this._input.LA(1);
						if (!(_la === RParser.T__13 || _la === RParser.T__14)) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 95;
						this.expr(15);
						}
						break;

					case 5:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 96;
						if (!(this.precpred(this._ctx, 13))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 13)");
						}
						this.state = 97;
						_la = this._input.LA(1);
						if (!(_la === RParser.T__10 || _la === RParser.T__11)) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 98;
						this.expr(14);
						}
						break;

					case 6:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 99;
						if (!(this.precpred(this._ctx, 12))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 12)");
						}
						this.state = 100;
						_la = this._input.LA(1);
						if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << RParser.T__15) | (1 << RParser.T__16) | (1 << RParser.T__17) | (1 << RParser.T__18) | (1 << RParser.T__19) | (1 << RParser.T__20))) !== 0))) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 101;
						this.expr(13);
						}
						break;

					case 7:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 102;
						if (!(this.precpred(this._ctx, 10))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 10)");
						}
						this.state = 103;
						_la = this._input.LA(1);
						if (!(_la === RParser.T__22 || _la === RParser.T__23)) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 104;
						this.expr(11);
						}
						break;

					case 8:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 105;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 106;
						_la = this._input.LA(1);
						if (!(_la === RParser.T__24 || _la === RParser.T__25)) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 107;
						this.expr(10);
						}
						break;

					case 9:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 108;
						if (!(this.precpred(this._ctx, 25))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 25)");
						}
						this.state = 109;
						this.match(RParser.T__0);
						this.state = 110;
						this.arglist();
						this.state = 111;
						this.match(RParser.T__1);
						}
						break;

					case 10:
						{
						_localctx = new ComponentExtractionContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 113;
						if (!(this.precpred(this._ctx, 21))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 21)");
						}
						this.state = 114;
						this.match(RParser.T__4);
						this.state = 115;
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
						break;

					case 11:
						{
						_localctx = new SubsetContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 116;
						if (!(this.precpred(this._ctx, 20))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 20)");
						}
						this.state = 117;
						this.match(RParser.T__5);
						this.state = 118;
						this.arglist();
						this.state = 119;
						this.match(RParser.T__6);
						}
						break;

					case 12:
						{
						_localctx = new IndexingContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 121;
						if (!(this.precpred(this._ctx, 19))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 19)");
						}
						this.state = 122;
						this.match(RParser.T__7);
						this.state = 123;
						this.arglist();
						this.state = 124;
						this.match(RParser.T__8);
						}
						break;

					case 13:
						{
						_localctx = new AssignContext(new ExprContext(_parentctx, _parentState));
						(_localctx as AssignContext)._val = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 126;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 127;
						_la = this._input.LA(1);
						if (!(_la === RParser.T__26 || _la === RParser.T__27)) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 128;
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
				this.state = 133;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 4, this._ctx);
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
			this.state = 139;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << RParser.T__0) | (1 << RParser.T__2) | (1 << RParser.T__10) | (1 << RParser.T__11) | (1 << RParser.T__21) | (1 << RParser.T__30))) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & ((1 << (RParser.T__32 - 33)) | (1 << (RParser.T__34 - 33)) | (1 << (RParser.T__35 - 33)) | (1 << (RParser.T__36 - 33)) | (1 << (RParser.T__37 - 33)) | (1 << (RParser.LBRACE - 33)) | (1 << (RParser.NULL - 33)) | (1 << (RParser.NA - 33)) | (1 << (RParser.BOOL - 33)) | (1 << (RParser.INT - 33)) | (1 << (RParser.FLOAT - 33)) | (1 << (RParser.STRING - 33)) | (1 << (RParser.ID - 33)))) !== 0)) {
				{
				{
				this.state = 134;
				this.expr(0);
				this.state = 135;
				this.eoe();
				}
				}
				this.state = 141;
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
			this.state = 145;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 6, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 142;
				this.match(RParser.T__38);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 143;
				if (!(this.lineTerminatorAhead())) {
					throw this.createFailedPredicateException("this.lineTerminatorAhead()");
				}
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 144;
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
			this.state = 147;
			_la = this._input.LA(1);
			if (!(((((_la - 45)) & ~0x1F) === 0 && ((1 << (_la - 45)) & ((1 << (RParser.NULL - 45)) | (1 << (RParser.NA - 45)) | (1 << (RParser.BOOL - 45)) | (1 << (RParser.INT - 45)) | (1 << (RParser.FLOAT - 45)) | (1 << (RParser.STRING - 45)))) !== 0))) {
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
		this.enterRule(_localctx, 10, RParser.RULE_formallist);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 149;
			this.formal();
			this.state = 154;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === RParser.T__39) {
				{
				{
				this.state = 150;
				this.match(RParser.T__39);
				this.state = 151;
				this.formal();
				}
				}
				this.state = 156;
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
	public formal(): FormalContext {
		let _localctx: FormalContext = new FormalContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, RParser.RULE_formal);
		try {
			this.state = 162;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 8, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 157;
				this.match(RParser.ID);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 158;
				this.match(RParser.ID);
				this.state = 159;
				this.match(RParser.T__40);
				this.state = 160;
				this.expr(0);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 161;
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
		this.enterRule(_localctx, 14, RParser.RULE_arglist);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 164;
			this.arg();
			this.state = 169;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === RParser.T__39) {
				{
				{
				this.state = 165;
				this.match(RParser.T__39);
				this.state = 166;
				this.arg();
				}
				}
				this.state = 171;
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
		this.enterRule(_localctx, 16, RParser.RULE_arg);
		try {
			this.state = 190;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 10, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 172;
				this.expr(0);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 173;
				this.match(RParser.ID);
				this.state = 174;
				this.match(RParser.T__40);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 175;
				this.match(RParser.ID);
				this.state = 176;
				this.match(RParser.T__40);
				this.state = 177;
				this.expr(0);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 178;
				this.match(RParser.STRING);
				this.state = 179;
				this.match(RParser.T__40);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 180;
				this.match(RParser.STRING);
				this.state = 181;
				this.match(RParser.T__40);
				this.state = 182;
				this.expr(0);
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 183;
				this.match(RParser.NULL);
				this.state = 184;
				this.match(RParser.T__40);
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 185;
				this.match(RParser.NULL);
				this.state = 186;
				this.match(RParser.T__40);
				this.state = 187;
				this.expr(0);
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 188;
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
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03;\xC3\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x03\x02\x03\x02\x03\x02\x07\x02\x18" +
		"\n\x02\f\x02\x0E\x02\x1B\v\x02\x03\x02\x03\x02\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x05\x03A\n\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x05\x03U\n\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x07\x03" +
		"\x84\n\x03\f\x03\x0E\x03\x87\v\x03\x03\x04\x03\x04\x03\x04\x07\x04\x8C" +
		"\n\x04\f\x04\x0E\x04\x8F\v\x04\x03\x05\x03\x05\x03\x05\x05\x05\x94\n\x05" +
		"\x03\x06\x03\x06\x03\x07\x03\x07\x03\x07\x07\x07\x9B\n\x07\f\x07\x0E\x07" +
		"\x9E\v\x07\x03\b\x03\b\x03\b\x03\b\x03\b\x05\b\xA5\n\b\x03\t\x03\t\x03" +
		"\t\x07\t\xAA\n\t\f\t\x0E\t\xAD\v\t\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n" +
		"\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03" +
		"\n\x05\n\xC1\n\n\x03\n\x02\x02\x03\x04\v\x02\x02\x04\x02\x06\x02\b\x02" +
		"\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x02\v\x03\x0267\x03\x02\r\x0E\x03" +
		"\x02\x1F \x03\x02\x10\x11\x03\x02\x12\x17\x03\x02\x19\x1A\x03\x02\x1B" +
		"\x1C\x03\x02\x1D\x1E\x04\x02/146\x02\xE5\x02\x19\x03\x02\x02\x02\x04T" +
		"\x03\x02\x02\x02\x06\x8D\x03\x02\x02\x02\b\x93\x03\x02\x02\x02\n\x95\x03" +
		"\x02\x02\x02\f\x97\x03\x02\x02\x02\x0E\xA4\x03\x02\x02\x02\x10\xA6\x03" +
		"\x02\x02\x02\x12\xC0\x03\x02\x02\x02\x14\x15\x05\x04\x03\x02\x15\x16\x05" +
		"\b\x05\x02\x16\x18\x03\x02\x02\x02\x17\x14\x03\x02\x02\x02\x18\x1B\x03" +
		"\x02\x02\x02\x19\x17\x03\x02\x02\x02\x19\x1A\x03\x02\x02\x02\x1A\x1C\x03" +
		"\x02\x02\x02\x1B\x19\x03\x02\x02\x02\x1C\x1D\x07\x02\x02\x03\x1D\x03\x03" +
		"\x02\x02\x02\x1E\x1F\b\x03\x01\x02\x1FU\x05\n\x06\x02 U\x077\x02\x02!" +
		"\"\x07\x03\x02\x02\"#\x05\x04\x03\x02#$\x07\x04\x02\x02$U\x03\x02\x02" +
		"\x02%&\x07\x05\x02\x02&\'\x07\x03\x02\x02\'(\x05\f\x07\x02()\x07\x04\x02" +
		"\x02)*\x05\x04\x03\x1A*U\x03\x02\x02\x02+,\x07-\x02\x02,-\x05\x06\x04" +
		"\x02-.\x07.\x02\x02.U\x03\x02\x02\x02/0\t\x02\x02\x0201\x07\x06\x02\x02" +
		"1U\t\x02\x02\x0223\t\x03\x02\x023U\x05\x04\x03\x1345\x07\x18\x02\x025" +
		"U\x05\x04\x03\r67\t\x02\x02\x0278\t\x04\x02\x028U\x05\x04\x03\t9:\x07" +
		"!\x02\x02:;\x07\x03\x02\x02;<\x05\x04\x03\x02<=\x07\x04\x02\x02=@\x05" +
		"\x04\x03\x02>?\x07\"\x02\x02?A\x05\x04\x03\x02@>\x03\x02\x02\x02@A\x03" +
		"\x02\x02\x02AU\x03\x02\x02\x02BC\x07#\x02\x02CD\x07\x03\x02\x02DE\x07" +
		"7\x02\x02EF\x07$\x02\x02FG\x05\x04\x03\x02GH\x07\x04\x02\x02HI\x05\x04" +
		"\x03\x07IU\x03\x02\x02\x02JK\x07%\x02\x02KL\x07\x03\x02\x02LM\x05\x04" +
		"\x03\x02MN\x07\x04\x02\x02NO\x05\x04\x03\x06OU\x03\x02\x02\x02PQ\x07&" +
		"\x02\x02QU\x05\x04\x03\x05RU\x07\'\x02\x02SU\x07(\x02\x02T\x1E\x03\x02" +
		"\x02\x02T \x03\x02\x02\x02T!\x03\x02\x02\x02T%\x03\x02\x02\x02T+\x03\x02" +
		"\x02\x02T/\x03\x02\x02\x02T2\x03\x02\x02\x02T4\x03\x02\x02\x02T6\x03\x02" +
		"\x02\x02T9\x03\x02\x02\x02TB\x03\x02\x02\x02TJ\x03\x02\x02\x02TP\x03\x02" +
		"\x02\x02TR\x03\x02\x02\x02TS\x03\x02\x02\x02U\x85\x03\x02\x02\x02VW\f" +
		"\x14\x02\x02WX\x07\f\x02\x02X\x84\x05\x04\x03\x14YZ\f\x12\x02\x02Z[\x07" +
		"\x0F\x02\x02[\x84\x05\x04\x03\x13\\]\f\x11\x02\x02]^\x078\x02\x02^\x84" +
		"\x05\x04\x03\x12_`\f\x10\x02\x02`a\t\x05\x02\x02a\x84\x05\x04\x03\x11" +
		"bc\f\x0F\x02\x02cd\t\x03\x02\x02d\x84\x05\x04\x03\x10ef\f\x0E\x02\x02" +
		"fg\t\x06\x02\x02g\x84\x05\x04\x03\x0Fhi\f\f\x02\x02ij\t\x07\x02\x02j\x84" +
		"\x05\x04\x03\rkl\f\v\x02\x02lm\t\b\x02\x02m\x84\x05\x04\x03\fno\f\x1B" +
		"\x02\x02op\x07\x03\x02\x02pq\x05\x10\t\x02qr\x07\x04\x02\x02r\x84\x03" +
		"\x02\x02\x02st\f\x17\x02\x02tu\x07\x07\x02\x02u\x84\t\x02\x02\x02vw\f" +
		"\x16\x02\x02wx\x07\b\x02\x02xy\x05\x10\t\x02yz\x07\t\x02\x02z\x84\x03" +
		"\x02\x02\x02{|\f\x15\x02\x02|}\x07\n\x02\x02}~\x05\x10\t\x02~\x7F\x07" +
		"\v\x02\x02\x7F\x84\x03\x02\x02\x02\x80\x81\f\n\x02\x02\x81\x82\t\t\x02" +
		"\x02\x82\x84\t\x02\x02\x02\x83V\x03\x02\x02\x02\x83Y\x03\x02\x02\x02\x83" +
		"\\\x03\x02\x02\x02\x83_\x03\x02\x02\x02\x83b\x03\x02\x02\x02\x83e\x03" +
		"\x02\x02\x02\x83h\x03\x02\x02\x02\x83k\x03\x02\x02\x02\x83n\x03\x02\x02" +
		"\x02\x83s\x03\x02\x02\x02\x83v\x03\x02\x02\x02\x83{\x03\x02\x02\x02\x83" +
		"\x80\x03\x02\x02\x02\x84\x87\x03\x02\x02\x02\x85\x83\x03\x02\x02\x02\x85" +
		"\x86\x03\x02\x02\x02\x86\x05\x03\x02\x02\x02\x87\x85\x03\x02\x02\x02\x88" +
		"\x89\x05\x04\x03\x02\x89\x8A\x05\b\x05\x02\x8A\x8C\x03\x02\x02\x02\x8B" +
		"\x88\x03\x02\x02\x02\x8C\x8F\x03\x02\x02\x02\x8D\x8B\x03\x02\x02\x02\x8D" +
		"\x8E\x03\x02\x02\x02\x8E\x07\x03\x02\x02\x02\x8F\x8D\x03\x02\x02\x02\x90" +
		"\x94\x07)\x02\x02\x91\x94\x06\x05\x0F\x02\x92\x94\x06\x05\x10\x02\x93" +
		"\x90\x03\x02\x02\x02\x93\x91\x03\x02\x02\x02\x93\x92\x03\x02\x02\x02\x94" +
		"\t\x03\x02\x02\x02\x95\x96\t\n\x02\x02\x96\v\x03\x02\x02\x02\x97\x9C\x05" +
		"\x0E\b\x02\x98\x99\x07*\x02\x02\x99\x9B\x05\x0E\b\x02\x9A\x98\x03\x02" +
		"\x02\x02\x9B\x9E\x03\x02\x02\x02\x9C\x9A\x03\x02\x02\x02\x9C\x9D\x03\x02" +
		"\x02\x02\x9D\r\x03\x02\x02\x02\x9E\x9C\x03\x02\x02\x02\x9F\xA5\x077\x02" +
		"\x02\xA0\xA1\x077\x02\x02\xA1\xA2\x07+\x02\x02\xA2\xA5\x05\x04\x03\x02" +
		"\xA3\xA5\x07,\x02\x02\xA4\x9F\x03\x02\x02\x02\xA4\xA0\x03\x02\x02\x02" +
		"\xA4\xA3\x03\x02\x02\x02\xA5\x0F\x03\x02\x02\x02\xA6\xAB\x05\x12\n\x02" +
		"\xA7\xA8\x07*\x02\x02\xA8\xAA\x05\x12\n\x02\xA9\xA7\x03\x02\x02\x02\xAA" +
		"\xAD\x03\x02\x02\x02\xAB\xA9\x03\x02\x02\x02\xAB\xAC\x03\x02\x02\x02\xAC" +
		"\x11\x03\x02\x02\x02\xAD\xAB\x03\x02\x02\x02\xAE\xC1\x05\x04\x03\x02\xAF" +
		"\xB0\x077\x02\x02\xB0\xC1\x07+\x02\x02\xB1\xB2\x077\x02\x02\xB2\xB3\x07" +
		"+\x02\x02\xB3\xC1\x05\x04\x03\x02\xB4\xB5\x076\x02\x02\xB5\xC1\x07+\x02" +
		"\x02\xB6\xB7\x076\x02\x02\xB7\xB8\x07+\x02\x02\xB8\xC1\x05\x04\x03\x02" +
		"\xB9\xBA\x07/\x02\x02\xBA\xC1\x07+\x02\x02\xBB\xBC\x07/\x02\x02\xBC\xBD" +
		"\x07+\x02\x02\xBD\xC1\x05\x04\x03\x02\xBE\xC1\x072\x02\x02\xBF\xC1\x03" +
		"\x02\x02\x02\xC0\xAE\x03\x02\x02\x02\xC0\xAF\x03\x02\x02\x02\xC0\xB1\x03" +
		"\x02\x02\x02\xC0\xB4\x03\x02\x02\x02\xC0\xB6\x03\x02\x02\x02\xC0\xB9\x03" +
		"\x02\x02\x02\xC0\xBB\x03\x02\x02\x02\xC0\xBE\x03\x02\x02\x02\xC0\xBF\x03" +
		"\x02\x02\x02\xC1\x13\x03\x02\x02\x02\r\x19@T\x83\x85\x8D\x93\x9C\xA4\xAB" +
		"\xC0";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!RParser.__ATN) {
			RParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(RParser._serializedATN));
		}

		return RParser.__ATN;
	}

}

export class ProgContext extends ParserRuleContext {
	public EOF(): TerminalNode { return this.getToken(RParser.EOF, 0); }
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
}
export class ParensContext extends ExprContext {
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RListener): void {
		if (listener.enterParens) {
			listener.enterParens(this);
		}
	}
	// @Override
	public exitRule(listener: RListener): void {
		if (listener.exitParens) {
			listener.exitParens(this);
		}
	}
}
export class CallContext extends ExprContext {
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public arglist(): ArglistContext | undefined {
		return this.tryGetRuleContext(0, ArglistContext);
	}
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
}
export class BraceContext extends ExprContext {
	public LBRACE(): TerminalNode { return this.getToken(RParser.LBRACE, 0); }
	public exprlist(): ExprlistContext {
		return this.getRuleContext(0, ExprlistContext);
	}
	public RBRACE(): TerminalNode { return this.getToken(RParser.RBRACE, 0); }
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RListener): void {
		if (listener.enterBrace) {
			listener.enterBrace(this);
		}
	}
	// @Override
	public exitRule(listener: RListener): void {
		if (listener.exitBrace) {
			listener.exitBrace(this);
		}
	}
}
export class NamespaceContext extends ExprContext {
	public ID(): TerminalNode[];
	public ID(i: number): TerminalNode;
	public ID(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(RParser.ID);
		} else {
			return this.getToken(RParser.ID, i);
		}
	}
	public STRING(): TerminalNode[];
	public STRING(i: number): TerminalNode;
	public STRING(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(RParser.STRING);
		} else {
			return this.getToken(RParser.STRING, i);
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
}
export class ComponentExtractionContext extends ExprContext {
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
}
export class SeqContext extends ExprContext {
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
		if (listener.enterSeq) {
			listener.enterSeq(this);
		}
	}
	// @Override
	public exitRule(listener: RListener): void {
		if (listener.exitSeq) {
			listener.exitSeq(this);
		}
	}
}
export class AssignContext extends ExprContext {
	public _val!: ExprContext;
	public _sym!: Token;
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
}
export class IfContext extends ExprContext {
	public _cond!: ExprContext;
	public _conseq!: ExprContext;
	public _alt!: ExprContext;
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
		if (listener.enterIf) {
			listener.enterIf(this);
		}
	}
	// @Override
	public exitRule(listener: RListener): void {
		if (listener.exitIf) {
			listener.exitIf(this);
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
}
export class WhileContext extends ExprContext {
	public _cond!: ExprContext;
	public _body!: ExprContext;
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
		if (listener.enterWhile) {
			listener.enterWhile(this);
		}
	}
	// @Override
	public exitRule(listener: RListener): void {
		if (listener.exitWhile) {
			listener.exitWhile(this);
		}
	}
}
export class RepeatContext extends ExprContext {
	public _body!: ExprContext;
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RListener): void {
		if (listener.enterRepeat) {
			listener.enterRepeat(this);
		}
	}
	// @Override
	public exitRule(listener: RListener): void {
		if (listener.exitRepeat) {
			listener.exitRepeat(this);
		}
	}
}
export class BreakContext extends ExprContext {
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RListener): void {
		if (listener.enterBreak) {
			listener.enterBreak(this);
		}
	}
	// @Override
	public exitRule(listener: RListener): void {
		if (listener.exitBreak) {
			listener.exitBreak(this);
		}
	}
}
export class NextContext extends ExprContext {
	constructor(ctx: ExprContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: RListener): void {
		if (listener.enterNext) {
			listener.enterNext(this);
		}
	}
	// @Override
	public exitRule(listener: RListener): void {
		if (listener.exitNext) {
			listener.exitNext(this);
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
}


export class LiteralContext extends ParserRuleContext {
	public INT(): TerminalNode | undefined { return this.tryGetToken(RParser.INT, 0); }
	public FLOAT(): TerminalNode | undefined { return this.tryGetToken(RParser.FLOAT, 0); }
	public STRING(): TerminalNode | undefined { return this.tryGetToken(RParser.STRING, 0); }
	public NULL(): TerminalNode | undefined { return this.tryGetToken(RParser.NULL, 0); }
	public NA(): TerminalNode | undefined { return this.tryGetToken(RParser.NA, 0); }
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
}


