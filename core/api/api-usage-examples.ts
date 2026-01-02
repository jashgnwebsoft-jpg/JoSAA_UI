// API Usage Examples - Demonstrates both error handling patterns

import { ApiClient } from './ApiClient';
import { ApiError, ApiResponse } from './types';

// Example types
interface User {
  id: number;
  name: string;
  email: string;
}

// Initialize client
const client = new ApiClient('https://api.example.com');

// =============================================================================
// PATTERN 1: Traditional Exception Handling (Default Behavior)
// =============================================================================

async function traditionalErrorHandling() {
  try {
    // GET request - throws on error
    const usersResponse = await client.get<User[]>('/users');
    console.log('Users:', usersResponse.data);

    // POST request - throws on error
    const newUserResponse = await client.post<User>('/users', {
      name: 'John Doe',
      email: 'john@example.com',
    });
    console.log('New user created:', newUserResponse.data);

    // PUT request with explicit throwErrors: true
    const updatedUserResponse = await client.put<User>(
      '/users/1',
      { name: 'Jane Doe', email: 'jane@example.com' },
      { throwErrors: true }
    );
    console.log('User updated:', updatedUserResponse.data);
  } catch (error) {
    const apiError = error as ApiError;
    console.error('Error occurred:', apiError.type, apiError.title);
    console.error('Status:', apiError.status);
    console.error('Trace ID:', apiError.traceId);

    if (apiError.errors) {
      console.error('Validation errors:', apiError.errors);
    }

    if (apiError.isAborted) {
      console.log('Request was cancelled');
    }
  }
}

// =============================================================================
// PATTERN 2: Response-Based Error Handling
// =============================================================================

async function responseBasedErrorHandling() {
  // GET request - returns errors in response.error
  const usersResponse: ApiResponse<User[], ApiError> = await client.get<User[]>('/users', {
    throwErrors: false,
  });

  if (usersResponse.error) {
    console.error('Failed to fetch users:', usersResponse.error.type, usersResponse.error.title);
    console.error('Status:', usersResponse.error.status);
    console.error('Trace ID:', usersResponse.error.traceId);

    if (usersResponse.error.errors) {
      console.error('Validation errors:', usersResponse.error.errors);
    }

    if (usersResponse.error.isAborted) {
      console.log('Request was cancelled');
    }
  } else {
    console.log('Users fetched successfully:', usersResponse.data);
  }

  // POST request - returns errors in response.error
  const createUserResponse: ApiResponse<User, ApiError> = await client.post<User>(
    '/users',
    { name: 'John Doe', email: 'john@example.com' },
    { throwErrors: false }
  );

  if (createUserResponse.error) {
    console.error('Failed to create user:', createUserResponse.error.title);

    // Handle different error types
    switch (createUserResponse.error.type) {
      case 'validation_error':
        console.error('Validation failed:', createUserResponse.error.errors);
        break;
      case 'server_error':
        console.error('Server error occurred');
        break;
      case 'request_cancelled':
        console.log('Request was cancelled');
        break;
      default:
        console.error('Unknown error:', createUserResponse.error.message);
    }
  } else {
    console.log('User created successfully:', createUserResponse.data);
  }

  // DELETE request - returns errors in response.error
  const deleteResponse: ApiResponse<void, ApiError> = await client.delete('/users/1', {
    throwErrors: false,
  });

  if (deleteResponse.error) {
    console.error('Failed to delete user:', deleteResponse.error.title);
  } else {
    console.log('User deleted successfully');
  }
}

// =============================================================================
// MIXED USAGE: Different patterns in same function
// =============================================================================

async function mixedUsage() {
  // Use traditional error handling for critical operations
  try {
    const authResponse = await client.post('/auth/login', {
      username: 'admin',
      password: 'secret',
    });

    client.setAuthToken(authResponse.data.token);
    console.log('Authentication successful');
  } catch (error) {
    const apiError = error as ApiError;
    console.error('Authentication failed:', apiError.message);
    return; // Exit early on auth failure
  }

  // Use response-based error handling for optional operations
  const profileResponse = await client.get('/profile', { throwErrors: false });

  if (profileResponse.error) {
    console.log('Could not load profile, using defaults');
    // Continue with default profile
  } else {
    console.log('Profile loaded:', profileResponse.data);
  }

  // Non-critical data loading
  const notificationsResponse = await client.get('/notifications', { throwErrors: false });

  if (notificationsResponse.error) {
    console.log('Notifications unavailable');
    // App continues to work without notifications
  } else {
    console.log('Notifications:', notificationsResponse.data);
  }
}

// =============================================================================
// TYPE SAFETY DEMONSTRATION
// =============================================================================

// TypeScript correctly infers different return types based on throwErrors setting
async function typeSafetyDemo() {
  // This returns ApiResponse<User[]> (no error property in type)
  const throwingResponse = await client.get<User[]>('/users');
  // throwingResponse.error; // ❌ TypeScript error - property doesn't exist
  console.log(throwingResponse.data); // ✅ Available

  // This returns ApiResponse<User[], ApiError> (includes error property in type)
  const nonThrowingResponse = await client.get<User[]>('/users', { throwErrors: false });
  console.log(nonThrowingResponse.error); // ✅ Available
  console.log(nonThrowingResponse.data); // ✅ Available

  // Explicit typing also works
  const explicitResponse: ApiResponse<User[], ApiError> = await client.get<User[]>('/users', {
    throwErrors: false,
  });

  if (explicitResponse.error) {
    // TypeScript knows this is an ApiError
    console.error(explicitResponse.error.type);
    console.error(explicitResponse.error.status);
    console.error(explicitResponse.error.traceId);
  } else if (explicitResponse.data) {
    // TypeScript knows explicitResponse.data is User[]
    console.log(explicitResponse.data.length);
  }
}

// Export examples for potential testing
export { traditionalErrorHandling, responseBasedErrorHandling, mixedUsage, typeSafetyDemo };
