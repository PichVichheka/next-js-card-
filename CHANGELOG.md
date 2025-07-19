# Project Changelog

This document outlines the recent changes made to the application to improve user authentication flow and enhance user experience.

## 1. User Registration and Redirection

### Change

- Upon successful registration, users are now automatically redirected to their profile page.

### Implementation

- In [`src/app/register/page.tsx`](src/app/register/page.tsx), the `onSuccess` callback of the `useMutation` hook for registration now uses `router.push('/profile')` to navigate the user to their profile page immediately after the access and refresh tokens are set.

## 2. Enhanced Logout Functionality

### Change

- The logout process has been updated to ensure a complete session termination, allowing users to log in with different accounts without conflicts.

### Implementation

#### a. Logout API Endpoint

- A new `AUTH_LOGOUT` function was added to [`src/lib/api/auth-api.ts`](src/lib/api/auth-api.ts). This function sends a `POST` request to the `/auth/logout` endpoint with the `refreshToken` to invalidate the session on the server-side.

#### b. Zustand Store Update

- The `useAuthStore` in [`src/app/store/auth-store.ts`](src/app/store/auth-store.ts) was updated to include a `clearTokens` function. This function removes the `accessToken` and `refreshToken` from both the cookies and the Zustand state.
- The `accessToken` and `refreshToken` types in the `AuthStore` interface were updated to allow `null` values to handle the logged-out state correctly.

#### c. Profile Page Logout Handler

- The `handleLogout` function in [`src/app/profile/page.tsx`](src/app/profile/page.tsx) is now an `async` function.
- It calls the new `AUTH_LOGOUT` function to terminate the session on the server.
- It then calls `clearTokens` from the `useAuthStore` to clear client-side session data.
- Finally, it redirects the user to the `/login` page and clears the React Query cache.

## 3. Improved User Experience for Card Management

### Change

- Added success and error notifications for creating and updating cards.
- Added "Cancel" buttons to the "Create Card" and "Edit Card" modals.

### Implementation

- In [`src/app/profile/page.tsx`](src/app/profile/page.tsx):
  - The `createCardMutation` and `updateCardMutation` now have `onSuccess` and `onError` handlers that use `toast` to display appropriate messages to the user.
  - `queryClient.invalidateQueries({ queryKey: ["me"] })` is called on success to refetch user data and display the new/updated card.
  - "Cancel" buttons were added to the modals to allow users to close them without making changes. The `onClick` handlers for these buttons update the component's state to hide the modals.
