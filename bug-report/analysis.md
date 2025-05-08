# Bug Analysis: Duplicate Todo Items

## Steps to Reproduce
1. Log in and navigate to the todo page.
2. Rapidly type "Buy groceries" and press Enter multiple times within one second.
3. Observe multiple "Buy groceries" entries in the list.
4. Click "Delete" on one entry.
5. Note that all "Buy groceries" entries from that second disappear.

## Root Cause Hypothesis
The `addTodo` method assigns IDs using:
```javascript
id: Math.floor(Date.now() / 1000)
```
This uses seconds, so todos added in the same second  the same ID. The `deleteTodo` method removes all todos using the ID, causing multiple deletions.

## Prevention of Regression
1. **Unique IDs**: Use `Date.now()` (milliseconds) or an incrementing counter.
2. **Unit Test**: Verify unique IDs for rapid additions.
3. **E2E/ Regression Test**: Confirm deleting one todo affects only that item.