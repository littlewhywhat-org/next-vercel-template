# Invariants

- A todo belongs to one user (`user_id = auth.uid()`).
- Anonymous sign-in creates that user in this browser. Clearing site data is a new user.
- Completing a todo sets `done_at`. It is not deleted.
- No scores, streaks, or accounts UI.
