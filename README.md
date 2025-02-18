# NEXT APP 15 CLEAR CODE - React 19 + TypeScript + Material UI + Tailwind CSS + Firebase  

## 🚀 Progress & Features

### Authentication & Security

- Implemented JWT-based authentication
- Secure middleware protection for routes
- Token refresh mechanism
- Protected API routes

### Firebase Integration

- FCM (Firebase Cloud Messaging) setup
- Service worker implementation
- Push notification support
- Dynamic environment configuration

### UI Components

- Material UI + Tailwind CSS integration
- Responsive data tables with pagination
- Custom card components
- Loading skeletons
- Toast notifications

### Data Handling

- Axios instance setup with interceptors
- Error boundary implementation
- API response caching
- Type-safe data fetching

### Project Structure

- Modular component architecture
- Feature-based folder organization
- Shared utilities and hooks
- Type definitions

## 🛠️ Technical Implementation

### API Layer

```typescript
fetchAxios<T>({
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  params?: object;
  formData?: FormData | object;
})
```

### Firebase Configuration

```typescript
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  // ... other config
};
```

### Route Protection

```typescript
export const config = {
  matcher: ['/api/:path*', '/backoffice/:path*', '/auth/:path*'],
};
```

## 📚 Usage Examples

### Data Fetching

```typescript
const data = await fetchAxios({
  url: '/api/posts',
  method: 'GET',
});
```

### Firebase Push Notification

```typescript
const token = await requestNotificationPermission();
```

### Protected Routes

```typescript
// Automatically protected by middleware
/backoffice/aabddhors / api / secure - endpoint;
```
