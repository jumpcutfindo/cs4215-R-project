// Generated from R.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

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
import { EoeContext } from "./RParser";
import { LiteralContext } from "./RParser";
import { NameContext } from "./RParser";
import { FormallistContext } from "./RParser";
import { FormalContext } from "./RParser";
import { ArglistContext } from "./RParser";
import { ArgContext } from "./RParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `RParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface RVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by the `Lit`
	 * labeled alternative in `RParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLit?: (ctx: LitContext) => Result;

	/**
	 * Visit a parse tree produced by the `Symbol`
	 * labeled alternative in `RParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSymbol?: (ctx: SymbolContext) => Result;

	/**
	 * Visit a parse tree produced by the `Call`
	 * labeled alternative in `RParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCall?: (ctx: CallContext) => Result;

	/**
	 * Visit a parse tree produced by the `FunCall`
	 * labeled alternative in `RParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunCall?: (ctx: FunCallContext) => Result;

	/**
	 * Visit a parse tree produced by the `Function`
	 * labeled alternative in `RParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction?: (ctx: FunctionContext) => Result;

	/**
	 * Visit a parse tree produced by the `Namespace`
	 * labeled alternative in `RParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNamespace?: (ctx: NamespaceContext) => Result;

	/**
	 * Visit a parse tree produced by the `ComponentExtraction`
	 * labeled alternative in `RParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComponentExtraction?: (ctx: ComponentExtractionContext) => Result;

	/**
	 * Visit a parse tree produced by the `Subset`
	 * labeled alternative in `RParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubset?: (ctx: SubsetContext) => Result;

	/**
	 * Visit a parse tree produced by the `Indexing`
	 * labeled alternative in `RParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndexing?: (ctx: IndexingContext) => Result;

	/**
	 * Visit a parse tree produced by the `Assign`
	 * labeled alternative in `RParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssign?: (ctx: AssignContext) => Result;

	/**
	 * Visit a parse tree produced by the `For`
	 * labeled alternative in `RParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFor?: (ctx: ForContext) => Result;

	/**
	 * Visit a parse tree produced by `RParser.prog`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProg?: (ctx: ProgContext) => Result;

	/**
	 * Visit a parse tree produced by `RParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr?: (ctx: ExprContext) => Result;

	/**
	 * Visit a parse tree produced by `RParser.eoe`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEoe?: (ctx: EoeContext) => Result;

	/**
	 * Visit a parse tree produced by `RParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLiteral?: (ctx: LiteralContext) => Result;

	/**
	 * Visit a parse tree produced by `RParser.name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitName?: (ctx: NameContext) => Result;

	/**
	 * Visit a parse tree produced by `RParser.formallist`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFormallist?: (ctx: FormallistContext) => Result;

	/**
	 * Visit a parse tree produced by `RParser.formal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFormal?: (ctx: FormalContext) => Result;

	/**
	 * Visit a parse tree produced by `RParser.arglist`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArglist?: (ctx: ArglistContext) => Result;

	/**
	 * Visit a parse tree produced by `RParser.arg`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArg?: (ctx: ArgContext) => Result;
}

