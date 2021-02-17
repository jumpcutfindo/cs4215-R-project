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
		NA=46, BOOL=47, DOTS=48, HEX=49, INT=50, FLOAT=51, STRING=52, ID=53, USER_OP=54, 
		COMMENT=55, NL=56, WS=57;
	public static final int
		RULE_prog = 0, RULE_expr = 1, RULE_exprlist = 2, RULE_eoe = 3, RULE_literal = 4, 
		RULE_formallist = 5, RULE_formal = 6, RULE_arglist = 7, RULE_arg = 8;
	private static String[] makeRuleNames() {
		return new String[] {
			"prog", "expr", "exprlist", "eoe", "literal", "formallist", "formal", 
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
			"'}'", "'NULL'", "'NA'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, "LBRACE", "RBRACE", "NULL", 
			"NA", "BOOL", "DOTS", "HEX", "INT", "FLOAT", "STRING", "ID", "USER_OP", 
			"COMMENT", "NL", "WS"
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
		public TerminalNode EOF() { return getToken(RParser.EOF, 0); }
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
			setState(23);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__0) | (1L << T__2) | (1L << T__10) | (1L << T__11) | (1L << T__21) | (1L << T__30) | (1L << T__32) | (1L << T__34) | (1L << T__35) | (1L << T__36) | (1L << T__37) | (1L << LBRACE) | (1L << NULL) | (1L << NA) | (1L << BOOL) | (1L << INT) | (1L << FLOAT) | (1L << STRING) | (1L << ID))) != 0)) {
				{
				{
				setState(18);
				expr(0);
				setState(19);
				eoe();
				}
				}
				setState(25);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(26);
			match(EOF);
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
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode USER_OP() { return getToken(RParser.USER_OP, 0); }
		public ArglistContext arglist() {
			return getRuleContext(ArglistContext.class,0);
		}
		public CallContext(ExprContext ctx) { copyFrom(ctx); }
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
	public static class BraceContext extends ExprContext {
		public TerminalNode LBRACE() { return getToken(RParser.LBRACE, 0); }
		public ExprlistContext exprlist() {
			return getRuleContext(ExprlistContext.class,0);
		}
		public TerminalNode RBRACE() { return getToken(RParser.RBRACE, 0); }
		public BraceContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class SymbolContext extends ExprContext {
		public TerminalNode ID() { return getToken(RParser.ID, 0); }
		public SymbolContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class ParensContext extends ExprContext {
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public ParensContext(ExprContext ctx) { copyFrom(ctx); }
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
	public static class BreakContext extends ExprContext {
		public BreakContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class RepeatContext extends ExprContext {
		public ExprContext body;
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public RepeatContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class WhileContext extends ExprContext {
		public ExprContext cond;
		public ExprContext body;
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public WhileContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class NamespaceContext extends ExprContext {
		public List<TerminalNode> ID() { return getTokens(RParser.ID); }
		public TerminalNode ID(int i) {
			return getToken(RParser.ID, i);
		}
		public List<TerminalNode> STRING() { return getTokens(RParser.STRING); }
		public TerminalNode STRING(int i) {
			return getToken(RParser.STRING, i);
		}
		public NamespaceContext(ExprContext ctx) { copyFrom(ctx); }
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
	public static class LitContext extends ExprContext {
		public LiteralContext literal() {
			return getRuleContext(LiteralContext.class,0);
		}
		public LitContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class ComponentExtractionContext extends ExprContext {
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public TerminalNode ID() { return getToken(RParser.ID, 0); }
		public TerminalNode STRING() { return getToken(RParser.STRING, 0); }
		public ComponentExtractionContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class NextContext extends ExprContext {
		public NextContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class AssignContext extends ExprContext {
		public ExprContext val;
		public Token sym;
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public TerminalNode ID() { return getToken(RParser.ID, 0); }
		public TerminalNode STRING() { return getToken(RParser.STRING, 0); }
		public AssignContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class IfContext extends ExprContext {
		public ExprContext cond;
		public ExprContext conseq;
		public ExprContext alt;
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public IfContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class SeqContext extends ExprContext {
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public SeqContext(ExprContext ctx) { copyFrom(ctx); }
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
			setState(82);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,2,_ctx) ) {
			case 1:
				{
				_localctx = new LitContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;

				setState(29);
				literal();
				}
				break;
			case 2:
				{
				_localctx = new SymbolContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(30);
				match(ID);
				}
				break;
			case 3:
				{
				_localctx = new ParensContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(31);
				match(T__0);
				setState(32);
				expr(0);
				setState(33);
				match(T__1);
				}
				break;
			case 4:
				{
				_localctx = new FunctionContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(35);
				match(T__2);
				setState(36);
				match(T__0);
				setState(37);
				formallist();
				setState(38);
				match(T__1);
				setState(39);
				expr(24);
				}
				break;
			case 5:
				{
				_localctx = new BraceContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(41);
				match(LBRACE);
				setState(42);
				exprlist();
				setState(43);
				match(RBRACE);
				}
				break;
			case 6:
				{
				_localctx = new NamespaceContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(45);
				_la = _input.LA(1);
				if ( !(_la==STRING || _la==ID) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				setState(46);
				match(T__3);
				setState(47);
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
				break;
			case 7:
				{
				_localctx = new CallContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(48);
				_la = _input.LA(1);
				if ( !(_la==T__10 || _la==T__11) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				setState(49);
				expr(17);
				}
				break;
			case 8:
				{
				_localctx = new CallContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(50);
				match(T__21);
				setState(51);
				expr(11);
				}
				break;
			case 9:
				{
				_localctx = new AssignContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(52);
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
				setState(53);
				_la = _input.LA(1);
				if ( !(_la==T__28 || _la==T__29) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				setState(54);
				((AssignContext)_localctx).val = expr(7);
				}
				break;
			case 10:
				{
				_localctx = new IfContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(55);
				match(T__30);
				setState(56);
				match(T__0);
				setState(57);
				((IfContext)_localctx).cond = expr(0);
				setState(58);
				match(T__1);
				setState(59);
				((IfContext)_localctx).conseq = expr(0);
				setState(62);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,1,_ctx) ) {
				case 1:
					{
					setState(60);
					match(T__31);
					setState(61);
					((IfContext)_localctx).alt = expr(0);
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
				setState(64);
				match(T__32);
				setState(65);
				match(T__0);
				setState(66);
				match(ID);
				setState(67);
				match(T__33);
				setState(68);
				((ForContext)_localctx).seq = expr(0);
				setState(69);
				match(T__1);
				setState(70);
				((ForContext)_localctx).body = expr(5);
				}
				break;
			case 12:
				{
				_localctx = new WhileContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(72);
				match(T__34);
				setState(73);
				match(T__0);
				setState(74);
				((WhileContext)_localctx).cond = expr(0);
				setState(75);
				match(T__1);
				setState(76);
				((WhileContext)_localctx).body = expr(4);
				}
				break;
			case 13:
				{
				_localctx = new RepeatContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(78);
				match(T__35);
				setState(79);
				((RepeatContext)_localctx).body = expr(3);
				}
				break;
			case 14:
				{
				_localctx = new BreakContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(80);
				match(T__36);
				}
				break;
			case 15:
				{
				_localctx = new NextContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(81);
				match(T__37);
				}
				break;
			}
			_ctx.stop = _input.LT(-1);
			setState(131);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,4,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					setState(129);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,3,_ctx) ) {
					case 1:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(84);
						if (!(precpred(_ctx, 18))) throw new FailedPredicateException(this, "precpred(_ctx, 18)");
						setState(85);
						match(T__9);
						setState(86);
						expr(18);
						}
						break;
					case 2:
						{
						_localctx = new SeqContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(87);
						if (!(precpred(_ctx, 16))) throw new FailedPredicateException(this, "precpred(_ctx, 16)");
						setState(88);
						match(T__12);
						setState(89);
						expr(17);
						}
						break;
					case 3:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(90);
						if (!(precpred(_ctx, 15))) throw new FailedPredicateException(this, "precpred(_ctx, 15)");
						setState(91);
						match(USER_OP);
						setState(92);
						expr(16);
						}
						break;
					case 4:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(93);
						if (!(precpred(_ctx, 14))) throw new FailedPredicateException(this, "precpred(_ctx, 14)");
						setState(94);
						_la = _input.LA(1);
						if ( !(_la==T__13 || _la==T__14) ) {
						_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(95);
						expr(15);
						}
						break;
					case 5:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(96);
						if (!(precpred(_ctx, 13))) throw new FailedPredicateException(this, "precpred(_ctx, 13)");
						setState(97);
						_la = _input.LA(1);
						if ( !(_la==T__10 || _la==T__11) ) {
						_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(98);
						expr(14);
						}
						break;
					case 6:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(99);
						if (!(precpred(_ctx, 12))) throw new FailedPredicateException(this, "precpred(_ctx, 12)");
						setState(100);
						_la = _input.LA(1);
						if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__15) | (1L << T__16) | (1L << T__17) | (1L << T__18) | (1L << T__19) | (1L << T__20))) != 0)) ) {
						_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(101);
						expr(13);
						}
						break;
					case 7:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(102);
						if (!(precpred(_ctx, 10))) throw new FailedPredicateException(this, "precpred(_ctx, 10)");
						setState(103);
						_la = _input.LA(1);
						if ( !(_la==T__22 || _la==T__23) ) {
						_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(104);
						expr(11);
						}
						break;
					case 8:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(105);
						if (!(precpred(_ctx, 9))) throw new FailedPredicateException(this, "precpred(_ctx, 9)");
						setState(106);
						_la = _input.LA(1);
						if ( !(_la==T__24 || _la==T__25) ) {
						_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(107);
						expr(10);
						}
						break;
					case 9:
						{
						_localctx = new CallContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(108);
						if (!(precpred(_ctx, 25))) throw new FailedPredicateException(this, "precpred(_ctx, 25)");
						setState(109);
						match(T__0);
						setState(110);
						arglist();
						setState(111);
						match(T__1);
						}
						break;
					case 10:
						{
						_localctx = new ComponentExtractionContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(113);
						if (!(precpred(_ctx, 21))) throw new FailedPredicateException(this, "precpred(_ctx, 21)");
						setState(114);
						match(T__4);
						setState(115);
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
						break;
					case 11:
						{
						_localctx = new SubsetContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(116);
						if (!(precpred(_ctx, 20))) throw new FailedPredicateException(this, "precpred(_ctx, 20)");
						setState(117);
						match(T__5);
						setState(118);
						arglist();
						setState(119);
						match(T__6);
						}
						break;
					case 12:
						{
						_localctx = new IndexingContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(121);
						if (!(precpred(_ctx, 19))) throw new FailedPredicateException(this, "precpred(_ctx, 19)");
						setState(122);
						match(T__7);
						setState(123);
						arglist();
						setState(124);
						match(T__8);
						}
						break;
					case 13:
						{
						_localctx = new AssignContext(new ExprContext(_parentctx, _parentState));
						((AssignContext)_localctx).val = _prevctx;
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(126);
						if (!(precpred(_ctx, 8))) throw new FailedPredicateException(this, "precpred(_ctx, 8)");
						setState(127);
						_la = _input.LA(1);
						if ( !(_la==T__26 || _la==T__27) ) {
						_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(128);
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
				setState(133);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,4,_ctx);
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
			setState(139);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__0) | (1L << T__2) | (1L << T__10) | (1L << T__11) | (1L << T__21) | (1L << T__30) | (1L << T__32) | (1L << T__34) | (1L << T__35) | (1L << T__36) | (1L << T__37) | (1L << LBRACE) | (1L << NULL) | (1L << NA) | (1L << BOOL) | (1L << INT) | (1L << FLOAT) | (1L << STRING) | (1L << ID))) != 0)) {
				{
				{
				setState(134);
				expr(0);
				setState(135);
				eoe();
				}
				}
				setState(141);
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
			setState(145);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,6,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(142);
				match(T__38);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(143);
				if (!(this.lineTerminatorAhead())) throw new FailedPredicateException(this, "this.lineTerminatorAhead()");
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(144);
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
		public TerminalNode STRING() { return getToken(RParser.STRING, 0); }
		public TerminalNode NULL() { return getToken(RParser.NULL, 0); }
		public TerminalNode NA() { return getToken(RParser.NA, 0); }
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
			setState(147);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << NULL) | (1L << NA) | (1L << BOOL) | (1L << INT) | (1L << FLOAT) | (1L << STRING))) != 0)) ) {
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
		enterRule(_localctx, 10, RULE_formallist);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(149);
			formal();
			setState(154);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==T__39) {
				{
				{
				setState(150);
				match(T__39);
				setState(151);
				formal();
				}
				}
				setState(156);
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
		enterRule(_localctx, 12, RULE_formal);
		try {
			setState(162);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,8,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(157);
				match(ID);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(158);
				match(ID);
				setState(159);
				match(T__40);
				setState(160);
				expr(0);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(161);
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
		enterRule(_localctx, 14, RULE_arglist);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(164);
			arg();
			setState(169);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==T__39) {
				{
				{
				setState(165);
				match(T__39);
				setState(166);
				arg();
				}
				}
				setState(171);
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
		enterRule(_localctx, 16, RULE_arg);
		try {
			setState(190);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,10,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(172);
				expr(0);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(173);
				match(ID);
				setState(174);
				match(T__40);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(175);
				match(ID);
				setState(176);
				match(T__40);
				setState(177);
				expr(0);
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(178);
				match(STRING);
				setState(179);
				match(T__40);
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(180);
				match(STRING);
				setState(181);
				match(T__40);
				setState(182);
				expr(0);
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(183);
				match(NULL);
				setState(184);
				match(T__40);
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(185);
				match(NULL);
				setState(186);
				match(T__40);
				setState(187);
				expr(0);
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(188);
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
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\3;\u00c3\4\2\t\2\4"+
		"\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\3\2\3\2"+
		"\3\2\7\2\30\n\2\f\2\16\2\33\13\2\3\2\3\2\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3"+
		"\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3"+
		"\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\5\3A\n\3\3\3\3\3\3\3\3\3\3\3\3\3"+
		"\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\5\3U\n\3\3\3\3\3\3\3"+
		"\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3"+
		"\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3"+
		"\3\3\3\3\3\3\3\3\3\3\3\3\3\3\7\3\u0084\n\3\f\3\16\3\u0087\13\3\3\4\3\4"+
		"\3\4\7\4\u008c\n\4\f\4\16\4\u008f\13\4\3\5\3\5\3\5\5\5\u0094\n\5\3\6\3"+
		"\6\3\7\3\7\3\7\7\7\u009b\n\7\f\7\16\7\u009e\13\7\3\b\3\b\3\b\3\b\3\b\5"+
		"\b\u00a5\n\b\3\t\3\t\3\t\7\t\u00aa\n\t\f\t\16\t\u00ad\13\t\3\n\3\n\3\n"+
		"\3\n\3\n\3\n\3\n\3\n\3\n\3\n\3\n\3\n\3\n\3\n\3\n\3\n\3\n\3\n\5\n\u00c1"+
		"\n\n\3\n\2\3\4\13\2\4\6\b\n\f\16\20\22\2\13\3\2\66\67\3\2\r\16\3\2\37"+
		" \3\2\20\21\3\2\22\27\3\2\31\32\3\2\33\34\3\2\35\36\4\2/\61\64\66\2\u00e5"+
		"\2\31\3\2\2\2\4T\3\2\2\2\6\u008d\3\2\2\2\b\u0093\3\2\2\2\n\u0095\3\2\2"+
		"\2\f\u0097\3\2\2\2\16\u00a4\3\2\2\2\20\u00a6\3\2\2\2\22\u00c0\3\2\2\2"+
		"\24\25\5\4\3\2\25\26\5\b\5\2\26\30\3\2\2\2\27\24\3\2\2\2\30\33\3\2\2\2"+
		"\31\27\3\2\2\2\31\32\3\2\2\2\32\34\3\2\2\2\33\31\3\2\2\2\34\35\7\2\2\3"+
		"\35\3\3\2\2\2\36\37\b\3\1\2\37U\5\n\6\2 U\7\67\2\2!\"\7\3\2\2\"#\5\4\3"+
		"\2#$\7\4\2\2$U\3\2\2\2%&\7\5\2\2&\'\7\3\2\2\'(\5\f\7\2()\7\4\2\2)*\5\4"+
		"\3\32*U\3\2\2\2+,\7-\2\2,-\5\6\4\2-.\7.\2\2.U\3\2\2\2/\60\t\2\2\2\60\61"+
		"\7\6\2\2\61U\t\2\2\2\62\63\t\3\2\2\63U\5\4\3\23\64\65\7\30\2\2\65U\5\4"+
		"\3\r\66\67\t\2\2\2\678\t\4\2\28U\5\4\3\t9:\7!\2\2:;\7\3\2\2;<\5\4\3\2"+
		"<=\7\4\2\2=@\5\4\3\2>?\7\"\2\2?A\5\4\3\2@>\3\2\2\2@A\3\2\2\2AU\3\2\2\2"+
		"BC\7#\2\2CD\7\3\2\2DE\7\67\2\2EF\7$\2\2FG\5\4\3\2GH\7\4\2\2HI\5\4\3\7"+
		"IU\3\2\2\2JK\7%\2\2KL\7\3\2\2LM\5\4\3\2MN\7\4\2\2NO\5\4\3\6OU\3\2\2\2"+
		"PQ\7&\2\2QU\5\4\3\5RU\7\'\2\2SU\7(\2\2T\36\3\2\2\2T \3\2\2\2T!\3\2\2\2"+
		"T%\3\2\2\2T+\3\2\2\2T/\3\2\2\2T\62\3\2\2\2T\64\3\2\2\2T\66\3\2\2\2T9\3"+
		"\2\2\2TB\3\2\2\2TJ\3\2\2\2TP\3\2\2\2TR\3\2\2\2TS\3\2\2\2U\u0085\3\2\2"+
		"\2VW\f\24\2\2WX\7\f\2\2X\u0084\5\4\3\24YZ\f\22\2\2Z[\7\17\2\2[\u0084\5"+
		"\4\3\23\\]\f\21\2\2]^\78\2\2^\u0084\5\4\3\22_`\f\20\2\2`a\t\5\2\2a\u0084"+
		"\5\4\3\21bc\f\17\2\2cd\t\3\2\2d\u0084\5\4\3\20ef\f\16\2\2fg\t\6\2\2g\u0084"+
		"\5\4\3\17hi\f\f\2\2ij\t\7\2\2j\u0084\5\4\3\rkl\f\13\2\2lm\t\b\2\2m\u0084"+
		"\5\4\3\fno\f\33\2\2op\7\3\2\2pq\5\20\t\2qr\7\4\2\2r\u0084\3\2\2\2st\f"+
		"\27\2\2tu\7\7\2\2u\u0084\t\2\2\2vw\f\26\2\2wx\7\b\2\2xy\5\20\t\2yz\7\t"+
		"\2\2z\u0084\3\2\2\2{|\f\25\2\2|}\7\n\2\2}~\5\20\t\2~\177\7\13\2\2\177"+
		"\u0084\3\2\2\2\u0080\u0081\f\n\2\2\u0081\u0082\t\t\2\2\u0082\u0084\t\2"+
		"\2\2\u0083V\3\2\2\2\u0083Y\3\2\2\2\u0083\\\3\2\2\2\u0083_\3\2\2\2\u0083"+
		"b\3\2\2\2\u0083e\3\2\2\2\u0083h\3\2\2\2\u0083k\3\2\2\2\u0083n\3\2\2\2"+
		"\u0083s\3\2\2\2\u0083v\3\2\2\2\u0083{\3\2\2\2\u0083\u0080\3\2\2\2\u0084"+
		"\u0087\3\2\2\2\u0085\u0083\3\2\2\2\u0085\u0086\3\2\2\2\u0086\5\3\2\2\2"+
		"\u0087\u0085\3\2\2\2\u0088\u0089\5\4\3\2\u0089\u008a\5\b\5\2\u008a\u008c"+
		"\3\2\2\2\u008b\u0088\3\2\2\2\u008c\u008f\3\2\2\2\u008d\u008b\3\2\2\2\u008d"+
		"\u008e\3\2\2\2\u008e\7\3\2\2\2\u008f\u008d\3\2\2\2\u0090\u0094\7)\2\2"+
		"\u0091\u0094\6\5\17\2\u0092\u0094\6\5\20\2\u0093\u0090\3\2\2\2\u0093\u0091"+
		"\3\2\2\2\u0093\u0092\3\2\2\2\u0094\t\3\2\2\2\u0095\u0096\t\n\2\2\u0096"+
		"\13\3\2\2\2\u0097\u009c\5\16\b\2\u0098\u0099\7*\2\2\u0099\u009b\5\16\b"+
		"\2\u009a\u0098\3\2\2\2\u009b\u009e\3\2\2\2\u009c\u009a\3\2\2\2\u009c\u009d"+
		"\3\2\2\2\u009d\r\3\2\2\2\u009e\u009c\3\2\2\2\u009f\u00a5\7\67\2\2\u00a0"+
		"\u00a1\7\67\2\2\u00a1\u00a2\7+\2\2\u00a2\u00a5\5\4\3\2\u00a3\u00a5\7,"+
		"\2\2\u00a4\u009f\3\2\2\2\u00a4\u00a0\3\2\2\2\u00a4\u00a3\3\2\2\2\u00a5"+
		"\17\3\2\2\2\u00a6\u00ab\5\22\n\2\u00a7\u00a8\7*\2\2\u00a8\u00aa\5\22\n"+
		"\2\u00a9\u00a7\3\2\2\2\u00aa\u00ad\3\2\2\2\u00ab\u00a9\3\2\2\2\u00ab\u00ac"+
		"\3\2\2\2\u00ac\21\3\2\2\2\u00ad\u00ab\3\2\2\2\u00ae\u00c1\5\4\3\2\u00af"+
		"\u00b0\7\67\2\2\u00b0\u00c1\7+\2\2\u00b1\u00b2\7\67\2\2\u00b2\u00b3\7"+
		"+\2\2\u00b3\u00c1\5\4\3\2\u00b4\u00b5\7\66\2\2\u00b5\u00c1\7+\2\2\u00b6"+
		"\u00b7\7\66\2\2\u00b7\u00b8\7+\2\2\u00b8\u00c1\5\4\3\2\u00b9\u00ba\7/"+
		"\2\2\u00ba\u00c1\7+\2\2\u00bb\u00bc\7/\2\2\u00bc\u00bd\7+\2\2\u00bd\u00c1"+
		"\5\4\3\2\u00be\u00c1\7\62\2\2\u00bf\u00c1\3\2\2\2\u00c0\u00ae\3\2\2\2"+
		"\u00c0\u00af\3\2\2\2\u00c0\u00b1\3\2\2\2\u00c0\u00b4\3\2\2\2\u00c0\u00b6"+
		"\3\2\2\2\u00c0\u00b9\3\2\2\2\u00c0\u00bb\3\2\2\2\u00c0\u00be\3\2\2\2\u00c0"+
		"\u00bf\3\2\2\2\u00c1\23\3\2\2\2\r\31@T\u0083\u0085\u008d\u0093\u009c\u00a4"+
		"\u00ab\u00c0";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}