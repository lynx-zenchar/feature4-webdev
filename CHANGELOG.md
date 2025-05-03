# Changelog

## [0.4.0] - 2025-05-03

### Added

- Added **discrete priorities** per task and sort them by priority (high, medium, low, discard)
- Ensured **task ownership** (only tasks owned by current user is shown)
- Implemented **task sharing**/”multiplayer tasks” by valid email using LiveQuery
- Added **descriptive tags** property to task items
- Implemented a **filter** for task items based on **tag** categories
- Added ability to **publish with Netlify**:
  - **[https://681046262747f15833114e30--quiet-seahorse-ccbd95.netlify.app](https://681046262747f15833114e30--quiet-seahorse-ccbd95.netlify.app)**

### Changed

- **TaskModel** (`src/models/TaskModel.js`):

  - Switched to a `sharedWithRaw` string field instead of pointer relations to `_User`.
  - Enforced owner-only queries in `getAll()`, `update()`, and `delete()` to restore task exclusivity.
- **App.jsx**:

  - `addTask` and `editTask` handlers updated to pass and persist `sharedWithRaw`.
  - Removed direct `_User.email` lookups from the client.
  - Rolls sharing logic into cloud function calls.
- **AllTasksView.jsx**:

  - Restored full date/date-range inputs, tags, and share inputs in both add and edit modes.
  - Integrated `async/try–catch` around form submissions to surface errors.
  - Populates and resets a new `shareEmail` (and `editShareEmail`) state.
  - Includes this field in the payload to `addTask`/`editTask`.

### Fixed

- Resolved Back4App protected-field errors by eliminating client-side `_User` queries.
- Ensured that ACL changes happen under the master key (via Cloud Function), so shared users actually see the task in their list.

### Future Work

- Fully implement LiveQuery implementation of task CRUD with mutually exclusive user ownership on top of task sharing.
- Have Netlify host the version of Feature 6 with authentication.
- UI: Show with whom tasks are shared with (and who shared it)

---

## [0.3.0] - 2025-04-01

### Added

- Authentication features including login, register, and protected routes.
- ProtectedRoute component to secure routes that require authentication.
- Logout functionality in the Navbar.

### Changed

- Updated routing to redirect unauthorized users to the auth pages.
- Separated authentication methods into AuthService.

### Future Work

- Fix and integrate task creation functionality.

## [0.2.0] - 2025-03-07

### Added

- Added editing and deletion functionality for tasks.
- Updated navbar to use React Router navigation.
- Component tree and UML diagrams.
- Added Parse initialization with Back4App as remote database.
- Added separate Parse Model for each class.

### Changed

- Improved code comments and documentation.
- Updated build configuration using Vite.

### Fixed

- Fixed issue where views did not render due to missing props.
