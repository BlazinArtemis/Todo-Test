# Test Plan for Todo.vue Component

## Overview

This test plan outlines the testing strategy for the Todo.vue component, a simple todo list application built with Vue.js. The app enables users to add todos, delete them, and filter them based on length.

## Test Types and Priorities

1. **Unit Tests** (High Priority)
   - Test individual methods (`addTodo`, `deleteTodo`) and computed properties (`filteredTodos`) in isolation.
   - Ensure core logic functions correctly without dependencies.

2. **Integration Tests** (Medium Priority)
   - Validate interactions with other components (e.g., router, Login.vue) if applicable.
   - Confirm proper event handling and data flow.

3. **E2E Tests** (High Priority)
   - Verify the full user flow: login, todo management, filtering, and logout.
   - Ensure the application behaves as expected end-to-end.


## Test Cases

### Test Case 1: Add a Valid Todo
- **Description**: Ensure a user can add a todo with valid input.
- **Preconditions**: User is logged in and on the todo page.
- **Steps to Reproduce**:
  1. Type "Buy groceries" into the input field.
  2. Press Enter.
- **Expected Result**: "Buy groceries" appears in the list; input field clears.

### Test Case 2: Attempt to Add an Empty Todo
- **Description**: Verify that an empty todo is rejected with an error.
- **Preconditions**: User is logged in and on the todo page.
- **Steps to Reproduce**:
  1. Leave the input field empty.
  2. Press Enter.
- **Expected Result**: Error message "Todo cannot be empty" appears; no todo is added.

### Test Case 3: Delete a Todo
- **Description**: Confirm a user can delete a todo.
- **Preconditions**: User is logged in, on the todo page, with at least one todo ("Buy groceries").
- **Steps to Reproduce**:
  1. Click "Delete" next to "Buy groceries".
- **Expected Result**: "Buy groceries" is removed from the list.

### Test Case 4: Filter Todos by Length (Short)
- **Description**: Check that todos ≤ 10 characters are filtered correctly.
- **Preconditions**: User is logged in, 
- **Steps to Reproduce**:
  1. Create a Todo (Just do it).
  2. Create a Todo  ( Do something new).
  3. Select "Short (≤ 10 chars)" from the filter dropdown.
- **Expected Result**: Only "Short" is displayed.

### Test Case 5: Filter Updates After Adding a Todo
- **Description**: Ensure the filter is still active when a new todo is added.
- **Preconditions**: User is logged in, filter set to "Short (≤ 10 chars)".
- **Steps to Reproduce**:
  1. Type "New task" (8 chars) into the input field.
  2. Press Enter.
  2. Type "New task added" (8 chars) into the input field.
  2. Press Enter.
- **Expected Result**: "New task" appears and "New task added" does not show cause filter is on "Short".