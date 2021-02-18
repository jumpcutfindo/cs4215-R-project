// Generated from c:\Users\joash\Documents\CS\js\cs4215-R-project\src\grammar\R.g4 by ANTLR 4.8
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class RParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.8", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, T__1=2, T__2=3, T__3=4, T__4=5, T__5=6, T__6=7, T__7=8, T__8=9, 
		T__9=10, T__10=11, T__11=12, T__12=13, T__13=14, T__14=15, T__15=16, T__16=17, 
		T__17=18, T__18=19, T__19=20, T__20=21, T__21=22, T__22=23, T__23=24, 
		T__24=25, T__25=26, T__26=27, T__27=28, T__28=29, T__29=30, T__30=31, 
		T__31=32, T__32=33, T__33=34, T__34=35, T__35=36, T__36=37, T__37=38, 
		T__38=39, T__39=40, T__40=41, T__41=42, LBRACE=43, RBRACE=44, NULL=45, 
		NA=46, NAN=47, INF=48, BOOL=49, DOTS=50, HEX=51, INT=52, FLOAT=53, STRING=54, 
		ID=55, USER_OP=56, COMMENT=57, NL=58, WS=59;
	public static final int
		RULE_prog = 0, RULE_expr = 1, RULE_exprlist = 2, RULE_eoe = 3, RULE_literal = 4, 
		RULE_name = 5, RULE_formallist = 6, RULE_formal = 7, RULE_arglist = 8, 
		RULE_arg = 9;
	private static String[] makeRuleNames() {
		return new String[] {
			"prog", "expr", "exprlist", "eoe", "literal", "name", "formallist", "formal", 
			"arglist", "arg"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "'('", "')'", "'function'", "'::'", "'$'", "'['", "']'", "'[['", 
			"']]'", "'^'", "'-'", "'+'", "':'", "'*'", "'/'", "'>'", "'>='", "'<'", 
			"'<='", "'=='", "'!='", "'!'", "'&'", "'&&'", "'|'", "'||'", "'->'", 
			"'->>'", "'<-'", "'<<-'", "'if'", "'else'", "'for'", "'in'", "'while'", 
			"'repeat'", "'break'", "'next'", "';'", "','", "'='", "'...'", "'{'", 
			"'}'", "'NULL'", "'NA'", "'NaN'", "'Inf'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, "LBRACE", "RBRACE", "NULL", 
			"NA", "NAN", "INF", "BOOL", "DOTS", "HEX", "INT", "FLOAT", "STRING", 
			"ID", "USER_OP", "COMMENT", "NL", "WS"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}

	@Override
	public String getGrammarFileName() { return "R.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }



	public lineTerminatorAhead() : boolean {
	    let possibleIndex = this.currentToken.tokenIndex - 1;
	    let ahead : Token = this._input.get(possibleIndex);
	    if (ahead.channel != Token.HIDDEN_CHANNEL) {
	        return false;
	    }
	    return (ahead.type == RParser.COMMENT) || (ahead.type == RParser.NL);
	}

	public RParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	public static class ProgContext extends ParserRuleContext {
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public List<EoeContext> eoe() {
			return getRuleContexts(EoeContext.class);
		}
		public EoeContext eoe(int i) {
			return getRuleContext(EoeContext.class,i);
		}
		public TerminalNode EOF() { return getToken(RParser.EOF, 0); }
		public ProgContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_prog; }
	}

	public final ProgContext prog() throws RecognitionException {
		ProgContext _localctx = new ProgContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_prog);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(25);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__0) | (1L << T__2) | (1L << T__10) | (1L << T__11) | (1L << T__21) | (1L << T__30) | (1L << T__32) | (1L << T__34) | (1L << T__35) | (1L << T__36) | (1L << T__37) | (1L << LBRACE) | (1L << NULL) | (1L << NA) | (1L << NAN) | (1L << INF) | (1L << BOOL) | (1L << HEX) | (1L << INT) | (1L << FLOAT) | (1L << STRING) | (1L << ID))) != 0)) {
				{
				{
				setState(20);
				expr(0);
				setState(21);
				eoe();
				}
				}
				setState(27);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(29);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,1,_ctx) ) {
			case 1:
				{
				setState(28);
				match(EOF);
				}
				break;
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ExprContext extends ParserRuleContext {
		public ExprContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expr; }
	 
		public ExprContext() { }
		public void copyFrom(ExprContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class CallContext extends ExprContext {
		public Token op;
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public ExprlistContext exprlist() {
			return getRuleContext(ExprlistContext.class,0);
		}
		public TerminalNode RBRACE() { return getToken(RParser.RBRACE, 0); }
		public TerminalNode LBRACE() { return getToken(RParser.LBRACE, 0); }
		public TerminalNode USER_OP() { return getToken(RParser.USER_OP, 0); }
		public CallContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class FunctionContext extends ExprContext {
		public FormallistContext formallist() {
			return getRuleContext(FormallistContext.class,0);
		}
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public FunctionContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class SubsetContext extends ExprContext {
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public ArglistContext arglist() {
			return getRuleContext(ArglistContext.class,0);
		}
		public SubsetContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class FunCallContext extends ExprContext {
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public ArglistContext arglist() {
			return getRuleContext(ArglistContext.class,0);
		}
		public FunCallContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class LitContext extends ExprContext {
		public LiteralContext literal() {
			return getRuleContext(LiteralContext.class,0);
		}
		public LitContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class SymbolContext extends ExprContext {
		public TerminalNode ID() { return getToken(RParser.ID, 0); }
		public SymbolContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class ComponentExtractionContext extends ExprContext {
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public NameContext name() {
			return getRuleContext(NameContext.class,0);
		}
		public ComponentExtractionContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class ForContext extends ExprContext {
		public ExprContext seq;
		public ExprContext body;
		public TerminalNode ID() { return getToken(RParser.ID, 0); }
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public ForContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class AssignContext extends ExprContext {
		public ExprContext val;
		public Token sym;
		public Token arrow;
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public TerminalNode ID() { return getToken(RParser.ID, 0); }
		public TerminalNode STRING() { return getToken(RParser.STRING, 0); }
		public AssignContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class NamespaceContext extends ExprContext {
		public List<NameContext> name() {
			return getRuleContexts(NameContext.class);
		}
		public NameContext name(int i) {
			return getRuleContext(NameContext.class,i);
		}
		public NamespaceContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class IndexingContext extends ExprContext {
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public ArglistContext arglist() {
			return getRuleContext(ArglistContext.class,0);
		}
		public IndexingContext(ExprContext ctx) { copyFrom(ctx); }
	}

	public final ExprContext expr() throws RecognitionException {
		return expr(0);
	}

	private ExprContext expr(int _p) throws RecognitionException {
		ParserRuleContext _parentctx = _ctx;
		int _parentState = getState();
		ExprContext _localctx = new ExprContext(_ctx, _parentState);
		ExprContext _prevctx = _localctx;
		int _startState = 2;
		enterRecursionRule(_localctx, 2, RULE_expr, _p);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(86);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,3,_ctx) ) {
			case 1:
				{
				_localctx = new LitContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;

				setState(32);
				literal();
				}
				break;
			case 2:
				{
				_localctx = new SymbolContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(33);
				match(ID);
				}
				break;
			case 3:
				{
				_localctx = new CallContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(34);
				((CallContext)_localctx).op = match(T__0);
				setState(35);
				expr(0);
				setState(36);
				match(T__1);
				}
				break;
			case 4:
				{
				_localctx = new FunctionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(38);
				match(T__2);
				setState(39);
				match(T__0);
				setState(40);
				formallist();
				setState(41);
				match(T__1);
				setState(42);
				expr(24);
				}
				break;
			case 5:
				{
				_localctx = new CallContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(44);
				((CallContext)_localctx).op = match(LBRACE);
				setState(45);
				exprlist();
				setState(46);
				match(RBRACE);
				}
				break;
			case 6:
				{
				_localctx = new NamespaceContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(48);
				name();
				setState(49);
				match(T__3);
				setState(50);
				name();
				}
				break;
			case 7:
				{
				_localctx = new CallContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(52);
				((CallContext)_localctx).op = _input.LT(1);
				_la = _input.LA(1);
				if ( !(_la==T__10 || _la==T__11) ) {
					((CallContext)_localctx).op = (Token)_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				setState(53);
				expr(17);
				}
				break;
			case 8:
				{
				_localctx = new CallContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(54);
				((CallContext)_localctx).op = match(T__21);
				setState(55);
				expr(11);
				}
				break;
			case 9:
				{
				_localctx = new AssignContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(56);
				((AssignContext)_localctx).sym = _input.LT(1);
				_la = _input.LA(1);
				if ( !(_la==STRING || _la==ID) ) {
					((AssignContext)_localctx).sym = (Token)_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				setState(57);
				((AssignContext)_localctx).arrow = _input.LT(1);
				_la = _input.LA(1);
				if ( !(_la==T__28 || _la==T__29) ) {
					((AssignContext)_localctx).arrow = (Token)_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				setState(58);
				((AssignContext)_localctx).val = expr(7);
				}
				break;
			case 10:
				{
				_localctx = new CallContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(59);
				((CallContext)_localctx).op = match(T__30);
				setState(60);
				match(T__0);
				setState(61);
				expr(0);
				setState(62);
				match(T__1);
				setState(63);
				expr(0);
				setState(66);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,2,_ctx) ) {
				case 1:
					{
					setState(64);
					match(T__31);
					setState(65);
					expr(0);
					}
					break;
				}
				}
				break;
			case 11:
				{
				_localctx = new ForContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(68);
				match(T__32);
				setState(69);
				match(T__0);
				setState(70);
				match(ID);
				setState(71);
				match(T__33);
				setState(72);
				((ForContext)_localctx).seq = expr(0);
				setState(73);
				match(T__1);
				setState(74);
				((ForContext)_localctx).body = expr(5);
				}
				break;
			case 12:
				{
				_localctx = new CallContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(76);
				((CallContext)_localctx).op = match(T__34);
				setState(77);
				match(T__0);
				setState(78);
				expr(0);
				setState(79);
				match(T__1);
				setState(80);
				expr(4);
				}
				break;
			case 13:
				{
				_localctx = new CallContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(82);
				((CallContext)_localctx).op = match(T__35);
				setState(83);
				expr(3);
				}
				break;
			case 14:
				{
				_localctx = new CallContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(84);
				((CallContext)_localctx).op = match(T__36);
				}
				break;
			case 15:
				{
				_localctx = new CallContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(85);
				((CallContext)_localctx).op = match(T__37);
				}
				break;
			}
			_ctx.stop = _input.LT(-1);
			setState(135);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,5,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					setState(133);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,4,_ctx) ) {
					case 1:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(88);
						if (!(precpred(_ctx, 18))) throw new FailedPredicateException(this, "precpred(_ctx, 18)");
						setState(89);
						((CallContext)_localctx).op = match(T__9);
						setState(90);
						expr(18);
						}
						break;
					case 2:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(91);
						if (!(precpred(_ctx, 16))) throw new FailedPredicateException(this, "precpred(_ctx, 16)");
						setState(92);
						((CallContext)_localctx).op = match(T__12);
						setState(93);
						expr(17);
						}
						break;
					case 3:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(94);
						if (!(precpred(_ctx, 15))) throw new FailedPredicateException(this, "precpred(_ctx, 15)");
						setState(95);
						((CallContext)_localctx).op = match(USER_OP);
						setState(96);
						expr(16);
						}
						break;
					case 4:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(97);
						if (!(precpred(_ctx, 14))) throw new FailedPredicateException(this, "precpred(_ctx, 14)");
						setState(98);
						((CallContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !(_la==T__13 || _la==T__14) ) {
							((CallContext)_localctx).op = (Token)_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(99);
						expr(15);
						}
						break;
					case 5:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(100);
						if (!(precpred(_ctx, 13))) throw new FailedPredicateException(this, "precpred(_ctx, 13)");
						setState(101);
						((CallContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !(_la==T__10 || _la==T__11) ) {
							((CallContext)_localctx).op = (Token)_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(102);
						expr(14);
						}
						break;
					case 6:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(103);
						if (!(precpred(_ctx, 12))) throw new FailedPredicateException(this, "precpred(_ctx, 12)");
						setState(104);
						((CallContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__15) | (1L << T__16) | (1L << T__17) | (1L << T__18) | (1L << T__19) | (1L << T__20))) != 0)) ) {
							((CallContext)_localctx).op = (Token)_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(105);
						expr(13);
						}
						break;
					case 7:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(106);
						if (!(precpred(_ctx, 10))) throw new FailedPredicateException(this, "precpred(_ctx, 10)");
						setState(107);
						((CallContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !(_la==T__22 || _la==T__23) ) {
							((CallContext)_localctx).op = (Token)_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(108);
						expr(11);
						}
						break;
					case 8:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(109);
						if (!(precpred(_ctx, 9))) throw new FailedPredicateException(this, "precpred(_ctx, 9)");
						setState(110);
						((CallContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !(_la==T__24 || _la==T__25) ) {
							((CallContext)_localctx).op = (Token)_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(111);
						expr(10);
						}
						break;
					case 9:
						{
						_localctx = new FunCallContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(112);
						if (!(precpred(_ctx, 25))) throw new FailedPredicateException(this, "precpred(_ctx, 25)");
						setState(113);
						match(T__0);
						setState(114);
						arglist();
						setState(115);
						match(T__1);
						}
						break;
					case 10:
						{
						_localctx = new ComponentExtractionContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(117);
						if (!(precpred(_ctx, 21))) throw new FailedPredicateException(this, "precpred(_ctx, 21)");
						setState(118);
						match(T__4);
						setState(119);
						name();
						}
						break;
					case 11:
						{
						_localctx = new SubsetContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(120);
						if (!(precpred(_ctx, 20))) throw new FailedPredicateException(this, "precpred(_ctx, 20)");
						setState(121);
						match(T__5);
						setState(122);
						arglist();
						setState(123);
						match(T__6);
						}
						break;
					case 12:
						{
						_localctx = new IndexingContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(125);
						if (!(precpred(_ctx, 19))) throw new FailedPredicateException(this, "precpred(_ctx, 19)");
						setState(126);
						match(T__7);
						setState(127);
						arglist();
						setState(128);
						match(T__8);
						}
						break;
					case 13:
						{
						_localctx = new AssignContext(new ExprContext(_parentctx, _parentState));
						((AssignContext)_localctx).val = _prevctx;
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(130);
						if (!(precpred(_ctx, 8))) throw new FailedPredicateException(this, "precpred(_ctx, 8)");
						setState(131);
						((AssignContext)_localctx).arrow = _input.LT(1);
						_la = _input.LA(1);
						if ( !(_la==T__26 || _la==T__27) ) {
							((AssignContext)_localctx).arrow = (Token)_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(132);
						((AssignContext)_localctx).sym = _input.LT(1);
						_la = _input.LA(1);
						if ( !(_la==STRING || _la==ID) ) {
							((AssignContext)_localctx).sym = (Token)_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						}
						break;
					}
					} 
				}
				setState(137);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,5,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public static class ExprlistContext extends ParserRuleContext {
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public List<EoeContext> eoe() {
			return getRuleContexts(EoeContext.class);
		}
		public EoeContext eoe(int i) {
			return getRuleContext(EoeContext.class,i);
		}
		public ExprlistContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_exprlist; }
	}

	public final ExprlistContext exprlist() throws RecognitionException {
		ExprlistContext _localctx = new ExprlistContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_exprlist);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(143);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__0) | (1L << T__2) | (1L << T__10) | (1L << T__11) | (1L << T__21) | (1L << T__30) | (1L << T__32) | (1L << T__34) | (1L << T__35) | (1L << T__36) | (1L << T__37) | (1L << LBRACE) | (1L << NULL) | (1L << NA) | (1L << NAN) | (1L << INF) | (1L << BOOL) | (1L << HEX) | (1L << INT) | (1L << FLOAT) | (1L << STRING) | (1L << ID))) != 0)) {
				{
				{
				setState(138);
				expr(0);
				setState(139);
				eoe();
				}
				}
				setState(145);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class EoeContext extends ParserRuleContext {
		public EoeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_eoe; }
	}

	public final EoeContext eoe() throws RecognitionException {
		EoeContext _localctx = new EoeContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_eoe);
		try {
			setState(149);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,7,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(146);
				match(T__38);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(147);
				if (!(this.lineTerminatorAhead())) throw new FailedPredicateException(this, "this.lineTerminatorAhead()");
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(148);
				if (!(this._input.LT(1).type == RParser.RBRACE)) throw new FailedPredicateException(this, "this._input.LT(1).type == RParser.RBRACE");
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class LiteralContext extends ParserRuleContext {
		public TerminalNode INT() { return getToken(RParser.INT, 0); }
		public TerminalNode FLOAT() { return getToken(RParser.FLOAT, 0); }
		public TerminalNode HEX() { return getToken(RParser.HEX, 0); }
		public TerminalNode STRING() { return getToken(RParser.STRING, 0); }
		public TerminalNode NULL() { return getToken(RParser.NULL, 0); }
		public TerminalNode NA() { return getToken(RParser.NA, 0); }
		public TerminalNode NAN() { return getToken(RParser.NAN, 0); }
		public TerminalNode INF() { return getToken(RParser.INF, 0); }
		public TerminalNode BOOL() { return getToken(RParser.BOOL, 0); }
		public LiteralContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_literal; }
	}

	public final LiteralContext literal() throws RecognitionException {
		LiteralContext _localctx = new LiteralContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_literal);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(151);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << NULL) | (1L << NA) | (1L << NAN) | (1L << INF) | (1L << BOOL) | (1L << HEX) | (1L << INT) | (1L << FLOAT) | (1L << STRING))) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class NameContext extends ParserRuleContext {
		public TerminalNode ID() { return getToken(RParser.ID, 0); }
		public TerminalNode STRING() { return getToken(RParser.STRING, 0); }
		public NameContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_name; }
	}

	public final NameContext name() throws RecognitionException {
		NameContext _localctx = new NameContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_name);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(153);
			_la = _input.LA(1);
			if ( !(_la==STRING || _la==ID) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class FormallistContext extends ParserRuleContext {
		public List<FormalContext> formal() {
			return getRuleContexts(FormalContext.class);
		}
		public FormalContext formal(int i) {
			return getRuleContext(FormalContext.class,i);
		}
		public FormallistContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_formallist; }
	}

	public final FormallistContext formallist() throws RecognitionException {
		FormallistContext _localctx = new FormallistContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_formallist);
		int _la;
		try {
			setState(164);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__41:
			case ID:
				enterOuterAlt(_localctx, 1);
				{
				setState(155);
				formal();
				setState(160);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==T__39) {
					{
					{
					setState(156);
					match(T__39);
					setState(157);
					formal();
					}
					}
					setState(162);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				}
				break;
			case T__1:
				enterOuterAlt(_localctx, 2);
				{
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class FormalContext extends ParserRuleContext {
		public TerminalNode ID() { return getToken(RParser.ID, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public FormalContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_formal; }
	}

	public final FormalContext formal() throws RecognitionException {
		FormalContext _localctx = new FormalContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_formal);
		try {
			setState(171);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,10,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(166);
				match(ID);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(167);
				match(ID);
				setState(168);
				match(T__40);
				setState(169);
				expr(0);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(170);
				match(T__41);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ArglistContext extends ParserRuleContext {
		public List<ArgContext> arg() {
			return getRuleContexts(ArgContext.class);
		}
		public ArgContext arg(int i) {
			return getRuleContext(ArgContext.class,i);
		}
		public ArglistContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_arglist; }
	}

	public final ArglistContext arglist() throws RecognitionException {
		ArglistContext _localctx = new ArglistContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_arglist);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(173);
			arg();
			setState(178);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==T__39) {
				{
				{
				setState(174);
				match(T__39);
				setState(175);
				arg();
				}
				}
				setState(180);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ArgContext extends ParserRuleContext {
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public TerminalNode ID() { return getToken(RParser.ID, 0); }
		public TerminalNode STRING() { return getToken(RParser.STRING, 0); }
		public TerminalNode NULL() { return getToken(RParser.NULL, 0); }
		public TerminalNode DOTS() { return getToken(RParser.DOTS, 0); }
		public ArgContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_arg; }
	}

	public final ArgContext arg() throws RecognitionException {
		ArgContext _localctx = new ArgContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_arg);
		try {
			setState(199);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,12,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(181);
				expr(0);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(182);
				match(ID);
				setState(183);
				match(T__40);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(184);
				match(ID);
				setState(185);
				match(T__40);
				setState(186);
				expr(0);
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(187);
				match(STRING);
				setState(188);
				match(T__40);
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(189);
				match(STRING);
				setState(190);
				match(T__40);
				setState(191);
				expr(0);
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(192);
				match(NULL);
				setState(193);
				match(T__40);
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(194);
				match(NULL);
				setState(195);
				match(T__40);
				setState(196);
				expr(0);
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(197);
				match(DOTS);
				}
				break;
			case 9:
				enterOuterAlt(_localctx, 9);
				{
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public boolean sempred(RuleContext _localctx, int ruleIndex, int predIndex) {
		switch (ruleIndex) {
		case 1:
			return expr_sempred((ExprContext)_localctx, predIndex);
		case 3:
			return eoe_sempred((EoeContext)_localctx, predIndex);
		}
		return true;
	}
	private boolean expr_sempred(ExprContext _localctx, int predIndex) {
		switch (predIndex) {
		case 0:
			return precpred(_ctx, 18);
		case 1:
			return precpred(_ctx, 16);
		case 2:
			return precpred(_ctx, 15);
		case 3:
			return precpred(_ctx, 14);
		case 4:
			return precpred(_ctx, 13);
		case 5:
			return precpred(_ctx, 12);
		case 6:
			return precpred(_ctx, 10);
		case 7:
			return precpred(_ctx, 9);
		case 8:
			return precpred(_ctx, 25);
		case 9:
			return precpred(_ctx, 21);
		case 10:
			return precpred(_ctx, 20);
		case 11:
			return precpred(_ctx, 19);
		case 12:
			return precpred(_ctx, 8);
		}
		return true;
	}
	private boolean eoe_sempred(EoeContext _localctx, int predIndex) {
		switch (predIndex) {
		case 13:
			return this.lineTerminatorAhead();
		case 14:
			return this._input.LT(1).type == RParser.RBRACE;
		}
		return true;
	}

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\3=\u00cc\4\2\t\2\4"+
		"\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4\13\t"+
		"\13\3\2\3\2\3\2\7\2\32\n\2\f\2\16\2\35\13\2\3\2\5\2 \n\2\3\3\3\3\3\3\3"+
		"\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3"+
		"\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\5\3E\n\3\3\3"+
		"\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\5"+
		"\3Y\n\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3"+
		"\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3"+
		"\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\7\3\u0088\n\3\f\3\16"+
		"\3\u008b\13\3\3\4\3\4\3\4\7\4\u0090\n\4\f\4\16\4\u0093\13\4\3\5\3\5\3"+
		"\5\5\5\u0098\n\5\3\6\3\6\3\7\3\7\3\b\3\b\3\b\7\b\u00a1\n\b\f\b\16\b\u00a4"+
		"\13\b\3\b\5\b\u00a7\n\b\3\t\3\t\3\t\3\t\3\t\5\t\u00ae\n\t\3\n\3\n\3\n"+
		"\7\n\u00b3\n\n\f\n\16\n\u00b6\13\n\3\13\3\13\3\13\3\13\3\13\3\13\3\13"+
		"\3\13\3\13\3\13\3\13\3\13\3\13\3\13\3\13\3\13\3\13\3\13\5\13\u00ca\n\13"+
		"\3\13\2\3\4\f\2\4\6\b\n\f\16\20\22\24\2\13\3\2\r\16\3\289\3\2\37 \3\2"+
		"\20\21\3\2\22\27\3\2\31\32\3\2\33\34\3\2\35\36\4\2/\63\658\2\u00ef\2\33"+
		"\3\2\2\2\4X\3\2\2\2\6\u0091\3\2\2\2\b\u0097\3\2\2\2\n\u0099\3\2\2\2\f"+
		"\u009b\3\2\2\2\16\u00a6\3\2\2\2\20\u00ad\3\2\2\2\22\u00af\3\2\2\2\24\u00c9"+
		"\3\2\2\2\26\27\5\4\3\2\27\30\5\b\5\2\30\32\3\2\2\2\31\26\3\2\2\2\32\35"+
		"\3\2\2\2\33\31\3\2\2\2\33\34\3\2\2\2\34\37\3\2\2\2\35\33\3\2\2\2\36 \7"+
		"\2\2\3\37\36\3\2\2\2\37 \3\2\2\2 \3\3\2\2\2!\"\b\3\1\2\"Y\5\n\6\2#Y\7"+
		"9\2\2$%\7\3\2\2%&\5\4\3\2&\'\7\4\2\2\'Y\3\2\2\2()\7\5\2\2)*\7\3\2\2*+"+
		"\5\16\b\2+,\7\4\2\2,-\5\4\3\32-Y\3\2\2\2./\7-\2\2/\60\5\6\4\2\60\61\7"+
		".\2\2\61Y\3\2\2\2\62\63\5\f\7\2\63\64\7\6\2\2\64\65\5\f\7\2\65Y\3\2\2"+
		"\2\66\67\t\2\2\2\67Y\5\4\3\2389\7\30\2\29Y\5\4\3\r:;\t\3\2\2;<\t\4\2\2"+
		"<Y\5\4\3\t=>\7!\2\2>?\7\3\2\2?@\5\4\3\2@A\7\4\2\2AD\5\4\3\2BC\7\"\2\2"+
		"CE\5\4\3\2DB\3\2\2\2DE\3\2\2\2EY\3\2\2\2FG\7#\2\2GH\7\3\2\2HI\79\2\2I"+
		"J\7$\2\2JK\5\4\3\2KL\7\4\2\2LM\5\4\3\7MY\3\2\2\2NO\7%\2\2OP\7\3\2\2PQ"+
		"\5\4\3\2QR\7\4\2\2RS\5\4\3\6SY\3\2\2\2TU\7&\2\2UY\5\4\3\5VY\7\'\2\2WY"+
		"\7(\2\2X!\3\2\2\2X#\3\2\2\2X$\3\2\2\2X(\3\2\2\2X.\3\2\2\2X\62\3\2\2\2"+
		"X\66\3\2\2\2X8\3\2\2\2X:\3\2\2\2X=\3\2\2\2XF\3\2\2\2XN\3\2\2\2XT\3\2\2"+
		"\2XV\3\2\2\2XW\3\2\2\2Y\u0089\3\2\2\2Z[\f\24\2\2[\\\7\f\2\2\\\u0088\5"+
		"\4\3\24]^\f\22\2\2^_\7\17\2\2_\u0088\5\4\3\23`a\f\21\2\2ab\7:\2\2b\u0088"+
		"\5\4\3\22cd\f\20\2\2de\t\5\2\2e\u0088\5\4\3\21fg\f\17\2\2gh\t\2\2\2h\u0088"+
		"\5\4\3\20ij\f\16\2\2jk\t\6\2\2k\u0088\5\4\3\17lm\f\f\2\2mn\t\7\2\2n\u0088"+
		"\5\4\3\rop\f\13\2\2pq\t\b\2\2q\u0088\5\4\3\frs\f\33\2\2st\7\3\2\2tu\5"+
		"\22\n\2uv\7\4\2\2v\u0088\3\2\2\2wx\f\27\2\2xy\7\7\2\2y\u0088\5\f\7\2z"+
		"{\f\26\2\2{|\7\b\2\2|}\5\22\n\2}~\7\t\2\2~\u0088\3\2\2\2\177\u0080\f\25"+
		"\2\2\u0080\u0081\7\n\2\2\u0081\u0082\5\22\n\2\u0082\u0083\7\13\2\2\u0083"+
		"\u0088\3\2\2\2\u0084\u0085\f\n\2\2\u0085\u0086\t\t\2\2\u0086\u0088\t\3"+
		"\2\2\u0087Z\3\2\2\2\u0087]\3\2\2\2\u0087`\3\2\2\2\u0087c\3\2\2\2\u0087"+
		"f\3\2\2\2\u0087i\3\2\2\2\u0087l\3\2\2\2\u0087o\3\2\2\2\u0087r\3\2\2\2"+
		"\u0087w\3\2\2\2\u0087z\3\2\2\2\u0087\177\3\2\2\2\u0087\u0084\3\2\2\2\u0088"+
		"\u008b\3\2\2\2\u0089\u0087\3\2\2\2\u0089\u008a\3\2\2\2\u008a\5\3\2\2\2"+
		"\u008b\u0089\3\2\2\2\u008c\u008d\5\4\3\2\u008d\u008e\5\b\5\2\u008e\u0090"+
		"\3\2\2\2\u008f\u008c\3\2\2\2\u0090\u0093\3\2\2\2\u0091\u008f\3\2\2\2\u0091"+
		"\u0092\3\2\2\2\u0092\7\3\2\2\2\u0093\u0091\3\2\2\2\u0094\u0098\7)\2\2"+
		"\u0095\u0098\6\5\17\2\u0096\u0098\6\5\20\2\u0097\u0094\3\2\2\2\u0097\u0095"+
		"\3\2\2\2\u0097\u0096\3\2\2\2\u0098\t\3\2\2\2\u0099\u009a\t\n\2\2\u009a"+
		"\13\3\2\2\2\u009b\u009c\t\3\2\2\u009c\r\3\2\2\2\u009d\u00a2\5\20\t\2\u009e"+
		"\u009f\7*\2\2\u009f\u00a1\5\20\t\2\u00a0\u009e\3\2\2\2\u00a1\u00a4\3\2"+
		"\2\2\u00a2\u00a0\3\2\2\2\u00a2\u00a3\3\2\2\2\u00a3\u00a7\3\2\2\2\u00a4"+
		"\u00a2\3\2\2\2\u00a5\u00a7\3\2\2\2\u00a6\u009d\3\2\2\2\u00a6\u00a5\3\2"+
		"\2\2\u00a7\17\3\2\2\2\u00a8\u00ae\79\2\2\u00a9\u00aa\79\2\2\u00aa\u00ab"+
		"\7+\2\2\u00ab\u00ae\5\4\3\2\u00ac\u00ae\7,\2\2\u00ad\u00a8\3\2\2\2\u00ad"+
		"\u00a9\3\2\2\2\u00ad\u00ac\3\2\2\2\u00ae\21\3\2\2\2\u00af\u00b4\5\24\13"+
		"\2\u00b0\u00b1\7*\2\2\u00b1\u00b3\5\24\13\2\u00b2\u00b0\3\2\2\2\u00b3"+
		"\u00b6\3\2\2\2\u00b4\u00b2\3\2\2\2\u00b4\u00b5\3\2\2\2\u00b5\23\3\2\2"+
		"\2\u00b6\u00b4\3\2\2\2\u00b7\u00ca\5\4\3\2\u00b8\u00b9\79\2\2\u00b9\u00ca"+
		"\7+\2\2\u00ba\u00bb\79\2\2\u00bb\u00bc\7+\2\2\u00bc\u00ca\5\4\3\2\u00bd"+
		"\u00be\78\2\2\u00be\u00ca\7+\2\2\u00bf\u00c0\78\2\2\u00c0\u00c1\7+\2\2"+
		"\u00c1\u00ca\5\4\3\2\u00c2\u00c3\7/\2\2\u00c3\u00ca\7+\2\2\u00c4\u00c5"+
		"\7/\2\2\u00c5\u00c6\7+\2\2\u00c6\u00ca\5\4\3\2\u00c7\u00ca\7\64\2\2\u00c8"+
		"\u00ca\3\2\2\2\u00c9\u00b7\3\2\2\2\u00c9\u00b8\3\2\2\2\u00c9\u00ba\3\2"+
		"\2\2\u00c9\u00bd\3\2\2\2\u00c9\u00bf\3\2\2\2\u00c9\u00c2\3\2\2\2\u00c9"+
		"\u00c4\3\2\2\2\u00c9\u00c7\3\2\2\2\u00c9\u00c8\3\2\2\2\u00ca\25\3\2\2"+
		"\2\17\33\37DX\u0087\u0089\u0091\u0097\u00a2\u00a6\u00ad\u00b4\u00c9";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}