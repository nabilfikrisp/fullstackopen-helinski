# TypeGraphQL Common Issues

## Issue 1: NoExplicitTypeError with tsx

**Problem:**  
Even though `emitDecoratorMetadata` is enabled in `tsconfig.json`, you get `NoExplicitTypeError` when using TypeGraphQL with `@ArgsType()` or `@InputType()`.

**Approach:**  
This happens because `tsx` does **not support `emitDecoratorMetadata`**.  
Use `ts-node` or `ts-node-dev` instead, which fully support decorators and metadata.

**Learn:**  
`emitDecoratorMetadata` only works if the runtime reads the metadata.  
Tools like `tsx` ignore it, so TypeGraphQL cannot infer argument types, resulting in `NoExplicitTypeError`.

---

## Issue 2:

**Problem:**  
When running `ts-node --esm` or using `"type": "module"` in `package.json`, importing local TypeScript modules without the `.js` extension causes `ERR_MODULE_NOT_FOUND`, even though the files exist.

**Approach:**  
This occurs because Node ESM **requires file extensions** for local imports. In ESM mode, it does not automatically resolve `.ts` files. To fix this, either:

1. Add `.js` to local imports (e.g., `import { HelloResolver } from "./resolvers/hello.resolver.js";`) when using ESM.
2. Switch to CommonJS modules (`"module": "commonjs"` in `tsconfig.json`) and remove `--esm` / `"type": "module"`. Then `import { HelloResolver } from "./resolvers/hello.resolver";` works normally.

**Learn:**  
Node’s ESM loader strictly follows the spec and does not infer extensions. Using CommonJS simplifies development with `ts-node` and TypeGraphQL because imports resolve automatically, and decorators (`emitDecoratorMetadata`) work without extra runtime flags.
