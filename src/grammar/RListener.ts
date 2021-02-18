// Generated from R.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { LitContext } from "./RParser";
import { SymbolContext } from "./RParser";
import { CallContext } from "./RParser";
import { FunCallContext } from "./RParser";
import { FunctionContext } from "./RParser";
import { NamespaceContext } from "./RParser";
import { ComponentExtractionContext } from "./RParser";
import { SubsetContext } from "./RParser";
import { IndexingContext } from "./RParser";
import { AssignContext } from "./RParser";
import { ForContext } from "./RParser";
import { ProgContext } from "./RParser";
import { ExprContext } from "./RParser";
import { ExprlistContext } from "./RParser";
import { EoeContext } from "./RParser";
import { LiteralContext } from "./RParser";
import { NameContext } from "./RParser";
import { FormallistContext } from "./RParser";
import { FormalContext } from "./RParser";
import { ArglistContext } from "./RParser";
import { ArgContext } from "./RParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `RParser`.
 */
export interface RListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by the `Lit`
	 * labeled alternative in `RParser.expr`.
	 * @param ctx the parse tree
	 */
	enterLit?: (ctx: LitContext) => void;
	/**
	 * Exit a parse tree produced by the `Lit`
	 * labeled alternative in `RParser.expr`.
	 * @param ctx the parse tree
	 */
	exitLit?: (ctx: LitContext) => void;

	/**
	 * Enter a parse tree produced by the `Symbol`
	 * labeled alternative in `RParser.expr`.
	 * @param ctx the parse tree
	 */
	enterSymbol?: (ctx: SymbolContext) => void;
	/**
	 * Exit a parse tree produced by the `Symbol`
	 * labeled alternative in `RParser.expr`.
	 * @param ctx the parse tree
	 */
	exitSymbol?: (ctx: SymbolContext) => void;

	/**
	 * Enter a parse tree produced by the `Call`
	 * labeled alternative in `RParser.expr`.
	 * @param ctx the parse tree
	 */
	enterCall?: (ctx: CallContext) => void;
	/**
	 * Exit a parse tree produced by the `Call`
	 * labeled alternative in `RParser.expr`.
	 * @param ctx the parse tree
	 */
	exitCall?: (ctx: CallContext) => void;

	/**
	 * Enter a parse tree produced by the `FunCall`
	 * labeled alternative in `RParser.expr`.
	 * @param ctx the parse tree
	 */
	enterFunCall?: (ctx: FunCallContext) => void;
	/**
	 * Exit a parse tree produced by the `FunCall`
	 * labeled alternative in `RParser.expr`.
	 * @param ctx the parse tree
	 */
	exitFunCall?: (ctx: FunCallContext) => void;

	/**
	 * Enter a parse tree produced by the `Function`
	 * labeled alternative in `RParser.expr`.
	 * @param ctx the parse tree
	 */
	enterFunction?: (ctx: FunctionContext) => void;
	/**
	 * Exit a parse tree produced by the `Function`
	 * labeled alternative in `RParser.expr`.
	 * @param ctx the parse tree
	 */
	exitFunction?: (ctx: FunctionContext) => void;

	/**
	 * Enter a parse tree produced by the `Namespace`
	 * labeled alternative in `RParser.expr`.
	 * @param ctx the parse tree
	 */
	enterNamespace?: (ctx: NamespaceContext) => void;
	/**
	 * Exit a parse tree produced by the `Namespace`
	 * labeled alternative in `RParser.expr`.
	 * @param ctx the parse tree
	 */
	exitNamespace?: (ctx: NamespaceContext) => void;

	/**
	 * Enter a parse tree produced by the `ComponentExtraction`
	 * labeled alternative in `RParser.expr`.
	 * @param ctx the parse tree
	 */
	enterComponentExtraction?: (ctx: ComponentExtractionContext) => void;
	/**
	 * Exit a parse tree produced by the `ComponentExtraction`
	 * labeled alternative in `RParser.expr`.
	 * @param ctx the parse tree
	 */
	exitComponentExtraction?: (ctx: ComponentExtractionContext) => void;

	/**
	 * Enter a parse tree produced by the `Subset`
	 * labeled alternative in `RParser.expr`.
	 * @param ctx the parse tree
	 */
	enterSubset?: (ctx: SubsetContext) => void;
	/**
	 * Exit a parse tree produced by the `Subset`
	 * labeled alternative in `RParser.expr`.
	 * @param ctx the parse tree
	 */
	exitSubset?: (ctx: SubsetContext) => void;

	/**
	 * Enter a parse tree produced by the `Indexing`
	 * labeled alternative in `RParser.expr`.
	 * @param ctx the parse tree
	 */
	enterIndexing?: (ctx: IndexingContext) => void;
	/**
	 * Exit a parse tree produced by the `Indexing`
	 * labeled alternative in `RParser.expr`.
	 * @param ctx the parse tree
	 */
	exitIndexing?: (ctx: IndexingContext) => void;

	/**
	 * Enter a parse tree produced by the `Assign`
	 * labeled alternative in `RParser.expr`.
	 * @param ctx the parse tree
	 */
	enterAssign?: (ctx: AssignContext) => void;
	/**
	 * Exit a parse tree produced by the `Assign`
	 * labeled alternative in `RParser.expr`.
	 * @param ctx the parse tree
	 */
	exitAssign?: (ctx: AssignContext) => void;

	/**
	 * Enter a parse tree produced by the `For`
	 * labeled alternative in `RParser.expr`.
	 * @param ctx the parse tree
	 */
	enterFor?: (ctx: ForContext) => void;
	/**
	 * Exit a parse tree produced by the `For`
	 * labeled alternative in `RParser.expr`.
	 * @param ctx the parse tree
	 */
	exitFor?: (ctx: ForContext) => void;

	/**
	 * Enter a parse tree produced by `RParser.prog`.
	 * @param ctx the parse tree
	 */
	enterProg?: (ctx: ProgContext) => void;
	/**
	 * Exit a parse tree produced by `RParser.prog`.
	 * @param ctx the parse tree
	 */
	exitProg?: (ctx: ProgContext) => void;

	/**
	 * Enter a parse tree produced by `RParser.expr`.
	 * @param ctx the parse tree
	 */
	enterExpr?: (ctx: ExprContext) => void;
	/**
	 * Exit a parse tree produced by `RParser.expr`.
	 * @param ctx the parse tree
	 */
	exitExpr?: (ctx: ExprContext) => void;

	/**
	 * Enter a parse tree produced by `RParser.exprlist`.
	 * @param ctx the parse tree
	 */
	enterExprlist?: (ctx: ExprlistContext) => void;
	/**
	 * Exit a parse tree produced by `RParser.exprlist`.
	 * @param ctx the parse tree
	 */
	exitExprlist?: (ctx: ExprlistContext) => void;

	/**
	 * Enter a parse tree produced by `RParser.eoe`.
	 * @param ctx the parse tree
	 */
	enterEoe?: (ctx: EoeContext) => void;
	/**
	 * Exit a parse tree produced by `RParser.eoe`.
	 * @param ctx the parse tree
	 */
	exitEoe?: (ctx: EoeContext) => void;

	/**
	 * Enter a parse tree produced by `RParser.literal`.
	 * @param ctx the parse tree
	 */
	enterLiteral?: (ctx: LiteralContext) => void;
	/**
	 * Exit a parse tree produced by `RParser.literal`.
	 * @param ctx the parse tree
	 */
	exitLiteral?: (ctx: LiteralContext) => void;

	/**
	 * Enter a parse tree produced by `RParser.name`.
	 * @param ctx the parse tree
	 */
	enterName?: (ctx: NameContext) => void;
	/**
	 * Exit a parse tree produced by `RParser.name`.
	 * @param ctx the parse tree
	 */
	exitName?: (ctx: NameContext) => void;

	/**
	 * Enter a parse tree produced by `RParser.formallist`.
	 * @param ctx the parse tree
	 */
	enterFormallist?: (ctx: FormallistContext) => void;
	/**
	 * Exit a parse tree produced by `RParser.formallist`.
	 * @param ctx the parse tree
	 */
	exitFormallist?: (ctx: FormallistContext) => void;

	/**
	 * Enter a parse tree produced by `RParser.formal`.
	 * @param ctx the parse tree
	 */
	enterFormal?: (ctx: FormalContext) => void;
	/**
	 * Exit a parse tree produced by `RParser.formal`.
	 * @param ctx the parse tree
	 */
	exitFormal?: (ctx: FormalContext) => void;

	/**
	 * Enter a parse tree produced by `RParser.arglist`.
	 * @param ctx the parse tree
	 */
	enterArglist?: (ctx: ArglistContext) => void;
	/**
	 * Exit a parse tree produced by `RParser.arglist`.
	 * @param ctx the parse tree
	 */
	exitArglist?: (ctx: ArglistContext) => void;

	/**
	 * Enter a parse tree produced by `RParser.arg`.
	 * @param ctx the parse tree
	 */
	enterArg?: (ctx: ArgContext) => void;
	/**
	 * Exit a parse tree produced by `RParser.arg`.
	 * @param ctx the parse tree
	 */
	exitArg?: (ctx: ArgContext) => void;
}

