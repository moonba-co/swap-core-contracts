# Swap core contracts

This project deploy DEFI contracts based on Uniswap V2

### How to launch
Prerequisites: node.js v.11.4.0+ is required
1. Install dependencies:
```yarn```
2. Deploy factory and router contracts:
```
hh deploy --network frankenstein
```
3. (optionally) Add fee address for com swap (after this, mechanics will be 0.25% + 0.05% for feeTo):
```
hh run --network frankenstein src/setFeeTo.ts
```

In order to create a new project from this, MoonbaLibrary should be updated with init code hash.
It could be generated from this command:
```
hh run src/generateInitCode.ts
```