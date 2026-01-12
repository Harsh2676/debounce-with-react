# debounce-with-react

A lightweight, type-safe React hook for handling debounced values. This hook manages both the immediate state (for UI responsiveness) and the debounced state (for side effects like API calls), making it perfect for search inputs and other delay-sensitive interactions.

## Features

- 🚀 **Lightweight** - Zero dependencies, tiny bundle size.
- 🔒 **Type-Safe** - Written in TypeScript with full type checks.
- ⚛️ **React 18 Ready** - Compatible with the latest React features.
- 📦 **Built-in State** - Manages both immediate and debounced values for you.

## Installation

```bash
npm install debounce-with-react
# or
yarn add debounce-with-react
# or
pnpm add debounce-with-react
```

## Usage

### Basic Example (Search Input)

```tsx
import { useEffect } from "react";
import useDebounce from "debounce-with-react";

function SearchComponent() {
  // 1. debouncedQuery: Updates after the delay
  // 2. setQuery: Updates the immediate value instantly
  // 3. query: The current immediate value (for binding to inputs)
  const [debouncedQuery, setQuery, query] = useDebounce("", 500);

  // Perform search when the debounced value changes
  useEffect(() => {
    if (debouncedQuery) {
      console.log("Searching for:", debouncedQuery);
      // fetchResults(debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <p>Current Input: {query}</p>
      <p>Debounced Value: {debouncedQuery}</p>
    </div>
  );
}
```

## API Reference

### `useDebounce<T>(initialValue: T, delay?: number)`

#### Parameters

| Name           | Type     | Default | Description                                                   |
| -------------- | -------- | ------- | ------------------------------------------------------------- |
| `initialValue` | `T`      | -       | The initial state value. **Required**                         |
| `delay`        | `number` | `500`   | The delay in milliseconds before the debounced value updates. |

#### Returns

Returns an array `[debouncedValue, setValue, immediateValue]`:

1.  **`debouncedValue`** (`T`): The value that updates only after the specified delay has passed without new updates.
2.  **`setValue`** (`(value: T | ((prev: T) => T)) => void`): Function to update the state. usage is identical to standard `useState`.
3.  **`immediateValue`** (`T`): The current value that updates instantly. Use this for controlled components (e.g., input `value`).

## License

MIT
