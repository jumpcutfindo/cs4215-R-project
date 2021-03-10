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
	public static readonly WS = 58;
	public static readonly RULE_prog = 0;
	public static readonly RULE_expr = 1;
	public static readonly RULE_eoe = 2;
	public static readonly RULE_literal = 3;
	public static readonly RULE_name = 4;
	public static readonly RULE_formallist = 5;
	public static readonly RULE_formal = 6;
	public static readonly RULE_arglist = 7;
	public static readonly RULE_arg = 8;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"prog", "expr", "eoe", "literal", "name", "formallist", "formal", "arglist", 
		"arg",
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
		"HEX", "INT", "FLOAT", "STRING", "ID", "USER_OP", "COMMENT", "WS",
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
	    let possibleIndex = this.currentToken.tokenIndex + 1;
	    if (possibleIndex < this._input.size) {
	        let ahead : Token = this._input.get(possibleIndex);
	        if (ahead.channel != Token.HIDDEN_CHANNEL) {
	            return false;
	        }
	        return (ahead.type === RParser.COMMENT) || (ahead.text!.includes('\n'));
	    }
	    return true;
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
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << RParser.T__0) | (1 << RParser.T__2) | (1 << RParser.T__10) | (1 << RParser.T__11) | (1 << RParser.T__21) | (1 << RParser.T__30))) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & ((1 << (RParser.T__32 - 33)) | (1 << (RParser.T__34 - 33)) | (1 << (RParser.T__35 - 33)) | (1 << (RParser.T__36 - 33)) | (1 << (RParser.T__37 - 33)) | (1 << (RParser.LBRACE - 33)) | (1 << (RParser.NULL - 33)) | (1 << (RParser.NA - 33)) | (1 << (RParser.NAN - 33)) | (1 << (RParser.INF - 33)) | (1 << (RParser.BOOL - 33)) | (1 << (RParser.HEX - 33)) | (1 << (RParser.INT - 33)) | (1 << (RParser.FLOAT - 33)) | (1 << (RParser.STRING - 33)) | (1 << (RParser.ID - 33)))) !== 0)) {
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
			this.state = 27;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 1, this._ctx) ) {
			case 1:
				{
				this.state = 26;
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
			this.state = 90;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 4, this._ctx) ) {
			case 1:
				{
				_localctx = new LitContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 30;
				this.literal();
				}
				break;

			case 2:
				{
				_localctx = new SymbolContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 31;
				this.match(RParser.ID);
				}
				break;

			case 3:
				{
				_localctx = new CallContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 32;
				(_localctx as CallContext)._op = this.match(RParser.T__0);
				this.state = 33;
				this.expr(0);
				this.state = 34;
				this.match(RParser.T__1);
				}
				break;

			case 4:
				{
				_localctx = new FunctionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 36;
				this.match(RParser.T__2);
				this.state = 37;
				this.match(RParser.T__0);
				this.state = 38;
				this.formallist();
				this.state = 39;
				this.match(RParser.T__1);
				this.state = 40;
				this.expr(24);
				}
				break;

			case 5:
				{
				_localctx = new CallContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 42;
				(_localctx as CallContext)._op = this.match(RParser.LBRACE);
				this.state = 48;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << RParser.T__0) | (1 << RParser.T__2) | (1 << RParser.T__10) | (1 << RParser.T__11) | (1 << RParser.T__21) | (1 << RParser.T__30))) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & ((1 << (RParser.T__32 - 33)) | (1 << (RParser.T__34 - 33)) | (1 << (RParser.T__35 - 33)) | (1 << (RParser.T__36 - 33)) | (1 << (RParser.T__37 - 33)) | (1 << (RParser.LBRACE - 33)) | (1 << (RParser.NULL - 33)) | (1 << (RParser.NA - 33)) | (1 << (RParser.NAN - 33)) | (1 << (RParser.INF - 33)) | (1 << (RParser.BOOL - 33)) | (1 << (RParser.HEX - 33)) | (1 << (RParser.INT - 33)) | (1 << (RParser.FLOAT - 33)) | (1 << (RParser.STRING - 33)) | (1 << (RParser.ID - 33)))) !== 0)) {
					{
					{
					this.state = 43;
					this.expr(0);
					this.state = 44;
					this.eoe();
					}
					}
					this.state = 50;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 51;
				this.match(RParser.RBRACE);
				}
				break;

			case 6:
				{
				_localctx = new NamespaceContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 52;
				this.name();
				this.state = 53;
				this.match(RParser.T__3);
				this.state = 54;
				this.name();
				}
				break;

			case 7:
				{
				_localctx = new CallContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 56;
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
				this.state = 57;
				this.expr(17);
				}
				break;

			case 8:
				{
				_localctx = new CallContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 58;
				(_localctx as CallContext)._op = this.match(RParser.T__21);
				this.state = 59;
				this.expr(11);
				}
				break;

			case 9:
				{
				_localctx = new AssignContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 60;
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
				this.state = 61;
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
				this.state = 62;
				(_localctx as AssignContext)._val = this.expr(7);
				}
				break;

			case 10:
				{
				_localctx = new CallContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 63;
				(_localctx as CallContext)._op = this.match(RParser.T__30);
				this.state = 64;
				this.match(RParser.T__0);
				this.state = 65;
				this.expr(0);
				this.state = 66;
				this.match(RParser.T__1);
				this.state = 67;
				this.expr(0);
				this.state = 70;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 3, this._ctx) ) {
				case 1:
					{
					this.state = 68;
					this.match(RParser.T__31);
					this.state = 69;
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
				this.state = 72;
				this.match(RParser.T__32);
				this.state = 73;
				this.match(RParser.T__0);
				this.state = 74;
				this.match(RParser.ID);
				this.state = 75;
				this.match(RParser.T__33);
				this.state = 76;
				(_localctx as ForContext)._seq = this.expr(0);
				this.state = 77;
				this.match(RParser.T__1);
				this.state = 78;
				(_localctx as ForContext)._body = this.expr(5);
				}
				break;

			case 12:
				{
				_localctx = new CallContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 80;
				(_localctx as CallContext)._op = this.match(RParser.T__34);
				this.state = 81;
				this.match(RParser.T__0);
				this.state = 82;
				this.expr(0);
				this.state = 83;
				this.match(RParser.T__1);
				this.state = 84;
				this.expr(4);
				}
				break;

			case 13:
				{
				_localctx = new CallContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 86;
				(_localctx as CallContext)._op = this.match(RParser.T__35);
				this.state = 87;
				this.expr(3);
				}
				break;

			case 14:
				{
				_localctx = new CallContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 88;
				(_localctx as CallContext)._op = this.match(RParser.T__36);
				}
				break;

			case 15:
				{
				_localctx = new CallContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 89;
				(_localctx as CallContext)._op = this.match(RParser.T__37);
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 139;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 6, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 137;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 5, this._ctx) ) {
					case 1:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 92;
						if (!(this.precpred(this._ctx, 18))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 18)");
						}
						this.state = 93;
						(_localctx as CallContext)._op = this.match(RParser.T__9);
						this.state = 94;
						this.expr(18);
						}
						break;

					case 2:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 95;
						if (!(this.precpred(this._ctx, 16))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 16)");
						}
						this.state = 96;
						(_localctx as CallContext)._op = this.match(RParser.T__12);
						this.state = 97;
						this.expr(17);
						}
						break;

					case 3:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 98;
						if (!(this.precpred(this._ctx, 15))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 15)");
						}
						this.state = 99;
						(_localctx as CallContext)._op = this.match(RParser.USER_OP);
						this.state = 100;
						this.expr(16);
						}
						break;

					case 4:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 101;
						if (!(this.precpred(this._ctx, 14))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 14)");
						}
						this.state = 102;
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
						this.state = 103;
						this.expr(15);
						}
						break;

					case 5:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 104;
						if (!(this.precpred(this._ctx, 13))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 13)");
						}
						this.state = 105;
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
						this.state = 106;
						this.expr(14);
						}
						break;

					case 6:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 107;
						if (!(this.precpred(this._ctx, 12))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 12)");
						}
						this.state = 108;
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
						this.state = 109;
						this.expr(13);
						}
						break;

					case 7:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 110;
						if (!(this.precpred(this._ctx, 10))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 10)");
						}
						this.state = 111;
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
						this.state = 112;
						this.expr(11);
						}
						break;

					case 8:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 113;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 114;
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
						this.state = 115;
						this.expr(10);
						}
						break;

					case 9:
						{
						_localctx = new FunCallContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 116;
						if (!(this.precpred(this._ctx, 25))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 25)");
						}
						this.state = 117;
						this.match(RParser.T__0);
						this.state = 118;
						this.arglist();
						this.state = 119;
						this.match(RParser.T__1);
						}
						break;

					case 10:
						{
						_localctx = new ComponentExtractionContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 121;
						if (!(this.precpred(this._ctx, 21))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 21)");
						}
						this.state = 122;
						this.match(RParser.T__4);
						this.state = 123;
						this.name();
						}
						break;

					case 11:
						{
						_localctx = new SubsetContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 124;
						if (!(this.precpred(this._ctx, 20))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 20)");
						}
						this.state = 125;
						this.match(RParser.T__5);
						this.state = 126;
						this.arglist();
						this.state = 127;
						this.match(RParser.T__6);
						}
						break;

					case 12:
						{
						_localctx = new IndexingContext(new ExprContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 129;
						if (!(this.precpred(this._ctx, 19))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 19)");
						}
						this.state = 130;
						this.match(RParser.T__7);
						this.state = 131;
						this.arglist();
						this.state = 132;
						this.match(RParser.T__8);
						}
						break;

					case 13:
						{
						_localctx = new AssignContext(new ExprContext(_parentctx, _parentState));
						(_localctx as AssignContext)._val = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, RParser.RULE_expr);
						this.state = 134;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 135;
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
						this.state = 136;
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
				this.state = 141;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 6, this._ctx);
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
	public eoe(): EoeContext {
		let _localctx: EoeContext = new EoeContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, RParser.RULE_eoe);
		try {
			this.state = 145;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 7, this._ctx) ) {
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
		this.enterRule(_localctx, 6, RParser.RULE_literal);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 147;
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
		this.enterRule(_localctx, 8, RParser.RULE_name);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 149;
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
		this.enterRule(_localctx, 10, RParser.RULE_formallist);
		let _la: number;
		try {
			this.state = 160;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case RParser.T__41:
			case RParser.ID:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 151;
				this.formal();
				this.state = 156;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === RParser.T__39) {
					{
					{
					this.state = 152;
					this.match(RParser.T__39);
					this.state = 153;
					this.formal();
					}
					}
					this.state = 158;
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
		this.enterRule(_localctx, 12, RParser.RULE_formal);
		try {
			this.state = 167;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 10, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 162;
				this.match(RParser.ID);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 163;
				this.match(RParser.ID);
				this.state = 164;
				this.match(RParser.T__40);
				this.state = 165;
				this.expr(0);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 166;
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
			this.state = 169;
			this.arg();
			this.state = 174;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === RParser.T__39) {
				{
				{
				this.state = 170;
				this.match(RParser.T__39);
				this.state = 171;
				this.arg();
				}
				}
				this.state = 176;
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
			this.state = 195;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 12, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 177;
				this.expr(0);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 178;
				this.match(RParser.ID);
				this.state = 179;
				this.match(RParser.T__40);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 180;
				this.match(RParser.ID);
				this.state = 181;
				this.match(RParser.T__40);
				this.state = 182;
				this.expr(0);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 183;
				this.match(RParser.STRING);
				this.state = 184;
				this.match(RParser.T__40);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 185;
				this.match(RParser.STRING);
				this.state = 186;
				this.match(RParser.T__40);
				this.state = 187;
				this.expr(0);
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 188;
				this.match(RParser.NULL);
				this.state = 189;
				this.match(RParser.T__40);
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 190;
				this.match(RParser.NULL);
				this.state = 191;
				this.match(RParser.T__40);
				this.state = 192;
				this.expr(0);
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 193;
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

		case 2:
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
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03<\xC8\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x03\x02\x03\x02\x03\x02\x07\x02\x18" +
		"\n\x02\f\x02\x0E\x02\x1B\v\x02\x03\x02\x05\x02\x1E\n\x02\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x07\x031\n\x03\f\x03" +
		"\x0E\x034\v\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x05\x03I\n\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x05\x03]\n\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x07\x03\x8C\n" +
		"\x03\f\x03\x0E\x03\x8F\v\x03\x03\x04\x03\x04\x03\x04\x05\x04\x94\n\x04" +
		"\x03\x05\x03\x05\x03\x06\x03\x06\x03\x07\x03\x07\x03\x07\x07\x07\x9D\n" +
		"\x07\f\x07\x0E\x07\xA0\v\x07\x03\x07\x05\x07\xA3\n\x07\x03\b\x03\b\x03" +
		"\b\x03\b\x03\b\x05\b\xAA\n\b\x03\t\x03\t\x03\t\x07\t\xAF\n\t\f\t\x0E\t" +
		"\xB2\v\t\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03" +
		"\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x05\n\xC6\n\n\x03\n\x02\x02" +
		"\x03\x04\v\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12" +
		"\x02\x02\v\x03\x02\r\x0E\x03\x0289\x03\x02\x1F \x03\x02\x10\x11\x03\x02" +
		"\x12\x17\x03\x02\x19\x1A\x03\x02\x1B\x1C\x03\x02\x1D\x1E\x04\x02/358\x02" +
		"\xEC\x02\x19\x03\x02\x02\x02\x04\\\x03\x02\x02\x02\x06\x93\x03\x02\x02" +
		"\x02\b\x95\x03\x02\x02\x02\n\x97\x03\x02\x02\x02\f\xA2\x03\x02\x02\x02" +
		"\x0E\xA9\x03\x02\x02\x02\x10\xAB\x03\x02\x02\x02\x12\xC5\x03\x02\x02\x02" +
		"\x14\x15\x05\x04\x03\x02\x15\x16\x05\x06\x04\x02\x16\x18\x03\x02\x02\x02" +
		"\x17\x14\x03\x02\x02\x02\x18\x1B\x03\x02\x02\x02\x19\x17\x03\x02\x02\x02" +
		"\x19\x1A\x03\x02\x02\x02\x1A\x1D\x03\x02\x02\x02\x1B\x19\x03\x02\x02\x02" +
		"\x1C\x1E\x07\x02\x02\x03\x1D\x1C\x03\x02\x02\x02\x1D\x1E\x03\x02\x02\x02" +
		"\x1E\x03\x03\x02\x02\x02\x1F \b\x03\x01\x02 ]\x05\b\x05\x02!]\x079\x02" +
		"\x02\"#\x07\x03\x02\x02#$\x05\x04\x03\x02$%\x07\x04\x02\x02%]\x03\x02" +
		"\x02\x02&\'\x07\x05\x02\x02\'(\x07\x03\x02\x02()\x05\f\x07\x02)*\x07\x04" +
		"\x02\x02*+\x05\x04\x03\x1A+]\x03\x02\x02\x02,2\x07-\x02\x02-.\x05\x04" +
		"\x03\x02./\x05\x06\x04\x02/1\x03\x02\x02\x020-\x03\x02\x02\x0214\x03\x02" +
		"\x02\x0220\x03\x02\x02\x0223\x03\x02\x02\x0235\x03\x02\x02\x0242\x03\x02" +
		"\x02\x025]\x07.\x02\x0267\x05\n\x06\x0278\x07\x06\x02\x0289\x05\n\x06" +
		"\x029]\x03\x02\x02\x02:;\t\x02\x02\x02;]\x05\x04\x03\x13<=\x07\x18\x02" +
		"\x02=]\x05\x04\x03\r>?\t\x03\x02\x02?@\t\x04\x02\x02@]\x05\x04\x03\tA" +
		"B\x07!\x02\x02BC\x07\x03\x02\x02CD\x05\x04\x03\x02DE\x07\x04\x02\x02E" +
		"H\x05\x04\x03\x02FG\x07\"\x02\x02GI\x05\x04\x03\x02HF\x03\x02\x02\x02" +
		"HI\x03\x02\x02\x02I]\x03\x02\x02\x02JK\x07#\x02\x02KL\x07\x03\x02\x02" +
		"LM\x079\x02\x02MN\x07$\x02\x02NO\x05\x04\x03\x02OP\x07\x04\x02\x02PQ\x05" +
		"\x04\x03\x07Q]\x03\x02\x02\x02RS\x07%\x02\x02ST\x07\x03\x02\x02TU\x05" +
		"\x04\x03\x02UV\x07\x04\x02\x02VW\x05\x04\x03\x06W]\x03\x02\x02\x02XY\x07" +
		"&\x02\x02Y]\x05\x04\x03\x05Z]\x07\'\x02\x02[]\x07(\x02\x02\\\x1F\x03\x02" +
		"\x02\x02\\!\x03\x02\x02\x02\\\"\x03\x02\x02\x02\\&\x03\x02\x02\x02\\," +
		"\x03\x02\x02\x02\\6\x03\x02\x02\x02\\:\x03\x02\x02\x02\\<\x03\x02\x02" +
		"\x02\\>\x03\x02\x02\x02\\A\x03\x02\x02\x02\\J\x03\x02\x02\x02\\R\x03\x02" +
		"\x02\x02\\X\x03\x02\x02\x02\\Z\x03\x02\x02\x02\\[\x03\x02\x02\x02]\x8D" +
		"\x03\x02\x02\x02^_\f\x14\x02\x02_`\x07\f\x02\x02`\x8C\x05\x04\x03\x14" +
		"ab\f\x12\x02\x02bc\x07\x0F\x02\x02c\x8C\x05\x04\x03\x13de\f\x11\x02\x02" +
		"ef\x07:\x02\x02f\x8C\x05\x04\x03\x12gh\f\x10\x02\x02hi\t\x05\x02\x02i" +
		"\x8C\x05\x04\x03\x11jk\f\x0F\x02\x02kl\t\x02\x02\x02l\x8C\x05\x04\x03" +
		"\x10mn\f\x0E\x02\x02no\t\x06\x02\x02o\x8C\x05\x04\x03\x0Fpq\f\f\x02\x02" +
		"qr\t\x07\x02\x02r\x8C\x05\x04\x03\rst\f\v\x02\x02tu\t\b\x02\x02u\x8C\x05" +
		"\x04\x03\fvw\f\x1B\x02\x02wx\x07\x03\x02\x02xy\x05\x10\t\x02yz\x07\x04" +
		"\x02\x02z\x8C\x03\x02\x02\x02{|\f\x17\x02\x02|}\x07\x07\x02\x02}\x8C\x05" +
		"\n\x06\x02~\x7F\f\x16\x02\x02\x7F\x80\x07\b\x02\x02\x80\x81\x05\x10\t" +
		"\x02\x81\x82\x07\t\x02\x02\x82\x8C\x03\x02\x02\x02\x83\x84\f\x15\x02\x02" +
		"\x84\x85\x07\n\x02\x02\x85\x86\x05\x10\t\x02\x86\x87\x07\v\x02\x02\x87" +
		"\x8C\x03\x02\x02\x02\x88\x89\f\n\x02\x02\x89\x8A\t\t\x02\x02\x8A\x8C\t" +
		"\x03\x02\x02\x8B^\x03\x02\x02\x02\x8Ba\x03\x02\x02\x02\x8Bd\x03\x02\x02" +
		"\x02\x8Bg\x03\x02\x02\x02\x8Bj\x03\x02\x02\x02\x8Bm\x03\x02\x02\x02\x8B" +
		"p\x03\x02\x02\x02\x8Bs\x03\x02\x02\x02\x8Bv\x03\x02\x02\x02\x8B{\x03\x02" +
		"\x02\x02\x8B~\x03\x02\x02\x02\x8B\x83\x03\x02\x02\x02\x8B\x88\x03\x02" +
		"\x02\x02\x8C\x8F\x03\x02\x02\x02\x8D\x8B\x03\x02\x02\x02\x8D\x8E\x03\x02" +
		"\x02\x02\x8E\x05\x03\x02\x02\x02\x8F\x8D\x03\x02\x02\x02\x90\x94\x07)" +
		"\x02\x02\x91\x94\x06\x04\x0F\x02\x92\x94\x06\x04\x10\x02\x93\x90\x03\x02" +
		"\x02\x02\x93\x91\x03\x02\x02\x02\x93\x92\x03\x02\x02\x02\x94\x07\x03\x02" +
		"\x02\x02\x95\x96\t\n\x02\x02\x96\t\x03\x02\x02\x02\x97\x98\t\x03\x02\x02" +
		"\x98\v\x03\x02\x02\x02\x99\x9E\x05\x0E\b\x02\x9A\x9B\x07*\x02\x02\x9B" +
		"\x9D\x05\x0E\b\x02\x9C\x9A\x03\x02\x02\x02\x9D\xA0\x03\x02\x02\x02\x9E" +
		"\x9C\x03\x02\x02\x02\x9E\x9F\x03\x02\x02\x02\x9F\xA3\x03\x02\x02\x02\xA0" +
		"\x9E\x03\x02\x02\x02\xA1\xA3\x03\x02\x02\x02\xA2\x99\x03\x02\x02\x02\xA2" +
		"\xA1\x03\x02\x02\x02\xA3\r\x03\x02\x02\x02\xA4\xAA\x079\x02\x02\xA5\xA6" +
		"\x079\x02\x02\xA6\xA7\x07+\x02\x02\xA7\xAA\x05\x04\x03\x02\xA8\xAA\x07" +
		",\x02\x02\xA9\xA4\x03\x02\x02\x02\xA9\xA5\x03\x02\x02\x02\xA9\xA8\x03" +
		"\x02\x02\x02\xAA\x0F\x03\x02\x02\x02\xAB\xB0\x05\x12\n\x02\xAC\xAD\x07" +
		"*\x02\x02\xAD\xAF\x05\x12\n\x02\xAE\xAC\x03\x02\x02\x02\xAF\xB2\x03\x02" +
		"\x02\x02\xB0\xAE\x03\x02\x02\x02\xB0\xB1\x03\x02\x02\x02\xB1\x11\x03\x02" +
		"\x02\x02\xB2\xB0\x03\x02\x02\x02\xB3\xC6\x05\x04\x03\x02\xB4\xB5\x079" +
		"\x02\x02\xB5\xC6\x07+\x02\x02\xB6\xB7\x079\x02\x02\xB7\xB8\x07+\x02\x02" +
		"\xB8\xC6\x05\x04\x03\x02\xB9\xBA\x078\x02\x02\xBA\xC6\x07+\x02\x02\xBB" +
		"\xBC\x078\x02\x02\xBC\xBD\x07+\x02\x02\xBD\xC6\x05\x04\x03\x02\xBE\xBF" +
		"\x07/\x02\x02\xBF\xC6\x07+\x02\x02\xC0\xC1\x07/\x02\x02\xC1\xC2\x07+\x02" +
		"\x02\xC2\xC6\x05\x04\x03\x02\xC3\xC6\x074\x02\x02\xC4\xC6\x03\x02\x02" +
		"\x02\xC5\xB3\x03\x02\x02\x02\xC5\xB4\x03\x02\x02\x02\xC5\xB6\x03\x02\x02" +
		"\x02\xC5\xB9\x03\x02\x02\x02\xC5\xBB\x03\x02\x02\x02\xC5\xBE\x03\x02\x02" +
		"\x02\xC5\xC0\x03\x02\x02\x02\xC5\xC3\x03\x02\x02\x02\xC5\xC4\x03\x02\x02" +
		"\x02\xC6\x13\x03\x02\x02\x02\x0F\x19\x1D2H\\\x8B\x8D\x93\x9E\xA2\xA9\xB0" +
		"\xC5";
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
	public RBRACE(): TerminalNode | undefined { return this.tryGetToken(RParser.RBRACE, 0); }
	public LBRACE(): TerminalNode | undefined { return this.tryGetToken(RParser.LBRACE, 0); }
	public eoe(): EoeContext[];
	public eoe(i: number): EoeContext;
	public eoe(i?: number): EoeContext | EoeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(EoeContext);
		} else {
			return this.getRuleContext(i, EoeContext);
		}
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


