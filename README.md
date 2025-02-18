# NEXT APP 15 - React 19 + TypeScript + Material UI + Tailwind CSS + Firebase + 

## 📂 Application Structure

The structure of this application separates components and features into clear modules to improve readability, maintainability, and scalability.

### Example Module Structure: `auth/`

```plaintext
auth/
├── login/
│   ├── __tests__/
│   │   └── Login.test.tsx
│   ├── api/
│   │   └── loginApi.ts
│   ├── hooks/
│   │   └── useLogin.ts
│   ├── index.ts
│   ├── login.data.ts
│   ├── login.type.ts
│   ├── Login.tsx
│   └── Login.view.tsx
└── index.ts
```

### Example Simple Component Structure: `card/`

```plaintext
card/
├── card.ts
├── card.data.ts
├── card.type.ts
├── Card.tsx
└── Card.view.tsx
```

---

## 🛠️ Module Creation Guide

### Basic Module Structure

```plaintext
src/
├── app/
│   └── backoffice/
│       └── master-data/
│
│
└── backoffice/
    └── modules/
        └── master-data/
            └── [user]/
                ├── api/
                │   └── userApi.ts
                ├── components/
                │   └── [component-files]
                ├── hooks/
                │   └── [hook-files]
                ├── User.tsx
                ├── User.view.tsx
                └── user.type.ts
```

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
